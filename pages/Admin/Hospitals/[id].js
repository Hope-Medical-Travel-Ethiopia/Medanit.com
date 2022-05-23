import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/hospitalDefault.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";

export default function Hospital({ hospital, schedule }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader pic={pic} type="Hospitals" provider={hospital} />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Service" services={hospital.services} />
          <div className="about row-start-2">
            {hospital.description && hospital.description != "null" && (
              <About description={hospital.description} />
            )}
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <RegisterLink
              text="Add New Schedule"
              link="/Admin/Hospitals/CreateSchedule"
              provider={hospital.id}
            />
            <div className="schedules">
              {hospital.doctors.map((doctor) => (
                <AdminSchedule
                  parent={hospital}
                  provider={doctor}
                  schedule={schedule}
                  key={doctor.id}
                  providerType="Doctors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hospital.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Hospitals" current="Hospital Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("/api/hospitals");
//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);
  const scheduleResponse = await axios.get(`/api/schedule/${params.id}`);
  // console.log(scheduleResponse.data);
  return {
    props: {
      hospital: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}
