# task-manager-backend
Add .env file And add this 
PORT=5000
DATABASE_URL=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h


Install and Set Up MongoDB Locally
Start Your Server
node server.js
Install Required Packages
npm install bcryptjs jsonwebtoken express-validator
The next step after securing routes with authentication middleware would be to handle token refresh and improve security and user experience. JWT tokens usually expire after a certain period (e.g., 1 hour), so users may be logged out unexpectedly. A common solution is to implement token refresh functionality using a refresh token.
