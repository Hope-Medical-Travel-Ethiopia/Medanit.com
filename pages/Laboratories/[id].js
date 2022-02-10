import About from "../../components/sections/About";
import HospitalProfileHeader from "../../components/sections/HospitalProfileHeader";
import Expertise from "../../components/sections/ExpertiseSection";
import DoctorsSchedule from "../../components/sections/DoctorsSchedule";
import LabScheduleCard from "../../components/sections/LabScheduleCard";

const LaboratoryProfile = () => {
  return (
    <>
      <div className="w-[80%] mx-auto mt-5">
        <section className="header">
          <HospitalProfileHeader />
        </section>
        {/*  */}
        <section className="body mt-10">
          <div className="grid grid-cols-3  gap-10">
            <Expertise title="Service" />
            <div className="about row-start-2">
              <About />
            </div>
            <div className="schedules col-span-2 row-span-6 col-start-2 row-start-1 flex flex-col gap-10 ">
              <LabScheduleCard title="Compelete Blood Count - (CBC)" />
              <LabScheduleCard title="Compelete Blood Count - (CBC)" />
              <LabScheduleCard title="Compelete Blood Count - (CBC)" />
              <LabScheduleCard title="Compelete Blood Count - (CBC)" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LaboratoryProfile;
