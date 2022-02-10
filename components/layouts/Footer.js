import Logo from "./LogoPic";

const Footer = () => {
  return (
    <>
      <footer className=" border-2 border-red-500  drop-shadow-4xl bg-gray-100  w-full h-10 flex gap-10 justify-evenly md:justify-center items-center">
        <Logo /> <p className=" text-center text-sm"> © Copy right 2022</p>
      </footer>
    </>
  );
};

export default Footer;
