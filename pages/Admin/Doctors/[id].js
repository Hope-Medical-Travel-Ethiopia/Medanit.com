import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import hospital from "../../../public/hospital.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { Router, useRouter } from "next/router";

export default function Doctor({ doctors }) {
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
            <About description={doctors.description} />
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <div className="schedules">
              {/* <AdminSchedule
                name="Hospital Long Name goes here"
                phone="+251987654321"
                address="bole 4 kilo biyasa around ayer tena"
                email="hospitalemail@email.com"
                pic={hospital}
                provider={doctors}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Doctor.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });
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

export async function getStaticPaths() {
  const response = await axios.get("/api/doctors");
  console.log(response);
  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Doctors/${params.id}`);
  console.log(response);
  return {
    props: {
      doctors: response.data,
    },
  };
}
