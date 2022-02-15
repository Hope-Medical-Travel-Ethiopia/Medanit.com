import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/hospital.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";

export default function Hospital({ hospital }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name={hospital.name}
          image={pic}
          phone={hospital.phone}
          email={hospital.email}
          address={hospital.address}
          type="Hospitals"
          provider={hospital.id}
        />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Service" services={hospital.services} />
          <div className="about row-start-2">
            <About description={hospital.description} />
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <RegisterLink
              text="Add New Schedule"
              link="/Admin/Hospitals/CreateSchedule"
              provider={hospital.id}
            />
            <div className="schedules">
              <AdminSchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hospital.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });

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

export async function getStaticPaths() {
  const response = await axios.get("/api/hospitals");

  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);

  return {
    props: {
      hospital: response.data,
    },
  };
}
