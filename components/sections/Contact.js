import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaMap,
  FaPhone,
  FaTelegram,
  FaUsers,
} from "react-icons/fa";

const Contact = () => {
  const contact = {
    title: "Contact Us",
    desc:
      "if you want to know about our system or want to work with Us leave us a message.",
    name: "Full Name",
    email: "Email",
    message: "Message",
    writeMessage: "Write your message here ...",
    send: "send",
    contactTitle: "Contact Information",
    contactDesc: " Here's our contact Information , Let's keep in touch",
    address: "Getu Commercial , Office 406 - Bole,Addis Ababa",
  };
  return (
    <div
      id="contact"
      className=" md:p-20 p-10
      scroll-mt-24
    text-white page-turner"
    >
      <div className="text-center">
        <h1
          className="text-4xl  
          font-bold tracking-wider"
        >
          {contact.title}
        </h1>
        <p className="text-lg text-gray-100  ">{contact.desc}</p>
      </div>
      <div className="flex flex-wrap justify-evenly  ">
        <div className="form w-full lg:basis-3/5 lg:pr-28">
          <form action="" className="my-5">
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="FullName">{contact.name}</label>
              <input
                className="py-5 px-10 w-full rounded-lg mt-2 text-gray-700"
                type="text"
                name="FullName"
                id=""
                placeholder={contact.name}
              />
            </div>
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="Email">{contact.email}</label>
              <input
                className="py-5 px-10 w-full rounded-lg mt-2 text-gray-700"
                type="email"
                name="Email"
                id="Email"
                placeholder={contact.email}
              />
            </div>
            <div className="form-group my-5 flex flex-col">
              <label htmlFor="Message">{contact.message} </label>
              <textarea
                className="py-5 px-10 rounded-lg mt-2 text-gray-700"
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
        <div className="info w-full lg:basis-2/5 bg-white text-blue-500 mt-12 p-10 h-fit rounded-xl drop-shadow-2xl">
          <h1 className="lg:text-4xl  text-2xl font-bold">
            {contact.contactTitle}
          </h1>
          <p className="text-sm text-blue-400 leading-tight mb-5">
            {contact.contactDesc}
          </p>
          <a href="tel:+251118540054" className="contact-info flex gap-5 my-5">
            <FaPhone className="text-2xl" />
            <h1>+251118540054</h1>
          </a>
          <a
            href="mailto:contact@medanit.com"
            className="contact-info flex gap-5 my-5"
          >
            <FaMailBulk className="text-2xl" />
            <h1>contact@medanit.com</h1>
          </a>
          <div className="contact-info flex gap-5 my-5">
            <FaMap className="text-3xl" />
            <h1> {contact.address}</h1>
          </div>
          <div className="contact-info flex gap-5 my-5  text-gray-700 ">
            <FaUsers className="text-3xl fill-blue-500" />
            <Link href="https://www.facebook.com/Medanit.medical.search.engine/">
              <a>
                <FaFacebook className="text-2xl  transform duration-100  hover:fill-blue-500" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/medanit.medical/">
              <a>
                <FaInstagram className="text-2xl  transform duration-100 hover:fill-blue-500" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/medanit.medical/">
              <a>
                <FaTelegram className="text-2xl transform duration-100  hover:fill-blue-500" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
