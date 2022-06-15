import React from "react";
import { Promocard } from "../components/sections/Promocard";
import Promotions from "../components/sections/Promotions";

export default function Test() {
  return (
    <div className="mt-24">
      <div className="w-48 flex flex-col gap-5 border-2 fixed">
        <Promocard src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60" />
        <Promocard src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60" />
        <Promocard src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60" />
        <Promocard src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60" />
      </div>
      <Promotions />
    </div>
  );
}
