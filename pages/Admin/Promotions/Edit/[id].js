import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import axios from "../../../../lib/axios";
import { useAuth } from "../../../../hooks/auth";
import { useRouter } from "next/router";

export default function EditPromotion({ promotion }) {
  const { user } = useAuth({ middleware: "auth" });
  const { disableButton, setdisableButton } = useState(false);
  const router = useRouter();
  const [values, setValues] = React.useState({
    company_name: "",
    ad_type: "",
    priority: "",
    web_link: "",
    phone_link: "",
    upload_date: "2022-06-18",
    down_date: "2022-06-18",
    is_active: "1",
    image: null,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    setValues(promotion);
  }, [promotion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("company_name", values.company_name);
    formData.append("ad_type", values.ad_type);
    formData.append("priority", values.priority);
    formData.append("web_link", values.web_link);
    formData.append("phone_link", values.phone_link);
    formData.append("upload_date", values.upload_date);
    formData.append("down_date", values.down_date);
    formData.append("is_active", values.is_active);
    formData.append("photo", values.image);

    const response = await axios({
      url: `/api/advertisment/${promotion.id}`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      router.push("/Admin/Promotions");
    });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Edit {promotion.name}
          </h1>
        </div>
      </div>

      <div className="body">
        <section>
          <div className="m-10 p-5 bg-white">
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Edit {promotion.name}
            </h1>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between flex-wrap">
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`promotion-name`}>
                      Company Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="promotion-name"
                      type="text"
                      value={values.company_name}
                      onChange={handleChange("company_name")}
                      label="Company Name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                    <InputLabel htmlFor={`ad_type`}>AD Type</InputLabel>
                    <Select
                      required
                      labelId="ad_type"
                      id="ad_type"
                      name="ad_type"
                      label="Ad Type"
                      value={values.ad_type}
                      onChange={handleChange("ad_type")}
                    >
                      <MenuItem value="0">HomePage</MenuItem>
                      <MenuItem value="1">Listing</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                    <InputLabel htmlFor={`priority`}>Priority</InputLabel>
                    <Select
                      required
                      labelId="priority"
                      id="priority"
                      name="priority"
                      label="priority"
                      value={values.priority}
                      onChange={handleChange("priority")}
                    >
                      <MenuItem value="0">High</MenuItem>
                      <MenuItem value="1">Medium</MenuItem>
                      <MenuItem value="2">Low</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`web_link`}>Website</InputLabel>
                    <OutlinedInput
                      id="web_link"
                      type="url"
                      value={values.web_link}
                      onChange={handleChange("web_link")}
                      label="Website"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`phone_link`}>Phone Number</InputLabel>
                    <OutlinedInput
                      id="phone_link"
                      type="tel"
                      value={values.phone_link}
                      onChange={handleChange("phone_link")}
                      label="Phone number"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`upload_date`}>Upload Date</InputLabel>
                    <OutlinedInput
                      required
                      id="upload_date"
                      type="date"
                      value={values.upload_date}
                      onChange={handleChange("upload_date")}
                      label="upload_date"
                      // defaultValue="2022-06-18"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <InputLabel htmlFor={`down_date`}>down Date</InputLabel>
                    <OutlinedInput
                      required
                      id="down_date"
                      type="date"
                      value={values.down_date}
                      onChange={handleChange("down_date")}
                      label="down_date"
                      // defaultValue="2022-06-18"
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                    <TextField
                      id="promotion-registration-picture"
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
                    type="submit"
                    disabled
                    className=" rounded-lg w-fit  py-3 px-20 m-2 bg-gray-500 text-white "
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

EditPromotion.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Promotions" current="Edit Promotion" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/advertisment/${params.id}`);
  return {
    props: {
      promotion: response.data,
    },
  };
}
