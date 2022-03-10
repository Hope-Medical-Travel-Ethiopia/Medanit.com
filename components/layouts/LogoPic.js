import logo from "../../public/Logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ size }) => {
  return (
    <div className={`h-8 w-24  ${size}`}>
      <Link href="/">
        <a>
          <Image src={logo} className=" " alt="MEDANIT" />
        </a>
      </Link>
    </div>
  );
};

export default Logo;
