
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import avatarLogo from "../assets/avatar.png";
import ProgressChart from "./ProgressChart";

const Header = ({ setDarkMode, darkMode, searchQuery, setSearchQuery}) => {

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
                className={`${darkMode ? "dark bg-zinc-700" : ""} p-5 flex justify-between h-[80px] w-[100%] items-center shadow-[0_-1px_6px_rgba(0,0,0,0.3)] bg-white`}
            >
                <div className="logo lg:block md:block d-flex justify-center items-center lg:w-[15%] md:w-[15%] hidden">
                    <a href="#">
                        <p className="text-2xl font-bold text-[#f23064]">Pomodoro</p>
                    </a>
                </div>

                <div className="search flex justify-center items-center lg:w-[60%] w-[70%] h-[100%] md:w-[60%]">
                    <input
                        className={`${darkMode ? "dark text-white" : ""}
                    dark:bg-zinc-600 w-4/5 border-[#f23064] rounded-l-sm border-2 border-solid
                    rounded-none h-full pl-2 b2-slate-50 outline-none`}
                        type="text"
                        placeholder="Filter By Title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        
                    />
                    <button
                        className={`${darkMode ? "dark" : ""}
                    w-1/5 transition-all h-full font-semibold
                    rounded-r-sm bg-[#f24064] text-white hover:bg-[#f33064]`}
                        
                    >
                        Filter
                    </button>

                    <button onClick={handleProgressClick}
                        className={`${darkMode ? "dark" : ""}
                    w-1/5 transition-all ml-4 h-full font-semibold
                    rounded-r-sm bg-[#f24064] text-white hover:bg-[#f33064]`}
                        
                    >
                        Progress
                    </button>
                </div>

                <div className="account text-right flex justify-end lg:w-[15%] md:w-[15%] w-[30%]">
                    <button
                        onClick={handleDarkMode}
                        className={`${darkMode ? "dark hover:bg-zinc-600" : ""} mr-2 w-10 rounded-3xl
                    dark_mode border-2 border-[#f24064] hover:bg-gray-100`}
                    >
                        {darkMode ? (
                            <FontAwesomeIcon className="font-semibold text-[#f23064]" icon={faSun} />
                        ) : (
                            <FontAwesomeIcon className="font-semibold text-[#f23064]" icon={faMoon} />
                        )}
                    </button>
                    <img
                        className="w-10 cursor-pointer rounded-3xl border-2 border-[#f23064]"
                        src={avatarLogo}
                        alt=""
                    />
                </div>
            </header>
        {showProgressChart && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-[670px] bg-white shadow-lg rounded-md p-4 z-[1]">
                <ProgressChart onClose={handleCloseChart} />
            </div>
        )} 
    </>
    );
};

export default Header;
