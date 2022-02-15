import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import axios from "../../../lib/axios";
import Search from "../../../components/Admin/Search";
import { useAuth } from "../../../hooks/auth";

export default function Hospitals({ hospitals }) {
  const { user } = useAuth({ middleware: "auth" });
  
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Hospital"
          link="/Admin/Hospitals/Create"
        />
        <Search />
      </div>
      <div className="body">
        <div className="listing flex flex-wrap gap-8">
          {hospitals.map((item) => (
            <Card pic={pic} hospitals={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

Hospitals.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Hospitals" name="Hospitality" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const Hospitals = await axios.get("/api/hospitals");

  return {
    props: {
      hospitals: Hospitals.data,
    },
  };
}
