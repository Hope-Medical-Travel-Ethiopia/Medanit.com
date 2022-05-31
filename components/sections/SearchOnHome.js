import { changeProviders } from "../../functions/searchFunction";
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
import React from "react";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";

const SearchOnHome = () => {
  const [provider, setProvider] = useState();
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
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

  const handlePush = (e) => {
    setSearchLoading(true);
    console.log("push button is pushed");
    e.preventDefault();
    router.push({
      pathname: "/Listing",
      query: {
        qProvider: encodeURI(provider),
        qSearchTerm: encodeURI(searchTerm),
      },
    });
  };

  //return

  return (
    <section id="search" className="SearchSection flex items-center ">
      {/* The Form Goes Here */}
      <section className="SearchSection drop-shadow-lg">
        <div>
          <form
            onSubmit={(e) => {
              handlePush(e);
            }}
            className=" w-full flex flex-wrap gap-5 items-center text-white h-36"
          >
            <FormControl className=" md:w-32 w-[100%]">
              <InputLabel id="demo-simple-select-label">
                {t.home.Provider}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select-type"
                name="select-type"
                value={provider && provider}
                label={t.home.Provider}
                onChange={handleType}
              >
                <MenuItem value="Hospital">{t.home.Hospital}</MenuItem>
                <MenuItem value="Diagnostics">{t.home.Diagnostics}</MenuItem>
                <MenuItem value="Doctors">{t.home.Doctor}</MenuItem>
                <MenuItem value="Pharmacy">{t.home.Pharmacy}</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="flex min-w-fit md:w-96 w-[100%] justify-between">
              {provider ? (
                <Autocomplete
                  id="select-providers"
                  name="searchTerm"
                  options={providers}
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
                      className="m-auto w-100 border-slate-100 border-2 p-2 cursor-pointer"
                      component="li"
                      {...props}
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
                      required
                      label={
                        provider ? `${t.home.SearchFor} ` : `${t.home.Choose}`
                      }
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
              ) : (
                <TextField
                  id="outlined-basic"
                  label={t.home.Choose}
                  variant="outlined"
                  required
                  disabled
                />
              )}
            </FormControl>

            {searchLoading ? (
              <CircularProgress color="primary" size={40} disableShrink />
            ) : (
              <FormControl>
                {provider && searchTerm ? (
                  <Button
                    variant="contained"
                    type="submit"
                    className="h-12 bg-blue-500 w-32 py-3 flex items-center px-6 text-lg lowercase font-light"
                    endIcon={<SearchIcon />}
                  >
                    {t.listings.search}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="h-12 bg-blue-500 w-32 py-3 flex items-center px-6 text-lg lowercase font-light"
                    endIcon={<SearchIcon />}
                  >
                    {t.listings.search}
                  </Button>
                )}
              </FormControl>
            )}
          </form>
        </div>
      </section>
      {/* The form ends here */}
    </section>
  );
};

export default SearchOnHome;
