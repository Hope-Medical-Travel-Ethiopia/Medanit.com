import Image from "next/image";
import image from "../../public/hospital.jpg";

const HospitalProfileHeader = ({ name, phone, address, email }) => {
  return (
    <div className="profileBar h-52 rounded-lg bg-blue-500 px-20 flex gap-10 items-center">
      <div className="overflow-hidden h-40 w-40 rounded-full object-cover">
        <Image src={image} objectFit="fill" />
      </div>
      <div className="nameTag text-gray-50">
        <h1 className="text-3xl font-bold leading-loose">{name}</h1>
        <h3 className="text-xl tracking-wider">{phone}</h3>
        <h3 className="text-xl tracking-wider">{email}</h3>

        <p className="text-sm w-96">
          {address}
          {/* Bole Shewa dabo, Getu commercial Trading, 4th floor, office 406 */}
        </p>
      </div>
    </div>
  );
};

export default HospitalProfileHeader;
