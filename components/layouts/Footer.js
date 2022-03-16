import Logo from "./LogoPic";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Footer = () => {
  return (
    <footer id="Footer" className="p-4  sm:p-6 page-turner">
      <div className="sm:flex flex-col sm:items-center sm:justify-center">
        <span className="text-sm text-gray-900 sm:text-center ">
          © 2022 Medanit™
          {"  "}All Rights Reserved.
          <MessengerCustomerChat
            pageId="111098201465752"
            appId="5298413196858444"
          />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
