import AboutUs from "../components/sections/AboutUs";
import Contact from "../components/sections/Contact";
import CounterSection from "../components/sections/CounterSection";
import Header from "../components/sections/Header";
import Services from "../components/sections/Services";
import Footer from "../components/layouts/Footer";

const Home = () => {
  return (
    <div id="scatter">
      <Header />
      <AboutUs />
      <CounterSection />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;

Home.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
