

import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // You can integrate with email service or backend here
        alert("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-zinc-800 text-white min-h-screen pt-12 px-6 md:px-20 py-10 animate-fadeIn">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[#f23064] mb-4">Contact Us</h1>
                <p className="text-gray-300 mb-8">
                    We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello — feel free to reach out.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#f23064]"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#f23064]"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#f23064]"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#f23064] text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
                    >
                        Send Message
                    </button>
                </form>

                <div className="text-center mt-12 text-sm text-gray-500">
                    Or email us directly at{" "}
                    <a href="mailto:support@focusflow.com" className="text-[#f23064] underline">
                        support@focusflow.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
