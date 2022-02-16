import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MedList } from "../../../components/Admin/MedList";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
export default function Pharmacy({ pharmacy }) {
  const id = 1;
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name={pharmacy.name}
          image={pic}
          phone={pharmacy.phone}
          email={pharmacy.email}
          address={pharmacy.address}
          openingTime={pharmacy.opening}
          closingTime={pharmacy.closing}
          type="Pharmacy"
          provider={pharmacy.id}
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
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Pharmacy" current="Pharmacy Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("api/Pharmacy");
  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Pharmacy/${params.id}`);
  return {
    props: {
      pharmacy: response.data,
    },
  };
}
