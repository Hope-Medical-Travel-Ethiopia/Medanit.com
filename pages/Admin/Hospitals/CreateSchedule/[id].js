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
import { useAuth } from "../../../../hooks/auth";
import axios from "../../../../lib/axios";
import { Router, useRouter } from "next/router";

export default function CreateSchedule({ doctors, hospital }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();

  const [schedules, setschedules] = useState([
    { day: "", starting: "", ending: "" },
  ]);

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
    speciality: "",
    address: "",
    expertise: [],
    description: "",
    picture: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("/api/Doctor", {
        name: values.name,
        speciality: values.speciality,
        address: values.address,
        expertise: values.expertise,
        description: values.description,
        profilePicture: values.picture,
      })
      .then((response) => {
        setDoctor(response.data.doctor);
      });
  };

  const [schedule, setSchedule] = useState([]);

  const [doctor, setDoctor] = useState();
  const [showDoctor, setShowDoctor] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("/api/Hospital_schedule", {
        hospital_id: hospital.id,
        doctor_id: doctor.id,
        schedule: JSON.stringify(schedules),
      })
      .then((response) => {
        router.push("/Admin/Hospitals");
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Create New Doctor's Schedule
          </h1>
        </div>
      </div>
      <div className=" mx-10 p-5 bg-white flex flex-col justify-center items-center">
        <h1 className="textClip text-xl font-bold my-5 ml-2 self-start justify-self-start">
          Select Existing doctor
        </h1>
        <form onSubmit={() => {}}>
          <Autocomplete
            id="select-doctors"
            options={doctors}
            sx={{ width: 600 }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              setDoctor(value);
              setShowDoctor(false);
            }}
            renderOption={(props, option) => (
              <Box
                className="m-auto w-100"
                component="li"
                {...props}
                className=" border-2 p-2 cursor-pointer"
              >
                {option.name}{" "}
                <span className="block text-xs"> {option.speciality}</span>
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
        </form>

        <div className="flex mt-5 justify-between gap-5 items-center">
          <button
            onClick={() => {
              setShowDoctor(true);
              setShowDoctorForm(false);
            }}
            className="px-8 py-3 bg-sky-500 hover:bg-sky-700 transition-all text-white"
          >
            Choose this Doctor
          </button>
          <h1>Or</h1>
          <button
            onClick={() => {
              setShowDoctorForm(true);
              setShowDoctor(false);
            }}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-700 transition-all text-white"
          >
            Create new Doctor
          </button>
        </div>
        <div className="card my-5">
          {doctor && showDoctor && (
            <div>
              <h1>{doctor.name}</h1>
              <h2>{doctor.speciality}</h2>
            </div>
          )}
        </div>
      </div>
      {showDoctorForm && (
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
                    onChange={(event, value) =>
                      setValues({ ...values, expertise: value })
                    }
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
      )}

      <div className="scheduleForm m-10 p-5 bg-white">
        <h1 className="textClip text-xl font-bold my-5 ml-2">Add Schedule</h1>
        {schedules[0].day ? (
          schedules.map((item) => (
            <div>
              <h1 key={item.day}>{item.day} </h1>
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
              {/* <input
                type="text"
                name="day"
                value={element.day || ""}
                onChange={(e) => handleScheduleChange(index, e)}
              /> */}
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <label
                  className="mb-2 text-sm text-gray-600"
                  htmlFor={`schedule-Date`}
                >
                  Day
                </label>
                {/* <InputLabel htmlFor={`schedule-Date`}>Day</InputLabel> */}
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
              {/* <label>starting</label> */}
              {/* <input
                type="time"
                name="starting"
                value={element.starting || ""}
                onChange={(e) => handleScheduleChange(index, e)}
              /> */}
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
              {/* <label>ending</label> */}
              {/* <input
                type="time"
                name="ending"
                value={element.ending || ""}
                onChange={(e) => handleScheduleChange(index, e)}
              /> */}
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
            <button
              className="button bg-emerald-500 hover:bg-emerald-700 transition-all px-10 py-4 m rounded-sm text-white cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
const expertiseList = ["sam", "samue", "muse"];

CreateSchedule.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="Hospitals"
          current="Register New Schedule"
          parent="hospital"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("/api/hospitals");
  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);
  const Doctors = await axios.get("/api/doctors");

  return {
    props: {
      doctors: Doctors.data,
      hospital: response.data,
    },
  };
}
