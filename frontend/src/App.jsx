
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import ContactUs from "./components/ContactUs"

import TextSummarize from './textSummarize/TextSummarize';

import HabitDashboard from "./components/HabitDashboard";
import "./pomodora/global.css";

import Navbar from "./components/Navbar";

import FlashApp from "./FlashApp";
import Note from "./pages/Home/Note";
import Section from "./pomodora/Section";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import AboutUs from "./components/AboutUs";
import WhyFocusFlow from "./components/WhyFocusFlow";
import ScrollLink from "./ScrollLink";
import OtpPage from "./components/OtpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Navbar />
      <ScrollLink />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcard/*" element={<FlashApp />} />
        <Route path="/habits" element={<HabitDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgetPassword" element={<ForgotPasswordPage />} />
        <Route path="/notes" element={<Note />} />
        <Route path="/pomodora" element={<Section setDarkMode={setDarkMode} darkMode={darkMode} />} />
        <Route path="/text" element={<TextSummarize />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/why-focusflow" element={<WhyFocusFlow />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
