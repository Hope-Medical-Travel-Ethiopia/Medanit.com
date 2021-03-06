const LabScheduleCard = ({ title, schedule, provider }) => {
  return (
    <section className="card bg-white px-10 py-6 rounded-xl drop-shadow-lg">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-blue-500">
          {provider.name}
        </h1>
        <p className="text-gray-500 text-sm my-2">{provider.description}</p>
        <div className="Dates w-fit text-left">
          {schedule[`${provider.id}`] &&
            schedule[`${provider.id}`].map((item) => (
              <Schedule key={schedule.id} time={item} />
            ))}
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
          {time.starting == time.ending ? (
            <h4 className="text-gray-600">24 Hours</h4>
          ) : (
            <h4 className="text-gray-600">
              {time.starting} - {time.ending}
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default LabScheduleCard;
