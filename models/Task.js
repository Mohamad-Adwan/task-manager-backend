const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed"], // Only these values are allowed
        default: "pending" // Default status is 'pending'
    },
    createdAt:{
        type:Date,
        default :Date.now,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
}, { timestamps: true });   
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
