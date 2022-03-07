import Image from "next/image";
import Link from "next/link";

const DoctorsListCard = ({
  name,
  speciality,
  address,
  hospital,
  picture,
  link,
}) => {
  return (
    <>
      <div className="card flex my-5 rounded-2xl bg-white drop-shadow-lg p-10 gap-10">
        <section className="imageSection">
          <div className="overflow-hidden h-48 w-48 rounded-full object-cover">
            <Image src={picture} alt="Doctors image" objectFit="fill" />
          </div>
        </section>
        <section className="descSection flex flex-col justify-between">
          <div className="nameTag">
            <h1 className="text-2xl font-bold text-blue-500">{name}</h1>
            <h3 className="text-blue-400 text-lg">{speciality}</h3>
            <p className="text-sm text-gray-500">{address}</p>
          </div>
          <div className="flex justify-between">
            <p className="basis-2/3 text-sm">{hospital}</p>
            <Link href={link}>
              <a className="px-8 py-4 bg-blue-500 text-gray-50 rounded-lg">
                View Profile
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default DoctorsListCard;
