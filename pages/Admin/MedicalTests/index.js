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

export default function MedicalTests() {
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Medical Test"
          link="/Admin/medicalTests/CreateTest"
        />
        <Search />
      </div>
      <div className="body">
        <section>
          {medicalTest.map((option) => (
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

const medicalTest = [
  {
    id: 101,
    name: "MRI",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 102,
    name: "CT scan",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 103,
    name: "CBC",
    description: "some description about the medication will be listed here ",
  },
  {
    id: 104,
    name: "X-Ray",
    description: "some description about the medication will be listed here ",
  },
];
MedicalTests.getLayout = function PageLayout(page) {
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
