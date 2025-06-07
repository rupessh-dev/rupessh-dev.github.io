import { useEffect, useRef, useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineAlert() {
  const isOnline = useOnlineStatus();
  const wasOffline = useRef(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const [exitDirection, setExitDirection] = useState(null); // 'left' or 'right'

  // Handle online/offline transitions
  useEffect(() => {
    if (!isOnline && !wasOffline.current) {
      setShowOfflineBanner(true);
      setExitDirection(null);
    } else if (isOnline && wasOffline.current) {
      // Animate out to the left before hiding
      if (showOfflineBanner) {
        setExitDirection('left');
        setTimeout(() => setShowOfflineBanner(false), 400);
      }
    }
    wasOffline.current = !isOnline;
    // eslint-disable-next-line
  }, [isOnline]);

  // Handle manual dismiss (cross icon)
  const handleDismiss = () => {
    setExitDirection('right');
    setTimeout(() => setShowOfflineBanner(false), 400);
  };

  if (isOnline || !showOfflineBanner) return null;

  let animationClass = 'animate-slide-in-right';
  if (exitDirection === 'left') animationClass = 'animate-slide-out-left';
  if (exitDirection === 'right') animationClass = 'animate-slide-out-right';

  return (
    <div
      className={`fixed bottom-6 right-6 z-[201] ${animationClass}`}
      style={{ minWidth: '320px', maxWidth: '90vw' }}
    >
      {/* Gradient border wrapper */}
      <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#a259ff] via-[#6ec1e4] to-[#ff6ec4] shadow-lg">
        {/* Main banner content */}
        <div className="flex items-center gap-3 px-6 py-3 bg-[#181826] rounded-xl">
          {/* Warning/WiFi Off Icon */}
          <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 12.728A9 9 0 005.636 5.636z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <span className="font-medium text-white">You are currently offline</span>
          <button
            onClick={handleDismiss}
            className="ml-auto p-2 rounded-lg bg-gray-800 hover:bg-[#4a5568] text-gray-300 hover:text-white transition-colors text-sm shadow flex items-center justify-center"
            aria-label="Close offline banner"
          >
            {/* Cross Icon */}
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M6 14L14 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 