import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import LabScheduleCard from "../../../components/sections/LabScheduleCard";
export default function Diagnostic() {
  const id = 1;
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name="Diagnostic Name"
          image={pic}
          phone="+25132345678"
          email="Diagnosticemail@gmail.com"
          address="bole , sarbet 4 kilo around piasa"
        />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Service" />
          <div className="about row-start-2">
            <About />
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <RegisterLink
              text="Add New Schedule"
              link="/Admin/Diagnostic/CreateSchedule"
            />
            <div className="schedules flex flex-col gap-10">
              <LabScheduleCard title="MRI - Cervical Spine (without contrast)" />
              <LabScheduleCard title="MRI - Cervical Spine (without contrast)" />
            </div>
          </div>
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
        <AdminNav title="Diagnostic" current="Diagnostic Name" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
