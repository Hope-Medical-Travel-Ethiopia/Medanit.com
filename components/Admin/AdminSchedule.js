import image from "../../public/Doc4.jpg";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Picture from "../reusable/Picture";
import { useState, useEffect } from "react";
const AdminSchedule = ({
  name,
  speciality,
  phone,
  address,
  email,
  pic = image,
  provider,
  schedule,
}) => {
  const [Sky, setSky] = useState([]);
  // useEffect(() => {
  //   // Sky.push(schedule)
  //   setSky = schedule;
  //   console.log(schedule);
  //   console.log(schedule["16"][0].ending);
  //   // setSky(provider.pivot.schedule);
  // }, [provider]);
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <section className="card bg-white px-10 py-6 my-10 rounded-xl drop-shadow-lg">
      <div className="flex gap-10">
        <div className="overflow-hidden  h-36 w-36 rounded-full relative">
          {provider.coverImage ? (
            <Image
              loader={myLoader}
              src={provider.coverImage}
              alt="Picture of the author"
              layout="fill"
              className="border-2 border-red-500 overflow-hidden   rounded-full object-cover"
            />
          ) : (
            <Picture pic={pic} size={36} />
          )}
        </div>
        <div className="textSection basis-2/3 pt-2">
          <div className="flex justify-between items-end mb-10 ">
            <div className="nameTag">
              <h1 className="text-xl leading-loose font-bold text-blue-500">
                {provider.name}
              </h1>
              {provider.speciality && (
                <p className="text-blue-500 tracking-wider">
                  {" "}
                  {provider.speciality}
                </p>
              )}
              {provider.phone && (
                <p className="text-blue-500 tracking-wider">
                  {" "}
                  {provider.phone}
                </p>
              )}
              {provider.email && (
                <p className="text-sm text-gray-700 tracking-wide">
                  {provider.email}
                </p>
              )}
              {provider.address && (
                <p className="text-sm text-gray-700 tracking-wide">
                  {provider.address}
                </p>
              )}
            </div>
          </div>

          <div className="Dates w-fit text-left">
            {schedule[`${provider.id}`] &&
              schedule[`${provider.id}`].map((item) => (
                <Schedule time={item} />
              ))}
          </div>
          <div className="action  flex  w-full gap-5 justify-end mt-10">
            <Link href={`/Admin/Doctors/${provider.id}`}>
              <a className="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                <FaEye className="text-xl stroke-1" />
              </a>
            </Link>
            <button className="px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
              <FaEdit className="text-xl stroke-1 " />
            </button>
            <button className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all">
              <FaTrash className="text-xl stroke-1 " />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Schedule = ({ time }) => {
  return (
    <>
      <div className="Date  my-5 flex justify-between gap-10">
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

export default AdminSchedule;
