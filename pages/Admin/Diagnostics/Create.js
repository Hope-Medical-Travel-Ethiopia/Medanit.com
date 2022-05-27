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
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { useRouter } from "next/router";

export default function CreateDiagnostics() {
  const { user } = useAuth({ middleware: "auth" });
  const serviceList = ["MRI", "CBC", "CT-SCAN"];
  const [disableButton, setdisableButton] = useState(false);

  const router = useRouter();

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

  // const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableButton(true);
    // await csrf();
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("logo", values.logo);
    formData.append("agent_id", user.id);
    formData.append("agent_name", user.name);
    formData.append("phone", values.phone);
    for (const i = 0; i < values.services.length; i++) {
      formData.append("services[]", values.services[i]);
    }
    formData.append("description", values.description);
    formData.append("user_id", user.id);

    const response = axios({
      url: "/api/diagnostics",
      method: "POST",
      data: formData,
    }).then((response) => {
      router.push("/Admin/Diagnostics");
    });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Register New Diagnostic
          </h1>
        </div>
      </div>
      <div className="body mx-10 p-5 bg-white">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex justify-between flex-wrap">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Diagnostic-registration-name`}>
                Diagnostic Name
              </InputLabel>
              <OutlinedInput
                required
                id="Diagnostic-registration-name"
                type="text"
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
                onChange={handleChange("address")}
                label="Diagnostic address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <TextField
                id="Diagnostic-registration-logo"
                type="file"
                onChange={(e) =>
                  setValues({ ...values, ["logo"]: e.target.files[0] })
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Autocomplete
                multiple
                required
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
                label="Description About the Diagnostic"
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
              type="submit"
              disabled
              className=" rounded-lg w-fit w-24 py-3 px-20 m-2 bg-gray-500 text-white "
            />
          )}
        </form>
      </div>
    </div>
  );
}

CreateDiagnostics.getLayout = function PageLayout(page) {
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
          title="Diagnostics"
          current="Register New Diagnostic"
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};
