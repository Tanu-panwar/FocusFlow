import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';

import TextSummarize from './textSummarize/TextSummarize';

import HabitDashboard from "./components/HabitDashboard";
import "./pomodora/global.css";

import Navbar from "./components/Navbar";

import Note from "./pages/Home/Note";
import Section from "./pomodora/Section";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/habits" element={<HabitDashboard/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Note />} />
        <Route path="/pomodora" element={<Section setDarkMode={setDarkMode} darkMode={darkMode}/>} />
        <Route path="/text" element={<TextSummarize />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
