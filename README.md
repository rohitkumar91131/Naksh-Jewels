💎 Naksh Jewels – Premium E-commerce Platform
🚀 Features

Elegant UI
Premium gold & white theme for a luxury shopping experience.

Monorepo Architecture
Frontend and backend managed from a single root using npm workspaces.

Authentication
Secure JWT-based login and signup system.

Cart Functionality

Optimistic UI updates for instant feedback

Quantity controls (+ / –) synced directly with the backend

Cart access restricted to authenticated users only

Toast Notifications
Professional bottom-right alerts for success, error, and info messages.

Dockerized Setup
Entire application runs using Docker containers.

📂 Project Structure
naksh-jewels-assignment/
├── client/                # React + Vite (Frontend)
│   └── Dockerfile
├── server/                # Node.js + Express (Backend)
│   └── Dockerfile
├── package.json           # Root config (Monorepo Workspaces)
├── docker-compose.yml     # Multi-container setup
└── README.md

🔧 Installation & Setup
1. Clone the Repository
git clone https://github.com/rohitkumar91131/gigadbBackend.git
cd naksh-jewels-assignment

2. Install Dependencies

Run this command from the root folder.
It will install dependencies for both client and server.

npm install

🌱 Environment Variables

You need two separate .env files.

Backend (server/.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

Frontend (client/.env)
VITE_BACKEND_URL=http://localhost:5000

💻 Running the Application
Development Mode (Local)

From the root folder:

npm run dev

Docker Mode (Production-like)

Make sure Docker is installed:

docker-compose up --build


Frontend: http://localhost

Backend: http://localhost:5000

🛠️ Tech Stack

Frontend

React (Vite)

Context API

Axios

React Router

Backend

Node.js

Express

MongoDB (Mongoose)

JWT Authentication

Cloudinary

DevOps

Docker

Docker Compose

npm Workspaces

📝 Important Notes

Checkout Feature
Currently shows a “Coming Soon” notification.

Login Restriction
Users must be logged in to add items to the cart.

👨‍💻 Developed By

Rohit Kumar
