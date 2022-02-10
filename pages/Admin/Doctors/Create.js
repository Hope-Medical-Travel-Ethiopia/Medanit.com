import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

export default function CreateDoctors() {
  const serviceList = ["sam", "samue", "muse"];

  const [values, setValues] = React.useState({
    name: "",
    speciality: "",
    address: "",
    picture: "",
    expertise: [],
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    alert(values.name);
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Register New Doctor
          </h1>
        </div>
      </div>
      <div className="m-10 p-5 bg-white">
        <h1 className="textClip text-lg font-bold my-5 ml-2">
          First Check if the Doctor Exists
        </h1>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <Autocomplete
            id="doctor-registration-name"
            freeSolo
            options={doctors.map((option) => option.name)}
            renderInput={(params) => (
              <TextField {...params} label="Doctor's Name" />
            )}
          />
        </FormControl>
      </div>
      <div className="m-10 p-5 bg-white">
        <h1 className="textClip text-xl font-bold my-5 ml-2">
          Create New doctor
        </h1>
        <div>
          <form onSubmit={() => handleSubmit()} action="#">
            <div className="flex justify-between flex-wrap">
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-name`}>
                  Doctor Name
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-name"
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  label="Doctor name"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-speciality`}>
                  Doctor Speciality
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-speciality"
                  type="text"
                  value={values.speciality}
                  onChange={handleChange("speciality")}
                  label="Doctor speciality"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-address`}>
                  Doctor's Address
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-address"
                  type="text"
                  value={values.address}
                  onChange={handleChange("address")}
                  label="Doctor address"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <TextField
                  id="doctor-registration-picture"
                  type="file"
                  inputProps={{ accept: "image/" }}
                  value={values.picture}
                  onChange={handleChange("picture")}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={expertiseList.map((option) => option)}
                  //   defaultValue={[serviceList[1]]}
                  onChange={(event, value) =>
                    setValues({ ...values, expertise: value })
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
                      label="Expertise"
                      placeholder="Expertise"
                      helperText="Select as many Expertises as you want"
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description About the Doctor"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange("description")}
                />
              </FormControl>
            </div>
            <input
              type="submit"
              value="Register Doctor"
              className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
const expertiseList = ["sam", "samue", "muse"];

const doctors = [
  {
    id: 101,
    name: "John Doe",
    speciality: "Cardiac Surgeon",
    img: "url/image",
  },
  {
    id: 102,
    name: "Jane Doe",
    speciality: "Cardiac Surgeon",
    img: "url/image",
  },
  {
    id: 104,
    name: "Tylor Lokwood",
    speciality: "internist Surgeon",
    img: "url/image",
  },
  {
    id: 106,
    name: "Bonny Bennet",
    speciality: "internist Surgeon",
    img: "url/image",
  },
  {
    id: 107,
    name: "Candice Accolla",
    speciality: "Heart Surgeon",
    img: "url/image",
  },
  {
    id: 109,
    name: "Phil boar",
    speciality: "Heart Surgeon",
    img: "url/image",
  },
];
CreateDoctors.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Doctors" current="Register New Doctor" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
