import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./LogoPic";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [lang, setLang] = useState({});
  const [language, setLanguage] = useState(false);
  const eng = {
    notify: "Notify me",
    contact: "Contact Us",
    lang: "አማርኛ",
    service: "service",
    search: "search",
  };
  const amh = {
    notify: "አስታውቁኝ",
    contact: "ያናግሩን",
    lang: "English",
    service: "አግልግሎታችን",
    search: "ፈልግ",
  };

  useEffect(() => {
    setLang(eng);
  }, [lang]);

  return (
    <nav
      className="flex fixed 
    top-0 w-full scroll scatter
    justify-between  py-5 sm:items-center  
    px-5 lg:px-20 md:px-10 flex-col z-10  sm:flex-row "
    >
      <div className="Logo flex items-center justify-between lg:text-2xl text-xl ">
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
          nav ? "hidden transition-all duration-300 " : "flex"
        } gap-5 text-sm  sm:flex flex-col  sm:flex-row items-center mt-10 sm:mt-0`}
        // className="gap-5 text-sm flex sm:flex flex-col sm:flex-row items-center mt-10 sm:mt-0"
      >
        <li className="my-1">
          <Link href="#Header" className="">
            <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
              {lang.search}
            </a>
          </Link>
        </li>
        <li className="my-1">
          <Link href="#services">
            <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
              {lang.service}
            </a>
          </Link>
        </li>
        <li className="my-1">
          <Link href="#contact">
            <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
              {lang.contact}
            </a>
          </Link>
        </li>
        {lang ? (
          <li>
            <Link href="#">
              <a
                onClick={() => {
                  setLang(eng);
                }}
                className="bg-blue-500 px-5 py-2 rounded-sm text-white rounded-full"
              >
                {lang.lang}
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href="#">
              <a
                onClick={() => {
                  setLang(amh);
                }}
                className="bg-blue-500 px-5 py-2 rounded-sm text-white rounded-full"
              >
                Eng
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
