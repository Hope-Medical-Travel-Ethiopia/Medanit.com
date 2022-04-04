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

export default function CreateTestimonial({ testimonial }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const { disableButton, setdisableButton } = useState(false);
  const [values, setValues] = React.useState({
    name: "",
    title: "",
    testimony: "",
    image: null,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setdisableButton(true);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    formData.append("image", values.image);
    formData.append("testimony", values.testimony);

    const response = axios({
      url: "/api/testimonial",
      method: "POST",
      data: formData,
    }).then((response) => {
      // console.log(response.data);
      router.push("/Admin/testimonial");
    });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Add new testimonial
          </h1>
        </div>
      </div>

      <div className="body">
        <section>
          <div className="m-10 p-5 bg-white">
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Create New testimonial
            </h1>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between flex-wrap">
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`testimonial-name`}>Name</InputLabel>
                    <OutlinedInput
                      required
                      id="testimonial-name"
                      type="text"
                      value={values.name}
                      onChange={handleChange("name")}
                      label="Name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`testimonial-title`}>Title</InputLabel>
                    <OutlinedInput
                      required
                      id="testimonial-title"
                      type="text"
                      value={values.title}
                      onChange={handleChange("title")}
                      label="title"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "100ch" }} variant="outlined">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Testimony"
                      multiline
                      rows={4}
                      value={values.testimony}
                      onChange={handleChange("testimony")}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <TextField
                      id="testimonial-registration-picture"
                      type="file"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          ["image"]: e.target.files[0],
                        })
                      }
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

CreateTestimonial.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav
          title="testimonial"
          current="Create New testimonial"
          user={user}
        />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/testimonial");

  return {
    props: {
      testimonial: response.data,
    },
  };
}
