import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";

export default function Admin() {
  const { user } = useAuth({ middleware: "auth" });
  const report = [
    {
      number: "43",
      provider: "Hospitals",
    },
    {
      number: "125",
      provider: "Doctors",
    },
    {
      number: "24",
      provider: "Diagnostic centers and Laboratories",
    },
    {
      number: "26",
      provider: "Pharmacies",
    },
    {
      number: "10256",
      provider: "Medications",
    },
    {
      number: "125",
      provider: "Laboratory Tests",
    },
  ];

  return (
    <div className="min-h-screen p-20">
      <section className="flex flex-wrap justify-evenly gap-10 ">
        {report.map((item, index) => (
          <div className="reportCard h-64 w-64 " key={index}>
            <h1 className="number textClip">{item.number}</h1>
            <h3>{item.provider}</h3>
          </div>
        ))}
      </section>
    </div>
  );
}

Admin.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};
