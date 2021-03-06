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
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { useRouter } from "next/router";

export default function CreateTest({ procedure }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [disableButton, setdisableButton] = useState(false);
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableButton(true);
    const response = await axios
      .post("/api/Procedure", {
        name: values.name,
        description: values.description,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        router.push("/Admin/Procedures");
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Add new Medical Procedure
          </h1>
        </div>
      </div>

      <div className="body">
        <section className="mx-10 p-5 bg-white flex flex-col justify-center items-center">
          <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
            Check if the Procedure Exists
          </h1>
          <Autocomplete
            id="select-procedures"
            options={procedure}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100 p-2 cursor-pointer"
                component="li"
                {...props}
              >
                {option.name}{" "}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Check If procedure already exists "
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
              Create New Procedure
            </h1>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between flex-wrap">
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`procedure-registration-name`}>
                      procedure Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="procedure-registration-name"
                      type="text"
                      value={values.name}
                      onChange={handleChange("name")}
                      label="procedure name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Description About the procedure"
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
        </section>
      </div>
    </div>
  );
}

CreateTest.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="Procedures"
          current="Add New Medical Procedure"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/Procedures");

  return {
    props: {
      procedure: response.data,
    },
  };
}
