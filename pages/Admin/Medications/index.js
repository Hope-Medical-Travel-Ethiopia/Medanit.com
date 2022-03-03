import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MedList } from "../../../components/Admin/MedList";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";

export default function Medication({ medications }) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Medication"
          link="/Admin/Medications/CreateMed"
        />
        <Search />
      </div>
      <div className="body">
        <section>
          {medications.map((option) => (
            <MedList
              key={option.id}
              name={option.name}
              description={option.description}
              id={option.id}
              type="Medications"
              fromMed={true}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

Medication.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Medications" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("/api/Medications");

  return {
    props: {
      medications: response.data,
    },
  };
}
