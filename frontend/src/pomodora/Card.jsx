
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import server from "../environment";

export default function Card({
    task,
    darkMode,
    setTasks,
    tasks,
    taskStarted,
    setTaskStarted,
    setTaskStartTime,
    setTimeLeft,
    customTime = 25,
    startTimer,
    classNameOdTaskStarted,
}) {

    const taskId = task._id; 

    const [elapsedTime, setElapsedTime] = useState(null);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = async () => {
        const startTime = Date.now();
        setTaskStarted(taskId);
        setTaskStartTime(startTime);
        setTimeLeft(customTime * 60);

        try {
            await axios.put(`${server.prod}/api/tasks/${taskId}`, {
                status: "Doing",
                taskStartTime: startTime
            },{
                withCredentials: true // Add this to send cookies for authentication
            });

            console.log("Task started successfully in MongoDB");

            const updatedTasks = tasks.map(t =>
                t._id === taskId ? { ...t, status: "Doing", taskStartTime: startTime } : t
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error starting task:", error);
        }
    };

    const handleDone = async () => {
        const endTime = Date.now();

        if (!taskStarted) {
            console.error("Error: Task start time is missing.");
            return;
        }

        const totalTaskTimeSpent = Math.floor((endTime - taskStarted) / 1000);
        setElapsedTime(formatTime(totalTaskTimeSpent));

        try {
            await axios.put(`${server.prod}/api/tasks/${taskId}`, {
                status: "Done",
                taskDuration: totalTaskTimeSpent
            }
            , {
                withCredentials: true
            });

            console.log("Task marked as 'Done' successfully");

            const updatedTasks = tasks.map(t =>
                t._id === taskId ? { ...t, status: "Done", taskDuration: totalTaskTimeSpent } : t
            );
            setTasks(updatedTasks);

            setTaskStarted(null);
            setTaskStartTime(null);
            setTimeLeft(0);
        } catch (error) {
            console.error("Error marking task as done:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${server.prod}/api/tasks/${taskId}`, {
                withCredentials: true
            });

            console.log("Task deleted successfully from MongoDB");

            const updatedTasks = tasks.filter((t) => t._id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div
            className={`${
                darkMode ? "dark bg-zinc-800" : ""
            } ${classNameOdTaskStarted} card bg-gray-100 p-2 rounded-sm lg:col-span-3
            md:col-span-3 sm:col-span-6 col-span-6`}
            id={taskId}
            data-aos="flip-up"
        >
            <div className={` ${darkMode ? "dark" : ""} task_info flex justify-between`}>
                <h3 className={`${darkMode ? "dark text-white" : ""} font-semibold`}>
                    {task.taskName}
                </h3>
            </div>
            <p className={`${darkMode ? "dark text-white" : ""} description mb-2 text-sm`}>
                {task.description}
            </p>
            <div className="pro_status flex gap-2 mb-1">
                <button className="rounded text-rose-600 italic underline font-semibold text-sm">{task.status}</button>
                <button className="rounded text-rose-600 italic underline font-semibold text-sm">{task.priority}</button>
            </div>
            <hr />
            <div className="btns mt-3">
                <button
                    onClick={handleStart}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold py-1 px-2 rounded"
                >
                    Start
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 mx-2 text-white text-sm font-bold py-1 px-2 rounded"
                >
                    Delete
                </button>
                <button
                    onClick={handleDone}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

