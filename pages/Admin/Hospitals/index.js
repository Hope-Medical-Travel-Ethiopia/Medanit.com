import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/hospitalDefault.jpg";
import Card from "../../../components/Admin/Card";
import RegisterLink from "../../../components/Admin/RegisterLink";
import axios from "../../../lib/axios";
import Search from "../../../components/Admin/Search";

import { useAuth } from "../../../hooks/auth";

export default function Hospitals() {
  const { user } = useAuth({ middleware: "auth" });
  const [hospitals, setHospitals] = useState([]);

  const getData = async () => {
    await axios.get("/api/agent/hospitals/" + user.id).then((res) => {
      setHospitals(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
            {hospitals.map((item) => (
              <Card pic={pic} provider={item} type="Hospitals" key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Hospitals.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
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

// export async function getServerSideProps() {
//   const Hospitals = await axios.get("/api/hospitals");

//   return {
//     props: {
//       hospitals: Hospitals.data,
//     },
//   };
// }
