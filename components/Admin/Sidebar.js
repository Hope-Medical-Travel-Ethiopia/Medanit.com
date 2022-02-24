import Link from "next/link";
import {
  FaAd,
  FaArrowRight,
  FaBaseballBall,
  FaCapsules,
  FaChartPie,
  FaClinicMedical,
  FaHospital,
  FaMicroscope,
  FaSeedling,
  FaStethoscope,
  FaUserMd,
  FaUsersCog,
} from "react-icons/fa";
import Logo from "../layouts/LogoPic";
import { useAuth } from "../../hooks/auth";

const Sidebar = () => {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <>
      <div className="sidebar">
        <div className="logo h-20 flex-center bg-slate-700">
          <Logo />
        </div>
        <div className="menu">
          <Tab icon={<FaChartPie />} title="Dashboard" link="/Admin" />
          {user && user.role == 0 && (
            <Tab icon={<FaUsersCog />} title="Admins" link={`/Admin/Admins`} />
          )}
          <Tab icon={<FaAd />} title="Promotions" link="/Admin/Promotions" />
          <Tab
            icon={<FaHospital />}
            title="Hospitals"
            link="/Admin/Hospitals"
          />
          <Tab
            icon={<FaStethoscope />}
            title="Diagnostics"
            link="/Admin/Diagnostics"
          />
          <Tab
            icon={<FaClinicMedical />}
            title="Pharmacy"
            link="/Admin/Pharmacy"
          />
          <Tab icon={<FaUserMd />} title="Doctors" link="/Admin/Doctors" />
          <Tab
            icon={<FaCapsules />}
            title="Medications"
            link="/Admin/Medications"
          />
          <Tab
            icon={<FaMicroscope />}
            title="Procedures"
            link="/Admin/Procedures"
          />
        </div>
      </div>
    </>
  );
};

const Tab = ({ icon, title, link }) => {
  return (
    <Link href={link}>
      <a className="tab flex border-b-[0.01px] border-slate-700">
        <div className="icon font-thin stroke-1 text-slate-400 text-xl">
          {icon}
        </div>
        <div className="menuTitle tracking-wider text-sm uppercase whitespace-nowrap ">
          {title}
        </div>
      </a>
    </Link>
  );
};

export default Sidebar;
