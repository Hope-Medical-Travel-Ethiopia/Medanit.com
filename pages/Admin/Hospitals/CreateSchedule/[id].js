import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import pic from "../../../../public/Doc4.jpg";
import Card from "../../../../components/Admin/Card";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../../../hooks/auth";
import axios from "../../../../lib/axios";
import ProviderListCard from "../../../../components/sections/ProviderListCard";

import { Router, useRouter } from "next/router";

export default function CreateSchedule({ doctors, hospital }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [disableButton, setdisableButton] = useState(false);
  const [schedules, setschedules] = useState([
    { day: "", starting: "", ending: "" },
  ]);
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    doctors.map((item) => {
      serviceList.push(item.speciality);
      item.expertise.map((exp) => {
        serviceList.push(exp);
      });
    });

    setServiceList([...new Set(serviceList)]);
  }, [doctors]);

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

    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("speciality", values.speciality);
    formData.append("address", values.address);
    formData.append("agent_id", user.id);
    formData.append("agent_name", user.name);
    formData.append("profilePicture", values.picture);
    for (const i = 0; i < values.expertise.length; i++) {
      formData.append("expertise[]", values.expertise[i]);
    }
    formData.append("description", values.description);
    const response = await axios({
      url: "/api/Doctor",
      method: "POST",
      data: formData,
    }).then((response) => {
      setDoctor(response.data);
      setShowDoctor(true);
      setShowDoctorForm(false);
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
    setdisableButton(true);
    const response = await axios
      .post("/api/Hospital_schedule", {
        hospital_id: hospital.id,
        doctor_id: doctor.id,
        schedule: schedules,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        router.push(`/Admin/Hospitals/${hospital.id}`);
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Create New Doctors Schedule
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
              <ProviderListCard
                key={doctor.id}
                pic={pic}
                providers={doctor}
                provider={"Admin/Doctors"}
              />
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
                    inputProps={{ accept: "image/" }}
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
                    required
                    id="tags-filled"
                    options={serviceList.map((option) => option)}
                    onChange={(event, value) =>
                      setValues({ ...values, expertise: value })
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
                  type="submit"
                  disabled
                  className=" rounded-lg w-fit w-24 py-3 px-20 m-2 bg-gray-500 text-white "
                />
              )}
            </form>
          </div>
        </div>
      )}
      {doctor && showDoctor && (
        <div className="scheduleForm m-10 p-5 bg-white">
          <h1 className="textClip text-xl font-bold my-5 ml-2">Add Schedule</h1>

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

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);
  const Doctors = await axios.get("/api/doctors");

  return {
    props: {
      doctors: Doctors.data,
      hospital: response.data[0],
    },
  };
}
