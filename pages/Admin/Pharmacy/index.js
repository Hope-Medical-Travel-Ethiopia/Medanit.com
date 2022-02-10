import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
export default function Pharmacy() {
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
          <Card
            pic={pic}
            name="The Long Pharmacy name is here"
            phone=" +251987654321"
            email="thisemailis@email.com"
            view="/Admin/Pharmacy/1"
          />
        </div>
      </div>
    </div>
  );
}

Pharmacy.getLayout = function PageLayout(page) {
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
