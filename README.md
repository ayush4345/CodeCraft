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

## Working of Django Framework for APIs

The backend of these APIs is built using the Django REST Framework (DRF), a powerful and flexible toolkit for building web APIs in Django. Here's a brief overview of how Django works in the context of building APIs:

### Models

The backend likely includes one or more Django models to represent the data entities required for the APIs. For example, there might be models for programming languages, code submissions, user profiles, etc.

### Serializers

DRF uses serializers to convert complex data types, such as Django models, into Python data types that can be easily rendered into JSON or other content types. The backend likely includes serializers for the models mentioned above.

### Views

The APIs are implemented as Django views, which handle the incoming HTTP requests and return the appropriate responses. The views likely make use of the serializers to convert data between Python objects and JSON representations.

### URL Routing

The backend includes URL routing configuration to map the API endpoints (e.g., `/compile`, `/languages`, `/askai`, `/learnaskai`) to their respective views.

### Authentication and Permissions

Depending on the requirements, the backend might include authentication and permission handling mechanisms to secure the APIs and control access.

### Database Interactions

The backend interacts with a database (e.g., SQLite, PostgreSQL, MySQL) to store and retrieve data required for the APIs. Django's Object-Relational Mapping (ORM) layer is likely used to interact with the database.

### Third-Party Integrations

The backend might integrate with third-party services or libraries to provide certain functionalities. For example, it might use a code execution engine to compile and run the submitted code for the `/compile` API.



# Deployment

This project is deployed on PythonAnywhere at [adya2004.pythonanywhere.com](http://adya2004.pythonanywhere.com) 
