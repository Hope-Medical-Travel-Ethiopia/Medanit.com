import { searchProviders, changeProviders } from "../functions/searchFunction";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import en from "../locales/en";
import am from "../locales/am";
import React from "react";

export const It = ({ qProvider }) => {
  const [providerData, setProviderData] = useState([]);
  const [provider, setProvider] = useState(qProvider);
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [Med, setMed] = useState();
  const [, setImage] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState();
  const allProviders = [];
  const doctorsList = [];
  const hospitalList = [];
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
        <div>
          <form
            onSubmit={search}
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
                // value={provider}
                label="Provider"
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
      </section>
    </div>
  );
};
