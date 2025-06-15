const PregnancySummary = ({ results, formatDate }) => {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Pregnancy Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                {/* Weeks Completed */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-3 md:p-4 border border-purple-500/20">
                    <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">
                        {results.weeksCompleted}
                        <span className="text-xs md:text-sm text-gray-400 ml-1 block sm:inline">
                            weeks {results.daysInCurrentWeek} days
                        </span>
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm">Weeks Completed</div>
                </div>

                {/* Days Left */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-3 md:p-4 border border-blue-500/20">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
                        {results.daysLeft}
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm">Days Left</div>
                </div>

                {/* Trimester */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-3 md:p-4 border border-pink-500/20 sm:col-span-2 lg:col-span-1">
                    <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-1">
                        {results.trimester.number}
                        <span className="text-xs md:text-sm text-gray-400 ml-1 block sm:inline">
                            {results.trimester.name.split(' ')[0]}
                        </span>
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm">{results.trimester.name}</div>
                </div>
            </div>

            {/* Important Dates */}
            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Important Dates</h3>
                
                <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 px-3 md:px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 gap-1 sm:gap-0">
                        <span className="text-gray-300 text-sm md:text-base">Last Menstrual Period</span>
                        <span className="text-white font-medium text-sm md:text-base">{formatDate(results.lmpDate)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 px-3 md:px-4 bg-gray-800/30 rounded-lg border border-gray-700/50 gap-1 sm:gap-0">
                        <span className="text-gray-300 text-sm md:text-base">Conception Date</span>
                        <span className="text-white font-medium text-sm md:text-base">{formatDate(results.conceptionDate)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30 gap-1 sm:gap-0">
                        <span className="text-gray-200 font-medium text-sm md:text-base">Expected Due Date</span>
                        <span className="text-white font-bold text-sm md:text-base">{formatDate(results.eddDate)}</span>
                    </div>
                </div>
            </div>

            {/* Trimester Information */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Current Trimester</h3>
                <p className="text-gray-300 text-sm md:text-base">
                    You are currently in the <span className="text-purple-400 font-semibold">{results.trimester.name}</span> ({results.trimester.description})
                </p>
            </div>
        </div>
    );
};

export default PregnancySummary; 