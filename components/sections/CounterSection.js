const CounterSection = () => {
  return (
    <section className="page-turner">
      <section className="flex lg:justify-between justify-center flex-wrap p-20 gap-10 text-white tracking-widest font-bold uppercase">
        <div className="flex flex-col justify-baseline items-center w-48 text-center ">
          <h1 className="text-5xl my-5 font-black">425+</h1>
          <p>Doctors </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">36+</h1>
          <p>Hospitals </p>
        </div>
        <div className="flex flex-col justify-baselinebaseline items-center w-64 text-center">
          <h1 className="text-5xl my-5 font-black">25+</h1>
          <p>Diagnostic Centers and Laboratories </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">52+</h1>
          <p>Pharmacies </p>
        </div>
        <div className="flex flex-col justify-baseline items-center w-48 text-center">
          <h1 className="text-5xl my-5 font-black">1325+</h1>
          <p>Medications </p>
        </div>
      </section>
    </section>
  );
};

export default CounterSection;
