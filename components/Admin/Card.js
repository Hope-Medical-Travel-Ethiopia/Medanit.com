import Link from "next/link";
import Image from "next/image";
import axios from "../../lib/axios";
import Picture from "../reusable/Picture";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Card = ({ pic, provider, type }) => {
  const myLoader = ({ src, width, quality }) => {
    return `https://api.medanit.com/storage/${src}?w=${width}&q=${quality || 75}`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (provider.profilePicture) {
      setimage(provider.profilePicture);
    } else if (provider.logo) {
      setimage(provider.logo);
    }
  }, [provider]);

  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios
      .delete(`/api/${type}/${provider.id}`)
      .then((response) => {
        router.push(`/Admin/${type}`);
      });
  };
  return (
    <div className="card w-72 p-10 rounded-lg bg-white overflow-hidden flex flex-col items-center justify-between gap-5">
      <div className="image overflow-hidden  h-36 w-36 rounded-full relative">
        {image ? (
          <Image
            loader={myLoader}
            src={image}
            alt={provider.name}
            layout="fill"
            className="border-2  overflow-hidden   rounded-full object-cover"
          />
        ) : (
          <Picture pic={pic} size={36} />
        )}
      </div>
      <div className="nameTag flex flex-col ">
        <h1 className="text-lg leading-tight mb-2 font-semibold text-blue-500">
          {provider.name}
        </h1>
        {provider.speciality && (
          <p className="text-md text-gray-600">{provider.speciality}</p>
        )}
        {provider.phone && (
          <p className="text-sm text-gray-600">{provider.phone}</p>
        )}
        {provider.email && (
          <p className="text-sm text-gray-600">{provider.email}</p>
        )}
        {provider.address && (
          <p className="text-sm text-gray-600">{provider.address}</p>
        )}
      </div>
      <div className="action flex  w-full gap-5 justify-center">
        {provider.id && (
          <>
            <Link href={`/Admin/${type}/${provider.id}`}>
              <a className="px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                <FaEye className="text-xl stroke-1" />
              </a>
            </Link>
            <Link href={`/Admin/${type}/Edit/${provider.id}`}>
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
