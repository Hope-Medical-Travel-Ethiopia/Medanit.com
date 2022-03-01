import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
export default function Pharmacy({ hospitals }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Pharmacy"
          link="/Admin/Pharmacy/Create"
        />
        <Search />
      </div>
      <div className="body">
        <div className="listing flex flex-wrap gap-8">
          {hospitals.map((item) => (
            <Card pic={pic} provider={item} type="Pharmacy" key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

Pharmacy.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Pharmacy" name="Pharmacys" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const Hospitals = await axios.get("/api/Pharmacy");

  return {
    props: {
      hospitals: Hospitals.data,
    },
  };
}
