import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

export default function CreateDiagnostic() {
  const serviceList = ["sam", "samue", "muse"];

  const [values, setValues] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    logo: "",
    services: [],
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Register New Diagnostic Center
          </h1>
        </div>
      </div>
      <div className="body mx-10 p-5 bg-white">
        <form onSubmit={() => handleSubmit()} action="#">
          <div className="flex justify-between flex-wrap">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Diagnostic-registration-name`}>
                Diagnostic Name
              </InputLabel>
              <OutlinedInput
                required
                id="Diagnostic-registration-name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                label="Diagnostic name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Diagnostic-registration-phone`}>
                Phone
              </InputLabel>
              <OutlinedInput
                required
                id="Diagnostic-registration-phone"
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                label="Diagnostic phone"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Diagnostic-registration-email`}>
                Diagnostic email
              </InputLabel>
              <OutlinedInput
                required
                id="Diagnostic-registration-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                label="Diagnostic email"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Diagnostic-registration-address`}>
                address
              </InputLabel>
              <OutlinedInput
                required
                id="Diagnostic-registration-address"
                type="text"
                value={values.address}
                onChange={handleChange("address")}
                label="Diagnostic address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <TextField
                id="Diagnostic-registration-logo"
                type="file"
                inputProps={{ accept: "image/" }}
                value={values.logo}
                onChange={handleChange("logo")}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Autocomplete
                multiple
                id="tags-filled"
                options={serviceList.map((option) => option)}
                //   defaultValue={[serviceList[1]]}
                onChange={(event, value) =>
                  setValues({ ...values, services: value })
                }
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="standard"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Services"
                    placeholder="Services"
                    helperText="Select as many services as you want"
                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
              <TextField
                id="outlined-multiline-flexible"
                label="Description About the Diagnostic"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange("description")}
              />
            </FormControl>
          </div>
          <input
            type="submit"
            value="Submit"
            className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white"
          />
        </form>
      </div>
    </div>
  );
}

CreateDiagnostic.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Diagnostic" current="Register New Diagnostic" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
