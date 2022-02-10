import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
export default function Diagnostic() {
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
          <Card
            pic={pic}
            name="The Long Diagnostic name is here"
            phone=" +251987654321"
            email="thisemailis@email.com"
            view="/Admin/Diagnostic/1"
          />
        </div>
      </div>
    </div>
  );
}

Diagnostic.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Diagnostic" name="Diagnostics" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
