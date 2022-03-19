import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { useAuth } from "../../../hooks/auth";
import axios from "../../../lib/axios";
import { Router, useRouter } from "next/router";
import Box from "@mui/material/Box";

export default function CreateDoctors({ doctors }) {
  const [serviceList, setServiceList] = useState([]);
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });
  const [disableButton, setdisableButton] = useState(false);
  const [values, setValues] = React.useState({
    name: "",
    speciality: "",
    address: "",
    picture: null,
    expertise: [],
    description: "",
  });

  useEffect(() => {
    doctors.map((item) => {
      serviceList.push(item.speciality);
      item.expertise.map((exp) => {
        serviceList.push(exp);
      });
    });

    setServiceList([...new Set(serviceList)]);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setdisableButton(true);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("speciality", values.speciality);
    formData.append("address", values.address);
    formData.append("profilePicture", values.picture);
    for (const i = 0; i < values.expertise.length; i++) {
      formData.append("expertise[]", values.expertise[i]);
    }
    formData.append("description", values.description);

    const response = axios({
      url: "/api/Doctor",
      method: "POST",
      data: formData,
    }).then((response) => {
      // console.log(response.data);
      router.push("/Admin/Doctors");
    });
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
            id="select-doctors"
            options={doctors}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100 border-2 p-2 cursor-pointer"
                component="li"
                {...props}
              >
                {option.name}{" "}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Doctor"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </FormControl>
      </div>
      <div className="m-10 p-5 bg-white">
        <h1 className="textClip text-xl font-bold my-5 ml-2">
          Create New doctor
        </h1>
        <div>
          <form onSubmit={(e) => handleCreate(e)}>
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
                  Doctors Address
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
                  onChange={(e) =>
                    setValues({
                      ...values,
                      ["picture"]: e.target.files[0],
                    })
                  }
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={serviceList.map((option) => option)}
                  //   defaultValue={[serviceList[1]]}
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
                        key={index}
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
            {!disableButton ? (
              <input
                type="submit"
                value="Submit"
                className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-all hover:cursor-pointer"
              />
            ) : (
              <input
                value="Loading ..."
                className=" rounded-lg w-fit w-24 py-3 px-20 m-2 bg-gray-500 text-white "
              />
            )}
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
        <AdminNav title="Doctors" current="Register New Doctor" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/doctors");

  return {
    props: {
      doctors: response.data,
    },
  };
}
