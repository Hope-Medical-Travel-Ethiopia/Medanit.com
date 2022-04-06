import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";
import Picture from "./reusable/Picture";
import pic from "./../public/Doc4.jpg";

import { useState, useEffect } from "react";
export const Review = ({ testimonial }) => {
  const [image, setimage] = useState();

  useEffect(() => {
    setimage(testimonial.image);
  }, [testimonial]);

  const myLoader = ({ src, width, quality }) => {
    return `https://api.medanit.com/storage/${src}?w=${width}&q=${
      quality || 75
    }`;
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
              <div className="text-sky-500  font-bold">{testimonial.name}</div>
              <div className="text-slate-500">{testimonial.title}</div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="TestimonialImage translate-y-10 absolute  mt-0 ">
              {/* <img src="/public/docl.jpg" alt="" size="" /> */}
              {image ? (
                <div className="image overflow-hidden  h-20 w-20 rounded-full relative">
                  <Image
                    loader={myLoader}
                    src={image}
                    alt={testimonial.name}
                    layout="fill"
                    className="border-2  overflow-hidden   rounded-full object-cover"
                  />
                </div>
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
