import Image from "next/image";
const Picture = ({ pic, size, alt = "Health Care Provider" }) => {
  return (
    <div
      className={`image overflow-hidden  h-${size} w-${size} rounded-full object-cover`}
    >
      <Image src={pic} alt={alt} />
    </div>
  );
};

export default Picture;
