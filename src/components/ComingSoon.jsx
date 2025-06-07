import { Link } from "react-router-dom";
import { useEffect } from "react";
import comingSoonAudio from "../assets/audio/coming-soon.mp3";

const ComingSoon = () => {
    useEffect(() => {
        const audio = new Audio(comingSoonAudio);
        audio.currentTime = 0.5;
        audio.volume = 1;
        audio.play().catch(() => {});
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 overflow-hidden relative">
            {/* Background light trails */}
            <div className="absolute inset-0 overflow-hidden">
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
            </div>

            <div className="relative w-full max-w-2xl animate-zoom-out z-10 mb-16">
                {/* Light trails */}
                <div className="absolute inset-0 animate-trail-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2a3762]/0 via-[#3a2956]/20 to-[#181826]/0 animate-trail-move"></div>
                </div>
                <div className="absolute inset-0 animate-trail-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#181826]/0 via-[#2a3762]/20 to-[#3a2956]/0 animate-trail-move-delay"></div>
                </div>
                <div className="absolute inset-0 animate-trail-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3a2956]/0 via-[#181826]/20 to-[#2a3762]/0 animate-trail-move-delay-2"></div>
                </div>

                {/* Gradient border */}
                <div className="p-[2px] rounded-3xl bg-gradient-to-br from-[#2a3762] via-[#3a2956] to-[#181826] animate-gradient">
                    {/* Main content container */}
                    <div className="rounded-3xl bg-gradient-to-b from-[#232b44] via-[#181826] to-black p-12 text-center relative overflow-hidden backdrop-blur-sm">
                        {/* Animated background circles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#2a3762] rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#3a2956] rounded-full opacity-20 animate-pulse delay-300"></div>
                        </div>

                        {/* Content */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                            Coming Soon
                        </h1>
                        <p className="text-[#90aecb] text-lg md:text-xl mb-8 animate-fade-in-delay">
                            We&apos;re working on something amazing!
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2a3762] via-[#3a2956] to-[#181826] mx-auto rounded-full animate-pulse"></div>
                        {/* Home Link Button */}
                        <Link to="/" className="inline-block mt-8 px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 animate-fade-in-delay">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center z-10 animate-fade-in-delay-2">
                <p className="text-[#90aecb] text-sm font-medium">
                    Made with <span className="text-pink-500 animate-heart-beat inline-block">❤️</span> by Rupesh
                </p>
            </div>

            {/* Add custom animations */}
            <style>
                {`
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes zoom-out {
                        0% { 
                            transform: scale(1.2);
                            opacity: 0;
                        }
                        100% { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                    @keyframes trail-move {
                        0% { 
                            transform: translateX(-100%) skewX(-15deg);
                            opacity: 0;
                        }
                        50% { 
                            opacity: 0.5;
                        }
                        100% { 
                            transform: translateX(100%) skewX(-15deg);
                            opacity: 0;
                        }
                    }
                    @keyframes trail-move-delay {
                        0% { 
                            transform: translateX(-100%) skewX(15deg);
                            opacity: 0;
                        }
                        50% { 
                            opacity: 0.3;
                        }
                        100% { 
                            transform: translateX(100%) skewX(15deg);
                            opacity: 0;
                        }
                    }
                    @keyframes trail-move-delay-2 {
                        0% { 
                            transform: translateX(-100%) skewX(-10deg);
                            opacity: 0;
                        }
                        50% { 
                            opacity: 0.4;
                        }
                        100% { 
                            transform: translateX(100%) skewX(-10deg);
                            opacity: 0;
                        }
                    }
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
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-gradient {
                        background-size: 200% 200%;
                        animation: gradient 8s ease infinite;
                    }
                    .animate-zoom-out {
                        animation: zoom-out 1.5s ease-out forwards;
                    }
                    .animate-trail-1 {
                        animation: trail-move 3s ease-in-out infinite;
                    }
                    .animate-trail-2 {
                        animation: trail-move-delay 3s ease-in-out infinite 0.5s;
                    }
                    .animate-trail-3 {
                        animation: trail-move-delay-2 3s ease-in-out infinite 1s;
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
                    .animate-fade-in {
                        animation: fade-in 1s ease-out forwards;
                    }
                    .animate-fade-in-delay {
                        animation: fade-in 1s ease-out 0.3s forwards;
                        opacity: 0;
                    }
                    @keyframes heart-beat {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                    }
                    .animate-heart-beat {
                        animation: heart-beat 1.5s ease-in-out infinite;
                    }
                    .animate-fade-in-delay-2 {
                        animation: fade-in 1s ease-out 0.6s forwards;
                        opacity: 0;
                    }
                `}
            </style>
        </div>
    );
};

export default ComingSoon;