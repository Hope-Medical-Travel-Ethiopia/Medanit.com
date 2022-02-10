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

export default function CreatePharmacy() {
  const serviceList = ["sam", "samue", "muse"];

  const [values, setValues] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    logo: "",
    opening: "",
    closing: "",
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
            Register New Pharmacy Center
          </h1>
        </div>
      </div>
      <div className="body mx-10 p-10 bg-white">
        <h1 className="text-xl font-bold  tracking-wider mb-5 uppercase textClip">
          Add new Schedule
        </h1>
        <form onSubmit={() => handleSubmit()} action="#">
          <div className="flex justify-between flex-wrap">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-name`}>
                Pharmacy Name
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                label="Pharmacy name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-phone`}>
                Phone
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-phone"
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                label="Pharmacy phone"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-email`}>
                Pharmacy email
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                label="Pharmacy email"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-address`}>
                address
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-address"
                type="text"
                value={values.address}
                onChange={handleChange("address")}
                label="Pharmacy address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <label
                className="mb-2 text-sm text-gray-600"
                htmlFor={`pharmacy-registration-logo`}
              >
                {" "}
                Pharmacy Logo
              </label>
              <TextField
                id="Pharmacy-registration-logo"
                type="file"
                inputProps={{ accept: "image/" }}
                value={values.logo}
                onChange={handleChange("logo")}
              />
            </FormControl>
            <div class>
              <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                <label
                  className="mb-2 text-sm text-gray-600"
                  htmlFor={`pharmacy-openning-time`}
                >
                  Openning time
                </label>
                <TextField
                  required
                  id="pharmacy-openning-time"
                  type="time"
                  onChange={handleChange("starting")}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                <label
                  className="mb-2 text-sm text-gray-600"
                  htmlFor={`pharmacy-closing-time`}
                >
                  Closing time
                </label>
                <TextField
                  required
                  id="pharmacy-closing-time"
                  type="time"
                  onChange={handleChange("closing")}
                />
              </FormControl>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className=" rounded-lg w-fit py-3 px-20  m-2 bg-emerald-500 text-white"
          />
        </form>
      </div>
    </div>
  );
}

CreatePharmacy.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Pharmacy" current="Register New Pharmacy" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
