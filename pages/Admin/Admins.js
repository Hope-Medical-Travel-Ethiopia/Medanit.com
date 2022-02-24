import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const handleDelete = async (id) => {
  const response = await axios
    .delete(`/api/deleteUser/${id}`)
    .then((response) => {
      router.push(`/Admin/Admins`);
    });
};
export default function Admins({ admin }) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <>
      <div className="min-h-screen p-20">
        {user && user.role == 0 && (
          <Link href="/Admin/register">
            <a className="registerButton">Register new Admin</a>
          </Link>
        )}

        <section>
          {user && user.role == 0 ? (
            admin.map((element) => (
              <List item={element} user={user} key={element.id} />
            ))
          ) : (
            <p>You're not An Admin</p>
          )}
        </section>
      </div>
    </>
  );
}

const List = ({ item, user }) => {
  return (
    <div className="medication w-full bg-white px-10 py-5 my-5 rounded-lg flex items-center justify-between flex-wrap">
      <h1 className="text-xl font-bold tracking-wider text-blue-500 w-48">
        {item.name}
      </h1>
      <p className="text-sm text-gray-600 text-wrap overflow-hidden justify-self-start  w-96 max-w-96 ">
        {item.role == 2 ? (
          <span className="text-red-500">Deactivated Agent</span>
        ) : item.role == 1 ? (
          <span>Agent</span>
        ) : (
          <span>Admin</span>
        )}
      </p>
      <div className="action flex  gap-5 justify-center">
        {item.id != user.id ? (
          <button
            onClick={() => handleDelete(item.id)}
            className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all"
          >
            <FaTrash className="text-xl stroke-1 " />
          </button>
        ) : (
          <Link href={`/Admin/EditAdmin/${item.id}`}>
            <a className="px-4 py-2 border-emerald-500 border rounded-md text-emerald-500 hover:bg-emerald-600  hover:text-white transition-all">
              <FaEdit className="text-xl stroke-1 " />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

Admins.getLayout = function PageLayout(page) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const adminResponse = await axios.get(`/api/allUsers`);
  return {
    props: {
      admin: adminResponse.data,
    },
  };
}
