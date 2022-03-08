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
}) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? am : en;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Medanit | Health Care Just Got better</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
        <CounterSection content={t.counter} />
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

export async function getStaticProps() {
  const DoctorsResponse = await axios.get("/api/doctors");
  const diagnosticResponse = await axios.get("/api/diagnostics");
  const hospitalResponse = await axios.get("/api/hospitals");
  const pharmacyResponse = await axios.get("/api/Pharmacy");
  const procedureResponse = await axios.get("/api/Procedures");
  const MedicationResponse = await axios.get("/api/Medications");

  return {
    props: {
      doctors: DoctorsResponse.data,
      diagnostics: diagnosticResponse.data,
      hospitals: hospitalResponse.data,
      pharmacy: pharmacyResponse.data,
      procedures: procedureResponse.data,
      medication: MedicationResponse.data,
    },
    revalidate: 1,
  };
}
