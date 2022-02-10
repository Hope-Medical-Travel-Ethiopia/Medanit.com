import Picture from "../reusable/Picture";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";

const Card = ({ name, pic, speciality, phone, email, view, address }) => {
  return (
    <div className="card w-72 p-10 rounded-lg bg-white overflow-hidden flex flex-col items-center justify-between gap-5">
      <div className="image">{pic && <Picture pic={pic} size={36} />}</div>
      <div className="nameTag flex flex-col ">
        <h1 className="text-lg leading-tight mb-2 font-semibold text-blue-500">
          {name}
        </h1>
        {speciality && <p className="text-md text-gray-600">{speciality}</p>}
        {phone && <p className="text-sm text-gray-600">{phone}</p>}
        {email && <p className="text-sm text-gray-600">{email}</p>}
        {address && <p className="text-sm text-gray-600">{address}</p>}
      </div>
      <div className="action flex  w-full gap-5 justify-center">
        {view && (
          <Link href={view}>
            <a className="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
              <FaEye className="text-xl stroke-1" />
            </a>
          </Link>
        )}

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

export default Card;
