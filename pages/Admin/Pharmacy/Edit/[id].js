import React, { useEffect, useState } from "react";
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
import axios from "../../../../lib/axios";
import { useAuth } from "../../../../hooks/auth";
import { useRouter } from "next/router";

export default function CreatePharmacy({ pharmacy }) {
  const serviceList = ["Service 1", "Service 2", "Service 3"];
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [disableButton, setdisableButton] = useState(false);

  const [values, setValues] = React.useState({
    name: pharmacy.name,
    email: pharmacy.email,
    address: pharmacy.address,
    logo: pharmacy.logo,
    phone: pharmacy.phone,
    opening: pharmacy.opening,
    closing: pharmacy.closing,
  });
  const [fullDay, setfullDay] = useState(false);
  const handleFullDay = () => {
    setfullDay(!fullDay);
    if (fullDay == false) {
      setValues({ ...values, closing: "00:00", opening: "00:00" });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableButton(true);

    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("logo", values.logo);
    formData.append("opening", values.opening);
    formData.append("closing", values.closing);
    formData.append("user_id", values.user_id);
    formData.append("agent_id", user.id);
    formData.append("agent_name", user.name);
    const response = await axios({
      url: `/api/Pharmacy/${pharmacy.id}`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      router.push("/Admin/Pharmacy");
    });
  };

  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className="pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Edit Pharmacy Center
          </h1>
        </div>
      </div>
      <div className="body mx-10 p-10 bg-white">
        <h1 className="text-xl font-bold  tracking-wider mb-5 uppercase textClip">
          Add new Schedule
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex justify-between flex-wrap">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-name`}>
                Pharmacy Name
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                label="Pharmacy name"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-phone`}>
                Phone
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-phone"
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                label="Pharmacy phone"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-email`}>
                Pharmacy email
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                label="Pharmacy email"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor={`Pharmacy-registration-address`}>
                address
              </InputLabel>
              <OutlinedInput
                required
                id="Pharmacy-registration-address"
                type="text"
                value={values.address}
                onChange={handleChange("address")}
                label="Pharmacy address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <label
                className="mb-2 text-sm text-gray-600"
                htmlFor={`pharmacy-registration-logo`}
              >
                {" "}
                Pharmacy Logo
              </label>
              <TextField
                id="Pharmacy-registration-logo"
                type="file"
                inputProps={{ accept: "image/" }}
                onChange={(e) =>
                  setValues({ ...values, ["logo"]: e.target.files[0] })
                }
              />
            </FormControl>
            <div className="flex items-center">
              <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                <label
                  className="mb-2 text-sm text-gray-600"
                  htmlFor={`pharmacy-openning-time`}
                >
                  Openning time
                </label>

                {fullDay ? (
                  <TextField type="time" disabled />
                ) : (
                  <TextField
                    required
                    id="pharmacy-openning-time"
                    type="time"
                    onChange={handleChange("opening")}
                  />
                )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "19ch" }} variant="outlined">
                <label
                  className="mb-2 text-sm text-gray-600"
                  htmlFor={`pharmacy-closing-time`}
                >
                  Closing time
                </label>
                {fullDay ? (
                  <TextField disabled type="time" />
                ) : (
                  <TextField
                    required
                    id="pharmacy-closing-time"
                    type="time"
                    onChange={handleChange("closing")}
                  />
                )}
              </FormControl>
              <div className="">
                <FormControlLabel
                  control={<Checkbox size="large" onChange={handleFullDay} />}
                  label="24 hours"
                />
              </div>
            </div>
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
  );
}

CreatePharmacy.getLayout = function PageLayout(page) {
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
          current="Register New Pharmacy"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Pharmacy/${params.id}`);
  return {
    props: {
      pharmacy: response.data[0],
    },
  };
}
