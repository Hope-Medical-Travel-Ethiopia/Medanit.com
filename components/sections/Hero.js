// import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import Navbar from "../layouts/Navbar";
const Hero = () => {
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    // event.preventDefault();
    router.push(`/diagnostics/${search}`);
  };
  return (
    <div id="hero" className={`bg-cover bg-no-repeat bg-right  h-screen`}>
      <Navbar className="bg-gray-900/[0.9]" />
      <section className="HeroSection h-[90%] flex items-center ">
        <div className=" flex flex-col pl-10 gap-10">
          <section className="HeroCopy w-[60%] h-fit   fill-transparent drop-shadow-xl  pl-10 py-5 rounded-3xl  ">
            <div className="title">
              <h1 className="text-6xl font-black uppercase leading-tight tracking-wide text-blue-100">
                Let's Find you a perfect care
              </h1>
            </div>
            <div className="description normal-case tracking-wide text-gray-100 text-md">
              <h4>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                voluptatum hic molestias.
              </h4>
            </div>
          </section>
          <section className="SearchSection pl-10 drop-shadow-lg">
            {/* <form onSubmit={(event) => handleSubmit(event)}> */}
            <select
              name=""
              id=""
              onChange={(event, value) => {
                setType(value);
              }}
              required
              className="px-10 py-5 bg-gray-50 rounded-l-lg hover:cursor-pointer border-none"
            >
              <option className=" " value="Provider">
                Doctor
              </option>
              <option className=" " value="Provider">
                Hospital
              </option>
            </select>
            <input
              className="w-[50%] pl-10 py-5 outline-none"
              type="text"
              required
              onChange={(event, value) => {
                setSearch(value);
              }}
              required
              placeholder={`Search by Condition , Specialty or Provider name ...`}
            />
            <input
              type="submit"
              value="Search"
              onClick={() => router.push("/Diagnostics")}
              className="px-10 py-5 bg-blue-500 text-gray-50 rounded-r-lg hover:cursor-pointer"
            />
            {/* </form> */}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Hero;
