# To-Do List Application

## Project Overview

This is a full-stack web application for managing a simple to-do list with user authentication. Users can sign up, log in, and then create, read, update, and delete their own tasks. Each user's task list is private to them.

This project was developed as part of the "Back End Developer Challenge 2025 For Digital Factory".

## Features

* User registration (username, email, password)
* User login
* JWT-based authentication for secure sessions
* CRUD operations for tasks (Create, Read, Update, Delete)
* Each user can only access and manage their own tasks
* Simple, user-friendly interface

## Technologies Used

**Frontend:**

* React
* React Router DOM (for navigation)
* React Context API (for authentication state management)
* Axios (for API requests)
* Material-UI (MUI) (for UI components and styling)
* `react-scripts` (Create React App for build and development)

**Backend:**

* Node.js
* Express.js (for the web server and API routing)
* MongoDB (NoSQL database)
* Mongoose (ODM for MongoDB)
* JSON Web Tokens (JWT) (for authentication)
* `bcryptjs` (for password hashing)
* `cors` (for enabling Cross-Origin Resource Sharing)
* `dotenv` (for managing environment variables)

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (which includes npm) - Version 18.x or newer recommended.
* [MongoDB](https://www.mongodb.com/try/download/community) - Ensure a MongoDB server instance is running. You can use a local instance or a cloud-hosted one like MongoDB Atlas.

## Project Structure

The project is divided into two main folders:

* `todo-frontend/`: Contains the React frontend application.
* `todo-backend/`: Contains the Node.js/Express.js backend API.

## Setup and Installation

### 1. Backend Setup

Follow these steps to get the backend server running:

1.  **Clone the Repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-url>/todo-backend
    ```
    If you already have the `todo-backend` folder, navigate into it:
    ```bash
    cd path/to/your/todo-backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment Variables File:**
    Create a `.env` file in the root of the `todo-backend` directory. Copy the following content into it and **replace the placeholder values with your actual credentials and secrets**:

    ```env
    MONGO_URI="mongodb+srv://user:123@todo.iofj7aj.mongodb.net/?retryWrites=true&w=majority&appName=ToDo"
    JWT_SECRET="your_very_strong_and_long_jwt_secret_key_here"
    PORT=5000
    # You can also add FRONTEND_URL if you plan to use it in CORS for production
    # FRONTEND_URL=[http://your-deployed-frontend-url.com](http://your-deployed-frontend-url.com)
    ```
    * **`MONGO_URI`**: Your MongoDB connection string. The example provided is for MongoDB Atlas; update it with your username, password, and cluster details.
    * **`JWT_SECRET`**: A strong, random string used to sign your JSON Web Tokens. Keep this secret.
    * **`PORT`**: The port on which the backend server will run (defaults to 5000 if not specified).

4.  **Start the Backend Server:**
    Based on your `package.json`, you might need to add a start script. If you haven't, you can run it directly:
    ```bash
    node server.js
    ```
    Or, add a script to your `todo-backend/package.json`:
    ```json
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js", // Optional: if you install nodemon
      "test": "jest --detectOpenHandles" // Or your existing test script
    },
    ```
    Then run:
    ```bash
    npm start
    ```
    The server should start on `http://localhost:5000` (or the port specified in your `.env` file). You should see a "MongoDB Connected" and "Server running on port 5000" message in the console.

### 2. Frontend Setup

Follow these steps to get the React frontend application running:

1.  **Navigate to the Frontend Directory:**
    From the project's root directory:
    ```bash
    cd ../todo-frontend
    ```
    Or, if you are in a different location:
    ```bash
    cd path/to/your/todo-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Note: Ensure you've addressed any version compatibility issues as discussed, e.g., `react-scripts` and MUI versions).*

3.  **Start the Frontend Development Server:**
    Your `package.json` in the frontend likely has the `cross-env NODE_OPTIONS=--openssl-legacy-provider` for compatibility with newer Node.js versions.
    ```bash
    npm start
    ```
    This will open the application in your default web browser, typically at `http://localhost:3000`. The page will reload if you make edits.

## Available Scripts

### Backend (`todo-backend/package.json`)

* `npm start`: Starts the backend server (you'll need to add this script: `"start": "node server.js"`).
* `npm test`: Runs backend tests (you'll need to set up Jest and write tests).

### Frontend (`todo-frontend/package.json`)

* `npm start`: Runs the app in development mode.
* `npm test`: Launches the test runner in interactive watch mode.
* `npm run build`: Builds the app for production to the `build` folder.
* `npm run eject`: Removes the single build dependency and copies configuration files (one-way operation).

## API Endpoints

The backend exposes the following API endpoints, all prefixed with `/api`:

* **Authentication:**
    * `POST /register`: User registration.
    * `POST /login`: User login.
* **Tasks (Protected - requires JWT authentication):**
    * `GET /tasks`: Get all tasks for the logged-in user.
    * `POST /tasks`: Add a new task for the logged-in user.
    * `PUT /tasks/:id`: Update a specific task by ID for the logged-in user.
    * `DELETE /tasks/:id`: Delete a specific task by ID for the logged-in user.

## Troubleshooting

* **Port in use:** If you get an error that a port (e.g., 3000 or 5000) is already in use, ensure no other applications are using that port, or configure the application to use a different port via the `.env` file (for backend) or by modifying the start script/`.env` file (for frontend).
* **MongoDB Connection Issues:** Double-check your `MONGO_URI` in the backend's `.env` file. Ensure your IP address is whitelisted if using MongoDB Atlas and that the database server is running.
* **CORS Errors:** The backend is configured to allow requests from `http://localhost:3000`. If your frontend runs on a different port during development, update the `origin` in `todo-backend/server.js` or use a more flexible CORS configuration for development.
* **Node.js OpenSSL Errors (Frontend):** The frontend `npm start` script in `package.json` should include `cross-env NODE_OPTIONS=--openssl-legacy-provider` to ensure compatibility with newer Node.js versions (17+).

