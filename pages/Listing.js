import { SearchListing, changeProviders } from "../functions/searchFunction";
import ProviderListCard from "./../components/sections/ProviderListCard";
// import image from "./../public/Diagnostics.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import hospitalPic from "../public/hospitalDefault.jpg";
import labPic from "../public/labDefault.jpg";
import doctorPic from "../public/DocDefault.jpg";
import pharmaPic from "../public/pharmacyDefault.jpg";
import axios from "./../lib/axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import en from "../locales/en";
import am from "../locales/am";

const Listing = ({
  doctors,
  diagnostics,
  hospitals,
  pharmacy,
  procedures,
  medication,
  firstData,
  qProvider,
}) => {
  const doctorsList = [];
  const hospitalList = [];
  const diagnosticsList = [];
  const pharmacyList = [];
  const { query } = useRouter();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;
  const allProviders = [];

  //states

  const [providerData, setProviderData] = useState([]);
  const [provider, setProvider] = useState(qProvider);
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [Med, setMed] = useState();
  const [image, setImage] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState();
  const [providerState, setproviderState] = useState();
  useEffect(() => {
    // doctors.map((item) => {
    //   hospitalList.push(item.speciality);
    // });
    // hospitals.map((item) => {
    //   hospitalList.push(item.name);
    // });
    setProvider(query.qProvider);
    setSearchTerm(decodeURI(query.qSearchTerm));
    setProviderData(firstData);

    if (provider == "Diagnostics") {
      setImage(labPic);
    } else if (provider == "Hospital") {
      setImage(hospitalPic);
    } else if (provider == "Doctors") {
      setImage(doctorPic);
    } else if (provider == "Pharmacy") {
      setImage(pharmaPic);
    }
  }, []);

  //Type Change Function

  //

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

  const search = SearchListing(
    setMed,
    setIsLoading,
    provider,
    searchTerm,
    setProviderData,
    setImage,
    setShowResults,
    labPic,
    doctorPic,
    hospitalPic,
    pharmaPic
  );

  //return

  return (
    <div className="bg-gray-100 min-h-screen  shapes pt-16">
      <Head>
        <title>MEDANIT | Search for Health Care service</title>
      </Head>
      <section className="searchSection lg:p-14 p-5 py-10 bg-blue-500 text-white flex flex-wrap justify-center  items-center flex-col ">
        <div>
          <form
            onSubmit={(e) => {
              search(e);
            }}
            className=" w-full flex flex-wrap gap-5 items-center text-white "
          >
            <FormControl
              variant="filled"
              className=" md:w-32 min-w-fit w-[100%] m-auto bg-white"
            >
              <InputLabel id="demo-simple-select-label">
                {t.home.Provider}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                className="bg-white"
                id="select-type"
                name="select-type"
                value={provider}
                label={t.home.Provider}
                onChange={handleType}
              >
                <MenuItem value="Hospital">{t.home.Hospital}</MenuItem>
                <MenuItem value="Diagnostics">{t.home.Diagnostics}</MenuItem>
                <MenuItem value="Doctors">{t.home.Doctor}</MenuItem>
                <MenuItem value="Pharmacy">{t.home.Pharmacy}</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="filled"
              className="md:w-96 min-w-fit w-[100%] m-auto"
            >
              <Autocomplete
                className="bg-white"
                id="select-providers"
                name="searchTerm"
                options={providers}
                variant="filled"
                freeSolo
                required
                autoHighlight
                getOptionLabel={(option) => option}
                onInputChange={(event, newValue) => {
                  try {
                    setSearchTerm(newValue);
                  } catch {
                    setSearchTerm("");
                  }
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    className="border-slate-100  border-2 p-2 cursor-pointer"
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      option
                    )}

                    <span className="block text-xs"></span>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      provider
                        ? `${t.home.SearchFor} ${provider}`
                        : `Choose service type`
                    }
                    variant="filled"
                    autoComplete="new-password"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>

            <FormControl>
              <Button
                variant="contained"
                type="submit"
                className="bg-blue-500 py-3 flex items-center px-6 text-lg lowercase font-light"
                endIcon={<SearchIcon />}
              >
                {t.listings.search}
              </Button>
            </FormControl>
          </form>
        </div>
        {searchTerm && providerData && !IsLoading && showResults && (
          <h1 className="  mt-5 text-left">
            <span className=" font-bold">{providerData.length} </span>{" "}
            {t.listings.result}{" "}
            <span className="text-white block text-2xl font-bold ">
              {searchTerm}
            </span>
            {provider == "Pharmacy" && console.log(providerData)}
          </h1>
        )}
      </section>
      {/* <h1 className="text-2xl">Searching For {searchTerm}</h1> */}
      <section className="list pt-10 flex  flex-col justify-center items-center m-auto">
        {IsLoading ? (
          <>
            <h1 className="text-2xl">Searching For {searchTerm}</h1>
            <div className="text-9xl text-red-700 animate-spin w-24 h-24 rounded-full border-4 border-blue-500 border-x-0"></div>
          </>
        ) : (
          providerData.map((item) => (
            <ProviderListCard
              key={item.id + item.name}
              pic={image}
              providers={item}
              provider={provider}
              searchTerm={searchTerm}
              content={t}
            />
          ))
        )}
      </section>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  let Firstresponse = await axios.get(
    `/api/search-by-${query.qProvider}/${query.qSearchTerm}`
  );
  // console.log(Firstresponse.data);

  return {
    props: {
      firstData: Firstresponse.data,
      qProvider: query.qProvider,
    },
  };
}

export default Listing;
