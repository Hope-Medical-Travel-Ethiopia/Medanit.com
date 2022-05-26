import Navbar from "../layouts/Navbar";
import { FiArrowDownCircle, FiArrowRight } from "react-icons/fi";
import SearchFunction from "./SearchFunction";
import ReactTypingEffect from "react-typing-effect";
import SearchOnHome from "./SearchOnHome";

const Header = ({ content }) => {
  return (
    <section
      id="Header"
      className="text-gray-800 min-h-screen h-fit flex flex-col justify-center"
    >
      <Navbar className="lg:mb-24" home="home" />
      <div className="flex justify-center lg:px-20 pt-20 p-10 flex-col ">
        <div id="" className="flex flex-col lg:w-2/3 w-100 ">
          <div className="typingEffect relative h-32">
            <h1 className="md:text-4xl text-3xl uppercase font-black tracking-wider stroke-w absolute">
              <ReactTypingEffect
                text={content.type}
                speed="100"
                eraseSpeed="50"
                eraseDelay="3500"
                cursor=" "
                typingDelay="500"
              />
            </h1>
          </div>
          <div className="heroDescription">
            <p className="md:my-4  my-10 md:w-[60%] font-normal xs:text-sm md:text-base">
              {content.heroDescription}
            </p>
          </div>
        </div>
        <div className="my-5">
          <SearchOnHome />
        </div>
      </div>
    </section>
  );
};

export default Header;
