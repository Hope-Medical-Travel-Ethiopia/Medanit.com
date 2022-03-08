import React, { useState } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../../../lib/axios";
import { useAuth } from "../../../../hooks/auth";
import { useRouter } from "next/router";

export default function CreateMed({ medications, pharmacy }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();

  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const [schedule, setSchedule] = useState([]);

  const [medication, setmedication] = useState();
  const [showmedication, setShowmedication] = useState(false);
  const [showmedicationForm, setShowmedicationForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChooseMedication = async () => {
    const response = await axios
      .post(`/api/addMedications`, {
        pharmacy_id: pharmacy.id,
        medication_id: medication.id,
      })
      .then((response) => {
        // console.log(response.data);
        router.push(`/Admin/Pharmacy/${pharmacy.id}`);
      });
  };

  const handleSubmitMedication = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`/api/createAndAdd/${pharmacy.id}`, {
        name: values.name,
        description: values.description,
      })
      .then((response) => {
        router.push(`/Admin/Pharmacy/${pharmacy.id}`);
      });
  };

  const handleScheduleChange = (prop) => (event) => {
    setSchedule({ ...schedule, [prop]: event.target.value });
  };

  const handleDone = () => {
    // console.log(values);
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Add new Schedule
          </h1>
        </div>
      </div>

      <div className="body">
        <section className="mx-10 p-5 bg-white flex flex-col justify-center items-center">
          <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
            Select Existing medication
          </h1>
          <Autocomplete
            id="select-medications"
            options={medications}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setmedication(value);
              setShowmedication(false);
            }}
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
                label="Choose a medication"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
          <div className="flex mt-5 justify-between gap-5 items-center">
            <button
              onClick={() => {
                handleChooseMedication();
              }}
              className="px-8 py-3 bg-sky-500 hover:bg-sky-700 transition-all text-white"
            >
              Choose this medication
            </button>
            <h1>Or</h1>
            <button
              onClick={() => {
                setShowmedicationForm(true);
                setShowmedication(false);
              }}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-700 transition-all text-white"
            >
              Create new medication
            </button>
          </div>
          <div className="card my-5">
            {medication && showmedication && (
              <div>
                <h1>{medication.name}</h1>
              </div>
            )}
          </div>
        </section>

        <section>
          {showmedicationForm && (
            <div className="m-10 p-5 bg-white">
              <h1 className="textClip text-xl font-bold my-5 ml-2">
                Create New medication
              </h1>
              <div>
                <form onSubmit={(e) => handleSubmitMedication(e)}>
                  <div className="flex justify-between flex-wrap">
                    <FormControl
                      sx={{ m: 1, width: "40ch" }}
                      variant="outlined"
                    >
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
                    <FormControl
                      sx={{ m: 1, width: "100ch" }}
                      variant="outlined"
                    >
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
          )}
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
          title="Pharmacy"
          parent="Pharmacy Name"
          current="Add New Pharmacy Schedule"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("api/Pharmacy");
//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get("/api/Medications");
  const pharmacyResponse = await axios.get(`/api/Pharmacy/${params.id}`);

  return {
    props: {
      medications: response.data,
      pharmacy: pharmacyResponse.data[0],
    },
  };
}
