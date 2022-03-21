import Image from "next/image";
import About from "../../components/sections/About";
import DoctorProfileHeader from "../../components/sections/DoctorProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import HospitalSchedule from "../../components/sections/HospitalSchedule";
import image from "../../public/DocDefault.jpg";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";
import Head from "next/head";

const DoctorProfile = ({ doctor, schedule }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;
  return (
    <>
      <Head>
        <title>{doctor.name} | Medanit - find doctors in Ethiopia!</title>
        <meta
          property="og:title"
          content={`${doctor.name} | Medanit - find doctors in Ethiopia!`}
        />
        <meta
          name="description"
          content={`${doctor.name} is an excellent ${doctor.speciality} in Ethiopia , Addis Ababa . To find top doctors like ${doctor.name} visit Medanit.com`}
        ></meta>
        <meta
          name="keywords"
          content={`${doctor.name},${doctor.speciality} , Doctors in Ethiopia Addis Ababa , Ethiopian Doctors , ${doctor.speciality} in Ethiopia Addis Ababa`}
        ></meta>
      </Head>
      <div className="md:w-[80%] pb-10 w-full mx-auto mt-28 px-5">
        <section className="header">
          <DoctorProfileHeader providers={doctor} DefaultImage={image} />
        </section>
        {/*  */}
        <section className=" mt-10 w-full ">
          <div className="lg:grid lg:grid-cols-3  lg:gap-10 flex flex-col gap-10">
            <Expertise
              title={t.profile.expertise}
              services={doctor.expertise}
            />
            <div className="about lg:row-start-2">
              <About description={doctor.description} content={t} />
            </div>
            <div className="schedules lg:col-span-2 lg:row-span-6 lg:col-start-2 lg:row-start-1 flex  flex-col gap-10 ">
              {doctor.hospitals.map((hospital) => (
                <HospitalSchedule
                  key={hospital.id}
                  schedule={schedule}
                  provider={hospital}
                  hospital={hospital}
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
//   const response = await axios.get("/api/doctors");

//   return {
//     fallback: false,
//     paths: response.data.map((item) => ({
//       params: { id: item.id.toString() },
//     })),
//   };
// }

export async function getServerSideProps({ params }) {
  const response = await axios.get(`/api/Doctors/${params.id}`);
  const scheduleResponse = await axios.get(`/api/scheduleDoctor/${params.id}`);
  return {
    props: {
      doctor: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}

export default DoctorProfile;
