import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder, name, className }) => {
  return (
    <>
      <div
        className={` flex items-center gap-5 bg-white drop-shadow-lg w-full px-10 py-5 ${className}`}
      >
        <span>
          <FaSearch className="stroke-1 text-blue-500" />
        </span>
        <input
          type="text"
          name={name}
          className="focus:outline-none w-full "
          placeholder={placeholder}
          id={name}
        />
      </div>
    </>
  );
};

export default SearchBar;
