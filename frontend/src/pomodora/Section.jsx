
// Import Essentiel Component
import React, { useState } from "react";
import Aside from './Aside';
import "./global.css";
import Header from './Header';
import Main from './Main';

export default function Section({setDarkMode, darkMode}) {
  const [tasks, setTasks] = useState([]);
      const [searchQuery, setSearchQuery] = useState(""); // Add search state

  return (

    <div>
      <Header setDarkMode={setDarkMode} darkMode={darkMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery} ></Header>

      <section className={`${darkMode ? "dark bg-zinc-800": "light"} justify-between flex flex-col md:flex-col 
      lg:flex-row sm:flex-col light:bg-gray-200 p-5 gap-5`}>
          <Aside setDarkMode={setDarkMode} darkMode={darkMode} tasks={tasks} setTasks={setTasks}></Aside>
          <Main setDarkMode={setDarkMode} darkMode={darkMode} tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} ></Main>
      </section>
    </div>
  );
}

