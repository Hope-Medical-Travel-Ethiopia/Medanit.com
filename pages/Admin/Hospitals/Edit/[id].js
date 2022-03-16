import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import axios from "../../../../lib/axios";
import { useAuth } from "../../../../hooks/auth";
import { Router, useRouter } from "next/router";

export default function EditHospitals({ hospital }) {
  const { user } = useAuth({ middleware: "auth" });

  const serviceList = ["Service 1", "Service 2", "Service 3"];

  const router = useRouter();

  const [values, setValues] = React.useState({
    name: hospital.name,
    phone: hospital.phone,
    email: hospital.email,
    address: hospital.address,
    logo: hospital.logo,
    services: hospital.services,
    description: hospital.description,
  });

  // useEffect(() => {
  //   setValues(hospital);
  // }, [hospital]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const csrf = () => axios.get("/sanctum/csrf-cookie");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("logo", values.logo);
    formData.append("phone", values.phone);
    for (const i = 0; i < values.services.length; i++) {
      formData.append("services[]", values.services[i]);
    }
    formData.append("description", values.description);
    formData.append("user_id", user.id);

    const response = axios({
      url: `/api/Hospitals/${hospital.id}`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      // console.log(response.data);
      router.push("/Admin/Hospitals");
    });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Register New Hospital
          </h1>
        </div>
      </div>
      <div className="body mx-10 p-5 bg-white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex justify-between flex-wrap">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`hospital-registration-name`}>
                Hospital Name
              </InputLabel>
              <OutlinedInput
                required
                id="hospital-registration-name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                label="Hospital name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`hospital-registration-phone`}>
                Phone
              </InputLabel>
              <OutlinedInput
                required
                id="hospital-registration-phone"
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                label="Hospital phone"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`hospital-registration-email`}>
                Hospital email
              </InputLabel>
              <OutlinedInput
                required
                id="hospital-registration-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                label="Hospital email"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`hospital-registration-address`}>
                address
              </InputLabel>
              <OutlinedInput
                required
                id="hospital-registration-address"
                type="text"
                value={values.address}
                onChange={handleChange("address")}
                label="Hospital address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <TextField
                id="hospital-registration-logo"
                type="file"
                inputProps={{ accept: "image/" }}
                onChange={(e) =>
                  setValues({ ...values, ["logo"]: e.target.files[0] })
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Autocomplete
                multiple
                id="tags-filled"
                options={serviceList.map((option) => option)}
                value={values.services}
                onChange={(event, value) =>
                  setValues({ ...values, services: value })
                }
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
                label="Description About the Hospital"
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
            className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white hover:bg-emerald-700 hover:cursor-pointer transition-all ease-linear"
          />
        </form>
      </div>
    </div>
  );
}

EditHospitals.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          user={user}
          title="Hospitals"
          current="Edit Hospital Information"
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("/api/hospitals");

//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);

  return {
    props: {
      hospital: response.data[0],
    },
  };
}
