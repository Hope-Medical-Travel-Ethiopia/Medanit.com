import ProviderListCard from "./../components/sections/ProviderListCard";
import image from "./../public/Diagnostics.jpg";
import axios from "./../lib/axios";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const Listing = ({
  doctorsName,
  doctorsExpertise,
  doctorsSpeciality,
  diagnostics,
  hospitals,
  pharmacy,
}) => {
  const [providerData, setProviderData] = useState([]);
  const [formInput, setformInput] = useState();
  const [provider, setProvider] = useState("Hospital");
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("someText");
  const [IsLoading, setIsLoading] = useState(false);
  const arr = [];
  const hospitalList = [];
  const diagnosticsList = [];
  const pharmacyList = [];

  useEffect(() => {
    doctorsName.map((item) => {
      arr.push(item.name);
    });

    doctorsSpeciality.map((item) => {
      arr.push(item.speciality);
      hospitalList.push(item.speciality);
    });
    hospitals.map((item) => {
      hospitalList.push(item.name);
    });
    diagnostics.map((item) => {
      diagnosticsList.push(item.name);
    });
    pharmacy.map((item) => {
      pharmacyList.push(item.name);
    });
  });

  const handleType = (event) => {
    setProvider(event.target.value);
    const targetValue = event.target.value;
    if (targetValue == "Doctors") {
      setProviders(arr);
    }
    if (targetValue == "Diagnostics") {
      setProviders(diagnosticsList);
    }
    if (targetValue == "Hospital") {
      setProviders(hospitalList);
    }
    if (targetValue == "Pharmacy") {
      setProviders(pharmacyList);
    }
  };
  const search = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let response = await axios.get(`/search-by-${provider}/${searchTerm}`);
      let res = await response.data;
      setProviderData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Diagnostics</title>
      </Head>
      <section className="searchSection bg-white  flex justify-center p-10  ">
        <div>
          <form
            onSubmit={search}
            className=" w-full flex gap-5 items-center text-white h-36"
          >
            <FormControl className="bg-white w-32">
              <InputLabel id="demo-simple-select-label">Provider</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select-type"
                name="select-type"
                value={provider}
                label="Provider"
                onChange={handleType}
              >
                <MenuItem value="Hospital">hospital</MenuItem>
                <MenuItem value="Diagnostics">diagnostics</MenuItem>
                <MenuItem value="Doctors">doctor</MenuItem>
                <MenuItem value="Pharmacy">pharmacy</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="flex justify-between bg-white">
              <Autocomplete
                className="text-white"
                id="select-providers"
                name="searchTerm"
                options={providers}
                freeSolo
                required
                // value={providers}
                sx={{ width: 600, color: "red" }}
                autoHighlight
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  try {
                    setSearchTerm(newValue);
                  } catch {
                    setSearchTerm("");
                  }
                }}
                renderOption={(props, option) => (
                  <Box
                    className="m-auto w-100"
                    component="li"
                    {...props}
                    className="border-slate-100 border-2 p-2 cursor-pointer"
                  >
                    {option}{" "}
                    <span className="block text-xs">
                      {" "}
                      {/* {option.speciality ? option.speciality : option.address}
                      {option.address && option.address} */}
                    </span>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Search for a ${provider}`}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
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
                Search
              </Button>
            </FormControl>
          </form>
        </div>
      </section>
      {/* <h1 className="text-2xl">Searching For {searchTerm}</h1> */}
      <section className="list mt-10 flex flex-col justify-center items-center m-auto">
        {IsLoading ? (
          <>
            <h1 className="text-2xl">Searching For {searchTerm}</h1>
            <div className="text-9xl text-red-700 animate-spin w-24 h-24 rounded-full border-4 border-blue-500 border-x-0"></div>
          </>
        ) : (
          providerData.map((item) => (
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
          ))
        )}
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const DoctorNameResponse = await axios.get("/Doctors-name");
  const DoctorSpecialityResponse = await axios.get("/Doctors-speciality");
  const DoctorExpertiseResponse = await axios.get("/Doctors-expertise");

  const diagnosticResponse = await axios.get("/diagnostics");
  const hospitalResponse = await axios.get("/hospitals");
  const pharmacyResponse = await axios.get("/pharmacy");

  return {
    props: {
      // doctors: response.data,
      doctorsName: DoctorNameResponse.data,
      doctorsSpeciality: DoctorSpecialityResponse.data,
      doctorsExpertise: DoctorExpertiseResponse.data,
      diagnostics: diagnosticResponse.data,
      hospitals: hospitalResponse.data,
      pharmacy: pharmacyResponse.data,
    },
  };
}

export default Listing;
