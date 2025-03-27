
import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-800 py-3 text-white text-center py-6 shadow-md shadow-gray-100">
      <div className="container mx-auto px-4 my-3">
        <section className="mb-4 flex justify-center space-x-4">
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-google"></i>
          </a>
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="p-2 border border-white rounded-full hover:bg-[#f23064] hover:text-white transition" href="#">
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section>
          <form>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <p className="text-white text-lg font-semibold">Sign up for our newsletter</p>
              <input type="email" placeholder="Email address" className="w-100 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:[#f23064]" />
              <button type="submit" className="bg-[#f23064] text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className="mt-4 bg-[#f23064] py-3">
        <p>
          &copy; 2024 Copyright: 
          <a className="font-bold text-white" href="https://yourwebsite.com/"> FocusFlow.com</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
