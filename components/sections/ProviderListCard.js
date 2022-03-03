import Link from "next/link";
import Image from "next/image";
import Picture from "../reusable/Picture";
import { useState, useEffect } from "react";

const ProviderListCard = ({ className, provider, providers, pic }) => {
  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:8000/storage/${src}?w=${width}&q=${quality || 75}`;
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
                alt="Picture of the author"
                layout="fill"
                className="border-2  overflow-hidden   rounded-full object-cover"
              />
            ) : (
              <Picture pic={pic} size={36} />
            )}{" "}
          </div>
        </section>
        <section className="descSection text-center md:text-left flex flex-col justify-between w-64">
          <div className="nameTag">
            <h1 className="text-2xl font-bold text-blue-500">
              {providers.name}
            </h1>
            {providers.speciality && (
              <h3 className="text-lg text-blue-500">{providers.speciality}</h3>
            )}
            {providers.phone && (
              <a
                href={`tel:${providers.phone}`}
                className="tracking-wide text-blue-400 text-lg mt-2"
              >
                {providers.phone}
              </a>
            )}

            {providers.address && (
              <p className="basis-2/3 text-sm">{providers.address}</p>
            )}
            {provider == "Pharmacy" && (
              <p className="basis-2/3 text-sm">{provider}</p>
            )}
          </div>
        </section>

        {provider && provider != "Pharmacy" && (
          <section className=" self-end justify-self-end">
            <Link href={`/${provider}/` + providers.id}>
              <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                View Profile
              </a>
            </Link>
          </section>
        )}
      </div>
    </>
  );
};

export default ProviderListCard;
