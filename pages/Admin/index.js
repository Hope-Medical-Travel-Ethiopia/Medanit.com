import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";

export default function Admin({ counter }) {
  const { user } = useAuth({ middleware: "auth" });

  const report = counter;

  return (
    <div className="min-h-screen p-20">
      {user && user.role == 0 && (
        <section className="flex flex-wrap justify-evenly gap-10 ">
          {report.map((item, index) => (
            <div className="reportCard h-64 w-64 " key={index}>
              <h1 className="number textClip">{item.number}</h1>
              <h3>{item.provider}</h3>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

Admin.getLayout = function PageLayout(page) {
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

export async function getServerSideProps() {
  const CounterResponse = await axios.get("/api/Count");

  return {
    props: {
      counter: CounterResponse.data,
    },
  };
}
