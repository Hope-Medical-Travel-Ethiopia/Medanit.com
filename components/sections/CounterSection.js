const CounterSection = ({ content, counter }) => {
  return (
    <section className="page-turner">
      <section className="flex lg:justify-between justify-center flex-wrap p-20 gap-10 text-white tracking-widest font-bold uppercase">
        {counter.map((item, index) => (
          <div className="flex flex-col justify-baseline items-center w-48 text-center " key={index}>
            <h1 className="text-5xl my-5 font-black">{item.number}+</h1>
            <p>{item.provider} </p>
          </div>
        ))}
        {/* <div className="flex flex-col justify-baseline items-center w-48 text-center ">
          <h1 className="text-5xl my-5 font-black">{counter.doctors}+</h1>
          <p>{content.Doctors} </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">{counter.hospitals}+</h1>
          <p>{content.Hospitals} </p>
        </div>
        <div className="flex flex-col justify-baselinebaseline items-center w-64 text-center">
          <h1 className="text-5xl my-5 font-black">{counter.diagnostics}+</h1>
          <p>{content.Diagnostic} </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">{counter.pharmacies}+</h1>
          <p>{content.Pharmacies} </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">{counter.medications}+</h1>
          <p>{content.Medications} </p>
        </div> */}
      </section>
    </section>
  );
};

export default CounterSection;
