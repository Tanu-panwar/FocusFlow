
import React, { useState } from "react";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);

    const isFeedback = (text) => {
        const feedbackKeywords = [
            "not working",
            "error",
            "issue",
            "problem",
            "feedback",
            "improve",
            "suggestion",
            "rating",
            "bug",
            "crash"
        ];
        return feedbackKeywords.some((word) =>
            text.toLowerCase().includes(word)
        );
    };

    const getBotResponse = (userInput) => {
        const text = userInput.toLowerCase();

        if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
            return "👋 Hey there! How can I help you today?";
        }
        if (text.includes("reset password") || text.includes("forgot password")) {
            return "🔐 You can reset your password by clicking on 'Forgot Password' on the login page.";
        }

        if (text.includes("create account") || text.includes("sign up")) {
            return "📝 You can create a new account by clicking on the 'Sign Up' button at the top right corner.";
        }

        if (text.includes("thank") || text.includes("thanks")) {
            return "😊 You're welcome! Let me know if there's anything else I can assist you with.";
        }
        if (text.includes("pomodoro") || text.includes("timer")) {
            return "🕒 The Pomodoro timer helps you focus by working in 25-minute sessions followed by 5-minute breaks.";
        }
        if (text.includes("flashcard") && text.includes("edit")) {
            return "📝 Yes, you can edit or delete flashcards anytime from the Flashcards section.";
        }
        if (text.includes("progress") || text.includes("track")) {
            return "📈 Your progress is shown through pie charts based on your daily task durations and breaks.";
        }
        if (text.includes("habit") && (text.includes("reset") || text.includes("change"))) {
            return "🔁 You can reset or update habits from the 'Habits' page by clicking the edit icon.";
        }
        if (text.includes("note") && text.includes("add")) {
            return "🗒️ You can add a new note from the Notes tab by clicking the '+ Add Note' button.";
        }
        if (text.includes("skip") && text.includes("task")) {
            return "✅ It's okay to skip a task! Just try to stay consistent. Missed tasks are shown in the summary.";

        } else if (text.includes("privacy policy")) {
            return "🔐 You can review our Privacy Policy on the bottom of the homepage. We ensure all your data is secure.";
        } else if (text.includes("terms") || text.includes("conditions")) {
            return "📜 Our Terms & Conditions are available in the footer. They cover your rights and usage guidelines.";
        } else if (text.includes("about")) {
            return "👤 FocusFlow is a productivity platform designed to help students stay organized using Pomodoro, notes, flashcards, and habit tracking.";
        } else if (text.includes("contact") || text.includes("support") || text.includes("help")) {
            return "📬 You can reach us via the contact form below or email us directly at support@focusflow.com.";
        }
        return "🤖 Sorry, I didn't get that. Could you rephrase or try another question?";
    };


    const handleUserMessage = () => {
        if (!message.trim()) return;

        if (isFeedback(message)) {
            setShowForm(true);
        } else {
            const botReply = getBotResponse(message);
            setResponses((prev) => [...prev, { user: message, bot: botReply }]);
        }

        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/suhanachaudhary212@gmail.com",
                {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: formData,
                }
            );

            const result = await response.json();
            if (result.success === "true") {
                setIsSubmitted(true);
            } else {
                alert("There was an error. Please try again.");
            }
        } catch (err) {
            console.error("Form error:", err);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    // Reset state when reopening
                    setShowForm(false);
                    setIsSubmitted(false);
                    setMessage("");
                    setResponses([]);
                }}
                className={`fixed bottom-5 right-5 text-3xl rounded-full p-4 h-[70px] w-[70px] shadow-lg z-50 transition-colors duration-300 ${isOpen ? "bg-gray-300 text-white" : "bg-[#f23064] text-white"
                    }`}
            >
                {isOpen ? "❌" : "✉️"}
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-5 w-full max-w-[90%] sm:max-w-[400px] h-[80vh] overflow-y-auto bg-white border rounded shadow-lg z-50">
                    <div className="bg-[#f23064] text-xl h-[90px] text-center text-white p-4 font-semibold rounded-t pt-8">
                        FocusFlow
                    </div>

                    <div className="p-4">
                        {!showForm ? (
                            <div className="space-y-4">
                                <div className="bg-blue-100 text-sm text-gray-800 p-2 rounded">
                                    👋 Hi! Ask me anything, or share feedback!
                                </div>

                                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                    {responses.map((res, idx) => (
                                        <div key={idx}>
                                            <div className="text-right text-sm bg-gray-100 p-2 rounded mb-1">
                                                {res.user}
                                            </div>
                                            <div className="text-left text-sm bg-blue-100 p-2 rounded">
                                                {res.bot}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-gray-100 p-2 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleUserMessage}
                                        className="bg-[#f23064] text-white px-3 py-2 rounded"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        ) : !isSubmitted ? (
                            <>
                                <div className="bg-yellow-100 text-sm text-gray-800 p-2 rounded mb-3">
                                    📩 Please share your feedback!
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        className="w-full bg-gray-100 p-2 pt-3 pb-3 mb-4"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email*"
                                        required
                                        className="w-full bg-gray-100 p-2 pt-3 pb-3 mb-4"
                                    />
                                    <textarea
                                        name="message"
                                        placeholder="Your feedback*"
                                        required
                                        rows="3"
                                        className="w-full bg-gray-100 p-2 pt-3 pb-3 mb-4"
                                    ></textarea>

                                    <div className="flex items-start gap-2 mb-3">
                                        <input
                                            type="checkbox"
                                            name="sign"
                                            id="sign"
                                            required
                                            className="mt-1"
                                        />
                                        <label htmlFor="sign" className="text-sm text-gray-700">
                                            Sign up to receive updates and announcements.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-[#f23064] text-white px-4 py-2 rounded w-full"
                                    >
                                        Send Feedback
                                    </button>
                                </form>
                                <p className="text-gray-700 text-center text-sm mt-6 mb-4">
                                    This site is protected by reCAPTCHA and the Google{" "}
                                    <span className="text-pink-500">Privacy Policy</span> and{" "}
                                    <span className="text-pink-500">Terms of Service</span> apply.
                                </p>
                            </>
                        ) : (
                            <div className="text-center h-[80vh] text-gray-800">
                                <div className="text-4xl text-blue-500 mb-3 mt-[50px]">✔️</div>
                                <p className="text-[#f23064] text-2xl font-medium mb-3 mt-6">
                                    Thanks for the feedback. We'll look into it.
                                </p>
                                <div className="bg-gray-100 p-3 m-10 text-xl rounded">
                                    We've sent you a confirmation email, please verify your address.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;


