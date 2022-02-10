const Expertise = ({ title }) => {
  return (
    <div className="Expertise   ">
      <div className="card bg-white px-10 py-6 rounded-lg drop-shadow-lg">
        <h1 className="mb-2 font-semibold text-blue-500 text-lg">{title}</h1>
        <ul className="pl-6">
          <li className="list-disc">Heart Surgery</li>
          <li className="list-disc">Tele Medicine</li>
          <li className="list-disc">Consultation </li>
          <li className="list-disc">Transplant medicine</li>
          <li className="list-disc">Surgery</li>
        </ul>
      </div>
    </div>
  );
};

export default Expertise;
