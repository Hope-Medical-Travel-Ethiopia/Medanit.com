import Image from "next/image";
import image from "../../public/Doc4.jpg";

const DoctorProfileHeader = ({ name, speciality, address }) => {
  return (
    <div className="profileBar h-52 rounded-lg bg-blue-500 px-20 flex gap-10 items-center">
      <div className="overflow-hidden h-40 w-40 rounded-full object-cover">
        <Image src={image} objectFit="fill" />
      </div>
      <div className="nameTag text-gray-50">
        <h1 className="text-3xl font-bold">{name}</h1>
        <h3 className="text-xl">{speciality}</h3>
        <p className="text-sm">{address}</p>
      </div>
    </div>
  );
};

export default DoctorProfileHeader;
