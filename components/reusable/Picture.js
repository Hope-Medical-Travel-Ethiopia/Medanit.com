import Image from "next/image";
const Picture = ({ pic, size }) => {
  return (
    <div
      className={`image overflow-hidden  h-${size} w-${size} rounded-full object-cover`}
    >
      <Image src={pic} />
    </div>
  );
};

export default Picture;
