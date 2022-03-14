import pic from "../../public/hospital.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Picture from "../reusable/Picture";
import hospitalDefault from "../../public/hospitalDefault.jpg";
import { useRouter } from "next/router";
import en from "../../locales/en";
import am from "../../locales/am";

const HospitalSchedule = ({ hospital, schedule, provider }) => {
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (hospital.profilePicture) {
      setimage(hospital.profilePicture);
    } else if (hospital.logo) {
      setimage(hospital.logo);
    }
  }, [hospital]);

  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : en;
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex  lg:flex-nowrap flex-wrap lg:gap-10 gap-5 justify-center md:justify-evenly">
        <div className="overflow-hidden relative h-40 w-40 rounded-full">
          {image ? (
            <Image
              loader={myLoader}
              src={image}
              alt="Picture of the author"
              layout="fill"
              className="border-2  overflow-hidden   rounded-full object-cover"
            />
          ) : (
            <Picture pic={hospitalDefault} size={40} />
          )}{" "}
        </div>
        <div className=" textSection lg:basis-2/3 pt-2 flex flex-col items-center gap-5 lg:items-stretch ">
          <div className=" flex flex-col gap-5 lg:gap-8">
            <div className="nameTag">
              <h1 className="text-xl leading-tight mb-2 font-bold text-blue-500">
                {hospital.name}
              </h1>
              {hospital.phone && (
                <Link href={`tel: ${hospital.phone}`}>
                  <a className="text w-full block text-blue-500 tracking-widest mt-2">
                    {hospital.phone}
                  </a>
                </Link>
              )}
              {hospital.email && (
                <Link href={`mailTo: ${hospital.email}`}>
                  <a className="text w-full block text-blue-500">
                    {hospital.email}
                  </a>
                </Link>
              )}
              {hospital.address && (
                <p className="text-sm w-full tracking-wide">
                  {hospital.address}
                </p>
              )}
            </div>
            <div className=" flex">
              <Link href={`/Hospital/` + provider.id}>
                <a className="px-4 py-2 text-base bg-blue-500 text-gray-50 rounded-lg">
                  {t.profile.viewProfile}
                </a>
              </Link>
            </div>
          </div>

          <div className="Dates w-full md:text-left text-center">
            {schedule[`${provider.id}`] &&
              schedule[`${provider.id}`].map((item, index) => (
                <Schedule time={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Schedule = ({ time }) => {
  return (
    <>
      <div className="Date  my-5 flex justify-center lg:justify-start gap-10">
        <h3 className="text-gray-600">{time.day}</h3>
        <div>
          <h4 className="text-gray-600">
            {time.starting} - {time.ending}
          </h4>
        </div>
      </div>
    </>
  );
};

export default HospitalSchedule;
