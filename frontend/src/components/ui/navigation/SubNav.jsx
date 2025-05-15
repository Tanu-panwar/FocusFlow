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
    <div className="mb-10">
      <div>
        <h2 className="text-3xl text-center text-[#f23064] py-3 font-bold mb-10">Create Flashcard</h2>
      </div>

      <nav>
        <ul className="flex items-center gap-10 border-b-2 pb-2 border-gray-300">
          {homePages.map(({ title, id, path }) => {
            return (
              <li key={id} className="text-lg font-semibold text-gray-500">
                <NavLink
                  to={path}
                  end 
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-4 pb-2 text-[#f23064] border-[#f23064]"
                      : "text-gray-500"
                  }
                  
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SubNav;
