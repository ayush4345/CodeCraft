# CodeCraft
IET Project Expo's Project

## Client

### 1. Landing Page

It displays a list of coding problems and provides filtering options based on difficulty level and problem category. The page includes the following features:

- Problem List: Renders a table displaying the list of coding problems fetched from a database.
- Filtering: Users can filter the problem list based on difficulty levels (Easy, Medium, Hard) and problem categories (e.g., Dynamic Programming, Two Pointers, Array, Linked List, Stack, Binary Search, Binary Tree, Intervals, Sliding Window, Back Tracking).
- Leaderboard: Includes a leaderboard component to display the rankings of users.

### 2. Chat Page

The Chat Page is a real-time chat application that allows users to send and receive messages. It utilizes the Supabase library for authentication, channel subscription, and database operations. The page features the following functionalities:

- User authentication: Users must be authenticated to access the chat page.
- Real-time messaging: Messages are synced in real-time using Supabase's channel subscription.
- Message history: Initial messages are fetched from the database upon component mount.
- Sending messages: Users can type and send messages, which are inserted into the database.
- Message display: Received messages are displayed with the sender's name, timestamp, and message content.

### 3. Problem Page

The Problem Page is a dynamic page that displays a specific problem. it has multiple component  as follow:

1. **Footer**:
    - It includes buttons for submitting the user's code and asking for AI assistance.

2. **Playground**:
    - This serves as the main coding environment.
    - It includes a code editor powered by the `react-codemirror` library, a section for displaying test cases and results, and an AI assistant feature.
    - It fetches problem data from a Supabase database and handles code submission and AI assistance requests.

3. **Header**:
    - It allows users to select a programming language, toggle full-screen mode, and access settings.

4. **ProblemDescription**:
    - This displays the problem statement, examples, constraints, and other relevant information for a given programming problem.
    - It also includes functionality for liking, disliking, and starring problems.

### 4. Profile Page

The Profile Page displays the user's profile information, including their rank, points, activity statistics, and problem-solving analytics. It fetches data from the database and renders the following components:

- User information: Displays the user's name, rank, member since date, and premium status.
- Activity section: Shows the number of solved, liked, disliked, and starred problems.
- Analytics section: Includes a donut chart that visualizes the user's problem-solving progress based on difficulty levels.

### 5. Authentication Page

The Auth Page is responsible for handling user authentication. It includes the following components:

### Login

- This component handles the user login functionality.
- It provides input fields for the user to enter their email and password.
- If the login is successful, it displays a success message redirects the user to the root route.

- It also includes a button to navigate to the "Forgot Password" flow and a link to navigate to the "Sign Up" flow.

### Signup

- This component handles the user registration functionality.
- It provides input fields for the user to enter their personal information (name, profession, institute, age group, email, display name, password, reason for learning coding, and experience level).
- It also includes a link to navigate to the "Log In" flow for users who already have an account.

Overall, these components work together to provide a seamless authentication experience for users.

### 6. Learning Page

This page provides a user-friendly interface to  explore various topics related to data structures and algorithms. It provides a search bar, displays the results, and shows relevant videos and links based on the user's search query.


1. **Topic Search**: The component allows users to enter a topic in the search bar. When the user submits the topic, it sends a request to the server to fetch the relevant information.

2. **Result Display**: Upon receiving the response from the server, the component displays the result as formatted Markdown content using the `react-markdown` library.

3. **Video Listing**: The component also fetches relevant videos from the YouTube API based on the search query. These videos are displayed in a vertical timeline using the `react-vertical-timeline-component` library.

4. **Link Listing**: In addition to videos, the component displays a list of useful content and links related to the search query. These links are also presented in a vertical timeline format. For web scraping of links we are using puppeteer. 

5. **Topic History**: The component maintains a history of the user's searched topics. These topics are displayed as buttons on the left sidebar, allowing the user to quickly revisit a specific topic.

6. **Topic Management**: Users can delete topics from their history by clicking the delete icon next to each topic button.


### API Integrations

The learning page interacts with multiple APIs:

