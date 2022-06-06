import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MedList } from "../../../components/Admin/MedList";
import { useAuth } from "../../../hooks/auth";
import axios from "../../../lib/axios";

export default function Procedures() {
  const { user } = useAuth({ middleware: "auth" });

  const [procedure, setProcedure] = useState([]);
  useEffect(async () => {
    const Procedure = await axios.get("/api/agent/procedures/" + user.id);
    setProcedure(Procedure.data);
  }, []);

  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Register new Medical Test"
          link="/Admin/Procedures/CreateProcedures"
        />
        <Search />
      </div>
      <div className="body">
        <section>
          {/* {Procedure &&
            Procedure.map((option) => (
              <MedList
                key={option.id}
                name={option.name}
                description={option.description}
                id={option.id}
                fromMed={true}
                type="Procedures"
              />
            ))} */}

          <MedList medications={procedure} type="Procedures" fromMed={true} />
        </section>
      </div>
    </div>
  );
}

Procedures.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });
  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Procedures" name="Pharmacys" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};
