
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

module.exports.addTask = async (req, res,next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const newTask = new Task({ 
            ...req.body, 
            userId: decoded.id  
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully" });
        next();
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ status: false, message: "Failed to create task" });
    }
};

exports.getTasks = async (req, res) => {
    const token = req.cookies.token;
    console.log("in task get page token is :",token);
    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const tasks = await Task.find({ userId: decoded.id }); // 🔥 Filter by userId
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ status: false, message: "Failed to fetch tasks" });
    }
};

module.exports.updateTime = async (req, res) => {
    const { taskDuration = 0, breakTime = 0 } = req.body;  // Default values to avoid undefined

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Ensure values are initialized in the database
        task.taskDuration = (task.taskDuration || 0) + taskDuration;
        task.breakTime = (task.breakTime || 0) + breakTime;

        await task.save();
        res.status(200).json({ message: "Time updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task." });
    }
};

module.exports.deleteTask=async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting task" });
    }
};
