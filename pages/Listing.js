import ProviderListCard from "./../components/sections/ProviderListCard";
// import image from "./../public/Diagnostics.jpg";
import hospitalPic from "./../public/hospitalDefault.jpg";
import labPic from "./../public/labDefault.jpg";
import doctorPic from "./../public/DocDefault.jpg";
import pharmaPic from "./../public/pharmacyDefault.jpg";
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
  const [providerData, setProviderData] = useState([]);
  const [provider, setProvider] = useState(qProvider);
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [Med, setMed] = useState();
  const [image, setImage] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const doctorsList = [];
  const hospitalList = [];
  const diagnosticsList = [];
  const pharmacyList = [];
  const { query } = useRouter();

  useEffect(() => {
    doctors.map((item) => {
      hospitalList.push(item.speciality);
    });
    hospitals.map((item) => {
      hospitalList.push(item.name);
    });
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

  const handleType = (event) => {
    setProvider(event.target.value);
    const targetValue = event.target.value;
    if (targetValue == "Doctors") {
      doctors.map((item) => {
        doctorsList.push(item.name);
        doctorsList.push(item.speciality);
        item.expertise.map((exp) => {
          doctorsList.push(exp);
        });
      });
      setProviders(doctorsList);
    }
    if (targetValue == "Diagnostics") {
      diagnostics.map((item) => {
        diagnosticsList.push(item.name);
      });
      procedures.map((item) => {
        diagnosticsList.push(item.name);
      });
      setProviders(diagnosticsList);
    }
    if (targetValue == "Hospital") {
      doctors.map((item) => {
        hospitalList.push(item.speciality);
      });
      hospitals.map((item) => {
        hospitalList.push(item.name);
      });
      setProviders(hospitalList);
    }
    if (targetValue == "Pharmacy") {
      pharmacy.map((item) => {
        pharmacyList.push(item.name);
      });
      medication.map((item) => {
        pharmacyList.push(item.name);
      });
      setProviders(pharmacyList);
    }
  };

  //Search Function

  const search = async (event) => {
    event.preventDefault();
    setMed(null);
    setIsLoading(true);
    try {
      let response = await axios.get(
        `/api/search-by-${provider}/${searchTerm}`
      );
      let res = await response.data;
      // console.log(res);
      setProviderData(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }

    if (provider == "Pharmacy") {
      try {
        let response = await axios.get(
          `/api/search-by-medication/${searchTerm}`
        );
        let res = await response.data;
        setMed(res);
      } catch (error) {
        // setIsLoading(true);
      }
    }

    if (provider == "Diagnostics") {
      setImage(labPic);
    } else if (provider == "Hospital") {
      setImage(hospitalPic);
    } else if (provider == "Doctors") {
      setImage(doctorPic);
    } else if (provider == "Pharmacy") {
      setImage(pharmaPic);
    }
  };

  //return

  return (
    <div className="bg-gray-100 min-h-screen  shapes pt-20">
      <Head>
        <title>MEDANIT | Search for Health Care service</title>
      </Head>
      <section className="searchSection lg:p-14 p-5 py-10 bg-blue-500 text-white flex flex-wrap justify-center  items-center flex-col ">
        <div>
          <form
            onSubmit={search}
            className=" w-full flex flex-wrap gap-5 items-center text-white "
          >
            <FormControl
              variant="filled"
              className=" md:w-32 min-w-fit w-[100%] m-auto bg-white"
            >
              <InputLabel id="demo-simple-select-label">Provider</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                className="bg-white"
                id="select-type"
                name="select-type"
                value={provider}
                label="Provider"
                onChange={handleType}
              >
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="Diagnostics">Diagnostics</MenuItem>
                <MenuItem value="Doctors">Doctor</MenuItem>
                <MenuItem value="Pharmacy">Pharmacy</MenuItem>
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
                autocomplete="new-password"
                freeSolo
                required
                // value={providers}
                // sx={{ width: 600, color: "red" }}
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
                    // className="m-auto w-100"
                    component="li"
                    {...props}
                    className="border-slate-100  border-2 p-2 cursor-pointer"
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
                    variant="filled"
                    autocomplete="new-password"
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
        {searchTerm && providerData && (
          <h1 className="  mt-5 text-left">
            <span className=" font-bold">{providerData.length} </span> results
            were found for{" "}
            <span className="text-white block text-2xl font-bold ">
              {searchTerm}
            </span>
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
            />
          ))
        )}
      </section>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const DoctorsResponse = await axios.get("/api/doctors");
  const diagnosticResponse = await axios.get("/api/diagnostics");
  const hospitalResponse = await axios.get("/api/hospitals");
  const pharmacyResponse = await axios.get("/api/Pharmacy");
  const procedureResponse = await axios.get("/api/Procedures");
  const MedicationResponse = await axios.get("/api/Medications");
  let Firstresponse = await axios.get(
    `/api/search-by-${query.qProvider}/${query.qSearchTerm}`
  );
  // console.log(Firstresponse.data);

  return {
    props: {
      doctors: DoctorsResponse.data,
      diagnostics: diagnosticResponse.data,
      hospitals: hospitalResponse.data,
      pharmacy: pharmacyResponse.data,
      procedures: procedureResponse.data,
      medication: MedicationResponse.data,
      firstData: Firstresponse.data,
      qProvider: query.qProvider,
    },
  };
}

export default Listing;
