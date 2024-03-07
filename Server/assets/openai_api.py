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

def learn_ask_ai(topic, profession, age, experience, level):
    client = OpenAI(api_key=openai_api_key)

    MODEL = "gpt-3.5-turbo"
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant providing details of asked topics, response should be strictly in markdown format"},
            {"role": "user", "content": f"i`am a {profession}, of age {age} with {level} level coding knowledge, and with {experience} of experience. I need detailed explaination on topic mergesort, not more than 3 paras. Explain it with pseudocode or code. It should be in markdown format"},
            {"role": "assistant", "content": "**Merge Sort**\n\nMerge Sort is a popular sorting algorithm that follows the divide-and-conquer approach. It is efficient for sorting large datasets and has a time complexity of O(n log n). The algorithm divides the input array into two halves, sorts them recursively, and then merges the sorted halves to obtain the final sorted array.\n\nThe Merge Sort algorithm can be explained in three steps:\n\n1. **Divide**: The input array is divided into two equal halves until the base case is reached, i.e., when the array size becomes 1. This is done recursively until all the elements are individually considered as sorted arrays.\n\n2. **Conquer**: In this step, the individual elements are merged back together in a sorted manner. The merging is done by comparing the elements from the two halves and placing them in the correct order. This process is repeated until all the elements are merged back into a single sorted array.\n\n3. **Combine**: Finally, the two sorted halves are combined to form the final sorted array.\n\nHere is the pseudocode for the Merge Sort algorithm:\n\n```\nMergeSort(arr, left, right)\n    if left < right\n        mid = (left + right) / 2\n        MergeSort(arr, left, mid) // Recursively sort the left half\n        MergeSort(arr, mid + 1, right) // Recursively sort the right half\n        Merge(arr, left, mid, right) // Merge the sorted halves\n\nMerge(arr, left, mid, right)\n    n1 = mid - left + 1\n    n2 = right - mid\n    leftArr[1...n1+1] and rightArr[1...n2+1] // Create temporary arrays\n    for i = 1 to n1\n        leftArr[i] = arr[left + i - 1]\n    for j = 1 to n2\n        rightArr[j] = arr[mid + j]\n    i = 1, j = 1, k = left\n    while i <= n1 and j <= n2\n        if leftArr[i] <= rightArr[j]\n            arr[k] = leftArr[i]\n            i = i + 1\n        else\n            arr[k] = rightArr[j]\n            j = j + 1\n        k = k + 1\n    while i <= n1\n        arr[k] = leftArr[i]\n        i = i + 1\n        k = k + 1\n    while j <= n2\n        arr[k] = rightArr[j]\n        j = j + 1\n        k = k + 1\n```\n\nIn summary, Merge Sort is a divide-and-conquer algorithm that recursively divides the input array into smaller halves, sorts them individually, and then merges them back together to obtain the final sorted array. The pseudocode provided above demonstrates the implementation of the Merge Sort algorithm."},
            {"role": "user", "content": f"i`am a {profession}, of age {age} with {level} level coding knowledge, and with {experience} of experience. I need detailed explaination on topic {topic}, not more than 3 paras. Explain it with pseudocode or code. It should be in markdown format"},
        ],
        temperature=0,
    )
    response = response.choices[0].message.content
    output = {'content' : response}
    print(output)
    return output
