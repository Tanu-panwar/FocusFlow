
// ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import baseURL from "./environment";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                `${baseURL}/forgetPassword`,
                { email, password, confirmPassword },
                { withCredentials: true }
            );

            const { success, message } = response.data;

            if (success || response.status === 200) {
                toast.success(message || 'Password reset successfully!');
                navigate("/login");
            } else {
                toast.error(message || 'Something went wrong.');
            }
        } catch (err) {
            console.error('Reset error:', err);
            toast.error(err.response?.data?.message || 'Server error. Please try again.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4"
        >
            <div className="w-full max-w-md rounded-2xl bg-[#262626] p-8 shadow-lg">
                <h2 className="mb-6 text-center text-3xl font-semibold text-white">
                    🔐 Forgot Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[16px] font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            name="email"
                            className="mt-1 w-full rounded-md border border-gray-600 bg-[#1a1a1a] p-2 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-medium text-gray-300">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            name="password"
                            className="mt-1 w-full rounded-md border border-gray-600 bg-[#1a1a1a] p-2 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[16px] font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            name="confirmPassword"
                            className="mt-1 w-full rounded-md border border-gray-600 bg-[#1a1a1a] p-2 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#f23064] py-2 font-semibold text-white"
                    >
                        Reset Password
                    </button>
                </form>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
            </div>
        </motion.div>
    );
}
