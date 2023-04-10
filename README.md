# Social Media App

This is a social media app built with Node.js, React, and MongoDB.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the server directory and install dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Navigate to the client directory and install dependencies by running `npm install`.
5. Start the client by running `npm start`.

## Usage

Once the server and client are running, you can access the app by navigating to `http://localhost:3000` in your web browser.

The app allows users to sign up, log in, create posts, like posts.

## Routes
### User Related 
 - POST `/users`: Create a new user.
 - POST `/users/auth/login`: Login a user with email and password
 - GET `/users/{id}`: Retrieve a user by id.
 - PUT `/users/{id}`: Update a user's name or bio by id.
 - DELETE `/users/{id}`: Delete a user by id.

### Posts Routes
 - POST `/posts`: Create a new post. The request should include the user_id.
 - GET `/posts/{id}`: Retrieve a post by id.
 - PUT `/posts/{id}`: Update a post's content by id.
 - DELETE `/posts/{id}`: Delete a post by id.
 - POST `/posts/{id}/like`: Increment the like count of a post by id.
 - POST `/posts/{id}/unlike`: Decrement the like count of a post by id. The count should not go below 0.

### Admin Routes

 
 To access admin routes you should login with following Emailid and password.
 
 Email: admin_socailhive@gmail.com
 Password: admin_socailhive

 - GET `/analytics/users`: Retrieve the total number of users.
 - GET `/analytics/users/top-active`: Retrieve the top 5 most active users, based on the number of posts.
 - GET `/analytics/posts`: Retrieve the total number of posts.
 - GET `/analytics/posts/top-liked`: Retrieve the top 5 most liked posts.
