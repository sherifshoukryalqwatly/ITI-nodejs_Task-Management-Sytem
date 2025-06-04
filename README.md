
# TaskMaster

TaskMaster is a project management system that allows users to organize and track their daily tasks with ease. It provides secure user authentication, task management, and user profile management through a RESTful API.

## Features

- **User Authentication**: Secure login and sign-up functionality.
- **Authorization**: Role-based access control to ensure secure task management.
- **Task Management**:
  - Create new tasks.
  - Read task details.
  - Update existing tasks.
  - Delete tasks.
- **User Management**:
  - Update user information.
  - Delete user accounts.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user and task data.

## Backend API

The backend is hosted at: [https://bedecked-functional-turkey.glitch.me/](https://bedecked-functional-turkey.glitch.me/)

### API Endpoints

| Action                  | HTTP Method | Route                |
|-------------------------|-------------|----------------------|
| Login                   | POST        | `/users/login`       |
| Signup                  | POST        | `/users/signup`      |
| Get tasks for user      | GET         | `/tasks`             |
| Create task             | POST        | `/tasks`             |
| Update task             | PATCH       | `/tasks`             |
| Delete all tasks        | DELETE      | `/tasks`             |
| Delete task by ID       | DELETE      | `/tasks/:id`         |
| Get specific task       | GET         | `/tasks/:id`         |
| Get all users           | GET         | `/users/all`         |
| Delete all users        | DELETE      | `/users/all`         |
| Delete user             | DELETE      | `/users`             |
| Update user             | PATCH       | `/users`             |

## Installation

Follow these steps to set up TaskMaster locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   DB=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the application**:
   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000` by default.

## Usage

1. **Sign Up**: Register a new account via `POST /users/signup`.
2. **Log In**: Authenticate at `POST /users/login` to receive a JWT token.
3. **Manage Tasks**:
   - Create tasks with `POST /tasks`.
   - View all tasks with `GET /tasks` or a specific task with `GET /tasks/:id`.
   - Update tasks using `PATCH /tasks`.
   - Delete tasks with `DELETE /tasks` (all tasks) or `DELETE /tasks/:id` (specific task).
4. **Manage Users**:
   - Update user details with `PATCH /users`.
   - Delete a user account with `DELETE /users`.
   - Admins can retrieve all users with `GET /users/all` or delete all users with `DELETE /users/all`.

