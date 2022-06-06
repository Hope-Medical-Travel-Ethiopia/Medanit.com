import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/hospitalDefault.jpg";
import doctorDefaultPicture from "../../../public/DocDefault.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";

export default function Hospital({ id }) {
  const { user } = useAuth({ middleware: "auth" });

  const [hospital, setHospital] = useState([]);
  const [schedule, setSchedule] = useState();
  const [doctors, setDoctors] = useState();

  useEffect(async () => {
    const Hospital = await axios.get(`/api/Hospitals/${id}`);
    const Schedule = await axios.get(`/api/schedule/${id}`);
    setDoctors(Hospital.data[0].doctors);
    setHospital(Hospital.data[0]);
    setSchedule(Schedule.data);
  }, []);

  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader pic={pic} type="Hospitals" provider={hospital} />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Service" services={hospital.services} />
          <div className="about row-start-2">
            {hospital.description && hospital.description != "null" && (
              <About description={hospital.description} />
            )}
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <RegisterLink
              text="Add New Schedule"
              link="/Admin/Hospitals/CreateSchedule"
              provider={hospital.id}
            />
            <div className="schedules">
              {schedule &&
                doctors &&
                doctors.map((doctor) => (
                  <AdminSchedule
                    pic={doctorDefaultPicture}
                    parent={hospital}
                    provider={doctor}
                    schedule={schedule}
                    key={doctor.id}
                    providerType="Doctors"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hospital.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Hospitals" current="Hospital Name" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
