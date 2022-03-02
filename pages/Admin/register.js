import React, { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { MenuItem } from "@mui/material";

import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";
import { Router, useRouter } from "next/router";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

export default function CreateDoctors({ doctors }) {
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: null,
    role: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("role", values.role);

    const response = axios({
      url: "/api/adminRegister",
      method: "POST",
      data: formData,
    }).then((response) => {
      router.push("/Admin/Admins");
    });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Register New Admin
          </h1>
        </div>
      </div>
      <div className="m-10 p-5 bg-white">
        <div>
          <form onSubmit={(e) => handleCreate(e)}>
            <div className="flex justify-start gap-5 flex-wrap flex-wrap">
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-name`}>
                  Name
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-name"
                  type="text"
                  //   value={values.name}
                  onChange={handleChange("name")}
                  label="Agent Name"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-speciality`}>
                  Email
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-speciality"
                  type="email"
                  //   value={values.email}
                  onChange={handleChange("email")}
                  label="Agent Email"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-address`}>
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-address"
                  type="password"
                  //   value={values.password}
                  onChange={handleChange("password")}
                  label="Agent Password"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`doctor-registration-address`}>
                  Password Confirmation
                </InputLabel>
                <OutlinedInput
                  required
                  id="doctor-registration-address"
                  type="password"
                  //   value={values.password_confirmation}
                  onChange={handleChange("password_confirmation")}
                  label="Agent Password Confirmation"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor={`role`}>Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  name="role"
                  label="Provider"
                  onChange={handleChange("role")}
                >
                  <MenuItem value="0">Admin</MenuItem>
                  <MenuItem value="1">Agent</MenuItem>
                  {/* <MenuItem value="2">Deactivate Agent</MenuItem> */}
                </Select>
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

CreateDoctors.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });
  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Admins" current="Register New Agents" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("/api/doctors");

  return {
    props: {
      doctors: response.data,
    },
  };
}
