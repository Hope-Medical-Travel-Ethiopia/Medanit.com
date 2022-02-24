import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Footer from "../../components/layouts/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";

export default function admin() {
  const { user } = useAuth({ middleware: "auth" });
  return (
    <div className="min-h-screen p-20">
      <h1>This is Heading</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        doloremque adipisci placeat dignissimos alias ipsa fugiat ex nisi libero
        dolorem quisquam culpa quidem quibusdam vero corporis ratione voluptate.
        Aliquid reiciendis vitae in consequuntur, magnam aperiam perspiciatis
        repellendus, earum, ipsam facilis aut natus iusto enim adipisci esse
        accusantium voluptatibus nostrum architecto quia consectetur. Cupiditate
        est debitis vel esse porro. Dolor, eligendi voluptatibus a distinctio
        modi perspiciatis assumenda ut laudantium, aperiam dolore velit
        accusantium, nulla fugit autem eaque obcaecati eum? Ducimus magni
        perspiciatis cumque reiciendis! Rerum, eos dolorem. Dolore officia
        doloribus perspiciatis alias. Eaque numquam totam a ipsam magni, autem
        explicabo corrupti provident laborum praesentium sunt odit animi ipsum
        eum cupiditate ipsa mollitia recusandae et repellat necessitatibus? Et
        nobis non iure. Architecto officiis at, temporibus nihil dignissimos
        maxime necessitatibus molestiae omnis saepe eius ipsa molestias impedit
        quisquam aliquid quae voluptatum veritatis voluptatibus error voluptate
        quos vitae sed cumque, doloribus possimus. Excepturi cum asperiores ab
        deleniti molestiae. Rerum voluptate consequatur neque fugiat omnis a
        eaque ab inventore suscipit consectetur, laborum tempore molestiae.
        Cupiditate amet consectetur ipsa, accusamus hic pariatur? A, officia
        deserunt accusantium quas ullam illo officiis minima sed? Illo quam nam
        itaque, cumque nulla laudantium, et doloremque sequi aliquid ipsum alias
        earum.
      </p>
    </div>
  );
}

admin.getLayout = function PageLayout(page) {
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
