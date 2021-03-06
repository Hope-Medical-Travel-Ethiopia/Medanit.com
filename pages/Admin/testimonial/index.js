import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Footer from "../../../components/layouts/Footer";
import AdminNav from "../../../components/Admin/AdminNav";
import RegisterLink from "../../../components/Admin/RegisterLink";
import Search from "../../../components/Admin/Search";
import axios from "../../../lib/axios";
import { useAuth } from "../../../hooks/auth";
import { Review } from "../../../components/sections/Testimonial";
import { MedList } from "../../../components/Admin/MedList";
import { TestimonialTable } from "../../../components/Admin/TestimonialTable";

export default function Testimonials({ testimonial }) {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20 py-10">
      <div className="head flex justify-between mb-10">
        <RegisterLink
          text="Add new Testimonial"
          link="/Admin/testimonial/CreateTestimonial"
        />
        <Search />
      </div>
      <div className="body">
        <section>
          {testimonial && <TestimonialTable testimonial={testimonial} />}
        </section>
      </div>
    </div>
  );
}

Testimonials.getLayout = function PageLayout(page) {
  const { user, isLoading } = useAuth({ middleware: "auth" });

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-64">
        <AdminNav title="Testimonials" user={user} />
        {page}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("/api/testimonial");

  return {
    props: {
      testimonial: response.data,
    },
  };
}
