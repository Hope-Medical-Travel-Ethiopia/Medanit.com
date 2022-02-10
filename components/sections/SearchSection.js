import SearchBar from "./SearchBar";

const SearchSection = ({ result, query }) => {
  return (
    <section className="flex bg-blue-400 text-gray-50 flex-col h-60 justify-center  gap-8  ">
      <SearchBar
        className="w-1/2 rounded-xl self-center text-gray-800"
        placeholder="Search by Doctor's name , speciality or symptoms ..."
      />
      <div className="results self-center w-1/2">
        <p>{result} results for</p>
        <h1 className="text-3xl font-bold">{query}</h1>
      </div>
    </section>
  );
};

export default SearchSection;
