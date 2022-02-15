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
export default function Diagnostic({ hospitals }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Diagnostic"
          link="/Admin/Diagnostic/Create"
        />
        <Search />
      </div>
      <div className="body">
        <div className="listing flex flex-wrap gap-8">
          {hospitals.map((item) => (
            <Card pic={pic} provider={item} type="Diagnostics" key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

Diagnostic.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Diagnostic" name="Diagnostics" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const Hospitals = await axios.get("/api/diagnostics");

  return {
    props: {
      hospitals: Hospitals.data,
    },
  };
}
