import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Picture from "../reusable/Picture";
import Link from "next/link";
import axios from "../../lib/axios";
import { Router, useRouter } from "next/router";

const ProfileHeader = ({
  image,
  name,
  speciality,
  phone,
  email,
  address,
  openingTime,
  closingTime,
  type,
  provider,
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios
      .delete(`/api/${type}/${provider}`)
      .then((response) => {
        router.push(`/Admin/${type}`);
      });
  };
  return (
    <div className="profileBar h-52 rounded-lg bg-blue-500 px-20  gap-10 flex justify-between ">
      <div className="Information flex items-center gap-5">
        <Picture pic={image} size={40} />
        <div className="nameTag text-gray-50  min-w-fit ">
          {name && <h1 className="text-3xl font-bold">{name}</h1>}
          {speciality && <h3 className="text-xl mb-5">{speciality}</h3>}
          {phone && (
            <>
              <Link href={`tel: ${phone}`}>
                <a className="text text-gray-200 tracking-widest mt-2">
                  {phone}
                </a>
              </Link>
              <br />
            </>
          )}

          {email && (
            <Link href={`mailTo: ${email}`}>
              <a className="text text-gray-200">{email}</a>
            </Link>
          )}
          {address && <p className="text text-gray-200">{address}</p>}
          {openingTime && (
            <p className="text bg-gray-200 text-blue-500 px-5 py-2 rounded-full mt-3 w-fit">
              Opening Hours :
              <span className="mx-3">
                {openingTime} - {closingTime}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="actions h-fit flex gap-5 self-end mb-10">
        <Link href={`/Admin/${type}/Edit/${provider}`}>
          <a className="px-4 py-2  border rounded-md border-white text-white  hover:border-emerald-600 hover:bg-emerald-600  transition-all">
            <FaEdit className="text-xl stroke-1 " />
          </a>
        </Link>

        <button
          onClick={() => handleDelete()}
          className="px-4 py-2 border rounded-md text-white hover:bg-red-600 hover:border-red-600 transition-all"
        >
          <FaTrash className="text-xl stroke-1 " />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
