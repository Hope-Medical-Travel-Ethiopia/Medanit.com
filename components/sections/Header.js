import Navbar from "../layouts/Navbar";
import { FiArrowDownCircle, FiArrowRight } from "react-icons/fi";
import SearchFunction from "./SearchFunction";
const Header = ({
  doctors,
  diagnostics,
  hospitals,
  pharmacy,
  procedures,
  medication,
}) => {
  return (
    <section
      id="Header"
      className="text-gray-800 min-h-screen sm:h-screen flex flex-col justify-center"
    >
      <Navbar className=" opacity:25" />
      <div className="flex justify-center lg:px-20  mt-30 md:mt-0 p-10 flex-col ">
        <div id="" className="flex flex-col lg:w-2/3 w-100 ">
          <h1 className="md:text-5xl text-3xl uppercase font-black  tracking-wider ">
            Medanit! Health Care Just Got Better.
          </h1>
          <p className="my-4 md:w-[75%] xs:text-sm md:text-base">
            It requires a more contemporary and simplified solution than ever
            before. But don't worry , we're here to make a difference.
          </p>
        </div>
        <div className="my-5">
          <SearchFunction
            doctors={doctors}
            diagnostics={diagnostics}
            hospitals={hospitals}
            pharmacy={pharmacy}
            procedures={procedures}
            medication={medication}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
