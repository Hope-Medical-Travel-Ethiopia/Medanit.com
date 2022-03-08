import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useAuth } from "../../../../hooks/auth";
import axios from "../../../../lib/axios";
import { Router, useRouter } from "next/router";

export default function EditSchedule({
  doctorId,
  hospitalId,
  schedule,
  pivot,
}) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();

  const [schedules, setschedules] = useState([
    { day: "", starting: "", ending: "" },
  ]);

  useEffect(() => {
    {
      // schedule[`${doctor.id}`] &&
      //   schedule[`${doctor.id}`].map((item) => {
      //   });
      schedule[doctorId] && setschedules(schedule[doctorId]);
    }
  }, [doctorId, schedule]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .put(`/api/Hospital_schedule/${pivot.id}`, {
        hospital_id: hospitalId,
        doctor_id: doctorId,
        schedule: schedules,
      })
      .then((response) => {
        // console.log(response.data);
        router.push(`/Admin/Hospitals/${hospitalId}`);
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Edit Doctors Schedule
          </h1>
        </div>
      </div>

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

EditSchedule.getLayout = function PageLayout(page) {
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
          current="Edit Doctor's Schedule"
          // parent="hospital"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const response = await axios.get(`/api/Hospitals/${query.parentId}`);
  const Doctors = await axios.get(`/api/Doctors/${query.providerId}`);
  const scheduleResponse = await axios.get(`/api/schedule/${query.parentId}`);
  const pivot = await axios.get(
    `/api/HospitalDoctorPivot/${query.parentId}/${query.providerId}`
  );

  // console.log(scheduleResponse.data);
  return {
    props: {
      doctorId: query.providerId,
      hospitalId: query.parentId,
      schedule: scheduleResponse.data,
      pivot: pivot.data,
    },
  };
}
