import Image from "next/image";
import seo from "../../public/laboratory.jpg";
import Doc4 from "../../public/Doc4.jpg";
import Hospital from "../../public/pharmacy.jpg";
import { useState } from "react";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";

import Link from "next/link";

const Services = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : am;
  const serviceData = [
    {
      id: 1,
      title: t.service[0].title,
      description:t.service[0].description,
      picture: seo,
    },
    {
      id: 2,
      title: t.service[1].title,
      description:t.service[1].description,
      picture: Doc4,
    },
    {
      id: 3,
      title: t.service[2].title,
      description:t.service[2].description,
      picture: seo,
    },
    {
      id: 4,
      title: t.service[3].title,
      description:t.service[3].description,
      picture: seo,
    },
  ];

  return (
    <>
      <div
        className="Services w-100 text-[#333] lg:p-20 p-5 lg:px-40 z-0"
        id="services"
      >
        {/*  */}
        <div className="flex flex-col items-center w-[90%] lg:w-[60%] text-center justify-center m-auto">
          <h1
            className="text-4xl uppercase font-black tracking-widest leading-normal 
          text-transparent bg-clip-text bg-gradient-to-br from-blue-500 
          via-sky-600 to-cyan-500"
          >
            {t.nav.service}
          </h1>
          <p className="text-gray-600 text-sm">
            {t.serviceDetail}
          </p>
        </div>
        <div>
          {serviceData.map((element) => (
            <ServiceComponent
              title={element.title}
              description={element.description}
              picture={element.picture}
              key={element.id}
              id={element.id}
            />
          ))}
          {}
        </div>
      </div>
    </>
  );
};

const ServiceComponent = ({ title, description, picture, id }) => {
  const val = id % 2;

  return (
    <section
      className={`flex flex-wrap lg:flex-nowrap items-center my-20 lg:my-20 justify-center lg:justify-between gap-10 lg:gap-20  ${
        id % 2 == 0 && "flex-row-reverse"
      }`}
    >
      <div className="serviceImage flex items-center justify-center">
        <div className=" overflow-hidden z-0 md:h-96 h-[40vh] w-[100%] md:w-[30rem] rounded object-cover">
          <Image src={picture} alt={`${title} - image`} />
        </div>
      </div>

      <div className=" flex items-center ">
        <div className="servieDesc md:px-48 lg:p-0 p-0 w-full justify-self-start">
          <h1 className="lg:text-4xl text-2xl font-bold text-blue-500">
            {title}
          </h1>
          <p className="serviceDesc text-sm py-5">{description}</p>
          <Link href="#Header">
            <a className="serviceButton lg:px-4 px-2 py-2 text-sm md:text-xs lg:text-sm rounded-full border border-cyan-700 hover:bg-blue-500 hover:border-white transition-all  box-border hover:text-white">
              Search For {title}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
