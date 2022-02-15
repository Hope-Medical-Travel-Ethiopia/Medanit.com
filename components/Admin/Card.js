import Picture from "../reusable/Picture";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import axios from "../../lib/axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const Card = ({ pic, hospitals }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios
      .delete(`/api/hospitals/${hospitals.id}`)
      .then((response) => {
        router.push("/Admin/Hospitals");
      });
  };
  return (
    <div className="card w-72 p-10 rounded-lg bg-white overflow-hidden flex flex-col items-center justify-between gap-5">
      <div className="image">{pic && <Picture pic={pic} size={36} />}</div>
      <div className="nameTag flex flex-col ">
        <h1 className="text-lg leading-tight mb-2 font-semibold text-blue-500">
          {hospitals.name}
        </h1>
        {hospitals.speciality && (
          <p className="text-md text-gray-600">{hospitals.speciality}</p>
        )}
        {hospitals.phone && (
          <p className="text-sm text-gray-600">{hospitals.phone}</p>
        )}
        {hospitals.email && (
          <p className="text-sm text-gray-600">{hospitals.email}</p>
        )}
        {hospitals.address && (
          <p className="text-sm text-gray-600">{hospitals.address}</p>
        )}
      </div>
      <div className="action flex  w-full gap-5 justify-center">
        {hospitals.id && (
          <>
            <Link href={`/Admin/Hospitals/${hospitals.id}`}>
              <a className="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                <FaEye className="text-xl stroke-1" />
              </a>
            </Link>
            <Link href={`/Admin/Hospitals/Edit/${hospitals.id}`}>
              <a className="px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
                <FaEdit className="text-xl stroke-1 " />
              </a>
            </Link>

            <button
              onClick={() => handleDelete()}
              className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              <FaTrash className="text-xl stroke-1 " />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
