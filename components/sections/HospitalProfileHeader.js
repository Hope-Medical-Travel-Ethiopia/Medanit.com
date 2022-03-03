import Image from "next/image";
import image from "../../public/hospital.jpg";

const HospitalProfileHeader = ({ name, phone, address, email }) => {
  return (
    <div className="profileBar lg:h-52 md:rounded-lg bg-blue-500 lg:px-20 p-10 px-5 flex lg:flex-nowrap flex-wrap justify-center lg:justify-start gap-10 items-center">
      <div className="overflow-hidden h-40 w-40  rounded-full object-cover">
        <Image src={image} objectFit="fill" />
      </div>
      <div className="nameTag text-gray-50 w-full text-center lg:text-left">
        <h1 className="lg:text-3xl md:text-2xl text-xl  font-bold mb-5">
          {name}
        </h1>
        <h3 className="md:text-xl  tracking-wider">{phone}</h3>
        <h3 className="md:text-xl tracking-wider">{email}</h3>

        <p className="text-sm lg:w-96 w-full">
          {address}
          {/* Bole Shewa dabo, Getu commercial Trading, 4th floor, office 406 */}
        </p>
      </div>
    </div>
  );
};

export default HospitalProfileHeader;
