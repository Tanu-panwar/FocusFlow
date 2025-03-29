
const express = require("express");
const { addTask, getTasks, updateTime, deleteTask } = require("../Controllers/TaskController");
const { userVerification } = require("../middleware"); // Ensure middleware is updated correctly

const router = express.Router();

router.post('/tasks', userVerification, addTask);   // Add a task
router.get('/tasks', userVerification, getTasks);   // Get all tasks
router.put('/tasks/:id', userVerification, updateTime);
router.delete('/tasks/:id', userVerification, deleteTask);

module.exports = router;
