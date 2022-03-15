import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMap,
  FaPhone,
  FaUsers,
} from "react-icons/fa";

const Contact = ({ contact }) => {
  return (
    <div
      id="contact"
      className=" md:p-20 md:p-10
      scroll-mt-24
    text-white page-turner"
    >
      <div className="text-center p-10 pb-0">
        <h1
          className="text-4xl  
          font-bold tracking-wider"
        >
          {contact.title}
        </h1>
        <p className="md:text-base text-sm text-gray-100  ">{contact.desc}</p>
      </div>
      <div className="flex flex-wrap justify-evenly  ">
        <div className="form w-full lg:basis-3/5 lg:pr-28 p-5 md:p-0">
          <form action="" className="my-5 md:text-base text-sm">
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="FullName">{contact.name}</label>
              <input
                className="md:py-5 md:px-10 px-4 py-3 w-full rounded-sm mt-2 text-gray-700"
                type="text"
                name="FullName"
                id=""
                placeholder={contact.name}
              />
            </div>
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="Email">{contact.email}</label>
              <input
                className="md:py-5 md:px-10 px-4 py-3 w-full rounded-sm mt-2 text-gray-700"
                type="email"
                name="Email"
                id="Email"
                placeholder={contact.email}
              />
            </div>
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="Message">{contact.message} </label>
              <textarea
                className="md:py-5 md:px-10 px-4 py-3 w-full rounded-sm Fmt-2 text-gray-700"
                name="Message"
                id="Message"
                cols="20"
                rows="5"
                placeholder={contact.writeMessage}
              ></textarea>
            </div>
            <input
              type="submit"
              className="bg-green-400 drop-shadow-lg px-20 py-2 w-fit hover:cursor-pointer text-white"
              value={contact.send}
            />
          </form>
        </div>
        <div
          className="info w-full lg:basis-2/5 text-base
         text-blue-500 mt-12 md:p-10 p-5 flex flex-col   h-fit shapes mx-5 md:mx-0 bg-white md:rounded-xl drop-shadow-2xl"
        >
          <h1 className="lg:text-4xl text-3xl font-bold">
            {contact.contactTitle}
          </h1>
          <p className="text-sm text-blue-400 leading-tight mb-5">
            {contact.contactDesc}
          </p>
          <a href="tel:+251118540054" className="contact-info flex gap-5 my-5">
            <FaPhone className="md:text-2xl" />
            <h1>+251118540054</h1>
          </a>
          <a
            href="mailto:contact@medanit.com"
            className="contact-info flex gap-5 my-5"
          >
            <FaMailBulk className="md:text-2xl" />
            <h1>contact@medanit.com</h1>
          </a>
          <div className="contact-info flex gap-5 my-5 items-center">
            <FaMap className="md:text-3xl text-xl" />
            <h1> {contact.address}</h1>
          </div>
          <div className="contact-info flex gap-5 my-5  text-gray-700 ">
            <FaUsers className="md:text-3xl fill-blue-500" />
            <Link href="https://www.facebook.com/Medanit.medical.search.engine/">
              <a>
                <FaFacebook className="md:text-2xl  transform duration-100  hover:fill-blue-500" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/medanit.medical/">
              <a>
                <FaInstagram className="md:text-2xl  transform duration-100 hover:fill-blue-500" />
              </a>
            </Link>
            {/* <Link href="https://www.instagram.com/medanit.medical/">
              <a>
                <FaTelegram className="text-2xl transform duration-100  hover:fill-blue-500" />
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
