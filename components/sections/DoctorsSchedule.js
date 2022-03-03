import image from "../../public/Doc4.jpg";
import Image from "next/image";
import Link from "next/link";

const DoctorsSchedule = ({ provider, schedule, id }) => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex  lg:flex-nowrap flex-wrap gap-10 justify-center">
        <div className="Image basis-auto overflow-hidden h-40 w-40 rounded-full object-cover">
          <Image src={image} objectFit="fill" />
        </div>
        <div className="textSection basis-2/3 pt-2">
          <div className="flex flex-wrap  gap-10 justify-between  items-end mb-10 ">
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

          <div className="Dates w-fit text-left">
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
      <div className="Date  my-5 flex flex-wrap justify-center ">
        <h3 className="text-gray-600 mx-5">{time.day}</h3>
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
