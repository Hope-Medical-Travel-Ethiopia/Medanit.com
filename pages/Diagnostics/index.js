import ProviderListCard from "../../components/sections/ProviderListCard";
import SearchSection from "../../components/sections/SearchSection";
import image from "../../public/Diagnostics.jpg";
import axios from "../../lib/axios";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
const Diagnostics = ({ diagnostics }) => {
  const [diag, setDiag] = useState([]);
  const [formInput, setformInput] = useState({});
  const [provider, setProvider] = useState("Diagnostics");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDiag(diagnostics);
  }, [diagnostics]);

  const handleInputs = (event) => {
    let { name, value } = event.target;
    setformInput({ ...formInput, [name]: value });
    setSearchTerm(event.target.value);
  };
  const handleType = (event) => {
    setProvider(event.target.value);
    console.log(provider);
  };
  const search = async (event) => {
    event.preventDefault();
    let response = await axios.get(`/search-by-${provider}/${searchTerm}`);
    let res = await response.data;
    setDiag(res);
  };
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Diagnostics</title>
      </Head>
      <section className="searchSection bg-blue-500  flex justify-center p-10  ">
        <div
          className={` flex items-center gap-5 bg-white drop-shadow-lg w-full   px-10 `}
        >
          <span>
            <FaSearch className="stroke-1 text-blue-500" />
          </span>
          <form onSubmit={search} className=" w-full flex ">
            <select
              // value={provider}
              className="py-5"
              name="type"
              id="type"
              onChange={handleType}
            >
              <option value="Diagnostics">diagnostics</option>
              <option value="Doctors">doctor</option>
              <option value="Hospital">hospital</option>
              <option value="pharmacy">pharmacy</option>
            </select>
            <input
              type="text"
              name="searchTerm"
              id="diagnostic-search-input"
              value={searchTerm}
              required
              placeholder="search by diagnostics name"
              onChange={handleInputs}
              className="w-full py-5 focus:outline-none"
            />
            <button></button>
          </form>
        </div>
      </section>
      <section className="list mt-10 flex flex-col justify-center items-center m-auto">
        {diag.map((item) => (
          <ProviderListCard
            key={item.id}
            name={item.name}
            address={item.address}
            phone={item.phone}
            email={item.email}
            picture={image}
            provider={provider}
            id={item.id}
          />
        ))}
      </section>
    </div>
  );
};
export async function getStaticProps() {
  const response = await axios.get("/diagnostics");

  return {
    props: {
      diagnostics: response.data,
    },
  };
}
export default Diagnostics;
