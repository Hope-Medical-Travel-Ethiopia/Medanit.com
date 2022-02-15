const Expertise = ({ title, services }) => {
  return (
    <div className="Expertise   ">
      <div className="card bg-white px-10 py-6 rounded-lg drop-shadow-lg">
        <h1 className="mb-2 font-semibold text-blue-500 text-lg">{title}</h1>
        <ul className="pl-6">
          {services.map((item) => (
            <li className="list-disc" key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expertise;
