# User Registration App

This project is a simple **User Registration application** built with **React** for the frontend and **Node.js** + **Express** for the backend to handle user data.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node package manager)
- A **code editor** (e.g., **Visual Studio Code**)
- **Postman** or any API testing tool (optional, for testing the backend)

---

## Backend Setup

### 1. **Clone the Backend Repository**

If the backend code is in a separate repository, clone it to your local machine:

```bash
git clone <backend-repo-url>
cd <backend-repo-directory>
```

### 2. Install Dependencies
Navigate to the backend directory and install the required packages:

```bash
npm install
```
### 3. Setup Database
Make sure you have a MySQL database set up. Modify the database connection settings in your backend code as needed.

### 4. Create a .env File
Create a .env file in the backend directory and fill in the following variables:

```plaintext
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=5000
DB_HOST: The host of your MySQL database (e.g., localhost).
DB_USER: The username to connect to your database.
DB_PASSWORD: The password for your database user.
DB_NAME: The name of the database you will be using.
PORT: The port on which the backend server will run (default is 5000).
5. Run the Backend Server
Start the backend server:
```

```bash
npm start
```
The backend server should now be running on http://localhost:5000.

## Frontend Setup
### 1. Clone the Frontend Repository
If the frontend code is in a separate repository, clone it to your local machine:

```bash
git clone <frontend-repo-url>
cd <frontend-repo-directory>
```

### 2. Install Dependencies
Navigate to the frontend directory and install the required packages:


```bash
npm install
```
### 3. Run the Frontend Application
Start the frontend application:

```bash
npm start
```
The frontend application should now be running on http://localhost:3000.

## Usage
1. Open your web browser and navigate to http://localhost:3000.
2. You can register a new user by filling out the form and submitting it.
3. Registered users will be displayed in a list below the form, with options to edit or delete each user.
   
## API Endpoints
The following API endpoints are available in the backend:

1. GET /users - Fetch all registered users
2. POST /register - Register a new user
3. PUT /update/:id - Update user data by ID
4. DELETE /delete/:id - Delete user by ID
   
## Troubleshooting
- Ensure that both the backend and frontend servers are running without errors.
- Check the console for any error messages and address them accordingly.
- Use Postman to test the backend API endpoints if needed.
- 
## License
This project is licensed under the MIT License - see the LICENSE file for details.