import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const MedList = ({ name, description, id }) => {
  return (
    <div className="medication w-full bg-white px-10 py-5 my-5 rounded-lg flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-wider text-blue-500">{name}</h1>
      <p className="text-sm text-gray-600 text-wrap overflow-hidden w-96 ">
        {description}
      </p>
      <div className="action flex  gap-5 justify-center">
        <button className="px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
          <FaEdit className="text-xl stroke-1 " />
        </button>
        <button className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all">
          <FaTrash className="text-xl stroke-1 " />
        </button>
      </div>
    </div>
  );
};
