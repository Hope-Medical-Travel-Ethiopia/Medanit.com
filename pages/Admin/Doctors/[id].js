import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/DocDefault.jpg";
import hospitalDefaultPicture from "../../../public/hospitalDefault.jpg";
import hospital from "../../../public/hospital.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { Router, useRouter } from "next/router";

export default function Doctor({ doctors, schedule }) {
  const id = 1;
  const { user } = useAuth({ middleware: "auth" });
  const router = useRouter();

  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader pic={pic} type="Doctors" provider={doctors} />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Expertise" services={doctors.expertise} />
          <div className="about row-start-2">
            {doctors.description && doctors.description != "null" && (
              <About description={doctors.description} />
            )}
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <div className="schedules">
              {doctors.hospitals.map((hospital) => (
                <AdminSchedule
                  pic={hospitalDefaultPicture}
                  parent={doctors}
                  provider={hospital}
                  schedule={schedule}
                  key={hospital.id}
                  providerType="Hospitals"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Doctor.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Doctors" current="Doctor Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Doctors/${params.id}`);
  const scheduleResponse = await axios.get(
    `/api/scheduleDoctorAdmin/${params.id}`
  );
  return {
    props: {
      doctors: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}
