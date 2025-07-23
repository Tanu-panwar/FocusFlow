
import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="bg-zinc-800 text-white min-h-screen pt-12 px-6 md:px-20 py-10 animate-fadeIn">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl text-center font-bold text-[#f23064] mb-4">Terms & Conditions</h1>
                <p className="text-gray-300 mb-8 text-[16px]">
                    These terms and conditions outline the rules and regulations for the use of FocusFlow's platform.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
                    <p className="text-gray-400 text-[16px]">
                        By accessing or using FocusFlow, you agree to be bound by these terms. If you disagree with any part, please discontinue use of the platform.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">2. User Responsibilities</h2>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2 text-[16px]">
                        <li>You must provide accurate and current information when registering.</li>
                        <li>You are responsible for maintaining the confidentiality of your account.</li>
                        <li>Do not use the platform for illegal activities or to disrupt services.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">3. Intellectual Property</h2>
                    <p className="text-gray-400 text-[16px]">
                        All content, trademarks, and data on FocusFlow are the intellectual property of FocusFlow or its licensors and may not be reused without permission.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">4. Limitation of Liability</h2>
                    <p className="text-gray-400 text-[16px]">
                        FocusFlow is not liable for any direct or indirect damages arising from the use or inability to use the platform.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">5. Modifications</h2>
                    <p className="text-gray-400 text-[16px]">
                        We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated terms.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-2">6. Contact Us</h2>
                    <p className="text-gray-400 text-[16px]">
                        If you have any questions about these terms, feel free to contact us at <a className="text-[#f23064] underline" href="mailto:support@focusflow.com">support@focusflow.com</a>.
                    </p>
                </section>

                <div className="text-center mt-10">
                    <p className="text-xl text-gray-500">© {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
