import Image from "next/image";
import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import DoctorsSchedule from "../../components/sections/DoctorsSchedule";
import image from "../../public/Doc4.jpg";
import LabScheduleCard from "../../components/sections/LabScheduleCard";
import axios from "../../lib/axios";

const DiagnosticsProfile = ({ diagnostics, schedule }) => {
  return (
    <>
      <div className="md:w-[80%] pb-10 w-full mx-auto mt-28 px-5">
        <section className="header">
          <HospitalProfileHeader providers={diagnostics} />
        </section>
        {/*  */}
        <section className="mt-10 w-full">
          <div className="lg:grid lg:grid-cols-3  lg:gap-10 flex flex-col gap-10">
            <Expertise title="Service" services={diagnostics.services} />
            <div className="about lg:row-start-2">
              <About description={diagnostics.description} />
            </div>
            <div className="schedules lg:col-span-2 lg:row-span-6 lg:col-start-2 lg:row-start-1 flex  flex-col gap-10">
              {diagnostics.procedures.map((procedures) => (
                <LabScheduleCard
                  key={procedures.id}
                  provider={procedures}
                  schedule={schedule}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// export async function getStaticPaths() {
//   const response = await axios.get("/api/diagnostics");

//   return {
//     fallback: false,
//     paths: response.data.map((diagnostic) => ({
//       params: { id: diagnostic.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Diagnostics/${params.id}`);
  const scheduleResponse = await axios.get(
    `/api/Diagnostic_schedule/${params.id}`
  );

  return {
    props: {
      diagnostics: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}

export default DiagnosticsProfile;
