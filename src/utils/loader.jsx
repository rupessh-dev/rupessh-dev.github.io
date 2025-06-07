const GradientLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 overflow-hidden">
    {/* Soft multi-layered blurred gradients */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] -top-40 -left-40 bg-gradient-to-br from-purple-500/30 via-blue-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute w-[400px] h-[400px] -bottom-32 -right-32 bg-gradient-to-tl from-pink-500/20 via-blue-400/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-cyan-400/10 via-purple-400/10 to-transparent rounded-full blur-2xl"></div>
    </div>
    {/* Animated R loader */}
    <div className="relative w-24 h-24 z-10 flex flex-col items-center justify-center bg-transparent">
      <svg className="w-24 h-24 block" viewBox="0 0 100 100" fill="none" style={{ background: 'none' }}>
        <defs>
          <linearGradient id="r-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a259ff" />
            <stop offset="0.5" stopColor="#6ec1e4" />
            <stop offset="1" stopColor="#ff6ec4" />
          </linearGradient>
        </defs>
        <path
          d="M30 80 V20 H60 Q80 20 70 40 Q60 60 30 60 Q60 60 75 80"
          stroke="url(#r-gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="320"
          strokeDashoffset="0"
          className="animate-r-loader"
        />
      </svg>
    </div>
    {/* Gradient RUPESH text */}
    <svg
      width="120"
      height="24"
      viewBox="0 0 120 24"
      fill="none"
      className="mt-4 z-10"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="rupesh-gradient" x1="0" y1="0" x2="120" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a259ff" />
          <stop offset="0.5" stopColor="#6ec1e4" />
          <stop offset="1" stopColor="#ff6ec4" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="url(#rupesh-gradient)"
        style={{ letterSpacing: '0.25em' }}
      >
        RUPESH
      </text>
    </svg>
    <style>{`
      @keyframes r-loader {
        0% { stroke-dashoffset: 320; }
        60% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 0; }
      }
      .animate-r-loader {
        animation: r-loader 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
      }
    `}</style>
  </div>
);

export default GradientLoader;
