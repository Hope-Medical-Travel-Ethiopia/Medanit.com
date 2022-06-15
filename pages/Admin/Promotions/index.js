import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { PromoTable } from "../../../components/Admin/PromoTable";

export default function Promotions({ Promotion }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Add new Promotion"
          link="/Admin/Promotions/CreatePromotion"
        />
        <Search />
      </div>
      <div className="body">
        <section>{Promotion && <PromoTable promotion={Promotion} />}</section>
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
        <AdminNav title="Promotions" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/advertisments");

  return {
    props: {
      Promotion: response.data,
    },
  };
}
