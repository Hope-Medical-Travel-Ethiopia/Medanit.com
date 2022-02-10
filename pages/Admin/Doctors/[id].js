import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import pic from "../../../public/Doc4.jpg";
import hospital from "../../../public/hospital.jpg";
import Expertise from "../../../components/sections/ExpertiseSection";
import About from "../../../components/sections/About";
import ProfileHeader from "../../../components/Admin/ProfileHeader";
import RegisterLink from "../../../components/Admin/RegisterLink";
import AdminSchedule from "../../../components/Admin/AdminSchedule";
export default function Doctor() {
  const id = 1;
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="profileBar">
        <ProfileHeader
          name="Doctor Name"
          image={pic}
          phone="+25132345678"
          email="Doctoremail@gmail.com"
          address="bole , sarbet 4 kilo around piasa"
        />
      </div>
      <div className="body my-10">
        <div className="grid grid-cols-3  gap-10">
          <Expertise title="Expertise" />
          <div className="about row-start-2">
            <About />
          </div>
          <div className=" col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
            <div className="schedules">
              <AdminSchedule
                name="Hospital Long Name goes here"
                phone="+251987654321"
                address="bole 4 kilo biyasa around ayer tena"
                email="hospitalemail@email.com"
                pic={hospital}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Doctor.getLayout = function PageLayout(page) {
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Doctors" current="Doctor Name" />
        {page}
      </div>
      <Footer />
    </div>
  );
};
