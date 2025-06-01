import { useState } from "react";
const Navbar = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="px-4 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 border-b  bg-[#000000] b-gradient-to-r from-purple-500 via-red-500 to-orange-400 shadow-[0_0_40px_0_rgba(120,86,255,0.4),0_0_40px_0_rgba(255,0,123,0.2)]">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <span className="text-white text-2xl">
          {/* Simple block logo icon */}
        </span>
        <a href="/">
        <span className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Rupesh
        </span>
        </a>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-6">
        {data?.menu?.map((item, index) => (
          <a
            key={`desktop_${item.name}_${index}`}
            href={item.link}
            className="text-white text-sm font-medium leading-normal"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full flex flex-col items-start gap-4 py-6 px-8 z-50 lg:hidden shadow-lg bg-[#000000]">
          {data?.menu?.map((item, index) => (
            <a
              key={`mobile_${item.name}_${index}`}
              href={item.link}
              className="text-white text-sm font-medium leading-normal"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
