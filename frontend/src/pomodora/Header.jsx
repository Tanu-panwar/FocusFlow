
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import avatarLogo from "../assets/avatar.png";
import ProgressChart from "./ProgressChart";


const Header = ({ setDarkMode, darkMode, searchQuery, setSearchQuery }) => {

    const [showProgressChart, setShowProgressChart] = useState(false);
    const chartRef = useRef(null);

    const handleProgressClick = () => {
        setShowProgressChart(!showProgressChart); // Toggle chart visibility
    };

    const handleCloseChart = () => {
        setShowProgressChart(false); // Close the chart
    };


    useEffect(() => {
        const savedMode = localStorage.getItem("displayMode") || "light";
        setDarkMode(savedMode === "dark");
    }, []);

    const handleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("displayMode", newMode ? "dark" : "light");
            return newMode;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chartRef.current && !chartRef.current.contains(event.target)) {
                handleCloseChart(); // Close chart when clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header
                className={`${darkMode ? "dark bg-zinc-700" : ""} 
    p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center 
    shadow-[0_-1px_6px_rgba(0,0,0,0.3)] bg-white gap-4 sm:gap-0`}
            >
                {/* Logo */}
                <div className="hidden sm:flex justify-center items-center w-full sm:w-auto">
                    <a href="#">
                        <p className="text-2xl font-bold text-[#f23064]">Pomodoro</p>
                    </a>
                </div>

                {/* Search & Progress */}
                <div className="w-full sm:w-[60%] flex flex-col sm:flex-row items-center justify-center gap-2">
                    <div className="flex w-full sm:w-[70%]">
                        <input
                            className={`${darkMode ? "dark text-white dark:bg-zinc-600" : ""}
          w-full border-[#f23064] rounded-l-sm border-2 h-10 pl-2 
          outline-none`}
                            type="text"
                            placeholder="Filter By Title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="w-auto px-3 h-10 bg-[#f24064] text-white font-semibold rounded-r-sm 
        hover:bg-[#f33064] transition"
                        >
                            Filter
                        </button>
                    </div>

                    <button
                        onClick={handleProgressClick}
                        className="w-full sm:w-auto px-4 h-10 bg-[#f24064] text-white font-semibold 
      rounded shadow hover:bg-[#f33064] transition"
                    >
                        Progress
                    </button>
                </div>

                {/* Dark Mode Toggle + Avatar */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <button
                        onClick={handleDarkMode}
                        className="w-10 h-10 rounded-full border-2 border-[#f24064] 
      hover:bg-gray-100 dark:hover:bg-zinc-600 flex items-center justify-center"
                    >
                        <FontAwesomeIcon
                            className="text-[#f23064]"
                            icon={darkMode ? faSun : faMoon}
                        />
                    </button>
                    <img
                        className="w-10 h-10 object-cover rounded-full border-2 border-[#f23064]"
                        src={avatarLogo}
                        alt="avatar"
                    />
                </div>
            </header>

            {/* Chart Modal */}
            {showProgressChart && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    w-[90%] max-w-[700px] bg-white shadow-lg rounded-md p-4 z-[50]">
                    <ProgressChart onClose={handleCloseChart} />
                </div>
            )}

        </>
    );
};

export default Header;
