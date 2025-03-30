
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import server from '../environment';

export default function ProgressChart({ onClose }) {
    const [chartData, setChartData] = useState([]);
    const [filterType, setFilterType] = useState('week'); 

    const chartRef = useRef(null);

    const filterTasks = (tasks, filterType) => {
        const currentDate = new Date();
        return tasks.filter(task => {
            const taskDate = new Date(task.createdAt);
            if (filterType === 'week') {
                const oneWeekAgo = new Date(currentDate);
                oneWeekAgo.setDate(currentDate.getDate() - 7);
                return taskDate >= oneWeekAgo && taskDate <= currentDate;
            } else if (filterType === 'month') {
                return taskDate.getMonth() === currentDate.getMonth() &&
                    taskDate.getFullYear() === currentDate.getFullYear();
            } else {
                return taskDate.toISOString().split('T')[0] === filterType; // For specific day
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server.prod}/api/tasks`, {
                    withCredentials: true
                });

                const tasks = filterTasks(response.data, filterType);

                const formattedData = tasks.map(task => ({
                    name: `${task.taskName} (Task: ${Math.floor(task.taskDuration / 60)} min, Break: ${Math.floor(task.breakTime / 60)} min)`,
                    value: task.taskDuration + task.breakTime,
                    taskDuration: task.taskDuration,
                    breakTime: task.breakTime
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, [filterType]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chartRef.current && !chartRef.current.contains(event.target)) {
                onClose(); // Close the chart
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const COLORS = ['#4CAF50', '#FF5722', '#03A9F4', '#FFC107', '#E91E63'];

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-10 bg-[rgba(0,0,0,0.6)]">
            <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-xl w-[990px]">
                <h3 className="text-2xl text-[#f23064] font-bold text-center mb-6">Student Progress</h3>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setFilterType('week')}
                        className={`py-2 px-4 rounded ${filterType === 'week' ? 'bg-[#f23064] text-white' : 'bg-gray-300'}`}
                    >
                        Weekly
                    </button>

                    <button
                        onClick={() => setFilterType('month')}
                        className={`py-2 px-4 rounded ${filterType === 'month' ? 'bg-[#f23064] text-white' : 'bg-gray-300'}`}
                    >
                        Monthly
                    </button>

                    <select
                        onChange={(e) => setFilterType(e.target.value)}
                        className="py-2 px-4 rounded bg-gray-300"
                    >
                        <option value="">Select Day</option>
                        {Array.from({ length: 30 }).map((_, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() - index);
                            return (
                                <option key={index} value={date.toISOString().split('T')[0]}>
                                    {date.toDateString()}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <PieChart className="text-xs" width={890} height={400}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name} - ${Math.floor(value / 60)} min`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value, name, props) => {
                            const { payload } = props;
                            return [
                                `Total Time: ${Math.floor(value / 60)} min`,
                                `Task Duration: ${Math.floor(payload.taskDuration / 60)} min`,
                                `Break Time: ${Math.floor(payload.breakTime / 60)} min`
                            ];
                        }}
                    />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
}

