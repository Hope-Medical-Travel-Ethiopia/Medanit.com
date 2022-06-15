import React from "react";

export default function Promotions() {
  return (
    <div className="m-auto w-[90%] lg:w-[80%] lg:flex lg:justify-center lg:gap-5 lg:max-h-96  lg:h-96 ">
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
          src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60"
          //   src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb21vdGlvbnxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60"
        />
      </div>
      <div className="flex justify-center gap-5 mt-5 lg:mt-0 lg:w-[50%]">
        <div className="relative overflow-hidden  w-[50%] min-h-48 max-h-72 lg:max-h-fit lg:h-full group">
          <div className="h-full w-full bg-black/50 invisible group-hover:visible transition ease-in-out duration-300 flex flex-col items-center justify-center gap-3 absolute">
            <button className="text-white bg-blue-500 px-6 py-2 rounded">
              Call
            </button>
            <button className="text-white bg-blue-500 px-6 py-2 rounded">
              Website
            </button>
          </div>
          <h1 className="bg-red-600 text-white absolute p-2 opacity-80">Ad</h1>
          <img
            className="lg:w-full lg:object-contain lg:h-full "
            src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60"
          />
        </div>
        <div className="relative overflow-hidden  w-[50%] min-h-48 max-h-72 lg:max-h-fit lg:h-full group">
          <div className="h-full w-full bg-black/50 invisible group-hover:visible transition ease-in-out duration-300 flex flex-col items-center justify-center gap-3 absolute">
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
            src="https://images.unsplash.com/photo-1557746534-7e6ca4397ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb21vdGlvbnxlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60"

            // src="https://images.unsplash.com/photo-1556742208-999815fca738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvbW90aW9ufGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          />
        </div>
      </div>
    </div>
  );
}
