import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { 
  FiCalendar, 
  FiClock, 
  FiSun, 
  FiHeart,
  FiGift
} from 'react-icons/fi';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import AnimatedBackground from '../../AnimatedBackground';

// Extend dayjs with plugins
dayjs.extend(duration);

const AgeCalculator = () => {
  const navigate = useNavigate();
  
  // State management
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [ageData, setAgeData] = useState(null);
  const [saveData, setSaveData] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedDate = localStorage.getItem('lastBirthDate');
    const savedSaveData = localStorage.getItem('ageCalculatorSaveData') === 'true';
    
    if (savedDate && savedSaveData) {
      setBirthDate(savedDate);
      setSaveData(true);
      calculateAge(savedDate);
    }
    
    document.documentElement.classList.add('dark');
  }, []);

  const calculateAge = (dateString) => {
    if (!dateString) {
      setError('Please enter your date of birth');
      setAgeData(null);
      return;
    }

    const birth = dayjs(dateString);
    const now = dayjs();

    // Validation
    if (!birth.isValid()) {
      setError('Invalid date format');
      setAgeData(null);
      return;
    }

    if (birth.isAfter(now)) {
      setError('Birth date cannot be in the future');
      setAgeData(null);
      return;
    }

    setError('');

    // Calculate age components
    const duration = dayjs.duration(now.diff(birth));
    const years = Math.floor(duration.asYears());
    const months = Math.floor(duration.asMonths()) % 12;
    const days = Math.floor(duration.asDays()) % 30;

    // Calculate totals
    const totalMonths = Math.floor(duration.asMonths());
    const totalWeeks = Math.floor(duration.asWeeks());
    const totalDays = Math.floor(duration.asDays());
    const totalHours = Math.floor(duration.asHours());

    // Get day of week born
    const dayOfWeek = birth.format('dddd');

    // Next birthday
    let nextBirthday = birth.year(now.year());
    if (nextBirthday.isBefore(now)) {
      nextBirthday = nextBirthday.add(1, 'year');
    }
    const daysUntilBirthday = nextBirthday.diff(now, 'days');

    setAgeData({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      dayOfWeek,
      daysUntilBirthday,
      birthDate: birth.format('MMMM D, YYYY')
    });

    // Save to localStorage if saveData is enabled
    if (saveData) {
      localStorage.setItem('lastBirthDate', dateString);
      localStorage.setItem('ageCalculatorSaveData', 'true');
    }
  };

  const handleDateChange = (value) => {
    setBirthDate(value);
    calculateAge(value);
  };

  const handleSaveDataToggle = () => {
    const newSaveData = !saveData;
    setSaveData(newSaveData);
    
    if (newSaveData && birthDate) {
      localStorage.setItem('lastBirthDate', birthDate);
      localStorage.setItem('ageCalculatorSaveData', 'true');
    } else if (!newSaveData) {
      localStorage.removeItem('lastBirthDate');
      localStorage.removeItem('ageCalculatorSaveData');
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setAgeData(null);
    setError('');
    localStorage.removeItem('lastBirthDate');
    localStorage.removeItem('ageCalculatorSaveData');
    setSaveData(false);
  };

  const AnimatedCounter = ({ value, label, icon: Icon, suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:bg-gray-900/70 transition-all duration-300"
    >
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-purple-400 mr-2" />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <motion.div
        key={value}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
      >
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-black">
      {/* Animated Background with Light Trails */}
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />

        {/* Main Content */}
        <div className="px-3 sm:px-4 md:px-8 lg:px-16 xl:px-40 pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Age Calculator
                </span>
              </h1>
              <p className="text-gray-300 text-xs md:text-sm max-w-2xl mx-auto px-4">
                Discover your exact age, zodiac sign, and more with detailed calculations
              </p>
            </div>

            {/* Input Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Enter Your Birth Date</h2>
              
              {/* Date Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    max={dayjs().format('YYYY-MM-DD')}
                    required
                  />
                </div>
              </div>

              {/* Save Data Option */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveData}
                    onChange={handleSaveDataToggle}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 text-purple-600"
                  />
                  <div className="flex items-center space-x-2">
                    <FiHeart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Save data on this device</span>
                  </div>
                </label>
                <p className="text-xs text-gray-400 mt-1 ml-7">
                  Your data will be stored locally and auto-filled when you return
                </p>
              </div>

              {/* Reset Button */}
              <div className="flex">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                      </svg>
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Section */}
            <AnimatePresence>
              {ageData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 }}
                  id="age-calculator-card"
                  className="space-y-4 md:space-y-6"
                >
                  {/* Main Age Display */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-center text-white mb-4 md:mb-6">
                      Your Current Age
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnimatedCounter value={ageData.years} label="Years" icon={FiCalendar} />
                      <AnimatedCounter value={ageData.months} label="Months" icon={FiClock} />
                      <AnimatedCounter value={ageData.days} label="Days" icon={FiSun} />
                    </div>
                  </div>

                  {/* Days on Earth */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8">
                    <h3 className="text-xl font-semibold text-white mb-4 md:mb-6 text-center">
                      Your Journey on Earth
                    </h3>
                    <div className="space-y-6">
                      {/* Main Days Counter */}
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent mb-2"
                        >
                          {ageData.totalDays.toLocaleString()}
                        </motion.div>
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-gray-400"
                        >
                          Days Spent on Earth
                        </motion.p>
                      </div>

                      {/* Fun Facts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-gray-800/50 rounded-xl p-4 text-center"
                        >
                          <div className="text-2xl font-bold text-blue-400 mb-1">
                            {(ageData.totalHours).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">Hours of Adventures</div>
                        </motion.div>
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gray-800/50 rounded-xl p-4 text-center"
                        >
                          <div className="text-2xl font-bold text-purple-400 mb-1">
                            {(ageData.totalWeeks).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">Weeks of Memories</div>
                        </motion.div>
                      </div>

                      {/* Inspirational Message */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-sm text-gray-300 italic"
                      >
                        Each day is a new opportunity to create amazing memories
                      </motion.div>
                    </div>
                  </div>

                  {/* Birth Info */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <FiCalendar className="mr-2 text-yellow-400" />
                      Birth Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm">Born on:</span>
                        <div className="font-semibold text-white">
                          {ageData.dayOfWeek}, {ageData.birthDate}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Next Birthday:</span>
                        <div className="font-semibold text-white flex items-center">
                          <FiGift className="w-4 h-4 mr-2 text-pink-400" />
                          In {ageData.daysUntilBirthday} days
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explore More Tools Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/labs')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Explore More Tools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgeCalculator;
