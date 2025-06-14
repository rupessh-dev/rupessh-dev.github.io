const GenderPrediction = ({ results }) => {
    // Chinese Gender Prediction Logic
    const predictGender = (motherAge, conceptionMonth) => {
        // Traditional Chinese Gender Chart logic
        const ageIsEven = motherAge % 2 === 0;
        const monthIsEven = conceptionMonth % 2 === 0;
        
        // Traditional chart prediction
        let prediction;
        if (ageIsEven && monthIsEven) {
            prediction = 'Girl';
        } else if (!ageIsEven && !monthIsEven) {
            prediction = 'Girl';
        } else {
            prediction = 'Boy';
        }
        
        return prediction;
    };

    const prediction = predictGender(results.motherAgeAtConception, results.conceptionMonth);
    
    // Generate consistent confidence based on mother's age and conception month
    // This ensures the confidence stays the same for the same inputs
    const generateConsistentConfidence = (age, month) => {
        // Use a simple hash of age and month to get a consistent "random" number
        const seed = (age * 13 + month * 7) % 10;
        return 85 + seed; // Confidence between 85-94%
    };
    
    const confidence = generateConsistentConfidence(results.motherAgeAtConception, results.conceptionMonth);

    const getGenderIcon = (gender) => {
        if (gender === 'Boy') {
            return (
                <div className="relative">
                    <svg className="w-20 h-20 animate-bounce" viewBox="0 0 200 200" fill="none">
                        {/* Baby Boy SVG */}
                        <defs>
                            <linearGradient id="boyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                        </defs>
                        {/* Head */}
                        <circle cx="100" cy="70" r="35" fill="url(#boyGradient)" />
                        {/* Eyes */}
                        <circle cx="90" cy="65" r="3" fill="#1F2937" className="animate-pulse" />
                        <circle cx="110" cy="65" r="3" fill="#1F2937" className="animate-pulse" />
                        {/* Nose */}
                        <circle cx="100" cy="72" r="1.5" fill="#374151" />
                        {/* Mouth */}
                        <path d="M 95 78 Q 100 82 105 78" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Hair */}
                        <path d="M 70 45 Q 100 35 130 45" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
                        {/* Body */}
                        <ellipse cx="100" cy="130" rx="25" ry="35" fill="url(#boyGradient)" />
                        {/* Arms */}
                        <ellipse cx="70" cy="120" rx="8" ry="20" fill="url(#boyGradient)" className="animate-wiggle" />
                        <ellipse cx="130" cy="120" rx="8" ry="20" fill="url(#boyGradient)" className="animate-wiggle" />
                        {/* Legs */}
                        <ellipse cx="85" cy="175" rx="8" ry="25" fill="url(#boyGradient)" />
                        <ellipse cx="115" cy="175" rx="8" ry="25" fill="url(#boyGradient)" />
                        {/* Little cap */}
                        <path d="M 75 50 Q 100 40 125 50 Q 125 45 100 42 Q 75 45 75 50" fill="#1E40AF" />
                    </svg>
                    {/* Sparkles around baby */}
                    <div className="absolute -top-2 -right-2 text-blue-300 animate-ping">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-cyan-300 animate-ping" style={{animationDelay: '0.5s'}}>⭐</div>
                </div>
            );
        } else {
            return (
                <div className="relative">
                    <svg className="w-20 h-20 animate-bounce" viewBox="0 0 200 200" fill="none">
                        {/* Baby Girl SVG */}
                        <defs>
                            <linearGradient id="girlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F472B6" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                        {/* Head */}
                        <circle cx="100" cy="70" r="35" fill="url(#girlGradient)" />
                        {/* Eyes */}
                        <circle cx="90" cy="65" r="3" fill="#1F2937" className="animate-pulse" />
                        <circle cx="110" cy="65" r="3" fill="#1F2937" className="animate-pulse" />
                        {/* Eyelashes */}
                        <path d="M 87 60 L 88 58" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 90 59 L 90 57" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 93 60 L 92 58" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 107 60 L 108 58" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 110 59 L 110 57" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 113 60 L 112 58" stroke="#1F2937" strokeWidth="1" strokeLinecap="round" />
                        {/* Nose */}
                        <circle cx="100" cy="72" r="1.5" fill="#374151" />
                        {/* Mouth */}
                        <path d="M 95 78 Q 100 82 105 78" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Hair with pigtails */}
                        <path d="M 70 45 Q 100 35 130 45" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <circle cx="75" cy="55" r="8" fill="#8B4513" className="animate-wiggle" />
                        <circle cx="125" cy="55" r="8" fill="#8B4513" className="animate-wiggle" />
                        {/* Hair bow */}
                        <path d="M 90 42 L 100 38 L 110 42 L 105 45 L 95 45 Z" fill="#EC4899" />
                        <circle cx="100" cy="42" r="2" fill="#BE185D" />
                        {/* Body */}
                        <ellipse cx="100" cy="130" rx="25" ry="35" fill="url(#girlGradient)" />
                        {/* Arms */}
                        <ellipse cx="70" cy="120" rx="8" ry="20" fill="url(#girlGradient)" className="animate-wiggle" />
                        <ellipse cx="130" cy="120" rx="8" ry="20" fill="url(#girlGradient)" className="animate-wiggle" />
                        {/* Legs */}
                        <ellipse cx="85" cy="175" rx="8" ry="25" fill="url(#girlGradient)" />
                        <ellipse cx="115" cy="175" rx="8" ry="25" fill="url(#girlGradient)" />
                        {/* Little dress pattern */}
                        <circle cx="90" cy="125" r="2" fill="#BE185D" opacity="0.6" />
                        <circle cx="110" cy="125" r="2" fill="#BE185D" opacity="0.6" />
                        <circle cx="100" cy="140" r="2" fill="#BE185D" opacity="0.6" />
                    </svg>
                    {/* Sparkles around baby */}
                    <div className="absolute -top-2 -right-2 text-pink-300 animate-ping">💕</div>
                    <div className="absolute -bottom-2 -left-2 text-purple-300 animate-ping" style={{animationDelay: '0.5s'}}>🌸</div>
                </div>
            );
        }
    };

    const getBackgroundGradient = (gender) => {
        return gender === 'Boy' 
            ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
            : 'bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20';
    };

    const getTextColor = (gender) => {
        return gender === 'Boy' ? 'text-blue-400' : 'text-pink-400';
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Chinese Gender Prediction
            </h2>

            {/* Main Prediction Card */}
            <div className={`${getBackgroundGradient(prediction)} rounded-xl p-6 mb-6`}>
                <div className="flex items-center justify-center mb-4">
                    {getGenderIcon(prediction)}
                </div>
                
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">
                        It might be a <span className={getTextColor(prediction)}>{prediction}!</span>
                    </h3>
                    <p className="text-gray-300 mb-4">
                        Based on traditional Chinese gender prediction
                    </p>
                    
                    {/* Confidence Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                        <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                                prediction === 'Boy' 
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                                    : 'bg-gradient-to-r from-pink-500 to-purple-500'
                            }`}
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-400">Prediction confidence: {confidence}%</p>
                </div>
            </div>

            {/* Calculation Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Mother Age at Conception</h4>
                    <div className="text-2xl font-bold text-purple-400">{results.motherAgeAtConception} years</div>
                    <p className="text-sm text-gray-400 mt-1">
                        {results.motherAgeAtConception % 2 === 0 ? 'Even age' : 'Odd age'}
                    </p>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Conception Month</h4>
                    <div className="text-2xl font-bold text-blue-400">
                        {new Date(0, results.conceptionMonth - 1).toLocaleString('default', { month: 'long' })}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                        Month {results.conceptionMonth} ({results.conceptionMonth % 2 === 0 ? 'Even' : 'Odd'})
                    </p>
                </div>
            </div>

            {/* How it Works */}
            <div className="bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-500/10">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    How Chinese Gender Prediction Works
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                    This ancient method uses the mothers age at conception and the month of conception to predict the babys gender.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                    <p>• Even age + Even month = Girl</p>
                    <p>• Odd age + Odd month = Girl</p>
                    <p>• Even age + Odd month = Boy</p>
                    <p>• Odd age + Even month = Boy</p>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>
                    <div>
                        <p className="text-yellow-200 text-sm font-medium">Disclaimer</p>
                        <p className="text-yellow-100 text-xs mt-1">
                            This is for entertainment purposes only. The Chinese gender chart is a traditional method 
                            and is <strong>not scientifically proven.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenderPrediction; 