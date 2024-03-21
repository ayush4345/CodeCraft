# React Project

This is a React project that includes the following pages:

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

### SignUp

- This component handles the user registration functionality.
- It provides input fields for the user to enter their personal information (name, profession, institute, age group, email, display name, password, reason for learning coding, and experience level).
- It also includes a link to navigate to the "Log In" flow for users who already have an account.

Overall, these components work together to provide a seamless authentication experience for users.

## Setup and Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ayush4345/CodeCraft.git`
2. Navigate to the project directory: `cd client`
3. Install dependencies: `npm install`
4. Set up the Supabase project and configure the required credentials in the `supabase.js` file.
5. Start the development server: `npm start`

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
