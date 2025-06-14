import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toolsMenu from "../data/toolsMenu";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import AnimatedBackground from "./AnimatedBackground";

const ToolsMenu = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTools, setFilteredTools] = useState(toolsMenu);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const navigate = useNavigate();

    // Filter tools based on search term
    useEffect(() => {
        const filtered = toolsMenu.filter(tool =>
            tool.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTools(filtered);
    }, [searchTerm]);

    // PWA Installation logic
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            console.log('beforeinstallprompt event fired');
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
            // Show the install button
            setShowInstallButton(true);
        };

        const handleAppInstalled = () => {
            console.log('PWA was installed');
            // Hide the install button after installation
            setShowInstallButton(false);
            setDeferredPrompt(null);
        };

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Check if app is already installed or running in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInWebAppiOS = window.navigator.standalone === true;
        const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
        
        if (isStandalone || isInWebAppiOS || isInWebAppChrome) {
            console.log('App is already installed or running in standalone mode');
            setShowInstallButton(false);
        } else {
            // For browsers that don't support beforeinstallprompt (like iOS Safari)
            // Show install button by default, but it will show manual instructions
            setShowInstallButton(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleToolClick = (link) => {
        navigate(link);
    };

    // Handle PWA installation
    const handleInstallApp = async () => {
        if (deferredPrompt) {
            try {
                // Show the install prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Clear the deferredPrompt
                setDeferredPrompt(null);
                setShowInstallButton(false);
            } catch (error) {
                console.error('Error during installation:', error);
            }
        } else {
            // Provide platform-specific instructions
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            
            let instructions = '';
            if (isIOS) {
                instructions = 'To install this app on iOS:\n\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm';
            } else if (isAndroid) {
                instructions = 'To install this app on Android:\n\n1. Tap the menu (⋮) in your browser\n2. Select "Add to Home screen" or "Install app"\n3. Follow the prompts';
            } else {
                instructions = 'To install this app:\n\n1. Look for an install icon in your browser\'s address bar\n2. Or open browser menu and select "Install app"\n3. Follow the prompts';
            }
            
            alert(instructions);
        }
    };

    // Icon mapping for different tool types
    const getToolIcon = (iconType) => {
        switch (iconType) {
            case "pregnancy":
                return (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case "bmi":
                return (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                );
            case "age":
                return (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "time":
                return (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Animated Background with Light Trails */}
            <AnimatedBackground />

            {/* Navbar */}
            <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />

            {/* Main Content */}
            <div className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-40 pt-24 pb-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 flex items-center justify-center gap-1">
                            {/* Animated R SVG */}
                            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <linearGradient id="labs-r-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#a259ff" />
                                        <stop offset="0.5" stopColor="#6ec1e4" />
                                        <stop offset="1" stopColor="#ff6ec4" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M30 80 V20 H60 Q80 20 70 40 Q60 60 30 60 Q60 60 75 80"
                                    stroke="url(#labs-r-gradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                Labs
                            </span>
                        </h1>
                        <p className="text-gray-300 text-sm md:text-sm mx-auto mb-6">
                            Explore a collection of powerful tools designed to make your life easier
                        </p>
                        
                        {/* Install App Button */}
                        {showInstallButton && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleInstallApp}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Install App
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto mb-12">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTools.map((tool, index) => (
                            <div
                                key={index}
                                onClick={() => handleToolClick(tool.link)}
                                className="group cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/70 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                            >
                                {/* Tool Icon */}
                                <div className="mb-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300">
                                    {getToolIcon(tool.icon)}
                                </div>

                                {/* Tool Name */}
                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                    {tool.name}
                                </h3>

                                {/* Tool Description (optional) */}
                                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                                    Click to use this tool
                                </p>

                                {/* Hover Arrow */}
                                <div className="mt-4 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                                    <span className="text-sm font-medium">Use Tool</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredTools.length === 0 && (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tools found</h3>
                            <p className="text-gray-500">Try adjusting your search term</p>
                        </div>
                    )}


                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ToolsMenu;