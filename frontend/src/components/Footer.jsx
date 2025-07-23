
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-800 text-white shadow-md shadow-gray-100 border-t border-gray-700 pt-6">
      <div className="container mx-auto px-4">

        <div className="flex flex-col mb-6 md:flex-row justify-between items-start gap-8">
          <div className="md:w-1/2">
            <div className="mb-4">
              <Link className="text-2xl font-bold italic text-white" to="/">
                FocusFlow
              </Link>
            </div>
            <p className="text-xl font-semibold mb-2">Sign up for our newsletter</p>
            <form className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 mb-6">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2 w-full md:w-64 rounded-md border border-gray-600 bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#f23064]"
              />
              <button
                type="submit"
                className="bg-[#f23064] text-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-white">Explore Features</h2>
              <div className="flex flex-col gap-2 text-[16px]">
                <Link to="/" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-home"></i> Home
                </Link>
                <Link to="/flashcard" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-clone"></i> FlashCards
                </Link>
                <Link to="/habits" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-check-square"></i> Habit Tracker
                </Link>
                <Link to="/notes" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-sticky-note"></i> Notes
                </Link>
                <Link to="/pomodora" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-stopwatch"></i> Pomodoro
                </Link>
                <Link to="/text" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-align-left"></i> Summarize Text
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-white">About FocusFlow</h2>
              <div className="flex flex-col gap-2 text-[16px]">
                <Link to="/about" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-info-circle"></i> About Us
                </Link>
                <Link to="/terms" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-file-contract"></i> Terms & Conditions
                </Link>
                <Link to="/privacy" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-user-shield"></i> Privacy Policy
                </Link>
                <Link to="/why-focusflow" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-bolt"></i> Why FocusFlow?
                </Link>
                <Link to="/contact" className="flex items-center gap-2 hover:text-[#f23064] transition">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>



      </div>


      <div className="bg-[#f23064] py-4 px-6 text-center text-white flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <p className="text-xl md:text-base">
          &copy; {new Date().getFullYear()} <span className="font-bold">FocusFlow.com</span>. All rights reserved.
        </p>

        <div className="flex justify-center md:justify-end flex-wrap gap-3">
          {["facebook-f", "twitter", "google", "instagram", "linkedin-in", "github"].map((icon) => (
            <a
              key={icon}
              href="#"
              className="p-2 border border-white rounded-full hover:bg-white hover:text-[#f23064] transition"
            >
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}

export default Footer;


// import { Link } from "react-router-dom";
// function Footer() {
//   return (
//     <footer className="bg-zinc-800 py-3 text-white text-center py-6 shadow-md shadow-gray-100">
//       <div className="container mx-auto px-4 my-3">
//         <Link className="text-xl font-semibold text-black" to="/">
//           <i>Focus Flow</i>
//         </Link>
//         <section className="mb-4 flex justify-center space-x-4">
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-google"></i>
//           </a>
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//           <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
//             <i className="fab fa-github"></i>
//           </a>
//         </section>

//         <section>
//           <form>
//             <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
//               <p className="text-white text-lg font-semibold">Sign up for our newsletter</p>
//               <input type="email" placeholder="Email address" className="w-100 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:[#f23064]" />
//               <button type="submit" className="bg-[#f23064] text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
//                 Subscribe
//               </button>
//             </div>
//           </form>
//         </section>
//       </div>

//       <div className="mt-4 bg-[#f23064] py-3">
//         <p>
//           &copy; 2024 Copyright:
//           <a className="font-bold text-white" href="https://yourwebsite.com/"> FocusFlow.com</a>
//         </p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
