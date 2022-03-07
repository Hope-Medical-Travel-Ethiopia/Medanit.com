import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./LogoPic";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import en from "../../locales/en";
import am from "../../locales/am";

const Navbar = ({ home }) => {
  const [nav, setNav] = useState(true);
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

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
        {home && (
          <>
            <li className="my-1">
              <Link href="#Header" className="">
                <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
                  {t.search}
                </a>
              </Link>
            </li>
            <li className="my-1">
              <Link href="#services">
                <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
                  {t.service}
                </a>
              </Link>
            </li>
            <li className="my-1">
              <Link href="#contact">
                <a className="bg-blue-500   px-5 py-2 rounded-sm text-white rounded-full">
                  {t.contact}
                </a>
              </Link>
            </li>
          </>
        )}

        <li>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={locale}
              onChange={changeLanguage}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="am">AM</MenuItem>
            </Select>
          </FormControl>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
