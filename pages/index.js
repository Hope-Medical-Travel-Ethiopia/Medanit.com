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
import Testimonial from "../components/sections/Testimonial";
import Promotions from "../components/sections/Promotions";
export default function Home({ counter, testimonial, advertisment }) {
  const router = useRouter();
  const { locale } = router;
  // console.log(locale);
  const t = locale === "en" ? en : am;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Medanit Ethiopian Medical Directory| Find Doctors , Hospitals and
          Pharmacies in Ethiopia
        </title>
        <meta
          name="description"
          content="Medanit is the best place to find Ethiopian medical information. Find doctors in Ethiopia , hospitals in Ethiopia, pharmacies in Ethiopia, laboratories in Ethiopia. Search for the best doctors in Medanit, Ethiopian Online Medical Search Engine. Welcome to the largest online directory of doctors in Ethiopia. Medanit is an global online medical search engine and referral service providing best quality doctors and facilities in Ethiopia."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main id="scatter">
        <Header content={t.home} />
        <AboutUs content={t.about} />
        <CounterSection content={t.counter} counter={counter} />
        <Services />
        <Promotions advertisment={advertisment} />
        <Testimonial testimonial={testimonial} />
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
  const Testimonial = await axios.get("/api/testimonial");
  const CounterResponse = await axios.get("/api/CountProviders");
  const AdvertismentResponse = await axios.get("/api/homepage/advertisments");
  return {
    props: {
      counter: CounterResponse.data,
      testimonial: Testimonial.data,
      advertisment: AdvertismentResponse.data.data,
    },
  };
}
