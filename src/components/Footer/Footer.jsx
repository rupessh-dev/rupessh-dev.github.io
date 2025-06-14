import FooterList from "../../hooks/FooterList";

const Footer = ({ data }) => {
  return (
    <footer className="relative mt-12 animate-fade-in">
      {/* Main footer content */}
      <div className="relative flex flex-col sm:flex-row items-center sm:justify-between px-8 py-6">
        {/* Contact links */}
        <div className="flex flex-wrap justify-center items-center w-full sm:w-auto gap-4 animate-fade-in-delay">
          {FooterList(data?.contact, "contact")}
        </div>

        {/* Copyright text */}
        <div className="w-full sm:w-auto flex justify-center items-center mt-4 sm:mt-0 animate-fade-in-delay-2">
          <p className="text-[#90aecb] text-sm font-medium leading-normal text-center sm:text-left">
            Made with <span className="text-pink-500 animate-heart-beat inline-block">❤️</span> by Rupesh
          </p>
        </div>
      </div>



      {/* Add custom animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animate-fade-in-delay {
            animation: fade-in 1s ease-out 0.3s forwards;
            opacity: 0;
          }
          .animate-fade-in-delay-2 {
            animation: fade-in 1s ease-out 0.6s forwards;
            opacity: 0;
          }
          .animate-heart-beat {
            animation: heart-beat 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
