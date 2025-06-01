import FooterList from "../../hooks/FooterList";

const Footer = ({ data }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between px-8 py-4 border-t border-gradient-to-r from-purple-500 via-red-500 to-orange-400 shadow-[0_0_40px_0_rgba(120,86,255,0.4),0_0_40px_0_rgba(255,0,123,0.2)] mt-12">
      <div className="flex flex-wrap justify-center items-center w-full sm:w-auto">
        {FooterList(data?.contact, "contact")}
      </div>
      <div className="w-full sm:w-auto flex justify-center items-center">
        <p className="text-gray-400 text-xs font-medium leading-normal text-center sm:text-left">
          Made with ❤️ by Rupesh | {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
