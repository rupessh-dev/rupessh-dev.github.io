import { FiDownload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
const About = ({ data, CategoryTitle }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = "/RupeshReddySatti - Full Stack Developer.pdf";
    link.download = "RupeshReddySatti - Full Stack Developer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1200);
  };
  return (
    <>
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: `url(${data?.Profile?.image})` }}
            ></div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                {data?.Profile?.introText}
              </p>
              <p className="text-[#90aecb] text-base font-normal leading-normal text-center">
                {data?.Profile?.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full">
      <div className="
          flex justify-center gap-6 px-4 py-3 
          flex-wrap sm:flex-nowrap
          items-center
          min-w-[320px]
        ">
        {/* GitHub */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col flex-shrink-0 items-center gap-1 text-center rounded-xl bg-[#000000] p-3 text-white border-gray-800 border-1"
          aria-label="GitHub"
        >
          {/* GitHub SVG here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/rupeshreddysatti"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col flex-shrink-0 items-center gap-1 text-center rounded-xl bg-[#000000] p-3 text-white border-gray-800 border-1"
          aria-label="LinkedIn"
        >
          {/* LinkedIn SVG here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
          </svg>
        </a>
        {/* Gmail */}
        <a
          href="mailto:sattirupeshreddy@gmail.com"
          className="flex flex-col flex-shrink-0 items-center gap-1 text-center rounded-xl bg-[#000000] p-3 text-white border-gray-800 border-1"
          aria-label="Email"
        >
          {/* Gmail SVG here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6l8 5 8-5H4zm16 12H4v-9l8 5 8-5v9z" />
          </svg>
        </a>
        {/* Download Resume Button */}
        <div
          className="p-[2px] rounded-xl border-gradient-to-r from-purple-500 via-red-500 to-orange-400 shadow-[0_0_40px_0_rgba(120,86,255,0.4),0_0_40px_0_rgba(255,0,123,0.2)]"
          onClick={handleDownload}
          style={{ cursor: isDownloading ? "not-allowed" : "pointer", opacity: isDownloading ? 0.7 : 1 }}
        >
          <button
            className="
              flex items-center gap-2
              px-4 py-2
              bg-black
              rounded-xl
              font-semibold
              text-sm
              text-white
              transition
              hover:brightness-125
              justify-center
              w-full
            "
            aria-label="Download Resume"
            disabled={isDownloading}
            style={{ pointerEvents: isDownloading ? "none" : "auto" }}
          >
            {isDownloading ? (
              <ImSpinner2 className="animate-spin" size={24} />
            ) : (
              <FiDownload size={24} className="text-white" />
            )}
            <span className="truncate">
              {isDownloading ? "Downloading..." : "Download Resume"}
            </span>
          </button>
        </div>
      </div>
    </div>
      <CategoryTitle title="About Me" navid="about" />
      <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
        {data?.Profile?.description}
      </p>
    </>
  );
};
export default About;
