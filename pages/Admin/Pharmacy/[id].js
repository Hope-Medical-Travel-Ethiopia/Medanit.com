import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/pharmacyDefault.jpg";
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
        <ProfileHeader pic={pic} type="Pharmacy" provider={pharmacy} />
      </div>
      <div className="body mt-10">
        <section>
          <RegisterLink
            text="Add New Medication"
            link={`/Admin/Pharmacy/CreateMed/${pharmacy.id}`}
          />
        </section>
        <section></section>
        <section>
          <MedList
            medications={pharmacy["medications"]}
            type="Medications"
            providerId={pharmacy.id}
          />
        </section>
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
        <AdminNav title="Pharmacy" current="Pharmacy Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Pharmacy/${params.id}`);
  return {
    props: {
      pharmacy: response.data[0],
    },
  };
}
