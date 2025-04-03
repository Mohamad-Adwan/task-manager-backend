// controllers/taskController.js
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

// @desc    Get all tasks
// @route   GET /tasks
// @access  Praivt user
// @access  Public admin
exports.getAllTasks = async (req, res) => {
    try {
        if (req.user.role == 'admin') { 
            const tasks = await Task.find();
            return res.json(tasks);
        }
        else{
        const tasks = await Task.find({user: req.user });
        res.json(tasks);}
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get all tasks fillter user
// @route   GET /tasks/filter
// @access  privte user
// @access  Public admin
exports.getFillterTasks = async (req, res) => {
    const { status } = req.query; 
    try {
        // Check if the user is an admin
        if (req.user.role == 'admin') {
            let filter = {};
        if (status) {
            filter.status = status; 
        }
        const tasks = await Task.find({filter });
        res.json(tasks);
        }
        else{
        let filter = {user: req.user};
        if (status) {
            filter.status = status; 
        }
        const tasks = await Task.find({filter });
        res.json(tasks);}
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Create a new task
// @route   POST /tasks
// @access  Private
exports.createTask = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            userId: req.user, // Add userId from the JWT
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Update an existing task
// @route   PUT /tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You can only delete your own tasks' });
        }

        // Delete the task
        await task.remove();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

