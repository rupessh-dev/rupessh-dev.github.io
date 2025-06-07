const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background light trails */}
            {/* Purple trail */}
            <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-transparent rounded-full blur-3xl animate-trail-bg-1"></div>
            {/* Blue trail */}
            <div className="absolute w-[500px] h-[500px] -bottom-48 -right-48 bg-gradient-to-tl from-blue-500/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-trail-bg-2"></div>
            {/* Pink trail */}
            <div className="absolute w-[500px] h-[500px] top-1/2 -right-48 bg-gradient-to-l from-pink-500/20 via-pink-400/10 to-transparent rounded-full blur-3xl animate-trail-bg-3"></div>
            {/* Cyan trail */}
            <div className="absolute w-[500px] h-[500px] -bottom-48 left-1/2 bg-gradient-to-tr from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-3xl animate-trail-bg-4"></div>
            
            {/* Moving light streaks */}
            <div className="absolute inset-0">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-streak-1"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-streak-2"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-streak-3"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-streak-4"></div>
            </div>

            {/* Add custom animations */}
            <style>
                {`
                    @keyframes trail-bg-1 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(100px, 50px) rotate(90deg); }
                        50% { transform: translate(50px, 100px) rotate(180deg); }
                        75% { transform: translate(-50px, 50px) rotate(270deg); }
                    }
                    @keyframes trail-bg-2 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(-100px, -50px) rotate(-90deg); }
                        50% { transform: translate(-50px, -100px) rotate(-180deg); }
                        75% { transform: translate(50px, -50px) rotate(-270deg); }
                    }
                    @keyframes trail-bg-3 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(-100px, 50px) rotate(90deg); }
                        50% { transform: translate(-50px, -100px) rotate(180deg); }
                        75% { transform: translate(50px, -50px) rotate(270deg); }
                    }
                    @keyframes trail-bg-4 {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(100px, -50px) rotate(-90deg); }
                        50% { transform: translate(50px, 100px) rotate(-180deg); }
                        75% { transform: translate(-50px, 50px) rotate(-270deg); }
                    }
                    @keyframes streak-1 {
                        0% { transform: translateY(-100%) translateX(-100%) rotate(45deg); }
                        100% { transform: translateY(200%) translateX(200%) rotate(45deg); }
                    }
                    @keyframes streak-2 {
                        0% { transform: translateY(-100%) translateX(100%) rotate(-45deg); }
                        100% { transform: translateY(200%) translateX(-200%) rotate(-45deg); }
                    }
                    @keyframes streak-3 {
                        0% { transform: translateY(200%) translateX(-100%) rotate(45deg); }
                        100% { transform: translateY(-100%) translateX(200%) rotate(45deg); }
                    }
                    @keyframes streak-4 {
                        0% { transform: translateY(200%) translateX(100%) rotate(-45deg); }
                        100% { transform: translateY(-100%) translateX(-200%) rotate(-45deg); }
                    }
                    .animate-trail-bg-1 {
                        animation: trail-bg-1 15s ease-in-out infinite;
                    }
                    .animate-trail-bg-2 {
                        animation: trail-bg-2 20s ease-in-out infinite;
                    }
                    .animate-trail-bg-3 {
                        animation: trail-bg-3 18s ease-in-out infinite;
                    }
                    .animate-trail-bg-4 {
                        animation: trail-bg-4 22s ease-in-out infinite;
                    }
                    .animate-streak-1 {
                        animation: streak-1 8s linear infinite;
                    }
                    .animate-streak-2 {
                        animation: streak-2 10s linear infinite;
                    }
                    .animate-streak-3 {
                        animation: streak-3 12s linear infinite;
                    }
                    .animate-streak-4 {
                        animation: streak-4 9s linear infinite;
                    }
                `}
            </style>
        </div>
    );
};

export default AnimatedBackground; 