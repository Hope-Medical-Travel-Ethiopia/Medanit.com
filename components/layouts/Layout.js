import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MessengerCustomerChat from "react-messenger-customer-chat";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <MessengerCustomerChat
        pageId="101286685033878"
        appId="4678315278947007"
      />
      <main className="text-gray-800">{children}</main>
      <Footer />
    </>
  );
}
