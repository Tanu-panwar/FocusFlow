import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import server from "../environment";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.token); // Track login status

  useEffect(() => {
    setIsLoggedIn(cookies.token); 
  }, [cookies.token]); 

  const handleLogout = async () => {
    try {
      const response = await fetch(`${server.prod}/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        removeCookie("token");
        setIsLoggedIn(false); // Ensure UI updates after logout
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link className="text-xl font-semibold text-[#f23064]" to="/">
          <i>Focus Flow</i>
        </Link>

        <button
          className="text-[#f23064] md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"} w-full md:w-auto`}>
          <ul className="md:flex space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left mt-4 md:mt-0">
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/">Home</Link></li>
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/flashcard">FlashCard</Link></li>
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/habits">Habit Track</Link></li>
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/notes">Notes</Link></li>
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/pomodora">Pomodora</Link></li>
            <li><Link className="text-[#f23064] hover:text-gray-300" to="/text">Summary</Link></li>

            {!isLoggedIn && (
              <>
                <li><Link className="text-[#f23064] hover:text-gray-300" to="/login">Login</Link></li>
                <li><Link className="text-[#f23064] hover:text-gray-300" to="/signup">SignUp</Link></li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-[#f23064] text-white hover:bg-[#d91c52] transition duration-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






// import React, { useState } from "react";
// import { useCookies } from "react-cookie";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  
//   const isLoggedIn = !!cookies.token; // Check if user is logged in

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log(data.message);
//         removeCookie("token");
//         navigate("/login");
//       } else {
//         console.error("Logout failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-zinc-800 p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
        
//         <Link className="text-xl font-semibold text-[#f23064]" to="/">
//           <i>Focus Flow</i>
//         </Link>

//         <button
//           className="text-[#f23064] md:hidden focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//           </svg>
//         </button>

//         {/* Navbar Links */}
//         <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"} w-full md:w-auto`}>
//           <ul className="md:flex space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left mt-4 md:mt-0">
//             <li><Link className="text-[#f23064] hover:text-gray-300" to="/">Home</Link></li>
//             <li><Link className="text-[#f23064] hover:text-gray-300" to="/habits">Habit Track</Link></li>
//             <li><Link className="text-[#f23064] hover:text-gray-300" to="/notes">Notes</Link></li>
//             <li><Link className="text-[#f23064] hover:text-gray-300" to="/pomodoro">Pomodoro</Link></li>

//             {!isLoggedIn && (
//               <>
//                 <li><Link className="text-[#f23064] hover:text-gray-300" to="/login">Login</Link></li>
//                 <li><Link className="text-[#f23064] hover:text-gray-300" to="/signup">SignUp</Link></li>
//               </>
//             )}

//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="px-5 py-2 rounded-xl bg-[#f23064] text-white hover:bg-[#d91c52] transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
