import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import { useAuth } from "../../hooks/auth";

export default function Promotions() {
  return (
    <div className="min-h-screen p-20">
      <div className="flex justify-center items-center">
        <h1 className="comingSoon">coming soon!</h1>
      </div>
    </div>
  );
}

Promotions.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });
  if (isLoading) {
    return <></>;
  }
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
