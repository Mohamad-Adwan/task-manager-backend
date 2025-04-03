const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const protect = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController"); 
const validateTask = require("../middlewares/taskValidation"); 

// @route   GET /tasks
// @desc    Get all tasks
// @access  Public
router.get("/",protect, taskController.getAllTasks);
router.get("/filter",protect, taskController.getFillterTasks);

// Admin-only route
// @route   POST /tasks
// @desc    Create a new task
// @access  Private (Requires Authentication)
router.post("/", protect, validateTask, taskController.createTask);

// @route   PUT /tasks/:id
// @desc    Update an existing task
// @access  Private (Requires Authentication)
router.put("/:id", protect, validateTask, taskController.updateTask);

// @route   DELETE /tasks/:id
// @desc    Delete a task
// @access  Private (Requires Authentication)
router.delete("/:id", protect, taskController.deleteTask);

module.exports = router;