1. **Local Server API**: The component sends a POST request to `http://localhost:8081/api` with the search topic as the request body. The server responds with an array of useful links related to the topic.

2. **Django Rest API**: The component sends a POST request to `http://127.0.0.1:8000/learnaskai` with the search topic, user profession, age, experience, and level as the request body. The Flask server likely processes the request and responds with the result content.

3. **YouTube API**: The component fetches relevant videos from the YouTube API by sending a GET request to `https://www.googleapis.com/youtube/v3/search`. The API responds with an array of video data, which is then displayed in the vertical timeline.

4. **Supabase**: The component interacts with the Supabase database to store and retrieve user-related data, such as topics, profession, age, experience, and level.


### Web Scraping API with Puppeteer and Express.js

Made a Express.js server that provides an API for web scraping using the Puppeteer library. The server listens on port 8081 and accepts POST requests at the `/api` endpoint with a topic in the request body. It then uses the Puppeteer library to launch a headless Chrome browser, search for the given topic on Google, and retrieve a list of links from the search results.


- `express`: A popular web application framework for Node.js.
- `cors`: A middleware that provides a Connect/Express middleware for handling Cross-Origin Resource Sharing (CORS).
- `puppeteer-core`: A high-level API to control headless Chrome or Chromium over the DevTools Protocol.

### 7. Practice Contests

#### Features:

1. **Challenge List**: A user can choose any number of questions from the list of available questions on the coding platform.

2. **Countdown Timer**: A countdown timer is displayed at the top of the page, showing the remaining time for the contest. The timer is calculated based on the start time and duration of the contest.

3. **Contest Points**: After the contest ends, the total points earned by the user during the contest are also displayed.

### Client Setup and Installation

To run this project locally, follow these steps:

1. Clone the repository: 
``` 
git clone https://github.com/ayush4345/CodeCraft.git
 ```

2. Navigate to the project directory: 
```
cd client
```

3. Install dependencies: 
```
npm install
```
4. Set up the Supabase project and configure the required credentials in the `supabase.js` file.
5. Start the development server: 
```
npm start
```
6. For running Puppteer backend, Navigate to the project directory: 
```
cd puppeteer
```

7. Start the puppeteer server : 
```
node server.js
```

The project should now be running on `http://localhost:3000`.

### Dependencies

The project relies on the following major dependencies:

- React
- React Router
- Supabase
- Tailwind CSS
- React Icons
- React Donut Chart

Please refer to the `package.json` file for the complete list of dependencies and their versions.


## Server 

### Setup Instructions:

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

Run the server:

```bash
python3 manage.py runserver
```

## Django REST APIs

This repository contains a set of Django REST APIs for various functionalities. The APIs are built using the Django REST Framework and can be accessed through HTTP requests.



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
- **Description:** This API compiles and executes the provided source code in the specified programming language . It returns the output of the code execution, along with the execution time and a status indicator.

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
- **Description:** This API accepts an error message, along with some user information, and provides a response with suggestions or explanations related to the error.

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


### Working of Django Framework

1. **Views**:
    Views in Django serve as the endpoints for handling incoming HTTP requests and generating appropriate responses. Views were responsible for implementing the logic behind each API endpoint. For example, we have views for compiling code, retrieving supported languages, and providing AI-based suggestions for error messages.

2. **URL Routing**:
    URL routing configuration was utilized to map the API endpoints to their respective views. This routing mechanism ensures that incoming requests are directed to the appropriate view for processing. For instance, endpoints like `/compile` and `/languages` were routed to their corresponding views for handling compilation requests and language retrieval requests, respectively.


3. **Third-Party Integrations**:
    our project is integrated with third-party services or libraries for certain functionalities. For instance, the compilation feature in the `/compile` API is  relied on a third-party code execution engine, [Judge0](https://ce.judge0.com/) to compile and execute the submitted code securely. `/askai` and `/learnaskai` utilise [OpenAI](https://platform.openai.com/docs/introduction) API to give suggestions.


## Backend Deployment

This project is deployed on PythonAnywhere at [adya2004.pythonanywhere.com](http://adya2004.pythonanywhere.com) 


## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
