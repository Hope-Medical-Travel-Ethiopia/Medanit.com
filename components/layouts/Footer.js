import Logo from "./LogoPic";

const Footer = () => {
  return (
    <footer id="Footer" className="p-4  sm:p-6 page-turner">
      <div className="sm:flex flex-col sm:items-center sm:justify-center">
        <span className="text-sm text-gray-900 sm:text-center ">
          © 2022{" "}
          <a
            href="https://flowbite.com"
            target="_blank"
            className="hover:underline"
          >
            Medanit™
          </a>
          {"  "}All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
