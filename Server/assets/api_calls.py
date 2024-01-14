import requests
import os
from dotenv import load_dotenv
dotenv_path = '.env'
load_dotenv(dotenv_path)
api_url = "https://ce.judge0.com/"
rapid_api_key = os.getenv('rapid_api_key')

def get_languages():
    try:
        url = api_url + "languages/"
        response = requests.get(url)

        response = response.json()
        return(response)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching languages: {e}")
        return None


def get_submission_token(source_code, id, inputs = None):
    try:
        url = "https://judge0-ce.p.rapidapi.com/submissions"

        querystring = {"base64_encoded": "false", "fields": "*"}

        payload = {
            "language_id": id,
            "source_code": source_code,
            "stdin": inputs
        }

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
        output = response['stdout']
        error = response['stderr']
        if output != None:
            return output
        else:
            return error
    except requests.exceptions.RequestException as e:
        print(f"Error checking submission status: {e}")
        return None


def compile():
    langs = get_languages()
    for item in langs:
        print("Langage:", item['name'], "  ---> id:", item['id'])
    lang_id = int(input())
    file_name = input()

    with open(file_name, 'r', encoding='utf-8') as file:
        source_code = file.read()


    token = get_submission_token(source_code, lang_id)
    ans = check_submission_status(token)
    print("Output:\n", ans)

# compile()
