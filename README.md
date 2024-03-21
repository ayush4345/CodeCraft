# CodeCraft Coding Platform


## 1. Landing Page

It displays a list of coding problems and provides filtering options based on difficulty level and problem category. The page includes the following features:

- Problem List: Renders a table displaying the list of coding problems fetched from a database.
- Filtering: Users can filter the problem list based on difficulty levels (Easy, Medium, Hard) and problem categories (e.g., Dynamic Programming, Two Pointers, Array, Linked List, Stack, Binary Search, Binary Tree, Intervals, Sliding Window, Back Tracking).
- Leaderboard: Includes a leaderboard component to display the rankings of users.

## 2. Chat Page

The Chat Page is a real-time chat application that allows users to send and receive messages. It utilizes the Supabase library for authentication, channel subscription, and database operations. The page features the following functionalities:

- User authentication: Users must be authenticated to access the chat page.
- Real-time messaging: Messages are synced in real-time using Supabase's channel subscription.
- Message history: Initial messages are fetched from the database upon component mount.
- Sending messages: Users can type and send messages, which are inserted into the database.
- Message display: Received messages are displayed with the sender's name, timestamp, and message content.

## 3. Problem Page

The Problem Page is a dynamic page that displays a specific problem.

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

## 4. Profile Page

The Profile Page displays the user's profile information, including their rank, points, activity statistics, and problem-solving analytics. It fetches data from the database and renders the following components:

- User information: Displays the user's name, rank, member since date, and premium status.
- Activity section: Shows the number of solved, liked, disliked, and starred problems.
- Analytics section: Includes a donut chart that visualizes the user's problem-solving progress based on difficulty levels.

## 5. Authentication Page

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

## 6. Learning Page

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


# Web Scraping API with Puppeteer and Express.js

Made a Express.js server that provides an API for web scraping using the Puppeteer library. The server listens on port 8081 and accepts POST requests at the `/api` endpoint with a topic in the request body. It then uses the Puppeteer library to launch a headless Chrome browser, search for the given topic on Google, and retrieve a list of links from the search results.


- `express`: A popular web application framework for Node.js.
- `cors`: A middleware that provides a Connect/Express middleware for handling Cross-Origin Resource Sharing (CORS).
- `puppeteer-core`: A high-level API to control headless Chrome or Chromium over the DevTools Protocol.

## Setup and Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ayush4345/CodeCraft.git`
2. Navigate to the project directory: `cd client`
3. Install dependencies: `npm install`
4. Set up the Supabase project and configure the required credentials in the `supabase.js` file.
5. Start the development server: `npm start`
6. For running Puppteer backend, Navigate to the project directory: `cd puppeteer`.
7. Start the puppeteer server : `node server.js`.

The project should now be running on `http://localhost:3000`.

## Dependencies

The project relies on the following major dependencies:

- React
- React Router
- Supabase
- Tailwind CSS
- React Icons
- React Donut Chart

Please refer to the `package.json` file for the complete list of dependencies and their versions.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
