
import React from "react";
import { FaBrain, FaClock, FaClipboardList, FaLayerGroup, FaBookOpen, FaBolt } from "react-icons/fa";
import TestimonialSection from "./TestimonialSection";

const WhyFocusFlow = () => {
    return (
        <div className="min-h-screen bg-zinc-800 text-white px-6 py-16 md:px-24">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-[#f23064] text-center mb-6 animate-fade-in">
                    Why Choose FocusFlow?
                </h1>

                <p className="text-center text-gray-300 text-lg mb-12 animate-slide-up">
                    In a world full of distractions, FocusFlow is your digital partner to reclaim attention, improve learning,
                    and stay on top of your goals — all in one place.
                </p>

                {/* Section: Problems we solve */}
                <div className="bg-zinc-700 p-6 rounded-xl shadow-lg mb-12 animate-fade-in">
                    <h2 className="text-2xl font-semibold text-white mb-4 text-center">The Problem</h2>
                    <p className="text-gray-300 text-center">
                        Students and learners often struggle with managing study time, remembering concepts, and staying consistent.
                        Most productivity tools are isolated and don’t work together — that’s where FocusFlow comes in.
                    </p>
                </div>

                {/* Section: Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center animate-fade-in delay-300">
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaBrain className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">Smart Flashcards</h3>
                        <p className="text-gray-400">Memorize concepts faster with interactive and spaced-repetition flashcards.</p>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaClock className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">Pomodoro Sessions</h3>
                        <p className="text-gray-400">Stay focused with custom task timers, breaks, and productivity tracking.</p>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaClipboardList className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">Habit Tracker</h3>
                        <p className="text-gray-400">Build daily routines and track habits that lead to success, day by day.</p>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaBookOpen className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">Organized Notes</h3>
                        <p className="text-gray-400">Keep all your key points and study material in one place — clean and searchable.</p>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaBolt className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">Text Summarizer</h3>
                        <p className="text-gray-400">Get the gist of long articles instantly using our built-in AI summarization tool.</p>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-6 shadow-md hover:shadow-xl transition hover:scale-105">
                        <FaLayerGroup className="text-4xl mx-auto mb-3 text-[#f23064]" />
                        <h3 className="text-xl font-semibold mb-2">All-in-One</h3>
                        <p className="text-gray-400">No need for 5 different apps. FocusFlow brings everything into one seamless dashboard.</p>
                    </div>
                </div>

                <TestimonialSection />

                {/* Section: CTA */}
                <div className="text-center mt-20 animate-slide-up delay-500">
                    <h3 className="text-2xl font-semibold mb-3">Ready to Supercharge Your Study Life?</h3>
                    <p className="text-gray-400 mb-6">Join thousands of learners using FocusFlow to achieve academic excellence.</p>
                    <a
                        href="/signup"
                        className="inline-block px-6 py-3 bg-[#f23064] text-white font-semibold rounded-md hover:bg-white hover:text-black transition"
                    >
                        Get Started Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WhyFocusFlow;
