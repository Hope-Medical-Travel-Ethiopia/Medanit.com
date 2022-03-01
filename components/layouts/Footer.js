import Logo from "./LogoPic";

const Footer = () => {
  return (
    <footer id="Footer" class="p-4  sm:p-6 page-turner">
      <div class="sm:flex flex-col sm:items-center sm:justify-center">
        <span class="text-sm text-gray-900 sm:text-center ">
          © 2022{" "}
          <a
            href="https://flowbite.com"
            target="_blank"
            class="hover:underline"
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
