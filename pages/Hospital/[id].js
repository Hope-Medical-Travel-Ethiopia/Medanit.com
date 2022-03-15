import Image from "next/image";
import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import DoctorsSchedule from "../../components/sections/DoctorsSchedule";
import image from "../../public/hospitalDefault.jpg";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";

const HospitalProfile = ({ hospitals, schedule }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : en;

  return (
    <>
      <div className="md:w-[80%] pb-10 w-full mx-auto mt-28 px-5">
        <section className="header">
          <HospitalProfileHeader providers={hospitals} DefaultImage={image} />
        </section>
        {/*  */}
        <section className=" mt-10 w-full ">
          <div className="lg:grid lg:grid-cols-3  lg:gap-10 flex flex-col gap-10">
            <Expertise
              title={t.profile.services}
              services={hospitals.services}
            />
            <div className="about lg:row-start-2 ">
              <About content={t} description={hospitals.description} />
            </div>
            <div className="schedules lg:col-span-2 lg:row-span-6 lg:col-start-2 lg:row-start-1 flex  flex-col gap-10 ">
              {hospitals.doctors.map((doctor) => (
                <DoctorsSchedule
                  provider={doctor}
                  schedule={schedule}
                  id={doctor.id}
                  key={doctor.id}
                  content={t}
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
//   const response = await axios.get("/api/hospitals");

//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);
  const scheduleResponse = await axios.get(`/api/schedule/${params.id}`);

  return {
    props: {
      hospitals: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}

export default HospitalProfile;
