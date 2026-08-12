# 🚀 MERN Task Manager

A full-stack Task Manager application built with the MERN stack. Users can register, log in securely using JWT authentication, and manage their personal tasks with complete CRUD functionality.

## 🌐 Live Demo

- **Frontend:** https://task-manager-mern-tau-vert.vercel.app
- **Backend API:** https://task-manager-mern-aysd.onrender.com

## ✨ Features

### 🔐 Authentication
- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Logout functionality
- User-specific task ownership

### 📝 Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Complete / undo tasks
- Search tasks
- Filter tasks by All, Pending, and Completed

### 🎨 Frontend
- React + Vite
- React Router
- Axios
- Responsive UI
- Login and registration pages
- Dashboard
- Task cards
- Task form
- Search and filtering

### ⚙️ Backend
- Node.js
- Express.js
- REST API
- MongoDB + Mongoose
- JWT middleware
- bcrypt password hashing
- Protected routes
- User ownership
- Input validation
- CORS

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

**Deployment**
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 📁 Project Structure

```text
Task-Manager-Mern/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vercel.json
│
└── README.md
