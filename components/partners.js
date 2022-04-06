import React from "react";
import Picture from "./reusable/Picture";
export function Partners({ pic }) {
  return (
    <div className="flex md:justify-between  justify-between gap-5 flex-wrap ">
      <Picture
        pic={pic}
        size={24}
        className="opacity-60 hover:opacity-100 transition-all"
      />
      <Picture
        pic={pic}
        size={24}
        className="opacity-60 hover:opacity-100 transition-all"
      />
      <Picture
        pic={pic}
        size={24}
        className="opacity-60 hover:opacity-100 transition-all"
      />
      <Picture
        pic={pic}
        size={24}
        className="opacity-60 hover:opacity-100 transition-all"
      />
      <Picture
        pic={pic}
        size={24}
        className="opacity-60 hover:opacity-100 transition-all"
      />
    </div>
  );
}
