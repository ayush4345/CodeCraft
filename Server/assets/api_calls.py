import requests
import os
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

dotenv_path = '.env'
load_dotenv(dotenv_path)
api_url = "https://ce.judge0.com/"
rapid_api_key = os.getenv('rapid_api_key')

@csrf_exempt
def get_languages(request):
    try:
        url = api_url + "languages/"
        response = requests.get(url)

        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        response = response.json()
        # print(response)
        return {'languages':response}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching languages: {e}")
        return None


def get_submission_token(source_code, id, inputs, outputs):
    try:
        url = "https://judge0-ce.p.rapidapi.com/submissions"

        querystring = {
            "base64_encoded": "false",
            "fields": "*",
            "language_id": id,
            "source_code": source_code,
            "stdin": inputs,
            "expected_output": outputs,
        }

        payload = {
            "language_id": id,
            "source_code": source_code,
            "stdin": inputs,
            "expected_output": outputs,
        },

        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": rapid_api_key,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        response = requests.post(url, json=payload, headers=headers, params=querystring)

        # print(response.json())
        return response.json()['token']
    except requests.exceptions.RequestException as e:
        print(f"Error submitting code: {e}")
        return None

def check_submission_status(token):
    try:
        url = "https://judge0-ce.p.rapidapi.com/submissions/" + token

        querystring = {"base64_encoded":"false","fields":"*"}

        headers = {
            "X-RapidAPI-Key": rapid_api_key,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)
        response = response.json()
        print(response)
        output = response.get('stdout', '')
        error = response.get('stderr', '')
        time = response.get('time', '')
        status = response.get('status', '')
        if status['id']==1 or status['id']==2 :
            return check_submission_status(token)
        if output != None:
            return {'output':output,'time':time,'status':status}
        else:
            return {'error':error,'status':status}
    except requests.exceptions.RequestException as e:
        print(f"Error checking submission status: {e}")
        return None

@csrf_exempt
def compile(source_code, lang_id, inputs = None,outputs = None):
    token = get_submission_token(source_code, lang_id, inputs, outputs)
    ans = check_submission_status(token)
    return ans
