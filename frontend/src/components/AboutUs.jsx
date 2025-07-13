
import { useRef } from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import {
    SiReact,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiJsonwebtokens,
} from "react-icons/si";

const team = [
    {
        name: "Suhana Chaudhary",
        role: "Full Stack Developer",
        image: "https://images.unsplash.com/photo-1635366898830-b5d48950e4f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpJTIwaW1hZ2UlMjBvZiUyMGNvcnBvcmF0ZSUyMHdvbWFufGVufDB8fDB8fHww",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Visionary behind FocusFlow, driving innovation and clarity in productivity tools."
    },
    {
        name: "Tanu Panwar",
        role: "Backend Engineer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ycG9yYXRlJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Designing intuitive user experiences that make study sessions a delight."
    },
    {
        name: "Vansh Kumar Garg",
        role: "Frontend Engineer",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Building intelligent features like text summarizer and personalized recommendations."
    },
    {
        name: "Suhana Chaudhary",
        role: "Full Stack Developer",
        image: "https://images.unsplash.com/photo-1635366898830-b5d48950e4f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpJTIwaW1hZ2UlMjBvZiUyMGNvcnBvcmF0ZSUyMHdvbWFufGVufDB8fDB8fHww",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Visionary behind FocusFlow, driving innovation and clarity in productivity tools."
    },
    {
        name: "Tanu Panwar",
        role: "Backend Engineer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ycG9yYXRlJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Designing intuitive user experiences that make study sessions a delight."
    },
    {
        name: "Vansh Kumar Garg",
        role: "Frontend Engineer",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        bio: "Building intelligent features like text summarizer and personalized recommendations."
    }
];

const AboutUs = () => {
    const sliderRef = useRef(null);
    const extendedTeam = [...team, ...team];

    return (
        <div className="min-h-screen bg-zinc-800 text-white px-6 md:px-1 py-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-[#f23064] mb-4 text-center animate-fade-in">
                    About FocusFlow
                </h1>
                <p className="text-lg mb-10 leading-relaxed text-gray-300 text-center animate-slide-up delay-200">
                    At FocusFlow, we believe that productivity is not just about discipline — it's about using the right tools.
                    Our mission is to help students and learners stay organized, focused, and stress-free by offering an all-in-one
                    platform for habit tracking, flashcards, pomodoro sessions, notes, and AI-powered text summarization.
                </p>

                <div className="bg-zinc-700 p-6 rounded-xl shadow-xl mb-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">
                    <h2 className="text-2xl font-semibold text-white mb-3 text-center">Our Vision</h2>
                    <p className="text-base text-gray-200 text-center">
                        To revolutionize how students manage their learning — blending simplicity with smart features, one click at a time.
                    </p>
                </div>


                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-4 text-center">Our Core Values</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300 text-sm">
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">📌 Simplicity – We make productivity tools easy to use.</li>
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">🔒 Privacy – Your data stays yours. Always.</li>
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">🚀 Innovation – Constantly evolving with smart features.</li>
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">💬 Feedback – We build what users need and ask for.</li>
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">🎯 Focus – Helping students stay on track and distraction-free.</li>
                        <li className="bg-zinc-700 p-4 rounded-md shadow hover:shadow-2xl hover:scale-[1.01] animate-fade-in delay-300">🤝 Community – Supporting a global learner network.</li>
                    </ul>
                </section>


                <section className="mt-20 text-center animate-fade-in">
                    <h2 className="text-3xl font-semibold text-white mb-6">Our Tech Stack</h2>
                    <p className="text-gray-400 mb-10">
                        FocusFlow is powered by modern, reliable, and scalable technologies.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 px-4 md:px-16 text-[#f23064] text-5xl">
                        <div className="flex flex-col items-center group animate-float">
                            <SiReact />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">React.js</p>
                        </div>
                        <div className="flex flex-col items-center group animate-float2">
                            <SiTailwindcss />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">Tailwind</p>
                        </div>
                        <div className="flex flex-col items-center group animate-float">
                            <SiNodedotjs />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">Node.js</p>
                        </div>
                        <div className="flex flex-col items-center group animate-float2">
                            <SiExpress />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">Express.js</p>
                        </div>
                        <div className="flex flex-col items-center group animate-float">
                            <SiMongodb />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">MongoDB</p>
                        </div>
                        <div className="flex flex-col items-center group animate-float2">
                            <SiJsonwebtokens />
                            <p className="text-sm text-white mt-2 group-hover:text-[#f23064]">JWT Auth</p>
                        </div>
                    </div>
                </section>


                <section className="py-16 px-2 md:px-20">
                    <h2 className="text-3xl text-center font-semibold text-white mb-10 animate-fade-in delay-400">
                        Meet Our Team
                    </h2>

                    <div
                        ref={sliderRef}
                        className="flex gap-10 w-[200%] animate-team-scroll md:px-6"
                        style={{ animation: "team-scroll 25s linear infinite" }}
                    >
                        {extendedTeam.map((member, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-72 bg-zinc-900 rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 hover:rotate-1 hover:scale-[1.03] transition-all duration-500 text-center group"
                            >
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#f23064] group-hover:border-white transition">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                <p className="text-sm text-[#f23064] mb-2">{member.role}</p>
                                <p className="text-xs text-gray-400 mb-4">{member.bio}</p>

                                <div className="flex justify-center gap-4 text-gray-400 group-hover:text-[#f23064] transition">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110">
                                        <FaLinkedin />
                                    </a>
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110">
                                        <FaTwitter />
                                    </a>
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <p className="text-center text-sm text-gray-400 mt-16 animate-fade-in delay-500">
                    Empowering student success, one feature at a time. 🚀
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
