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
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CreateDiagnosticSchedule() {
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const [schedule, setSchedule] = useState([]);

  const [Test, setTest] = useState();
  const [showTest, setShowTest] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleScheduleChange = (prop) => (event) => {
    setSchedule({ ...schedule, [prop]: event.target.value });
  };

  const handleDone = () => {
    console.log(values);
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
            Select Existing Test
          </h1>
          <Autocomplete
            id="select-Tests"
            options={Tests}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setTest(value);
              setShowTest(false);
            }}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100"
                component="li"
                {...props}
                className="border-red-900 border-2 my-2 cursor-pointer"
              >
                {option.name}{" "}
                <span className="block text-xs">
                  {" "}
                  {option.speciality} {option.id}
                </span>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Test"
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
                setShowTest(true);
                setShowTestForm(false);
              }}
              className="px-8 py-3 bg-sky-500 hover:bg-sky-700 transition-all text-white"
            >
              Choose this Test
            </button>
            <h1>Or</h1>
            <button
              onClick={() => {
                setShowTestForm(true);
                setShowTest(false);
              }}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-700 transition-all text-white"
            >
              Create new Test
            </button>
          </div>
          <div className="card my-5">
            {Test && showTest && (
              <div>
                <h1>{Test.name}</h1>
              </div>
            )}
          </div>
        </section>

        <section>
          {showTestForm && (
            <div className="m-10 p-5 bg-white">
              <h1 className="textClip text-xl font-bold my-5 ml-2">
                Create New Test
              </h1>
              <div>
                <form onSubmit={() => handleDone()} action="#">
                  <div className="flex justify-between flex-wrap">
                    <FormControl
                      sx={{ m: 1, width: "40ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor={`Test-registration-name`}>
                        Test Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="Test-registration-name"
                        type="text"
                        value={values.name}
                        onChange={handleChange("name")}
                        label="Test name"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Description About the Test"
                        multiline
                        rows={4}
                        value={values.description}
                        onChange={handleChange("description")}
                      />
                    </FormControl>
                  </div>
                  <input
                    type="submit"
                    value="Register Test"
                    className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
                  />
                </form>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="scheduleForm m-10 p-5 bg-white">
            {schedule && (
              <div>
                {" "}
                {schedule.day}
                <hr />
                {schedule.starting}
                <hr />
                {schedule.ending}
              </div>
            )}
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Add Schedule
            </h1>
            <form className="flex flex-col justify-center items-center">
              <div className="flex">
                <FormControl sx={{ m: 1, width: "20ch" }}>
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`schedule-day-select`}
                  >
                    Day
                  </label>

                  {/* <InputLabel id="schedule-day">Day</InputLabel> */}
                  <Select
                    labelId="schedule-day"
                    id="schedule-day-select"
                    // value={"Monday"}
                    defaultValue={"Monday"}
                    // label="Day"
                    onChange={(event, value) =>
                      setSchedule({ ...schedule, day: value })
                    }
                  >
                    <MenuItem value={"Everyday"}>Everyday</MenuItem>
                    <MenuItem value={"Monday-Friday"}>Monday-Friday</MenuItem>
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>
                    <MenuItem value={"Sunday"}>Sunday</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`schedule-starting-time`}
                  >
                    Starting time
                  </label>
                  <TextField
                    required
                    id="schedule-starting-time"
                    type="time"
                    onChange={handleScheduleChange("starting")}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                  <label
                    className="mb-2 text-sm text-gray-600"
                    htmlFor={`schedule-ending-time`}
                  >
                    ending time
                  </label>
                  <TextField
                    required
                    id="schedule-ending-time"
                    type="time"
                    onChange={handleScheduleChange("ending")}
                  />
                </FormControl>
              </div>
              <input
                type="submit"
                value="Register Test"
                className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
const expertiseList = ["sam", "samue", "muse"];

const Tests = [
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
CreateDiagnosticSchedule.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Diagnostic" current="Add New Diagnostic Schedule" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
