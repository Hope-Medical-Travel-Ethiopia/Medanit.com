import Image from "next/image";
import Link from "next/link";

const ProviderListCard = ({
  name,
  phone,
  address,
  picture,
  className,
  provider,
  speciality,
  id,
}) => {
  return (
    <>
      <div
        className={`card flex flex-wrap my-5 rounded-2xl bg-white drop-shadow-lg p-10 gap-10 w-fit  ${className}`}
      >
        <section className="imageSection">
          <div className="overflow-hidden h-36 w-36 rounded-full object-cover">
            <Image src={picture} objectFit="fill" />
          </div>
        </section>
        <section className="descSection flex flex-col justify-between w-64">
          <div className="nameTag">
            <h1 className="text-2xl font-bold text-blue-500">{name}</h1>
            {speciality && (
              <h3 className="text-lg text-blue-500">{speciality}</h3>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="tracking-wide text-blue-400 text-lg mt-2"
              >
                {phone}
              </a>
            )}

            {address && <p className="basis-2/3 text-sm">{address}</p>}
            {provider == "Pharmacy" &&  <p className="basis-2/3 text-sm">{provider}</p>}

          </div>
        </section>

        <section className=" self-end justify-self-end">
          {provider && provider != "Pharmacy" && (
            <Link href={`/${provider}/` + id}>
              <a className="px-6 py-3 bg-blue-500 text-gray-50 rounded-lg">
                View Profile
              </a>
            </Link>
          )}
        </section>
      </div>
    </>
  );
};

export default ProviderListCard;
