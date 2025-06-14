const ProgressBar = ({ results }) => {
    const progressPercentage = Math.min(100, Math.max(0, results.progressPercentage));
    
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Pregnancy Progress
            </h2>

            {/* Progress Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{results.weeksCompleted}</div>
                    <div className="text-sm text-gray-400">Weeks Done</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{Math.max(0, 40 - results.weeksCompleted)}</div>
                    <div className="text-sm text-gray-400">Weeks Left</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{results.daysLeft}</div>
                    <div className="text-sm text-gray-400">Days Left</div>
                </div>
            </div>

            {/* Main Progress Bar */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Overall Progress</span>
                    <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                
                <div className="relative h-6 bg-gray-800 rounded-full overflow-hidden">
                    {/* Progress fill */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    >
                    </div>
                    
                    {/* Progress indicator */}
                    <div 
                        className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-1000 ease-out"
                        style={{ left: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Trimester Progress Bars */}
            <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold text-white">Trimester Progress</h3>
                
                {/* First Trimester */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">First Trimester (Weeks 1-12)</span>
                        <span className="text-purple-400 font-medium">
                            {Math.min(100, Math.max(0, (results.weeksCompleted / 12) * 100)).toFixed(0)}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, Math.max(0, (results.weeksCompleted / 12) * 100))}%` }}
                        ></div>
                    </div>
                </div>

                {/* Second Trimester */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Second Trimester (Weeks 13-27)</span>
                        <span className="text-blue-400 font-medium">
                            {results.weeksCompleted > 12 ? 
                                Math.min(100, Math.max(0, ((results.weeksCompleted - 12) / 15) * 100)).toFixed(0) : 0}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                            style={{ width: `${results.weeksCompleted > 12 ? 
                                Math.min(100, Math.max(0, ((results.weeksCompleted - 12) / 15) * 100)) : 0}%` }}
                        ></div>
                    </div>
                </div>

                {/* Third Trimester */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Third Trimester (Weeks 28-40)</span>
                        <span className="text-pink-400 font-medium">
                            {results.weeksCompleted > 27 ? 
                                Math.min(100, Math.max(0, ((results.weeksCompleted - 27) / 13) * 100)).toFixed(0) : 0}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full transition-all duration-1000"
                            style={{ width: `${results.weeksCompleted > 27 ? 
                                Math.min(100, Math.max(0, ((results.weeksCompleted - 27) / 13) * 100)) : 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Milestone Achievement */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                                    <div>
                    <div className="text-white font-semibold">
                        {results.weeksCompleted < 12 ? 'First Trimester Journey' :
                         results.weeksCompleted < 27 ? 'Second Trimester Adventure' :
                         results.weeksCompleted < 40 ? 'Final Trimester - Almost There!' :
                         'Post-Due Date - Any Day Now!'}
                    </div>
                    <div className="text-gray-300 text-sm">
                        {results.weeksCompleted < 12 ? 'Foundation phase - Your baby is developing rapidly!' :
                         results.weeksCompleted < 27 ? 'Growth phase - You might start feeling those first kicks!' :
                         results.weeksCompleted < 40 ? 'Preparation phase - Your baby is getting ready to meet you!' :
                         'Your baby is fully developed and ready to arrive!'}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar; 