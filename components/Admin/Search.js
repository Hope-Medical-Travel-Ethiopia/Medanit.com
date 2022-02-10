import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <div className="search bg-white rounded-lg p-0 flex h-14 items-center px-5">
      <FaSearch className="text-xl text-gray-500" />
      <input
        type="text"
        placeholder="Search ..."
        className="h-full  pl-3  rounded-lg text-md focus:outline-none"
      />
    </div>
  );
};

export default Search;
