const LabScheduleCard = ({ title }) => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-blue-500">
          {title}
        </h1>
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
    </section>
  );
};

export default LabScheduleCard;
