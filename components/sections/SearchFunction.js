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
const SearchFunction = ({
  doctors,
  diagnostics,
  hospitals,
  pharmacy,
  procedures,
  medication,
}) => {
  //variables

  const doctorsList = [];
  const pharmacyList = [];
  const hospitalList = [];
  const router = useRouter();
  const diagnosticsList = [];
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState("Hospital");

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
    <section id="search" className="SearchSection flex items-center ">
      {/* The Form Goes Here */}
      <section className="SearchSection drop-shadow-lg">
        <div>
          <form
            onSubmit={(e) => handlePush(e)}
            className=" w-full flex flex-wrap gap-5 items-center text-white h-36"
          >
            <FormControl className=" md:w-32 w-[100%]">
              <InputLabel id="demo-simple-select-label">Provider</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select-type"
                name="select-type"
                value={provider}
                label="Provider"
                required
                onChange={handleType}
              >
                <MenuItem className="" value="Hospital">
                  Hospital
                </MenuItem>
                <MenuItem className="" value="Diagnostics">
                  Diagnostics
                </MenuItem>
                <MenuItem className="" value="Doctors">
                  Doctor
                </MenuItem>
                <MenuItem className="" value="Pharmacy">
                  Pharmacy
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className="flex min-w-fit md:w-96 w-[100%] justify-between">
              <Autocomplete
                className="text-blue-500 border-blue-500"
                id="select-providers"
                name="searchTerm"
                options={providers}
                freeSolo
                required
                // value={providers}
                sx={{}}
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
                    className="m-auto w-100 border-slate-100 border-2 p-2 cursor-pointer"
                    component="li"
                    {...props}
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
                className="h-12 bg-blue-500 w-32 py-3 flex items-center px-6 text-lg lowercase font-light"
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </FormControl>
          </form>
        </div>
      </section>
      {/* The form ends here */}
    </section>
  );
};

export default SearchFunction;
