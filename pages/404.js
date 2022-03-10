import Link from "next/link";
const PageNotFound = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="notfound">404</h1>
        <p>Page Not Found</p>
        <Link href="/">
          <a className="serviceButton mt-5 lg:px-4 px-2 py-2 text-sm md:text-xs lg:text-sm  border border-cyan-700 hover:bg-blue-500 hover:border-white transition-all  box-border hover:text-white">
            Go Back to Home
          </a>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
