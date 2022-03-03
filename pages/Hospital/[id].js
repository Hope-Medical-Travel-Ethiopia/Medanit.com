import Image from "next/image";
import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import DoctorsSchedule from "../../components/sections/DoctorsSchedule";
import image from "../../public/Doc4.jpg";
import axios from "../../lib/axios";

const HospitalProfile = ({ hospitals, schedule }) => {
  return (
    <>
      <div className="md:w-[80%] w-full mx-auto mt-20 ">
        <section className="header">
          <HospitalProfileHeader
            name={hospitals.name}
            phone={hospitals.phone}
            address={hospitals.address}
            email={hospitals.email}
          />
        </section>
        {/*  */}
        <section className=" mt-10 w-full md:px-10 px-5">
          <div className="lg:grid lg:grid-cols-3  lg:gap-10 flex flex-col gap-10">
            <Expertise title="Service" services={hospitals.services} />
            <div className="about lg:row-start-2 ">
              <About description={hospitals.description} />
            </div>
            <div className="schedules lg:col-span-2 lg:row-span-6 lg:col-start-2 lg:row-start-1 flex  flex-col gap-10 ">
              {hospitals.doctors.map((doctor) => (
                <DoctorsSchedule
                  provider={doctor}
                  schedule={schedule}
                  id={doctor.id}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("/api/hospitals");

  return {
    fallback: false,
    paths: response.data.map((item) => ({
      params: { id: item.id.toString() },
    })),
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/Hospitals/${params.id}`);
  const scheduleResponse = await axios.get(`/api/schedule/${params.id}`);

  return {
    props: {
      hospitals: response.data[0],
      schedule: scheduleResponse.data,
    },
  };
}

export default HospitalProfile;
