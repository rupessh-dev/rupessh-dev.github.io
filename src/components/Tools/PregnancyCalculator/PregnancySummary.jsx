const PregnancySummary = ({ results, formatDate }) => {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Pregnancy Summary
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weeks Completed */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                        {results.weeksCompleted}
                        <span className="text-sm text-gray-400 ml-1">
                            weeks {results.daysInCurrentWeek} days
                        </span>
                    </div>
                    <div className="text-gray-300 text-sm">Weeks Completed</div>
                </div>

                {/* Days Left */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                        {results.daysLeft}
                    </div>
                    <div className="text-gray-300 text-sm">Days Left</div>
                </div>

                {/* Trimester */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-pink-500/20">
                    <div className="text-3xl font-bold text-pink-400 mb-1">
                        {results.trimester.number}
                        <span className="text-sm text-gray-400 ml-1">
                            {results.trimester.name.split(' ')[0]}
                        </span>
                    </div>
                    <div className="text-gray-300 text-sm">{results.trimester.name}</div>
                </div>
            </div>

            {/* Important Dates */}
            <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Important Dates</h3>
                
                <div className="grid gap-4">
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <span className="text-gray-300">Last Menstrual Period</span>
                        <span className="text-white font-medium">{formatDate(results.lmpDate)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <span className="text-gray-300">Conception Date</span>
                        <span className="text-white font-medium">{formatDate(results.conceptionDate)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                        <span className="text-gray-200 font-medium">Expected Due Date</span>
                        <span className="text-white font-bold">{formatDate(results.eddDate)}</span>
                    </div>
                </div>
            </div>

            {/* Trimester Information */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">Current Trimester</h3>
                <p className="text-gray-300">
                    You are currently in the <span className="text-purple-400 font-semibold">{results.trimester.name}</span> ({results.trimester.description})
                </p>
            </div>
        </div>
    );
};

export default PregnancySummary; 