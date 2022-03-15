import Link from "next/link";
const serverDown = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="notfound">500</h1>
        <p>
          We are deeply sorry , the server is down for a moment. we are working
          on it.
        </p>
        <Link href="/">
          <a className="serviceButton mt-5 lg:px-4 px-2 py-2 text-sm md:text-xs lg:text-sm  border border-cyan-700 hover:bg-blue-500 hover:border-white transition-all  box-border hover:text-white">
            Go Back to Home
          </a>
        </Link>
      </div>
    </>
  );
};

export default serverDown;
