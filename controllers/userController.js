const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// @route   POST /auth/register
// @desc    Register a new user
// @access  Public
exports.Register = async (req, res) => {
    const { username, password, role } = req.body;
    if (req.user.role !== "admin" && role === "admin") {
        return res.status(403).json({ message: "Only admins can create other admins" });
    }
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, password, role: role || "user" });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @route   POST /auth/login
// @desc    Login and get JWT token
// @access  Public
exports.Login= async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id,role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign(
            { userId: user._id ,role: user.role},
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" } 
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // HTTP-only cookie (secure)
            secure: process.env.NODE_ENV === "production", 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.RefreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const accessToken = jwt.sign(
            { userId: decoded.userId ,role: decoded.role},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

exports.getAllUsers = async (req, res) => {
    
    try {
        if (req.user.role == "admin" ) {
            
        const users = await User.find({}).select("-password"); // Exclude password field
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(users);}
        else{
        return res.status(403).json({ message: "Only admins can create other admins" });
                }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.Logout = (req, res) => {
    res.clearCookie("refreshToken"); // Clear the refresh token cookie
    res.status(200).json({ message: "Logged out successfully" });
};