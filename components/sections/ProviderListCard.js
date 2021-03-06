import Link from "next/link";
import Image from "next/image";
import Picture from "../reusable/Picture";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";

const ProviderListCard = ({
  className,
  provider,
  providers,
  pic,
  content,
  searchTerm,
}) => {
  const myLoader = ({ src, width, quality }) => {
    return `https://api.medanit.com/storage/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const [image, setimage] = useState();

  useEffect(() => {
    if (providers.profilePicture) {
      setimage(providers.profilePicture);
    } else if (providers.logo) {
      setimage(providers.logo);
    }
  }, [providers]);
  return (
    <>
      <div
        className={`card flex flex-wrap my-5 rounded-2xl justify-center bg-white drop-shadow-lg p-10 gap-10 w-fit  ${className}`}
      >
        <section className="imageSection">
          <div className="overflow-hidden h-36 w-36 rounded-full relative">
            {image ? (
              <Image
                loader={myLoader}
                src={image}
                alt={providers.name}
                layout="fill"
                className="border-2  overflow-hidden   rounded-full object-cover"
              />
            ) : (
              <Picture pic={pic} size={36} />
            )}{" "}
          </div>
        </section>
        <section className="descSection text-center md:text-left flex flex-col justify-between w-64">
          <div className="nameTag ">
            <h1 className="text-xl font-bold text-blue-500">
              {providers.name}
            </h1>
            {providers.speciality && (
              <h3 className="text-lg text-blue-500">{providers.speciality}</h3>
            )}
            {providers.phone && (
              <a
                href={`tel:${providers.phone}`}
                className="tracking-wide text-blue-400 text-lg my-2 flex items-center"
              >
                <FaPhone className="md:text-base  rotate-90 mr-3" />
                {providers.phone}
              </a>
            )}

            {providers.address && (
              <p className=" text-sm">{providers.address}</p>
            )}

            {providers.opening && (
              <p className="mt-3">
                Working Hour{" "}
                {providers.opening == providers.closing ? (
                  <span className="ml-3 font-bold text-blue-500 tracking-wide">
                    {" "}
                    24 Hours
                  </span>
                ) : (
                  <span className="ml-3 font-bold text-blue-500 tracking-wide">
                    {" "}
                    {providers.opening} - {providers.closing}
                  </span>
                )}
              </p>
            )}
          </div>
        </section>

        {provider && provider != "Pharmacy" ? (
          <section className=" self-end justify-self-end">
            {provider == "Hospital" ? (
              <Link
                href={
                  `/${provider}/` + providers.id + "?searchTerm=" + searchTerm
                }
              >
                <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                  {content ? content.profile.viewProfile : "View Profile"}
                </a>
              </Link>
            ) : (
              <Link href={`/${provider}/` + providers.id}>
                <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                  {content ? content.profile.viewProfile : "View Profile"}
                </a>
              </Link>
            )}
          </section>
        ) : (
          <section className=" self-end justify-self-end">
            <Link href={`tel:${providers.phone}`}>
              <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                {content.profile.call}
              </a>
            </Link>
          </section>
        )}
      </div>
    </>
  );
};

export default ProviderListCard;
