import { searchProviders, changeProviders } from "../functions/searchFunction";
import { useState } from "react";

import { useRouter } from "next/router";
import en from "../locales/en";
import am from "../locales/am";
import SearchForm from "./SearchForm";

const SearchMethod = () => {
  const [providerData, setProviderData] = useState([]);
  const [provider, setProvider] = useState();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [Med, setMed] = useState();
  const [, setImage] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState();
  const allProviders = [];
  const doctorsList = [];
  const hospSearchMethodalList = [];
  const diagnosticsList = [];
  const pharmacyList = [];
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;
  const [providerState, setproviderState] = useState();

  //Type Change Function

  const handleType = changeProviders(
    setProvider,
    setLoading,
    providerState,
    allProviders,
    setproviderState,
    doctorsList,
    setProviders,
    diagnosticsList,
    hospitalList,
    pharmacyList
  );

  //Search Function

  const search = searchProviders(
    setMed,
    setIsLoading,
    provider,
    searchTerm,
    setProviderData,
    setImage
  );

  //return

  return (
    <div className="bg-gray-100 min-h-screen  shapes pt-16">
      <section className="searchSection lg:p-14 p-5 py-10 bg-blue-500 text-white flex flex-wrap justify-center  items-center flex-col ">
        <SearchForm
          search={search}
          handleType={handleType}
          t={t}
          providers={providers}
          provider={provider}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default SearchMethod;
