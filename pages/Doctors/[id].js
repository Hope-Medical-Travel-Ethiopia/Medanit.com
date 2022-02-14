import Image from "next/image";
import About from "../../components/sections/About";
import DoctorProfileHeader from "../../components/sections/DoctorProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import HospitalSchedule from "../../components/sections/HospitalSchedule";
import image from "../../public/Doc4.jpg";
import axios from "../../lib/axios";

const DoctorProfile = ({ doctor }) => {
  return (
    <>
      <div className="w-[80%] mx-auto mt-5">
        <section className="header">
          <DoctorProfileHeader
            name={doctor.name}
            address={doctor.address}
            speciality={doctor.speciality}
          />
        </section>
        {/*  */}
        <section className="body mt-10">
          <div className="grid grid-cols-3  gap-10">
            <Expertise title="Expertise" />
            <div className="about row-start-2">
              <About />
            </div>
            <div className="schedules col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
              <HospitalSchedule />
              <HospitalSchedule />
              <HospitalSchedule />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export async function getStaticPaths() {
  const response = await axios.get("/api/doctors");

  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Doctors/${params.id}`);

  return {
    props: {
      doctor: response.data,
    },
  };
}

export default DoctorProfile;
