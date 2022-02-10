import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MedList } from "../../../components/Admin/MedList";
export default function Pharmacy() {
  const id = 1;
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name="Pharmacy Name"
          image={pic}
          phone="+25132345678"
          email="Pharmacyemail@gmail.com"
          address="bole , sarbet 4 kilo around piasa"
          openingTime="12:00 AM"
          closingTime="6:00 PM"
        />
      </div>
      <div className="body my-10">
        <section>
          <RegisterLink
            text="Add New Medication"
            link="/Admin/Pharmacy/CreateMed"
          />
        </section>
        <section></section>
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

Pharmacy.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Pharmacy" current="Pharmacy Name" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
