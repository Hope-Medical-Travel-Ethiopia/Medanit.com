import logo from "../../public/Logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="h-10 w-32 overflow-hidden">
      <Link href="/">
        <a >
        <Image src={logo}  className=" " alt="MEDANIT" />

        </a>
      </Link>
    </div>
  );
};

export default Logo;
