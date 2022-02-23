import Navbar from "../layouts/Navbar";
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
const Hero = ({
  doctors,
  diagnostics,
  hospitals,
  pharmacy,
  procedures,
  medication,
}) => {
  //variables

  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [provider, setProvider] = useState("Hospital");
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const doctorsList = [];
  const hospitalList = [];
  const diagnosticsList = [];
  const pharmacyList = [];

  //handle push

  const handlePush = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/Listing",
      query: {
        qProvider: encodeURI(provider),
        qSearchTerm: encodeURI(searchTerm),
      },
    });
  };

  //useEffect

  useEffect(() => {
    doctors.map((item) => {
      hospitalList.push(item.speciality);
    });
    hospitals.map((item) => {
      hospitalList.push(item.name);
    });
    setProviders(hospitalList);
  }, [hospitals, doctors]);

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

  return (
    <div id="hero" className={`bg-cover bg-no-repeat bg-right  h-screen`}>
      <Navbar className="bg-gray-900/[0.9]" />
      <section className="HeroSection h-[90%] flex items-center ">
        <div className=" flex flex-col pl-10 gap-10">
          <section className="HeroCopy w-[60%] h-fit   fill-transparent drop-shadow-xl  pl-10 py-5 rounded-3xl  ">
            <div className="title">
              <h1 className="text-6xl font-black uppercase leading-tight tracking-wide text-blue-100">
                Let's Find you a perfect care
              </h1>
            </div>
            <div className="description normal-case tracking-wide text-gray-100 text-md">
              <h4>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                voluptatum hic molestias.
              </h4>
            </div>
          </section>
          <section className="SearchSection pl-10 drop-shadow-lg">
            <div>
              <form
                onSubmit={(e) => handlePush(e)}
                className=" w-full flex gap-5 items-center text-white h-36"
              >
                <FormControl className="bg-white w-32">
                  <InputLabel id="demo-simple-select-label">
                    Provider
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select-type"
                    name="select-type"
                    value={provider}
                    label="Provider"
                    required
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
                    onInputChange={(event, newValue) => {
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
        </div>
      </section>
    </div>
  );
};

export default Hero;
