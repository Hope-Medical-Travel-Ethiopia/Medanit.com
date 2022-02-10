import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import Logo from "./LogoPic";

const Navbar = ({ className }) => {
  const [nav, setNav] = useState(true);

  return (
    <nav
      className={`flex sticky 
    top-0 w-full scroll bg-white drop-shadow-lg
    justify-between  py-3 sm:items-center  
    px-5 lg:px-20 md:px-10 flex-col z-10  sm:flex-row ${className}`}
    >
      <div className="  Logo flex items-center justify-between lg:text-2xl text-xl ">
        <Logo />
        <FaBars
          id="menuBar"
          onClick={() => {
            setNav(!nav);
          }}
          className="sm:hidden cursor-pointer"
        />
      </div>
      <ul
        id="navList"
        className={` ${
          nav
            ? "hidden transition-all duration-300 "
            : "flex transition-all duration-300 "
        }  text-sm  sm:flex flex-col sm:flex-row  items-center mt-10 sm:mt-0 transition-all duration-300 `}
        // className="gap-5 text-sm flex sm:flex flex-col sm:flex-row items-center mt-10 sm:mt-0"
      >
        <li>
          <Link href="/">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Listing">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Listing
            </a>
          </Link>
        </li>
        {/* <li>
          <Link href="/Hospitals">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Hospitals
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Diagnostics">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Diagnostics
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Laboratories">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Laboratories
            </a>
          </Link>
        </li>
        <li>
          <Link href="/Pharmacy">
            <a className="  hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out text-blue-500 tracking-wider px-4 py-2 rounded-sm ">
              Pharmacy
            </a>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
