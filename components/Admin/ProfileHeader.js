import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Picture from "../reusable/Picture";
import Link from "next/link";
import axios from "../../lib/axios";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
const ProfileHeader = ({ pic, type, provider }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios
      .delete(`/api/${type}/${provider.id}`)
      .then((response) => {
        router.push(`/Admin/${type}`);
      });
  };
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
  };
  const [image, setimage] = useState();

  useEffect(() => {
    if (provider.coverImage) {
      setimage(provider.coverImage);
    } else if (provider.logo) {
      setimage(provider.logo);
    }
  }, [provider.image]);
  return (
    <div className="profileBar h-52 rounded-lg bg-blue-500 px-20  gap-10 flex justify-between ">
      <div className="Information flex items-center gap-5">
        <div className="overflow-hidden  h-40 w-40 rounded-full relative">
          {image ? (
            <Image
              loader={myLoader}
              src={image}
              alt="Picture of the author"
              layout="fill"
              className="border-2 border-red-500 overflow-hidden   rounded-full object-cover"
            />
          ) : (
            <Picture pic={pic} size={40} />
          )}
        </div>
        <div className="nameTag text-gray-50  min-w-fit ">
          {provider.name && (
            <h1 className="text-3xl font-bold">{provider.name}</h1>
          )}
          {provider.speciality && (
            <h3 className="text-xl mb-5">{provider.speciality}</h3>
          )}
          {provider.phone && (
            <>
              <Link href={`tel: ${provider.phone}`}>
                <a className="text text-gray-200 tracking-widest mt-2">
                  {provider.phone}
                </a>
              </Link>
              <br />
            </>
          )}

          {provider.email && (
            <Link href={`mailTo: ${provider.email}`}>
              <a className="text text-gray-200">{provider.email}</a>
            </Link>
          )}
          {provider.address && (
            <p className="text text-gray-200">{provider.address}</p>
          )}
          {provider.openingTime && (
            <p className="text bg-gray-200 text-blue-500 px-5 py-2 rounded-full mt-3 w-fit">
              Opening Hours :
              <span className="mx-3">
                {provider.openingTime} - {provider.closingTime}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="actions h-fit flex gap-5 self-end mb-10">
        <Link href={`/Admin/${type}/Edit/${provider.id}`}>
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
