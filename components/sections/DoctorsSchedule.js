import image from "../../public/Doc4.jpg";
import Image from "next/image";

const DoctorsSchedule = () => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex gap-10">
        <div className="Image basis-auto overflow-hidden h-40 w-40 rounded-full object-cover">
          <Image src={image} objectFit="fill" />
        </div>
        <div className="textSection basis-2/3 pt-2">
          <div className="flex justify-between items-end mb-10 ">
            <div className="nameTag">
              <h1 className="text-xl leading-loose font-bold text-blue-500">
                Dr. John Doe
              </h1>
              <p className="text-blue-500 tracking-wider"> Cardiac Surgeon</p>
              <p className="text-sm  tracking-wide">
                Addis Ababa, Ethiopia
              </p>
            </div>
            <div className="align-">
                <button className="bg-blue-500 text-gray-50 px-6 py-3 rounded-lg">View Profile</button>
            </div>
          </div>

          <div className="Dates w-fit text-left">
            <div className="Date  my-5 flex justify-between gap-10">
              <h3>Monday</h3>
              <div>
                <h4>9:00 am - 12:00 pm</h4>
                <h4>3:00 pm - 6:00 pm</h4>
              </div>
            </div>
            <div className="Date my-5 flex justify-between gap-10">
              <h3>Wednesday</h3>
              <div>
                <h4>9:00 am - 12:00 pm</h4>
                <h4>3:00 pm - 6:00 pm</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSchedule;
