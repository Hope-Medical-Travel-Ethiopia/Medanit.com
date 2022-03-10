import pic from "../../public/Doc4.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Picture from "../reusable/Picture";

const DoctorsSchedule = ({ provider, schedule, id }) => {
  const myLoader = ({ src, width, quality }) => {
    return `https://api.medanit.com/storage/${src}?w=${width}&q=${
      quality || 75
    }`;
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
      <div className="flex  lg:flex-nowrap flex-wrap lg:gap-10 gap-5 justify-center">
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
            <Picture pic={pic} size={40} />
          )}{" "}
        </div>
        <div className="textSection lg:basis-2/3 pt-2 flex flex-col items-center lg:items-start">
          <div className="flex flex-wrap text-center lg:text-left lg:gap-10 gap-5 md:justify-between justify-center items-end lg:mb-10 mb-5 ">
            <div className="nameTag">
              <h1 className="text-xl leading-loose font-bold text-blue-500">
                {provider.name}
              </h1>
              <p className="text-blue-500 tracking-wider">
                {" "}
                {provider.speciality}
              </p>
              <p className="text-sm  tracking-wide">{provider.address}</p>
            </div>
            <div className="flex justify-center text-center">
              <Link href={`/Doctors/` + id}>
                <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                  View Profile
                </a>
              </Link>
            </div>
          </div>

          <div className="Dates w-fit md:text-left text-center">
            {schedule[`${provider.id}`] &&
              schedule[`${provider.id}`].map((item) => (
                <Schedule time={item} key={item.id} />
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
