# Blog App using MERN Stack

Blog App is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It provides secure user authentication and complete CRUD functionality for blog posts (create, read, update, delete), and lets users browse and read blogs created by other users. The repository includes clear local development instructions and an optional Docker Compose setup for containerized deployment.

## Functionalities

- **Authentication:** Secure user authentication system to protect your blogs.
- **Create Blog:** Easily create and publish your blogs with a user-friendly interface.
- **Delete Blog:** Remove unwanted blogs with a simple delete option.
- **Update Blog:** Edit and update your blogs as your content evolves.
- **View Other User Blogs:** Explore and read blogs published by other users.

## Getting Started

To get started with this project, follow these steps:

1. Fork this repository

2. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/Blog-App-using-MERN-stack.git
```

3. Install the required dependencies for both the backend and frontend:

```bash
cd Blog-App-using-MERN-stack
cd server && npm install
cd ../client && npm install
```

4. Make a .env file in the server and copy the following line:
```bash
MONGO_URI = mongodb://127.0.0.1:27017/BlogApp
```


5. Configure the database connection in the backend. You can use MongoDB Atlas or a local MongoDB server.

6. Start the backend server:

```bash
cd server && npm start
```

7. Start the frontend application:

```bash
cd client && npm start
```


8. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).


## Using Docker

1. Docker should be set up and installed.


2. Run the following command from the root of your project:

```bash
docker-compose up --build
```

3. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).


4. Stop the containers:

```bash
docker-compose down
```