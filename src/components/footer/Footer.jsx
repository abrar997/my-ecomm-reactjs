import { CgCopyright } from "react-icons/cg";

const Footer = () => {
  const year = new Date();
  const currentYear = year.getFullYear();

  return (
    <div className="bg-[#403F3F]  py-5 text-center capitalize">
      <span className="flex items-center justify-center gap-1">
        <CgCopyright className="text-teal-600" /> {currentYear} All rights
        reserved
      </span>
    </div>
  );
};

export default Footer;
