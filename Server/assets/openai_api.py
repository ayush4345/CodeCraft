import os
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from openai import OpenAI

dotenv_path = '.env'
load_dotenv(dotenv_path)
openai_api_key = os.getenv('openai_api_key')

@csrf_exempt
def open_ai_api_call(error, profession, age, experience, level, prev_response):
    client = OpenAI(api_key=openai_api_key)

    MODEL = "gpt-3.5-turbo"
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant giving hints for coders"},
            {"role": "user", "content": f"i`am a {profession}, of age {age} with {level} level coding knowledge, and with {experience} of experience. i`am getting {error} error in my code. provide me excaltly 3 hints, each not more than 2 lines. These should strictly doesnot contain solution for problem.{prev_response}, these is the previous response, give hints other than this and be more clear than that. only hint is required based on mentioned specifications"},
        ],
        temperature=0,
    )
    response = response.choices[0].message.content
    output = {'content' : response}
    print(output)
    return output
