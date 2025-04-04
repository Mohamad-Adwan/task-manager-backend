# task-manager-backend
# 📝 Task Manager Backend API

A simple and secure **Task Manager** RESTful API built with **Node.js**, **Express**, and **MongoDB**.  
This API allows users to **register**, **login**, and **manage their personal tasks** — including creating, updating, filtering, and deleting tasks. Admins can manage all tasks.

---

## 📌 Features

- User **authentication** using JWT
- **Role-based access control** (user vs admin)
- CRUD operations on tasks:
  - Create a task
  - Read all tasks (with optional filter by status)
  - Update a task
  - Delete a task
- Validation using `express-validator`
- MongoDB schema using Mongoose

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- dotenv
- express-validator

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Postman](https://www.postman.com/) or any API testing tool

---

### Installation

```bash
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend
npm install
---
## Note Add .env File
Add .env file And add this 
PORT=5000
DATABASE_URL=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h



