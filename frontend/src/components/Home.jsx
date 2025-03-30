
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import server from "../environment";

import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import banner from "../assets/banner.png";
import education from "../assets/education.png";
import HeroPng from "../assets/hero.png";

export const FadeUp = (delay) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, duration: 0.5, delay },
  },
});

function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const { data } = await axios.post(
          `${server.prod}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (data.status) {
          setUsername(data.user);
          toast.success(`Hello ${data.user}`, { position: "top-right" });
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="bg-zinc-800 px-5">
      <h2 className="mb-3 py-3 text-[#f23064] text-center text-2xl">
        <i>Welcome <span>{username}</span></i>
      </h2>

      {/* Hero Section */}
      <section className="bg-light px-5 overflow-hidden relative min-h-[60vh] flex items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Brand Info */}
          <div className="order-2 md:order-1 flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl text-white lg:text-5xl font-bold !leading-snug"
            >
              Build <span className="text-[#f23064]">Better Habits</span> and Stay Focused!
            </motion.h1>
            <motion.p variants={FadeUp(0.8)} initial="initial" animate="animate" className="text-gray-300">
              Track your daily habits and improve your productivity with our easy-to-use habit tracker.
            </motion.p>
            <motion.div variants={FadeUp(1.0)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
              <Link to="/habits" className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src={HeroPng}
              alt="Habit Tracker Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
            />
          </div>
        </div>
      </section>

      <div className="border-t-1 border-[#f23064] my-5 mx-5 shadow-lg"></div>

      {/* Notes Section */}
      <section className="bg-light px-5 overflow-hidden relative min-h-[70vh] flex items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-1 flex justify-center items-center">
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src={banner}
              alt="Notes Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
            />
          </div>

          <div className="order-2 flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1 variants={FadeUp(0.6)} initial="initial" animate="animate" className="text-3xl text-white lg:text-5xl font-bold !leading-snug">
              Organize Your <span className="text-[#f23064]">Notes</span> Effectively!
            </motion.h1>
            <motion.p variants={FadeUp(0.8)} initial="initial" animate="animate" className="text-gray-300">
              Capture, organize, and access your notes anytime, anywhere. Keep your ideas and important information at your fingertips.
            </motion.p>
            <motion.div variants={FadeUp(1.0)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
              <Link to="/notes" className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-t-1 border-[#f23064] my-5 mx-5 shadow-lg"></div>

      {/* Pomodoro Section */}
      <section className="bg-light px-5 overflow-hidden relative min-h-[70vh] flex items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1 variants={FadeUp(0.6)} initial="initial" animate="animate" className="text-3xl text-white lg:text-5xl font-bold !leading-snug">
              Boost Your <span className="text-[#f23064]">Productivity</span> with Pomodoro!
            </motion.h1>
            <motion.p variants={FadeUp(0.8)} initial="initial" animate="animate" className="text-gray-300">
              Stay focused and manage your time effectively using the Pomodoro technique. Work smarter with structured sessions and breaks.
            </motion.p>
            <motion.div variants={FadeUp(1.0)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
              <Link to="/pomodora" className="primary-btn mb-2 bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </Link>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 flex justify-center items-center">
            <motion.img
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src={education}
              alt="Pomodoro Timer Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
            />
          </div>
        </div>
      </section>

      <div className="border-t-1 border-[#f23064] my-5 mx-5 shadow-lg"></div>

      {/* Flashcards Section */}
      <section className="bg-light px-5 overflow-hidden relative min-h-[70vh] flex items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-1 flex justify-center items-center">
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src={banner}
              alt="Flashcards Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
            />
          </div>

          <div className="order-2 flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1 variants={FadeUp(0.6)} initial="initial" animate="animate" className="text-3xl text-white lg:text-5xl font-bold !leading-snug">
              Enhance Learning with <span className="text-[#f23064]">Flashcards</span>!
            </motion.h1>
            <motion.p variants={FadeUp(0.8)} initial="initial" animate="animate" className="text-gray-300">
              Memorize efficiently using interactive flashcards. Reinforce concepts and boost retention with an engaging learning experience.
            </motion.p>
            <motion.div variants={FadeUp(1.0)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
              <Link to="/flashcards" className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    
      <div className="border-t-1 border-[#f23064] my-5 mx-5 shadow-lg"></div>
            {/* Summarize Section */}
            <section className="bg-light px-5 overflow-hidden relative min-h-[60vh] flex items-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Brand Info */}
          <div className="order-2 md:order-1 flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl text-white lg:text-5xl font-bold !leading-snug"
            >
              Summarize <span className="text-[#f23064]">Long Text</span> Instantly!
            </motion.h1>
            <motion.p variants={FadeUp(0.8)} initial="initial" animate="animate" className="text-gray-300">
              Convert lengthy text into a concise summary for better understanding and quick insights.
            </motion.p>
            <motion.div variants={FadeUp(1.0)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
              <Link to="/summarize" className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group">
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src={banner} // Same image as other sections
              alt="Summarization Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
            />
          </div>
        </div>
      </section>

      <ToastContainer />
    </div>
  );
}

export default Home;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// import { motion } from "framer-motion";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import banner from "../assets/banner.png";
// import education from "../assets/education.png";
// import HeroPng from "../assets/hero.png";

// export const FadeUp = (delay) => ({
//   initial: { opacity: 0, y: 50 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 100, duration: 0.5, delay },
//   },
// });

// function Home() {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("Token missing! Redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     const verifyToken = async () => {
//       try {
//         const { data } = await axios.post(
//           "http://localhost:3000",
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );

//         console.log("Server Response:", data);
//         if (data.status) {
//           setUsername(data.user);
//           toast.success(`Hello ${data.user}`, { position: "top-right" });
//         } else {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error verifying token:", error);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   return (
//     <div className="bg-zinc-800 px-5">
//       <h2 className="mb-3 py-3 text-[#f23064] text-center text-2xl">
//         Welcome <span>{username}</span>
//       </h2>

//       <section className="bg-light px-5 overflow-hidden relative min-h-[60vh] flex items-center">
//         <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Brand Info */}
//           <div className="flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
//             <motion.h1
//               variants={FadeUp(0.6)}
//               initial="initial"
//               animate="animate"
//               className="text-3xl text-white lg:text-5xl font-bold !leading-snug"
//             >
//               Build <span className="text-[#f23064]">Better Habits</span> and Stay Focused!
//             </motion.h1>
//             <motion.p
//               variants={FadeUp(0.8)}
//               initial="initial"
//               animate="animate"
//               className="text-gray-300"
//             >
//               Track your daily habits and improve your productivity with our easy-to-use habit tracker.
//             </motion.p>
//             <motion.div
//               variants={FadeUp(1.0)}
//               initial="initial"
//               animate="animate"
//               className="flex justify-center md:justify-start"
//             >
//               <Link
//                 to="/habits"
//                 className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group"
//               >
//                 Get Started
//                 <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
//               </Link>
//             </motion.div>
//           </div>

//           {/* Hero Image */}
//           <div className="flex justify-center items-center">
//             <motion.img
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               src={HeroPng}
//               alt="Habit Tracker Illustration"
//               className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
//             />
//           </div>
//         </div>
//       </section>

//       {/* notes section */}
//       <section className="mt-3 bg-light px-5 overflow-hidden relative min-h-[70vh] flex items-center">
//       <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//     <div className="flex justify-center items-center">
//       <motion.img
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//         src={banner}
//         alt="Notes Illustration"
//         className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
//       />
//     </div>

//     <div className="flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
//       <motion.h1
//         variants={FadeUp(0.6)}
//         initial="initial"
//         animate="animate"
//         className="text-3xl text-white lg:text-5xl font-bold !leading-snug"
//       >
//         Organize Your <span className="text-[#f23064]">Notes</span> Effectively!
//       </motion.h1>
//       <motion.p
//         variants={FadeUp(0.8)}
//         initial="initial"
//         animate="animate"
//         className="text-gray-300"
//       >
//         Capture, organize, and access your notes anytime, anywhere. Keep your ideas and important information at your fingertips.
//       </motion.p>
//       <motion.div
//         variants={FadeUp(1.0)}
//         initial="initial"
//         animate="animate"
//         className="flex justify-center md:justify-start"
//       >
//         <Link
//           to="/notes"
//           className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group"
//         >
//           Get Started
//           <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
//         </Link>
//       </motion.div>
//     </div>
//   </div>
// </section>

//     {/* pomodora section */}
//   <section className="mt-3 bg-light px-5 overflow-hidden relative min-h-[70vh] flex items-center">
//   <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//     <div className="flex flex-col justify-center text-center md:text-left space-y-6 lg:max-w-[400px]">
//       <motion.h1
//         variants={FadeUp(0.6)}
//         initial="initial"
//         animate="animate"
//         className="text-3xl text-white lg:text-5xl font-bold !leading-snug"
//       >
//         Boost Your <span className="text-[#f23064]">Productivity</span> with Pomodoro!
//       </motion.h1>
//       <motion.p
//         variants={FadeUp(0.8)}
//         initial="initial"
//         animate="animate"
//         className="text-gray-300"
//       >
//         Stay focused and manage your time effectively using the Pomodoro technique. Work smarter with structured sessions and breaks.
//       </motion.p>
//       <motion.div
//         variants={FadeUp(1.0)}
//         initial="initial"
//         animate="animate"
//         className="flex justify-center md:justify-start"
//       >
//         <Link
//           to="/pomodoro"
//           className="primary-btn bg-[#f23064] text-white rounded-xl px-5 py-3 flex items-center gap-2 group"
//         >
//           Get Started
//           <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
//         </Link>
//       </motion.div>
//     </div>

//     <div className="flex justify-center items-center">
//       <motion.img
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//         src={education} // Replace with Pomodoro-specific image if available
//         alt="Pomodoro Timer Illustration"
//         className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow"
//       />
//     </div>
//   </div>
// </section>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;
