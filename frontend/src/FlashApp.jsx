
import Container from "./layouts/containers/Container";
import { Link } from "react-router-dom";
import avatarLogo from "./assets/avatar.png";
import { useState } from "react";
import { useEffect } from "react";
function FlashApp() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);
  return (
    <>
      <div className="bg-[#f23064] text-white px-4 py-3 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
        {/* Brand Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl tracking-wide text-white leading-snug break-words">
            <span className="block sm:inline font-bold">FocusFlow- </span>
            <span className="text-white block sm:inline">Swipe. Flip. Learn.</span>
          </h2>
        </Link>

        {/* User Info */}
        <div className="flex items-center space-x-3 justify-end">
          <p className="hidden sm:block font-medium text-lg whitespace-nowrap">
            Welcome {user.username}
          </p>
          <img
            src={avatarLogo}
            alt="Profile"
            className="hidden sm:block w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
      <div data-testid="appDiv" className="bg-gray-100 min-h-screen pb-10">
        <Container />
      </div>
    </>
  );
}

export default FlashApp;