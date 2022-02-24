import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";

export default function Admins({ admin }) {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <>
      <div className="min-h-screen p-20">
        <Link href="/Admin/register">
          <a className="registerButton">Register new Admin</a>
        </Link>
        <section>
          {admin.map((element) => (
            <List item={element} key={element.id} />
          ))}
        </section>
      </div>
    </>
  );
}


const List = ({ item }) => {
  return (
    <div className="medication w-full bg-white px-10 py-5 my-5 rounded-lg flex items-center justify-between flex-wrap">
      <h1 className="text-xl font-bold tracking-wider text-blue-500 w-48">
        {item.name}
      </h1>
      <p className="text-sm text-gray-600 text-wrap overflow-hidden justify-self-start  w-96 max-w-96 ">
        {item.role == 1 ? <span>Agent</span> : <span>Admin</span>}
      </p>
      <div className="action flex  gap-5 justify-center">
        <button
          onClick={() => handleDelete()}
          className="px-4 py-2 border-red-500 border rounded-md text-red-500 hover:bg-red-600 hover:text-white transition-all"
        >
          {/* <FaTrash className="text-xl stroke-1 " /> */}
          Delete
        </button>
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

export async function getStaticProps() {
  const adminResponse = await axios.get("/api/allUsers");
  return {
    props: {
      admin: adminResponse.data,
    },
  };
}
