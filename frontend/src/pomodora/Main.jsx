
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import pomodoroVoice from '../assets/my_app_src_assests_pomodoro_voice.mp3';
import Card from "./Card";

export default function Main({ darkMode, tasks, setTasks, searchQuery }) {
    const [taskStarted, setTaskStarted] = useState(-1);
    const [taskStartTime, setTaskStartTime] = useState(null); // Added this
    const [timeLeft, setTimeLeft] = useState(1500);
    const [showClock, setShowClock] = useState(false);
    const [customTime, setCustomTime] = useState(25);
    const [filteredTasks, setFilteredTasks] = useState(tasks);


    const taskTimerRef = useRef(null);  
    const breakTimerRef = useRef(null);

    const playPomodoroVoice = () => {
        const audio = new Audio(pomodoroVoice);
        audio.play().catch((err) => console.error("Audio play error:", err));
    };

    useEffect(() => {
        const filtered = tasks.filter((task) =>
            task.taskName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [tasks, searchQuery]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("https://focusflowbackend.onrender.com/api/tasks", {
                    withCredentials: true
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const startTimer = async (duration, taskId) => {
        if (taskId === -1) {
            console.error("Error: No task selected to start the timer.");
            return;
        }

        setShowClock(false);
        setTimeLeft(duration * 60);
        setTaskStarted(taskId);
        setTaskStartTime(Date.now()); // Track start time here
        localStorage.setItem("idOfTaskStarted", taskId); // Added to track taskStarted

        if (taskTimerRef.current) clearInterval(taskTimerRef.current);

        taskTimerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(taskTimerRef.current);
                    setTaskStartTime(null);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleBreak = async (minutes) => {
        if (taskStarted === -1) {
            console.error("Error: No task selected for break.");
            return;
        }

        setShowClock(false);
        setTimeLeft(minutes * 60);
        setTaskStartTime(Date.now());

        if (breakTimerRef.current) clearInterval(breakTimerRef.current);

        breakTimerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(breakTimerRef.current);
                    axios.put(`https://focusflowbackend.onrender.com/api/tasks/${taskStarted}`, {
                        breakTime: minutes * 60,
                        taskDuration: Math.floor((Date.now() - taskStartTime) / 1000)  
                    }, {
                        withCredentials: true  // Added this to send cookies for authentication
                    })
                    .then(() => console.log("Break time updated successfully"))
                    .catch((error) => console.error("Error updating break time:", error));

                    setTaskStartTime(null);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(taskTimerRef.current);
            clearInterval(breakTimerRef.current);
        };
    }, []);

    const formatTime = (seconds) => {
        if (seconds <= 0) {
            return `🎉 Congrats 🎉`;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `Timer: ${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const handleRefresh = () => {
        setShowClock(true);
    };

    // Filter Handlers
    const handleAllTasks = () => {
        setFilteredTasks(tasks);
    };

    const handleToDo = () => {
        setFilteredTasks(tasks.filter(task => task.status === "To Do"));
    };

    const handleDoing = () => {
        const doingTasks = tasks.filter(task => task.status === "Doing");
        setFilteredTasks(doingTasks);

        if (doingTasks.length > 0) {
            playPomodoroVoice();
        }
    };


    return (
        <main className={`${darkMode ? "dark bg-zinc-700" : ""} bg-white shadow-xl py-4 px-5 rounded w-[100%]`}>
           <div className="flex justify-between items-center mb-2 relative">
                <h2 className={`${darkMode ? "dark text-white" : ""} font-semibold text-2xl mb-5`}>Today’s Tasks</h2>
                {Number(taskStarted) !== -1 && (
                    <div className="relative">
                        <p className="bg-green-500 py-1 px-1.5 rounded-sm font-semibold text-zinc-800">
                            {formatTime(timeLeft)}
                            <button onClick={handleRefresh} className="bg-white text-zinc-700 ml-2 py-1 px-2 rounded-sm">
                                <FontAwesomeIcon icon={faRotate} />
                            </button>
                        </p>
                        {showClock && (
                            <div className="absolute right-0 bottom-[-120px] w-60 bg-gray-100 p-4 rounded-lg shadow-lg z-10">
                                <h3 className="text-lg font-semibold mb-2">Set Timer</h3>
                                <input
                                    type="number"
                                    value={customTime}
                                    onChange={(e) => setCustomTime(Number(e.target.value))}
                                    className="w-full mb-2 p-1 border rounded"
                                />
                                <button onClick={() => startTimer(customTime,taskStarted)} className="w-full bg-blue-500 text-white py-1 rounded mb-1">
                                    Start
                                </button>
                                <button onClick={() => handleBreak(5)} className="w-full bg-green-500 text-white py-1 rounded mb-1">
                                    5 min Break
                                </button>
                                <button onClick={() => handleBreak(30)} className="w-full bg-red-500 text-white py-1 rounded">
                                    30 min Break
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ul className="grid grid-cols-6 w-[100%] py-1 navigation mb-5 rounded-lg">
            <button
                onClick={handleAllTasks}
                className={`${darkMode ? "dark hover:bg-[#f23064]" : ""} main_btn active col-span-2 text-center font-semibold rounded-sm py-2 px-4 text-sm transition-all text-sky-600 hover:bg-gray-200`}
            >
                All tasks
            </button>
            <button
                onClick={handleToDo}
                className={`${darkMode ? "dark hover:bg-zinc-600" : ""} main_btn col-span-2 ml-2 text-center font-semibold hover:bg-gray-200 rounded-sm text-[#f23064] py-2 px-4 text-sm transition-all`}
            >
                To Do
            </button>
            <button
                onClick={handleDoing}
                className={`${darkMode ? "dark hover:bg-zinc-600" : ""} main_btn col-span-2 ml-2 text-center font-semibold hover:bg-gray-200 rounded-sm text-[#f23064] py-2 px-4 text-sm transition-all`}
            >
                Doing
            </button>
            </ul>

            <div className="cards grid grid-cols-6 gap-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <Card
                            key={task._id}
                            task={task}
                            taskStarted={taskStarted}
                            setTaskStarted={setTaskStarted}
                            setTaskStartTime={setTaskStartTime}
                            startTimer={startTimer}
                            setTimeLeft={setTimeLeft}
                            tasks={tasks}
                            setTasks={setTasks}
                            darkMode={darkMode}
                            customTime={customTime}
                            classNameOdTaskStarted={
                                index === Number(localStorage.getItem("idOfTaskStarted")) ? "taskStarted" : ""
                            }
                        />
                    ))
                ) : (
                    <div className="flex justify-center min-w-screen items-center">
                        <p className={`${darkMode ? "dark text-zinc-400" : ""} text-center font-semibold text-xl mb-5 mt-10 mx-auto`}>No matching tasks found.</p>
                  </div>
                  
            )}
            </div>
        </main>
    );
}
