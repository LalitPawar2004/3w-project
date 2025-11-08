3W – Mini Social Post Application

A simple social post app inspired by TaskPlanet where users can signup, create posts (text/image), view a public feed, like, and comment.

Features

Signup/Login with email & password (MongoDB)

Create posts with text, image, or both

Public feed showing all posts with likes & comments

Like and comment functionality

Tech Stack

Frontend: React.js (Material UI / React Bootstrap / CSS)

Backend: Node.js + Express

Database: MongoDB Atlas

Project Structure
3w/
 ├─ frontend/  # React app
 └─ backend/   # Node.js/Express API

Setup & Run Locally

Backend:

cd backend
npm install
# create .env with MONGO_URI and PORT
npm start


Frontend:

cd frontend
npm install
npm start


Open http://localhost:3000
