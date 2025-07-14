import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SubNav = () => {
  const { pathname } = useLocation();
  const homePages = [
    {
      id: 0,
      title: "Home",
      path: "/flashcard",
    },
    {
      id: 1,
      title: "Create Card",
      path: "/flashcard/card",
    },
    {
      id: 2,
      title: "Create Deck",
      path: "/flashcard/deck",
    },
    { id: 3, title: "My Space", path: "/flashcard/dashboard" },
  ];

  return (
    <div className="mb-10 px-4 sm:px-6 lg:px-12">
      <div>
        <h2 className="text-3xl sm:text-3xl text-center text-[#f23064] py-3 font-bold mb-6 sm:mb-10">
          Create Flashcard
        </h2>
      </div>

      <nav className="overflow-x-auto">
        <ul className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10 border-b-2 pb-2 border-gray-300">
          {homePages.map(({ title, id, path }) => (
            <li key={id} className="text-base sm:text-lg font-semibold text-gray-500 whitespace-nowrap">
              <NavLink
                to={path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "border-b-4 pb-2 text-[#f23064] border-[#f23064]"
                    : "text-gray-500 hover:text-[#f23064]"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>

  );
};

export default SubNav;
