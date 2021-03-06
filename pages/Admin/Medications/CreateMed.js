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

export default function CreateMed({ medications }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const [schedule, setSchedule] = useState([]);
  const [disableButton, setdisableButton] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableButton(true);
    const response = await axios
      .post("/api/Medications", {
        name: values.name,
        description: values.description,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        router.push("/Admin/Medications");
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Add new Medication
          </h1>
        </div>
      </div>

      <div className="body">
        <section className="mx-10 p-5 bg-white flex flex-col justify-center items-center">
          <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
            Check if the medication Exists
          </h1>
          <Autocomplete
            id="select-medications"
            options={medications}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100 border-2 my-2 cursor-pointer"
                component="li"
                {...props}
              >
                {option.name}{" "}
                <span className="block text-xs"> {option.speciality}</span>
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
              <form onSubmit={(e) => handleSubmit(e)}>
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
                    className=" rounded-lg w-fit py-3 px-16 m-2 bg-gray-500 text-white "
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

CreateMed.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="Medications"
          current="Create New Medication"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/Medications");

  return {
    props: {
      medications: response.data,
    },
  };
}
