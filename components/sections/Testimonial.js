// import { Partners } from "./partners";
import Picture from "../reusable/Picture";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";
import { Review } from "../Review";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Testimonial = ({ testimonial }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;

  return (
    <div className="md:py-20 testimonial">
      <div className="flex flex-col items-center w-[90%] lg:w-[60%] text-center justify-center m-auto mb-10">
        <h1
          className="text-4xl uppercase font-black tracking-wide leading-normal 
          text-transparent bg-clip-text bg-gradient-to-br from-blue-500 
          via-sky-600 to-cyan-500 text-bold"
        >
          {t.nav.testimonial}
        </h1>
        <p className="text-gray-600 text-sm text-bold">{t.testimonialDetail}</p>
      </div>{" "}
      <Carousel
        partialVisible={true}
        // centerMode={true}
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        autoPlaySpeed={3000}
        draggable={true}
        swipeable={true}
        className="w-100"
      >
        {testimonial.map((item) => (
          <Review testimonial={item} key={item.name} />
        ))}
      </Carousel>
      {/* <div className="p-20"><Partners pic={pic} /></div> */}
    </div>
  );
};

export default Testimonial;
