import { Promocard } from "./Promocard";
import React from "react";

export default function Promotions({ advertisment }) {
  return (
    <div className="m-auto w-[90%] lg:w-[80%] lg:flex lg:justify-center lg:gap-5 lg:max-h-96  lg:h-96 ">
      {advertisment[0] && (
        <div className=" w-full lg:w-[50%] min-h-48 max-h-72 relative group overflow-hidden lg:h-full lg:max-h-fit">
          <div className="h-full w-full bg-black/50 invisible group-hover:visible transition ease-in-out duration-300 flex items-center justify-center gap-5 absolute">
            <button className="text-white bg-blue-500 px-6 py-2 rounded">
              Call
            </button>
            <button className="text-white bg-blue-500 px-6 py-2 rounded">
              Website
            </button>
          </div>
          <h1 className="bg-red-600 text-white absolute p-2 opacity-80">Ad</h1>

          <img
            className="lg:w-full lg:object-contain lg:h-full"
            src={`https://api.medanit.com/storage/${advertisment[0].photo}`}
          />
        </div>
      )}
      <div className="flex justify-center gap-5 mt-5 lg:mt-0 lg:w-[50%]">
        {advertisment[1] && (
          <Promocard
            src={`https://api.medanit.com/storage/${advertisment[1].photo}`}
          />
        )}
        {advertisment[2] && (
          <Promocard
            src={`https://api.medanit.com/storage/${advertisment[2].photo}`}
          />
        )}
      </div>
    </div>
  );
}
