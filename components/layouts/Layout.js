import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="text-gray-800">{children}</main>
      <Footer />
    </>
  );
}
