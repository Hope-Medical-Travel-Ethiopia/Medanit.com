import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
const RegisterLink = ({ text, link, provider }) => {
  return (
    <>
      <Link href={!provider ? link : `${link}/${provider}`}>
        <a className={`registerButton`}>
          {text} <FaPlusCircle className="text-26xl" />
        </a>
      </Link>
    </>
  );
};

export default RegisterLink;
