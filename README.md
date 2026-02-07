💎 Naksh Jewels – Premium E-commerce Platform

A mini full-stack e-commerce application built as part of the Naksh Jewels ReactJS & Node.js Internship Assessment.

This project demonstrates full frontend–backend integration, authentication, protected routes, cart management, and a fully Dockerized production-ready setup.

🚀 Features
✨ Elegant UI

Premium gold & white themed interface designed for a luxury shopping experience.

🧱 Single Repository Architecture

Frontend and backend are maintained in a single repository with clear separation.

🔐 Authentication

JWT-based login & signup

Tokens stored in HTTP-only cookies

Protected routes for authenticated users

🛒 Cart System

Add / remove products

Quantity controls (+ / –)

Optimistic UI updates

Cart access restricted to logged-in users

🔔 Toast Notifications

Professional success, error, and info alerts.

🐳 Dockerized Setup

Entire application runs using Docker & Docker Compose.

📂 Project Structure
root/
├── frontend/               # React + Vite
│   ├── Dockerfile
│   ├── src/
│   └── .env.example
│
├── backend/                # Node.js + Express
│   ├── Dockerfile
│   ├── src/
│   ├── seed.js
│   └── .env.example
│
├── docker-compose.yml
└── README.md

🌱 Environment Variables
Backend

Create a .env file inside the backend folder using .env.example.

PORT=5000
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


⚠️ The .env file is gitignored to protect sensitive data.

🌱 Database Seeding

After configuring the backend environment variables (including MongoDB and Cloudinary credentials), seed the database with initial product data.

Steps
cd backend
node seed.js

What the script does

Uploads product images to Cloudinary

Inserts initial products into MongoDB

If products are not visible in the app, make sure this step is completed.

🐳 Running the Application (Docker)
Prerequisites

Docker

Docker Compose

Start the application

From the root directory:

docker-compose up --build

Access

Frontend:

http://localhost


Backend API:

http://localhost:5000

If using Docker and products are missing

Run the seed inside the backend container:

docker exec -it <backend_container_name> node seed.js

🔌 Backend Architecture & API

Built using Node.js + Express with a modular middleware-driven structure.

Server Configuration

CORS configured using FRONTEND_URL

Cookies enabled for authentication

Environment configuration via dotenv

cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})

🔐 Authentication Routes (/auth)
Method	Route
POST	/auth/register
POST	/auth/login
POST	/auth/logout
GET	/auth/verify

Details

JWT authentication

Tokens stored in HTTP-only cookies

/verify validates user session

🛒 Cart Routes (/cart)

(All routes protected)

Method	Route
GET	/cart
POST	/cart/add
POST	/cart/remove

Details

Requires authentication middleware

Cart synced with backend on each action

Supports optimistic UI

🛍️ Product Routes (/products)
Method	Route
GET	/products
GET	/products/search

Details

Fetch all products

Search via query parameters

Public access

🧠 Middleware Used

Authentication Middleware (JWT verification)

Cookie Parser

CORS Middleware

Error Handling Middleware

🧠 Docker Notes

Frontend built with Vite and served via Nginx

Backend reads environment variables at runtime

Frontend variables injected at build time

Containers communicate using Docker service names (not localhost)

🛠️ Tech Stack
Frontend

React (Vite)

Context API

Axios

React Router

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Cloudinary

DevOps

Docker

Docker Compose

Nginx

📝 Important Notes

Checkout feature currently shows “Coming Soon”

Login required to add items to cart

No secrets are committed to GitHub

Database must be seeded before products appear

👨‍💻 Developed By

Rohit Kumar
