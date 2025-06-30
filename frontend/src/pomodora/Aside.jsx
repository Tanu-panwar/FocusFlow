// Import React
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseURL from "../environment.js";
import './global.css';

function Aside({ setDarkMode, darkMode, tasks, setTasks }) {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [taskDuration, setTaskDuration] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const navigate = useNavigate();

    // Fetch tasks on component mount
    useEffect(() => {
        
        async function fetchTasks() {
            try {
                const response = await axios.get(`${baseURL}/api/tasks`, {
                    withCredentials: true
                });
        
                console.log("Fetched Tasks Data:", response.data); // Log for inspection
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error.response?.data || error.message);
            }
        }

        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newTask = {
            taskName,
            description,
            status,
            priority,
            taskDuration,
            breakTime
        };
    
        try {
            // Add new task
            await axios.post(`${baseURL}/api/tasks`, newTask, {
                
                withCredentials: true // Ensure credentials (cookies) are sent
            });
    
            // Fetch updated tasks
            const response = await axios.get(`${baseURL}/api/tasks`, {
                
                withCredentials: true
            });
    
            setTasks(response.data);
    
            alert("Task added successfully");
            navigate("/pomodora");
    
        } catch (err) {
            alert("Error while adding task: " + (err.response?.data?.message || err.message));
            console.error('Error:', err);
        }
    };

    return (

        <aside
            data-aos="fade-right"
            style={{ opacity: 1, transform:'translate3d(-10px,0,0)' }}
            className={`${darkMode ? "dark bg-zinc-700" : ""} bg-white shadow-2xl inset-shadow-2xs lg:mb-0 md:mb-4 py-4 px-5 rounded w-[100%] lg:w-[30%] md:w-[100%] sm:w-[100%]`}
        >
            <h2 className={`${darkMode ? "dark text-center text-white" : ""} text-center font-semibold mb-3 text-lg`}>
                Create new Task
            </h2>

            <div className="mb-2 name">
                <h3 className={`${darkMode ? "dark text-white" : ""} mb-1 font-semibold`}>Task Name</h3>
                <input
                    type="text"
                    placeholder='Task name...'
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className={`${darkMode ? "dark bg-zinc-700 text-white" : ""}
                        p-1 rounded-sm w-[100%] task_name outline-[#f23064] border-[#f23064] border-solid 
                         border-x-2 border-y-2 focus:outline-none`}
                />
            </div>

            <div className="mb-2">
                <h3 className={`${darkMode ? "dark text-white" : ""} mb-1 font-semibold`}>Description</h3>
                <textarea
                    type="text"
                    placeholder='Description here...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${darkMode ? "dark bg-zinc-700 text-white" : ""}
                    p-1 rounded-sm w-[100%] task_name outline-[#f23064] border-[#f23064] border-solid 
                     border-x-2 border-y-2 focus:outline-none`}
                />
            </div>

            <div className="mb-2">
                <label className="block text-white mb-2 font-semibold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${darkMode ? "dark bg-zinc-700 text-white" : ""}
                    p-1 rounded-sm w-[100%] task_name outline-[#f23064] border-[#f23064] border-solid 
                     border-x-2 border-y-2 focus:outline-none`}
                >
                    <option disabled value={""}>Choose A Status</option>
                    <option value="To Do">To Do</option>
                    <option value="Doing">Doing</option>
                </select>
            </div>

            <div className="mb-2">
                <label className="block text-white mb-2 font-semibold">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`${darkMode ? "dark bg-zinc-700 text-white" : ""}
                    p-1 rounded-sm w-[100%] task_name outline-[#f23064] border-[#f23064] border-solid 
                     border-x-2 border-y-2 focus:outline-none`}
                >
                    <option disabled value={""}>Choose A Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="create mt-3">
                <button
                    onClick={(e) => handleSubmit(e)}
                    className="create_task bg-[#f23064] hover:bg-[#f23064] w-[100%] text-white font-semibold rounded-sm p-2"
                >
                    Create
                </button>
            </div>
        </aside>
    );
}

export default Aside;
