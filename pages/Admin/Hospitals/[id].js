import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/hospital.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
export default function Hospital() {
  const id = 1;
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name="Hospital Name"
          image={pic}
          phone="+25132345678"
          email="hospitalemail@gmail.com"
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
              link="/Admin/Hospitals/CreateSchedule"
            />
            <div className="schedules">
              <AdminSchedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hospital.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Hospitals" current="Hospital Name" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
