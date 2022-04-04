import Picture from "../reusable/Picture";
import pic from "../../public/Doc4.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";

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
      <div className="p-20">
        <div className="flex md:justify-between  justify-between gap-5 flex-wrap ">
          <Picture
            pic={pic}
            size={24}
            className="opacity-60 hover:opacity-100 transition-all"
          />
          <Picture
            pic={pic}
            size={24}
            className="opacity-60 hover:opacity-100 transition-all"
          />
          <Picture
            pic={pic}
            size={24}
            className="opacity-60 hover:opacity-100 transition-all"
          />
          <Picture
            pic={pic}
            size={24}
            className="opacity-60 hover:opacity-100 transition-all"
          />
          <Picture
            pic={pic}
            size={24}
            className="opacity-60 hover:opacity-100 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export const Review = ({ testimonial }) => {
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="md:w-96 w-[90%] m-auto mx-auto bg-blue-50 mb-10">
        <div className="reviewCard  text-center flex flex-col gap-4   justify-center items-center text-slate-700 shadow-lg rounded shadow-blue-200 p-5 pb-10">
          <div className="">
            <FaQuoteRight className="text-3xl text-center  text-sky-500" />
          </div>
          <div className="review h-40">
            <p className="font-medium">{testimonial.testimony}</p>
            <div className="nameTag text-center font-medium text-sm mt-3">
              <div class="text-sky-500  font-bold">{testimonial.name}</div>
              <div class="text-slate-500">{testimonial.title}</div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="TestimonialImage translate-y-10 absolute  mt-0 ">
              {/* <img src="/public/docl.jpg" alt="" size="" /> */}
              {testimonial.image ? (
                <Image
                  loader={myLoader}
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="fill"
                  className="border-2  overflow-hidden   rounded-full object-cover"
                />
              ) : (
                <Picture
                  pic={pic}
                  size="20"
                  className=" shadow-lg shadow-blue-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
