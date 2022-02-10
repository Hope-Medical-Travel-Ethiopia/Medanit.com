import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
const RegisterLink = ({ text, link }) => {
  return (
    <Link href={link}>
      <a
        className={`px-10 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500
                text-white rounded-lg text-md flex items-center 
                    w-fit gap-4 justify-between`}
      >
        {text} <FaPlusCircle className="text-26xl" />
      </a>
    </Link>
  );
};

export default RegisterLink;
