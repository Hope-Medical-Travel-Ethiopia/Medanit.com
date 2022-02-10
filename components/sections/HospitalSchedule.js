import image from "../../public/hospital.jpg";
import Image from "next/image";

const HospitalSchedule = () => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div className="flex gap-10">
        <div className="Image basis-auto overflow-hidden h-40 w-40 rounded-full object-cover">
          <Image src={image} objectFit="fill" />
        </div>
        <div className="textSection basis-2/3 pt-2">
          <div className="nameTag mb-10">
            <h1 className="text-xl leading-loose font-bold text-blue-500">
              Hope Medical Center
            </h1>
            <p className="text-blue-500 tracking-wider"> +251987654321</p>
            <p className="text-sm w-80 tracking-wide">
              Bole shewa dabo , Getu commercial Trading , 4th Floor , office 406
            </p>
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

export default HospitalSchedule;
