const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');
const UserController = require('../controllers/userController');

// @route   POST /auth/register
// @desc    Register a new user
// @access  Public
router.post("/register",protect,UserController.Register);

// @route   POST /auth/login
// @desc    Login and get JWT token
// @access  Public
router.post("/login",protect,UserController.Login);
router.post("/refresh-token", UserController.RefreshToken);
router.get("admin/users",protect, UserController.getAllUsers); 
router.get("/logout", UserController.Logout); 
module.exports = router;
