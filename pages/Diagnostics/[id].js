import Image from "next/image";
import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import DoctorsSchedule from "../../components/sections/DoctorsSchedule";
import image from "../../public/Doc4.jpg";
import LabScheduleCard from "../../components/sections/LabScheduleCard";
import axios from "../../lib/axios";

const DiagnosticsProfile = ({ diagnostics }) => {
  return (
    <>
      <div className="w-[80%] mx-auto mt-5">
        <section className="header">
          <HospitalProfileHeader
            name={diagnostics.name}
            phone={diagnostics.phone}
            email={diagnostics.email}
            address={diagnostics.address}
          />
        </section>
        {/*  */}
        <section className="body mt-10">
          <div className="grid grid-cols-3  gap-10">
            <Expertise title="Service" />
            <div className="about row-start-2">
              <About />
            </div>
            <div className="schedules col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
              <LabScheduleCard title="MRI - Cervical Spine (without contrast)" />
              <LabScheduleCard title="MRI - Cervical Spine (without contrast)" />
              <LabScheduleCard title="MRI - Cervical Spine (without contrast)" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("/diagnostics");

  return {
    fallback: false,
    paths: response.data.map((diagnostic) => ({
      params: { id: diagnostic.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/Diagnostics/${params.id}`);

  return {
    props: {
      diagnostics: response.data,
    },
  };
}

export default DiagnosticsProfile;
