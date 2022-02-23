import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { useAuth } from "../../../../hooks/auth";
import axios from "../../../../lib/axios";
import { Router, useRouter } from "next/router";
import Box from "@mui/material/Box";

export default function CreateDoctors({ doctor }) {
  const serviceList = ["sam", "samue", "muse"];
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });

  const [values, setValues] = React.useState({
    name: "",
    speciality: "",
    address: "",
    picture: "",
    expertise: [],
    description: "",
  });

  useEffect(() => {
    setValues(doctor);
    console.log(values);
  }, [doctor]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    const response = await axios
      .put(`/api/Doctors/${doctor.id}`, {
        name: values.name,
        speciality: values.speciality,
        address: values.address,
        expertise: values.expertise,
        description: values.description,
        profilePicture: values.picture,
      })
      .then((response) => {
        router.push("/Admin/Doctors");
      });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Edit Doctor
          </h1>
        </div>
      </div>

      <div className="m-10 p-5 bg-white">
        <h1 className="textClip text-xl font-bold my-5 ml-2">Edit doctor</h1>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  value={values.expertise}
                  onChange={(event, value) => {
                    // console.log(value);
                    setValues({ ...values, expertise: value });
                  }}
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

CreateDoctors.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Doctors" current="Register New Doctor" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("/api/doctors");

  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Doctors/${params.id}`);

  return {
    props: {
      doctor: response.data,
    },
  };
}
