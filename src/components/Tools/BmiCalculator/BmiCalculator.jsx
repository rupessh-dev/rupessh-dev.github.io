import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMale, MdFemale } from 'react-icons/md';

import AnimatedBackground from '../../AnimatedBackground';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import HeightInput from './HeightInput';
import WeightInput from './WeightInput';

const BMICalculator = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  // BMI Categories with their ranges and colors
  const bmiCategories = {
    male: [
      { name: 'Underweight', range: [0, 18.5], color: 'text-blue-400' },
      { name: 'Normal', range: [18.5, 25], color: 'text-green-400' },
      { name: 'Overweight', range: [25, 30], color: 'text-yellow-400' },
      { name: 'Obese', range: [30, Infinity], color: 'text-red-400' }
    ],
    female: [
      { name: 'Underweight', range: [0, 18.5], color: 'text-blue-400' },
      { name: 'Normal', range: [18.5, 24], color: 'text-green-400' },
      { name: 'Overweight', range: [24, 29], color: 'text-yellow-400' },
      { name: 'Obese', range: [29, Infinity], color: 'text-red-400' }
    ]
  };

  // Calculate BMI whenever height, weight, or gender changes
  useEffect(() => {
    calculateBMI();
  }, [height, weight, gender]);

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum > 0 && weightNum > 0) {
      // Convert height from feet to meters (1 foot = 0.3048 meters)
      const heightInMeters = heightNum * 0.3048;
      // Calculate BMI: weight (kg) / height² (m²)
      const bmiValue = weightNum / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
      
      // Determine category based on gender
      const categories = bmiCategories[gender];
      const cat = categories.find(c => bmiValue <= c.range[1]);
      setCategory(cat || categories[categories.length - 1]);
    } else {
      setBmi(null);
      setCategory('');
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />
        <div className="px-3 sm:px-4 md:px-8 lg:px-16 xl:px-40 pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  BMI Calculator
                </span>
              </h1>
              <p className="text-gray-300 text-xs md:text-sm max-w-2xl mx-auto px-4">
                Calculate your Body Mass Index and see where you stand!
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Gender Selection */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl text-white text-center mb-4">Select Your Gender</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-medium transition-all duration-300 ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                        : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50'
                    }`}
                  >
                    <MdMale className="w-6 h-6 sm:w-8 sm:h-8" />
                    <span>Male</span>
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-medium transition-all duration-300 ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-pink-500/20 to-pink-600/20 text-pink-400 border-2 border-pink-500/50 shadow-lg shadow-pink-500/10'
                        : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50'
                    }`}
                  >
                    <MdFemale className="w-6 h-6 sm:w-8 sm:h-8" />
                    <span>Female</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6 md:mb-8" />

              {/* Height and Weight Inputs */}
              <div className="grid grid-cols-1 gap-2 sm:gap-4 md:gap-6">
                <HeightInput
                  value={height}
                  onChange={setHeight}
                />
                <WeightInput
                  value={weight}
                  onChange={setWeight}
                />
              </div>
            </div>

            {/* BMI Result Card */}
            <AnimatePresence>
              {bmi && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8"
                >
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Your BMI</h3>
                    <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${category.color}`}>
                      {bmi.toFixed(1)}
                    </div>
                    <div className="text-gray-300 text-sm md:text-base">
                      Category: <span className={`${category.color} font-semibold`}>{category.name}</span>
                    </div>

                    {/* BMI Categories */}
                    <div className="mt-6 grid grid-cols-4 gap-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-blue-400 text-xs sm:text-sm font-medium mb-1">Underweight</span>
                        <span className="text-blue-400/60 text-[10px] sm:text-xs">{"<18.5"}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-green-400 text-xs sm:text-sm font-medium mb-1">Normal</span>
                        <span className="text-green-400/60 text-[10px] sm:text-xs">
                          {gender === 'male' ? "18.5-25" : "18.5-24"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-yellow-400 text-xs sm:text-sm font-medium mb-1">Overweight</span>
                        <span className="text-yellow-400/60 text-[10px] sm:text-xs">
                          {gender === 'male' ? "25-30" : "24-29"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-red-400 text-xs sm:text-sm font-medium mb-1">Obese</span>
                        <span className="text-red-400/60 text-[10px] sm:text-xs">
                          {gender === 'male' ? "30+" : "29+"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
      <Footer />
    </div>
  );
};

export default BMICalculator;
