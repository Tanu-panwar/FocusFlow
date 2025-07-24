
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "Task name is required"],
    },
    description: {
        type: String,
        required: [true, "Task description is required"],
    },
    status: {
        type: String,
        enum: ["To Do", "Doing"],
        default: "Pending",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    taskDuration: {
        type: Number,
        default: 0,
    },
    breakTime: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Reference to the `User` model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    timestamp: { type: String, default: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }
});

module.exports = mongoose.model("Task", taskSchema);
