import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/labDefault.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import LabScheduleCard from "../../../components/sections/LabScheduleCard";
import axios from "../../../lib/axios";
import LabSchedule from "../../../components/Admin/LabSchedule";

import { useAuth } from "../../../hooks/auth";
export default function Diagnostic({ diagnostics, schedule }) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader pic={pic} type="Diagnostics" provider={diagnostics} />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Service" services={diagnostics.services} />
          <div className="about row-start-2">
            {diagnostics.description && diagnostics.description != "null" && (
              <About description={diagnostics.description} />
            )}
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <RegisterLink
              text="Add New Schedule"
              link={`/Admin/Diagnostics/CreateSchedule`}
              provider={diagnostics.id}
            />
            <div className="schedules flex flex-col">
              {" "}
              {diagnostics.procedures.map((procedure) => (
                <LabSchedule
                  parent={diagnostics}
                  provider={procedure}
                  schedule={schedule}
                  key={procedure.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Diagnostic.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Diagnostics" current="Diagnostic Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("/api/diagnostics");
//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Diagnostics/${params.id}`);
  const scheduleResponse = await axios.get(
    `/api/Diagnostic_schedule/${params.id}`
  );
  return {
    props: {
      diagnostics: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}
