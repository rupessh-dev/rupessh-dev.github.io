import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ data, showLabsButton = true, showMobileMenu = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial scroll position
    setIsScrolled(window.scrollY > 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Add scroll listener after checking initial position
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handler for closing menu with animation
  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Handler for Home click
  const handleHomeClick = () => {
    handleCloseMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`px-4 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled || menuOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-0.5">
        {/* Animated R Logo */}
        <div className="flex items-center justify-center w-8 h-8 p-0 m-0">
        <a href="/">
          <svg className="w-10 h-10 block align-middle" viewBox="0 0 100 100" fill="none" style={{ background: 'none', display: 'block', verticalAlign: 'middle' }}>
            <defs>
              <linearGradient id="navbar-r-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a259ff" />
                <stop offset="0.5" stopColor="#6ec1e4" />
                <stop offset="1" stopColor="#ff6ec4" />
              </linearGradient>
            </defs>
            <path
              d="M30 80 V20 H60 Q80 20 70 40 Q60 60 30 60 Q60 60 75 80"
              stroke="url(#navbar-r-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="320"
              strokeDashoffset="0"
              className="animate-r-loader"
            />
          </svg>
          </a>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-6">
        {data?.menu?.map((item, index) => (
          <a
            key={`desktop_${item.name}_${index}`}
            href={item.link}
            className="text-white text-sm font-medium leading-normal hover:text-blue-300 transition-colors"
          >
            {item.name}
          </a>
        ))}
        {showLabsButton && (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl font-semibold text-sm text-white transition hover:brightness-125 justify-center w-full hover:bg-[#4a5568]"
            aria-label="Labs"
            onClick={() => {
              navigate("/labs");
            }}
          >
            {/* Test Tube/Beaker Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3v6.75m0 0L5.25 21m4.5-11.25h4.5m0 0L18.75 21m-4.5-11.25V3" />
            </svg>
            Labs
          </button>
        )}
      </div>

      {/* Mobile Hamburger/Close Icon (always in navbar, same position) */}
      {showMobileMenu && (
        <div className="lg:hidden">
          {!menuOpen && (
            <button
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
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
          )}
        </div>
      )}

      {/* Mobile Modal Overlay & Menu Content */}
      {showMobileMenu && menuOpen && (
        <div className="fixed inset-0 w-screen h-screen z-[100] bg-black/70 backdrop-blur-md flex items-start justify-center pt-12">
          {/* Menu Content */}
          <div className={`relative bg-black/90 rounded-3xl shadow-[0_8px_40px_8px_rgba(80,120,255,0.15)] border border-white/10 px-6 pt-8 pb-8 w-[90vw] max-w-sm mx-auto flex flex-col items-center ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}>
            {/* Close Icon (absolute, always visible in menu box) */}
            <button
              className="absolute top-4 right-4 z-[120] text-white"
              onClick={handleCloseMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="w-full flex flex-col items-center gap-2 mt-4">
              {/* Home at the top */}
              <button
                className="text-white text-base font-medium py-2 w-full text-center rounded-lg hover:bg-white/10 transition-colors"
                onClick={handleHomeClick}
              >
                Home
              </button>
              {data?.menu?.map((item, index) => (
                <a
                  key={`mobile_${item.name}_${index}`}
                  href={item.link}
                  className="text-white text-base font-medium py-2 w-full text-center rounded-lg hover:bg-white/10 transition-colors"
                  onClick={handleCloseMenu}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            {showLabsButton && (
              <button
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 rounded-xl font-semibold text-base text-white transition hover:brightness-125 hover:bg-[#4a5568] shadow"
                aria-label="Labs"
                onClick={() => {
                  navigate("/labs");
                  handleCloseMenu();
                }}
              >
                {/* Test Tube/Beaker Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3v6.75m0 0L5.25 21m4.5-11.25h4.5m0 0L18.75 21m-4.5-11.25V3" />
                </svg>
                Labs
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Add animation to global styles if not present
// @layer utilities {
//   .animate-menuOpen {
//     animation: menuOpenAnim 0.4s cubic-bezier(0.4,0,0.2,1);
//   }
//   @keyframes menuOpenAnim {
//     0% { opacity: 0; transform: scale(0.96) translateY(20px); }
//     100% { opacity: 1; transform: scale(1) translateY(0); }
//   }
// }

{/* Add custom animations */}
<style>
{`
  @keyframes r-loader {
    0% { stroke-dashoffset: 320; }
    60% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes slideDown {
    0% { 
      opacity: 0; 
      transform: translateY(-100px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  @keyframes slideUp {
    0% { 
      opacity: 1; 
      transform: translateY(0); 
    }
    100% { 
      opacity: 0; 
      transform: translateY(-100px); 
    }
  }
  .animate-r-loader {
    animation: r-loader 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  .animate-slideDown {
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .animate-slideUp {
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`}
</style>

export default Navbar;
