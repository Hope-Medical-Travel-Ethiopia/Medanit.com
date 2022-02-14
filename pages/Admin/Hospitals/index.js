import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import { useAuth } from "../../../hooks/auth";

export default function Hospitals() {
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
          <Card
            pic={pic}
            name="The Long Hospital name is here"
            phone=" +251987654321"
            email="thisemailis@email.com"
            view="/Admin/Hospitals/1"
          />
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
