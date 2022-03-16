import Head from "next/head";
import axios from "./../lib/axios";
import AboutUs from "../components/sections/AboutUs";
import Contact from "../components/sections/Contact";
import CounterSection from "../components/sections/CounterSection";
import Header from "../components/sections/Header";
import Services from "../components/sections/Services";
import Footer from "../components/layouts/Footer";
import { useRouter } from "next/router";
import en from "../locales/en";
import am from "../locales/am";

export default function Home({
  doctors,
  diagnostics,
  hospitals,
  pharmacy,
  procedures,
  medication,
  counter,
}) {
  const router = useRouter();
  const { locale } = router;
  // console.log(locale);
  const t = locale === "en" ? en : am;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Medanit | Health Care Just Got better</title>
        <meta
          name="description"
          content="Medanit is the best place to find medical information, doctors, hospitals, pharmacies, laboratories and maps of Ethiopia. Search for the best doctors in Medanit, Ethiopian Online Medical Search Engine. Welcome to the largest online directory of doctors in Ethiopia. Medanit is an global online medical search engine and referral service providing best quality doctors and facilities in Ethiopia."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main id="scatter">
        <Header
          doctors={doctors}
          diagnostics={diagnostics}
          hospitals={hospitals}
          pharmacy={pharmacy}
          procedures={procedures}
          medication={medication}
          sam="samuel Kedir"
          content={t.home}
        />
        <AboutUs content={t.about} />
        <CounterSection content={t.counter} counter={counter} />
        <Services />
        <Contact contact={t.contact} />
      </main>
    </div>
  );
}

Home.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  // const DoctorsResponse = await axios.get("/api/doctors");
  // const diagnosticResponse = await axios.get("/api/diagnostics");
  // const hospitalResponse = await axios.get("/api/hospitals");
  // const pharmacyResponse = await axios.get("/api/Pharmacy");
  // const procedureResponse = await axios.get("/api/Procedures");
  // const MedicationResponse = await axios.get("/api/Medications");
  const Response = await axios.get("/api/all");
  const CounterResponse = await axios.get("/api/CountProviders");

  // console.log(Response.data.medications);
  return {
    props: {
      doctors: Response.data.doctors,
      diagnostics: Response.data.medications,
      hospitals: Response.data.hospitals,
      pharmacy: Response.data.pharmacies,
      procedures: Response.data.procedures,
      medication: Response.data.medications,
      counter: CounterResponse.data,
    },
  };
}
