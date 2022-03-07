import { FaBars } from "react-icons/fa";
import pic from "../../public/Doc4.jpg";
import { useState } from "react";
import Picture from "../reusable/Picture";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import { useRouter } from "next/router";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const AdminNav = ({ title, current, parent, user }) => {
  const [menu, setMenu] = useState(true);
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <>
      <div className="admin-navbar z-10">
        <div className="menuBar text-2xl stroke-1 ml-5 flex-center gap-10">
          <button>
            <FaBars className="stroke-1 fill-blue-900" />
          </button>
          <div>
            <h1 className="text-blue-500  text-sm tracking-wider ">
              <Link href="/Admin">
                <a> Admin </a>
              </Link>
              /
              {title && (
                <Link href={`/Admin/${title}`}>
                  <a> {title}</a>
                </Link>
              )}
              {parent && (
                <Link href={`/Admin/${title}/${parent}`}>
                  <a> / {parent}</a>
                </Link>
              )}
              {current && <span className="text-gray-600"> / {current}</span>}
            </h1>
          </div>
        </div>

        <div className="navList">
          <div className="profile flex items-center gap-4">
            {/* <div className="image overflow-hidden h-14 w-14 rounded-full object-cover">
              <Image src={picture} />
            </div> */}
            <div className="">
              <h1 className="font-semibold  tracking-normal">
                {" "}
                {user && user.name}
              </h1>
              <p className="text-xs text-gray-500">
                {user && user.role == 0 ? "Super Admin" : "Agent"}
              </p>
            </div>
            {user && (
              <Link href={`/Admin/EditAdmin/${user.id}`}>
                <a className="flex justify-between gap-2 px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
                  <FaUser className="text-xl stroke-1 " /> Profile
                </a>
              </Link>
            )}

            <button
              onClick={logout}
              className="flex justify-between gap-2 px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600  hover:text-white transition-all"
            >
              <FaSignOutAlt className="text-xl stroke-1 " /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
