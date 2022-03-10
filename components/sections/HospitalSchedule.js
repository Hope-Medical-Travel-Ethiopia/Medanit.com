import pic from "../../public/hospital.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Picture from "../reusable/Picture";

const HospitalSchedule = ({ hospital, schedule, provider }) => {
  const myLoader = ({ src, width, quality }) => {
    return `https://api.medanit.com/storage/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (hospital.profilePicture) {
      setimage(hospital.profilePicture);
    } else if (hospital.logo) {
      setimage(hospital.logo);
    }
  }, [hospital]);
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex lg:basis-2/5  flex-wrap lg:gap-10 gap-5 justify-center">
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
        <div className="textSection lg:basis-3/5 pt-2 flex flex-col items-center lg:items-start">
          <div className="flex flex-wrap text-center lg:text-left lg:gap-10 gap-5 md:justify-between justify-center items-end lg:mb-10 mb-5 ">
            <div className="nameTag">
              <h1 className="text-xl leading-tight mb-2 font-bold text-blue-500">
                {hospital.name}
              </h1>
              <p className="text-blue-500 tracking-wider"> {hospital.phone}</p>
              <p className="text-sm w-full tracking-wide">{hospital.address}</p>
            </div>

            <div className="Dates w-full text-left">
              {schedule[`${provider.id}`] &&
                schedule[`${provider.id}`].map((item) => (
                  <Schedule time={item} key={item} />
                ))}
            </div>
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
