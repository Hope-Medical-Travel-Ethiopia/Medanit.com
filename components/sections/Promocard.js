import React from "react";
export function Promocard({ src }) {
  return (
    <div className="relative overflow-hidden  min-h-48 max-h-72 lg:max-h-fit lg:h-full group">
      <div className="h-full w-full bg-black/50 invisible group-hover:visible transition ease-in-out duration-300 flex flex-col items-center justify-center gap-3 absolute">
        <button className="text-white bg-blue-500 px-6 py-2 rounded">
          Call
        </button>
        <button className="text-white bg-blue-500 px-6 py-2 rounded">
          Website
        </button>
      </div>
      <h1 className="bg-red-600 text-white absolute p-2 opacity-80">Ad</h1>
      <img className="lg:w-full lg:object-contain lg:h-full " src={src} />
    </div>
  );
}
