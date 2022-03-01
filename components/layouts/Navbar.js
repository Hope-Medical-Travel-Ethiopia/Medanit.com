import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./LogoPic";

const Navbar = ({ className }) => {
  const [nav, setNav] = useState(true);

  return (
    <nav
      id="navigation"
      className={`p-5 z-100 scatter text-center fixed top-0 w-screen overflow-hidden md:px-20 ${className}`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto  ">
        <span className="self-center text-lg font-semibold whitespace-nowrap ">
          <Logo />
        </span>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          onClick={() => setNav(!nav)}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        {nav && (
          <>
            {" "}
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm ">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <button className="bg-blue-500 text-white rounded px-8 py-2 text-sm">
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
