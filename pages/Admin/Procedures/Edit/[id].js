import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Admin/Sidebar";
import Footer from "../../../../components/layouts/Footer";
import AdminNav from "../../../../components/Admin/AdminNav";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import axios from "../../../../lib/axios";
import { useAuth } from "../../../../hooks/auth";
import { useRouter } from "next/router";

export default function EditProcedure({ procedure, procedures }) {
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const [values, setValues] = React.useState({
    name: "",
    description: "",
  });

  const [schedule, setSchedule] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    setValues(procedure);
  }, [procedure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .put(`/api/Procedure/${procedure.id}`, {
        name: values.name,
        description: values.description,
        agent_id: user.id,
        agent_name: user.name,
      })
      .then((response) => {
        router.push("/Admin/Procedures");
      });
  };
  return (
    <div className="min-h-screen">
      <div className="Heading">
        <div className=" pageTitle m-10 bg-white p-5 flex items-center pl-10 justify-start ">
          <h1 className="text-2xl font-bold tracking-wider uppercase textClip">
            Edit {procedure.name}
          </h1>
        </div>
      </div>

      <div className="body">
        <section>
          <div className="m-10 p-5 bg-white">
            <h1 className="textClip text-xl font-bold my-5 ml-2">
              Edit {procedure.name}
            </h1>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
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
                  value="Update Procedure"
                  className=" rounded-lg w-fit py-3 px-20 m-2 bg-emerald-500 
                  text-white transition-all hover:bg-emerald-700 hover:cursor-pointer"
                />
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

EditProcedure.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Procedures" current="Edit Procedure" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("/api/Procedures");
//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Procedure/${params.id}`);
  const procedureResponse = await axios.get("/api/Procedures");
  return {
    props: {
      procedure: response.data,
      procedures: procedureResponse.data,
    },
  };
}
