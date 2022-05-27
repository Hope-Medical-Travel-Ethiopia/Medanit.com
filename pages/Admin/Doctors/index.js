import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/DocDefault.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { DoctorsList } from "../../../components/Admin/DoctorsList";

export default function Doctors({ doctors }) {
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink text="Register new Doctor" link="/Admin/Doctors/Create" />
        <Search />
      </div>
      <div className="body">
        <div className="listing flex flex-wrap gap-8">
          {/* {doctors.map((item) => (
            <Card pic={pic} provider={item} type="Doctors" key={item.id} />
          ))} */}

          <DoctorsList
            medications={doctors}
            type="Doctors"
            fromDoctors={true}
          />
        </div>
      </div>
    </div>
  );
}

Doctors.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Doctors" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const Doctors = await axios.get("/api/doctors");

  return {
    props: {
      doctors: Doctors.data,
    },
  };
}
