import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="bg-zinc-800 text-white min-h-screen pt-12 px-6 md:px-20 py-10 animate-fadeIn">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl text-center font-bold text-[#f23064] mb-4">Privacy Policy</h1>
                <p className="text-gray-300 mb-8">
                    Your privacy is important to us. This Privacy Policy outlines how FocusFlow collects, uses, and protects your information.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                        <li>Email address for login or newsletter subscriptions.</li>
                        <li>User progress data like notes, flashcards, habits, and study sessions.</li>
                        <li>Anonymous usage statistics to improve features.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">2. How We Use Your Data</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                        <li>To personalize your FocusFlow dashboard experience.</li>
                        <li>To send productivity tips and updates if subscribed.</li>
                        <li>To improve feature performance and security.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">3. Data Sharing & Protection</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                        <li>We do not sell or share your data with third parties.</li>
                        <li>Your data is encrypted and stored securely.</li>
                        <li>You can request to delete your account at any time.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">4. Cookies & Local Storage</h2>
                    <p className="text-gray-400">
                        We use local storage to remember your preferences and session states. No sensitive information is stored in cookies.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">5. Changes to this Policy</h2>
                    <p className="text-gray-400">
                        We may update this policy occasionally. You’ll be notified of significant changes via in-app message or email.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-2">6. Contact Us</h2>
                    <p className="text-gray-400">
                        Have questions? Reach out at <a className="text-[#f23064] underline" href="mailto:support@focusflow.com">support@focusflow.com</a>
                    </p>
                </section>

                <div className="text-center mt-10">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
