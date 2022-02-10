import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export default function CreateTest() {
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const [schedule, setSchedule] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDone = () => {
    console.log(values);
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Add new Medical Diagnosis
          </h1>
        </div>
      </div>

      <div className="body">
        <section className="mx-10 p-5 bg-white flex flex-col justify-center items-center">
          <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
            Check if the Diagnosis Exists
          </h1>
          <Autocomplete
            id="select-medications"
            options={medications}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100"
                component="li"
                {...props}
                className="border-red-900 border-2 my-2 cursor-pointer"
              >
                {option.name}{" "}
                <span className="block text-xs">
                  {" "}
                  {option.speciality} {option.id}
                </span>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Check If medication already exists "
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </section>

        <section>
          <div className="m-10 p-5 bg-white">
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Create New medication
            </h1>
            <div>
              <form onSubmit={() => handleDone()} action="#">
                <div className="flex justify-between flex-wrap">
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`medication-registration-name`}>
                      medication Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="medication-registration-name"
                      type="text"
                      value={values.name}
                      onChange={handleChange("name")}
                      label="medication name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Description About the medication"
                      multiline
                      rows={4}
                      value={values.description}
                      onChange={handleChange("description")}
                    />
                  </FormControl>
                </div>
                <input
                  type="submit"
                  value="Register medication"
                  className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
const expertiseList = ["sam", "samue", "muse"];

const medications = [
  {
    id: 101,
    name: "CT SCAN",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 102,
    name: "MRI",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 103,
    name: "CBC",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 104,
    name: "X-Ray",
    description: "some description about the medication will be listed here ",
  },
];
CreateTest.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="Pharmacy"
          parent="Pharmacy Name"
          current="Add New Pharmacy Schedule"
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};
