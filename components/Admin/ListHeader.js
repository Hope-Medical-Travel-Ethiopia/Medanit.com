import Link from "next/link";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import RegisterLink from "./RegisterLink";
const ListHeader = () => {
  return (
    <div className="header mb-10 flex justify-between flex-wrap items-end">
      <div className="registerNew">
        <RegisterLink/>
      </div>
     
    </div>
  );
};

export default ListHeader;
