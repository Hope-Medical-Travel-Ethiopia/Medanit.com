import pic from "../../public/Doc4.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Picture from "../reusable/Picture";
import DocDefault from "../../public/DocDefault.jpg";

const DoctorsSchedule = ({ provider, schedule, id, content }) => {
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (provider.profilePicture) {
      setimage(provider.profilePicture);
    } else if (provider.logo) {
      setimage(provider.logo);
    }
  }, [provider]);

  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex  lg:flex-nowrap flex-wrap lg:gap-10 gap-5 justify-center md:justify-evenly">
        <div className="overflow-hidden relative h-40 w-40 rounded-full">
          {image ? (
            <Image
              loader={myLoader}
              src={image}
              alt={provider.name}
              layout="fill"
              className="border-2  overflow-hidden   rounded-full object-cover"
            />
          ) : (
            <Picture pic={DocDefault} size={40} />
          )}{" "}
        </div>
        <div className=" textSection lg:basis-2/3 pt-2 flex flex-col items-center gap-5 lg:items-stretch ">
          <div className=" flex flex-col gap-5 lg:gap-8">
            <div className="nameTag">
              <h1 className="text-xl mb-2 font-bold text-blue-500">
                {provider.name}
              </h1>
              <p className="text-blue-500 tracking-wider">
                {" "}
                {provider.speciality}
              </p>
              <p className="text-sm  tracking-wide">{provider.address}</p>
            </div>
            <div className=" flex">
              <Link href={`/Doctors/` + id + " - " + provider.name}>
                <a className="px-4 py-2 text-base bg-blue-500 text-gray-50 rounded-lg">
                  {content.profile.viewProfile}
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
      <div className="Date mb-5 flex flex-wrap justify-center md:justify-start">
        <h3 className="text-gray-600 mr-5">{time.day}</h3>
        <div>
          <h4 className="text-gray-600">
            {time.starting} - {time.ending}
          </h4>
        </div>
      </div>
    </>
  );
};

export default DoctorsSchedule;
