# CodeCraft
IET Project Expo's Project

<h2>Server Setup Instructions:</h2>
<list>
1.Create a virtual environment (optional but recommended):
 
```bash
python3 -m venv venv
```
 
2.Activate the virtual environment:

- For Windows:
```bash
.\venv\Scripts\activate
```
- For macOS/Linux:

```bash
source venv/bin/activate
```
3.Install requirements from requirements.txt:

```bash
pip install -r requirements.txt
```

4.Change into the project directory:

```bash
cd Server
```

5.Make migrations:
```bash
python3 manage.py makemigrations
```

6.Apply database migrations:
```bash
python3 manage.py migrate
```

</list>
<h2>Usage:</h2>
Run the server:

```bash
python3 manage.py runserver
```

# Django REST APIs

This repository contains a set of Django REST APIs for various functionalities. The APIs are built using the Django REST Framework and can be accessed through HTTP requests.

## APIs

### 1. Compile API

- **URL:** `/compile`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "source_code": "print('hello')",
    "language_id": 71,
    "inputs": "",
    "outputs": "hello\n"
  }
  ```
- **Response:**
  ```json
  {
    "output": "hello\n",
    "time": "0.013",
    "status": {
      "id": 3,
      "description": "Accepted"
    }
  }
  ```
- **Description:** This API compiles and executes the provided source code in the specified programming language (in this case, Python). It returns the output of the code execution, along with the execution time and a status indicator.

### 2. Languages API

- **URL:** `/languages`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 45,
      "name": "Assembly (NASM 2.14.02)"
    },
    {
      "id": 46,
      "name": "Bash (5.0.0)"
    },
    // ... (Additional language entries)
  ]
  ```
- **Description:** This API retrieves a list of programming languages supported by the system, along with their respective IDs and names.

### 3. Ask AI API

- **URL:** `/askai`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "error": "Exception in thread 'main' java.lang.ArrayIndexOutOfBoundsException: Index 9 out of bounds for length 9\nat Rough.djkstra (Rough.java:12)\nat Rough.main(Rough.java:75)",
    "profession": "student",
    "age": "21",
    "experience": 2,
    "level": "intermidiate",
    "prev_response": ""
  }
  ```
- **Response:**
  ```json
  {
    "content": "1. Check the logic for accessing array elements and ensure it is within the bounds of the array.\n2. Consider the conditions under which the array index is being calculated or manipulated.\n3. Review how the array is being initialized and populated to identify any potential issues."
  }
  ```
- **Description:** This API accepts an error message, along with some user information, and provides a response with suggestions or explanations related to the error, particularly for array index out-of-bounds exceptions.

### 4. Learn Ask AI API

- **URL:** `/learnaskai`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "topic": "merge sort",
    "profession": "student",
    "age": "21",
    "experience": 2,
    "level": "intermidiate"
  }
  ```
- **Response:**
  ```json
  {
    "content": "### Merge Sort\n\nMerge Sort is a classic sorting algorithm known for its efficiency and stability. It follows the divide-and-conquer strategy to sort an array. The algorithm works by recursively dividing the array into two halves until each sub-array contains only one element. Then, it merges the sub-arrays in a sorted manner to produce the final sorted array. Merge Sort has a time complexity of O(n log n), making it suitable for sorting large datasets efficiently.\n\n```python\ndef merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        left_half = arr[:mid]\n        right_half = arr[mid:]\n\n        merge_sort(left_half)\n        merge_sort(right_half)\n\n        i = j = k = 0\n\n        while i < len(left_half) and j < len(right_half):\n            if left_half[i] < right_half[j]:\n                arr[k] = left_half[i]\n                i += 1\n            else:\n                arr[k] = right_half[j]\n                j += 1\n            k += 1\n\n        while i < len(left_half):\n            arr[k] = left_half[i]\n            i += 1\n```"
  }
  ```
- **Description:** This API provides an explanation and example implementation of the Merge Sort algorithm in Python, based on the requested topic and user information.

## Usage

To use these APIs, you can send HTTP requests to the respective URLs using tools like cURL, Postman, or by integrating them into your application code. Make sure to include the required request bodies for the `POST` requests, and handle the responses appropriately.


</br>

## Working of Django Framework for our APIs


### Working of Django Framework for APIs in CodeCraft Project


1. **Views**:
   - Views in Django serve as the endpoints for handling incoming HTTP requests and generating appropriate responses. In our project, views were responsible for implementing the logic behind each API endpoint. For example, we have views for compiling code, retrieving supported languages, and providing AI-based suggestions for error messages.

2. **URL Routing**:
   - URL routing configuration was utilized to map the API endpoints to their respective views. This routing mechanism ensures that incoming requests are directed to the appropriate view for processing. For instance, endpoints like `/compile` and `/languages` were routed to their corresponding views for handling compilation requests and language retrieval requests, respectively.


3. **Third-Party Integrations**:
   - our project is integrated with third-party services or libraries for certain functionalities. For instance, the compilation feature in the `/compile` API is  relied on a third-party code execution engine, Judge0 to compile and execute the submitted code securely. `/askai` and `/learnaskai` utilise openai api to give suggestions.

By leveraging these specific components of the Django framework, the CodeCraft project successfully implements a reliable and efficient RESTful API system, catering to various functionalities.


# Deployment

This project is deployed on PythonAnywhere at [adya2004.pythonanywhere.com](http://adya2004.pythonanywhere.com) 
