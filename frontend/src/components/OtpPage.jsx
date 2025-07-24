
'use client';

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../environment";
export default function OtpPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [showVerifiedModal, setShowVerifiedModal] = useState(false);
    const [showResendModal, setShowResendModal] = useState(false);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {
        const code = otp.join("");
        if (code.length !== 6) {
            alert("Please enter the full 6-digit OTP.");
            return;
        }

        try {
            const response = await fetch(`${baseURL}/verifyEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });

            const data = await response.json();

            if (data.success) {
                setShowVerifiedModal(true);
                setTimeout(() => {
                    setShowVerifiedModal(false);
                    navigate("/login");
                }, 3000);
            } else {
                alert(data.message || "Verification failed!");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const email = typeof window !== "undefined" ? localStorage.getItem("email") : "";

    const handleResend = async () => {
        if (!email) {
            alert("Email not found. Please try again.");
            return;
        }

        try {
            const response = await fetch(`${baseURL}/resend-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                setShowResendModal(true);
                setTimeout(() => {
                    setShowResendModal(false);
                }, 3000);
            } else {
                alert(data.message || "Failed to resend OTP.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#2a2a2a]/60 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/20"
            >
                <h1 className="text-3xl font-extrabold text-white text-center mb-2">
                    OTP Verification
                </h1>
                <p className="text-center text-gray-400 text-sm mb-6">
                    We've sent a 6-digit verification code to your email: <br />
                    <span className="text-[#f23064] font-semibold">{email}</span>
                </p>
                <p className="text-center text-gray-400 text-sm mb-6">Your verification code expires in 10 minutes.</p>

                <div className="flex justify-between mb-6">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-12 h-12 rounded-xl text-xl font-bold text-center bg-[#1f1f1f] text-white border border-gray-500 focus:ring-2 focus:ring-[#f23064] outline-none transition-all"
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#f23064] hover:bg-[#ff4f7f] text-white py-2 rounded-xl font-medium text-lg transition-all"
                >
                    Verify OTP
                </button>

                <p className="text-center mt-4 text-sm text-gray-400">
                    Didn’t receive the code?{' '}
                    <button
                        onClick={handleResend}
                        className="text-[#f23064] font-semibold hover:underline"
                    >
                        Resend OTP
                    </button>
                </p>
            </motion.div>

            <AnimatePresence>
                {showVerifiedModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="bg-[#1f1f1f] text-white rounded-2xl shadow-xl max-w-md w-full p-6 relative text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">
                                ✅
                            </div>
                            <h2 className="text-xl font-semibold mb-2">OTP Verified!</h2>
                            <p className="text-gray-400 mb-4">Your email has been successfully verified.</p>
                            <button
                                onClick={() => setShowVerifiedModal(false)}
                                className="mt-4 px-5 py-2 rounded-lg bg-[#f23064] hover:bg-[#ff4f7f] text-white transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showResendModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="bg-[#1f1f1f] text-white rounded-2xl shadow-xl max-w-md w-full p-6 relative text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">
                                ✅
                            </div>
                            <h2 className="text-xl font-semibold">OTP resent to your email!</h2>
                            <p className="text-[#f23064] font-semibold mt-1">{email}</p>
                            <button
                                onClick={() => setShowResendModal(false)}
                                className="mt-4 px-5 py-2 rounded-lg bg-[#f23064] hover:bg-[#ff4f7f] text-white transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
