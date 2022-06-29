import Image from "next/image";
import pic from "../../public/hospital.jpg";
import { useState, useEffect } from "react";
import { FaPhone, FaAt, FaMap } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Picture from "../reusable/Picture";

const HospitalProfileHeader = ({ providers, DefaultImage }) => {
  const myLoader = ({ src, width, quality }) => {
    return `http://192.241.153.141/storage/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (providers.profilePicture) {
      setimage(providers.profilePicture);
    } else if (providers.logo) {
      setimage(providers.logo);
    }
  }, [providers]);
  return (
    <div className="profileBar lg:h-52 rounded-lg bg-blue-500 lg:px-20 p-10 px-5 flex lg:flex-nowrap flex-wrap justify-center lg:justify-start gap-10 items-center">
      <div className="overflow-hidden relative lg:w-48 h-40 w-40 rounded-full">
        {image ? (
          <Image
            loader={myLoader}
            src={image}
            alt={providers.name}
            layout="fill"
            className="border-2  overflow-hidden   rounded-full object-cover"
          />
        ) : (
          <Picture pic={DefaultImage} size={36} />
        )}{" "}
      </div>
      <div className="nameTag text-gray-50 w-full text-center lg:text-left">
        <h1 className="lg:text-3xl md:text-2xl text-xl  font-bold mb-5">
          {providers.name}
        </h1>
        <h3 className="md:text-xl mb-2 tracking-wider flex items-center">
          {" "}
          <FaPhone className="md:text-base rotate-90 mr-3 " />
          {providers.phone}
        </h3>
        <h3 className="md:text-xl mb-2 tracking-wider flex items-center">
          {" "}
          <IoMail className="md:text-base mr-3 " />
          {providers.email}
        </h3>

        <p className="text-sm lg:w-96 w-full flex items-center">
          <FaMap className="md:text-base mr-3" />

          {providers.address}
          {/* Bole Shewa dabo, Getu commercial Trading, 4th floor, office 406 */}
        </p>
      </div>
    </div>
  );
};

export default HospitalProfileHeader;
