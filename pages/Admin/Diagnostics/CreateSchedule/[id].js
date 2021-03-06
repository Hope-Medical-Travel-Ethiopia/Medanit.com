import React, { useState } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../../../hooks/auth";
import axios from "../../../../lib/axios";
import { Router, useRouter } from "next/router";

export default function CreateSchedule({ Procedures, Diagnostics }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [disableButton, setdisableButton] = useState(false);
  const [schedules, setschedules] = useState([
    { day: "", starting: "", ending: "" },
  ]);

  const [checked, setchecked] = useState([]);

  const handleCheck = (e, index) => {
    let newChecked = [...checked];

    if (checked[index] == true) {
      newChecked[index] = false;
    } else {
      newChecked[index] = true;
    }
    setchecked(newChecked);
    if (newChecked[index] == true) {
      let newschedules = [...schedules];
      newschedules[index]["starting"] = "00:00";
      newschedules[index]["ending"] = "00:00";
      setschedules(newschedules);
    }
  };
  let handleScheduleChange = (i, e) => {
    let newschedules = [...schedules];
    newschedules[i][e.target.name] = e.target.value;
    setschedules(newschedules);
  };
  let addFormFields = () => {
    setschedules([...schedules, { day: "", starting: "", ending: "" }]);
  };

  let removeFormFields = (i) => {
    let newschedules = [...schedules];
    newschedules.splice(i, 1);
    setschedules(newschedules);
  };

  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await axios
      .post("/api/Procedure", {
        name: values.name,
        description: values.description,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        setProcedure(response.data);
        setShowProcedureForm(false);
        setShowProcedure(true);
      });
  };

  const [schedule, setSchedule] = useState([]);

  const [Procedure, setProcedure] = useState();
  const [showProcedure, setShowProcedure] = useState(false);
  const [showProcedureForm, setShowProcedureForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableButton(true);

    const response = await axios
      .post("/api/Diagnostic_schedule", {
        diagnostics_id: Diagnostics.id,
        procedures_id: Procedure.id,
        schedule: schedules,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        router.push(`/Admin/Diagnostics/${Diagnostics.id}`);
      });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Create New Procedures Schedule
          </h1>
        </div>
      </div>
      <div className=" mx-10 p-5 bg-white flex flex-col justify-center items-center">
        <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
          Select Existing Procedure
        </h1>
        <form onSubmit={() => {}}>
          <Autocomplete
            id="select-Procedures"
            options={Procedures}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setProcedure(value);
              setShowProcedure(false);
            }}
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
                label="Choose a Procedure"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </form>

        <div className="flex mt-5 justify-between gap-5 items-center">
          <button
            onClick={() => {
              setShowProcedure(true);
              setShowProcedureForm(false);
            }}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-700 transition-all text-white"
          >
            Choose this Procedure
          </button>
          <h1>Or</h1>
          <button
            onClick={() => {
              setShowProcedureForm(true);
              setShowProcedure(false);
            }}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-700 transition-all text-white"
          >
            Create new Procedure
          </button>
        </div>
        <div className="card my-5">
          {Procedure && showProcedure && (
            <div>
              <h1>{Procedure.name}</h1>
              <h2>{Procedure.speciality}</h2>
            </div>
          )}
        </div>
      </div>
      <section>
        {showProcedureForm && (
          <div className="m-10 p-5 bg-white">
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Create New Procedure
            </h1>
            <div>
              <form onSubmit={(e) => handleCreate(e)}>
                <div className="flex justify-between flex-wrap">
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`Procedure-registration-name`}>
                      Procedure Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="Procedure-registration-name"
                      type="text"
                      value={values.name}
                      onChange={handleChange("name")}
                      label="Procedure name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Description About the Procedure"
                      multiline
                      rows={4}
                      value={values.description}
                      onChange={handleChange("description")}
                    />
                  </FormControl>
                </div>
                <input
                  type="submit"
                  value="Register Procedure"
                  className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
                />
              </form>
            </div>
          </div>
        )}
      </section>
      {showProcedure && Procedure && (
        <div className="scheduleForm m-10 p-5 bg-white">
          <h1 className="textClip text-xl font-bold my-5 ml-2">Add Schedule</h1>
          {schedules[0].day ? (
            schedules.map((item) => (
              <div key={item.day + item.starting}>
                <h1> {item.day} </h1>
                <p>
                  {" "}
                  {item.starting} - to - {item.ending}{" "}
                </p>
              </div>
            ))
          ) : (
            <h1> please Add Values </h1>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            {schedules.map((element, index) => (
              <div className="flex items-end  " key={index}>
                <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`schedule-Date`}
                  >
                    Day
                  </label>
                  <TextField
                    required
                    id="schedule-Date"
                    type="text"
                    name="day"
                    value={element.day || ""}
                    onChange={(e) => handleScheduleChange(index, e)}
                    label="Day"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`starting-time`}
                  >
                    Starting time
                  </label>
                  <TextField
                    required
                    id="starting-time"
                    type="time"
                    name="starting"
                    value={element.starting || ""}
                    onChange={(e) => handleScheduleChange(index, e)}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`ending-time`}
                  >
                    ending time
                  </label>
                  <TextField
                    required
                    id="ending-time"
                    type="time"
                    name="ending"
                    value={element.ending || ""}
                    onChange={(e) => handleScheduleChange(index, e)}
                  />
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      size="large"
                      onChange={(e) => handleCheck(e, index)}
                    />
                  }
                  label="24 hours"
                />

                <div>
                  {index ? (
                    <button
                      type="button"
                      className="button bg-red-500 hover:bg-red-700 m-2 transition-all px-6 py-4 rounded-sm text-white cursor-pointer"
                      onClick={() => removeFormFields(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="button-section flex gap-10 mt-5">
              <button
                className="button bg-blue-500 hover:bg-blue-700 transition-all px-10 py-4 m rounded-sm text-white cursor-pointer"
                type="button"
                onClick={() => addFormFields()}
              >
                Add
              </button>
              {!disableButton ? (
                <input
                  type="submit"
                  value="Submit"
                  className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-all hover:cursor-pointer"
                />
              ) : (
                <input
                  value="Loading ..."
                  className=" rounded-lg w-fit py-3 px-20 m-2 bg-gray-500 text-white "
                />
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

CreateSchedule.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="Diagnostics"
          current="Register New Schedule"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Diagnostics/${params.id}`);
  const Procedures = await axios.get("/api/Procedures");
  return {
    props: {
      Procedures: Procedures.data,
      Diagnostics: response.data[0],
    },
  };
}
