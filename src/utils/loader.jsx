const GradientLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="w-full max-w-md px-8">
      <div className="w-full h-3 rounded-full bg-[#232b44] overflow-hidden shadow-lg">
        <div
          className="h-full rounded-full animate-gradient-progress"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #a259ff, #ff6ec4, #ffb86c)",
            backgroundSize: "200% 100%",
            animation: "gradient-progress-bar 2s linear forwards"
          }}
        />
      </div>
      <span className="block mt-6 text-white text-lg font-semibold tracking-wide text-center">
        Loading...
      </span>
      <style>
        {`
          @keyframes gradient-progress-bar {
            0% {
              width: 0%;
              background-position: 0% 50%;
            }
            100% {
              width: 100%;
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </div>
  </div>
);

export default GradientLoader;
