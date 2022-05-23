import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import image from "../../public/labDefault.jpg";
import LabScheduleCard from "../../components/sections/LabScheduleCard";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";
import Head from "next/head";

const DiagnosticsProfile = ({ diagnostics, schedule }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;
  return (
    <>
      <Head>
        <title>
          {diagnostics.name} | Medanit - find diagnostic centers in Ethiopia!
        </title>
        <meta
          property="og:title"
          content={`${diagnostics.name} | Medanit - find diagnostic centers in Ethiopia!`}
        />
        <meta
          name="description"
          content={`${diagnostics.name} is an excellent diagnostic center in Ethiopia Addis Ababa. To find top diagnostic centers like ${diagnostics.name} visit Medanit.com`}
        ></meta>
        <meta
          name="keywords"
          content={`${diagnostics.name},diagnostics in Ethiopia , Medical laboratories in Ethiopia , Medical laboratory in Addis ababa`}
        ></meta>
      </Head>
      <div className="md:w-[80%] pb-10 w-full mx-auto mt-28 px-5">
        <section className="header">
          <HospitalProfileHeader providers={diagnostics} DefaultImage={image} />
        </section>
        {/*  */}
        <section className="mt-10 w-full">
          <div className="lg:grid lg:grid-cols-3  lg:gap-10 flex flex-col gap-10">
            <Expertise
              title={t.profile.services}
              services={diagnostics.services}
            />
            {diagnostics.description &&
              diagnostics.description != null &&
              diagnostics.description != "null" && (
                <div className="about lg:row-start-2">
                  <About description={diagnostics.description} content={t} />
                </div>
              )}

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
