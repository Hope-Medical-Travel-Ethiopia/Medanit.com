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

export default function Medication() {
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
            />
          ))}
        </section>
      </div>
    </div>
  );
}

const medications = [
  {
    id: 101,
    name: "Amoxicillin",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 102,
    name: "Benzonate",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 103,
    name: "Sertralin",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 104,
    name: "Amoxicillin",
    description: "some description about the medication will be listed here ",
  },
];
Medication.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Pharmacy" name="Pharmacys" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
