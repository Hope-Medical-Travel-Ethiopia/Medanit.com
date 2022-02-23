import image from "../../public/hospital.jpg";
import Image from "next/image";

const HospitalSchedule = ({hospital, schedule, provider}) => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex gap-10">
        <div className="Image basis-auto overflow-hidden h-40 w-40 rounded-full object-cover">
          <Image src={image} objectFit="fill" />
        </div>
        <div className="textSection basis-2/3 pt-2">
          <div className="nameTag mb-10">
            <h1 className="text-xl leading-loose font-bold text-blue-500">
              {hospital.name}
            </h1>
            <p className="text-blue-500 tracking-wider"> {hospital.phone}</p>
            <p className="text-sm w-80 tracking-wide">
              {hospital.address}
            </p>
          </div>
          <div className="Dates w-fit text-left">
            {schedule[`${provider.id}`] && schedule[`${provider.id}`].map((item)=>(
              <Schedule time={item}/>
            )
            )}
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

export default HospitalSchedule;
