import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import { MdCheck } from 'react-icons/md';
import AnimatedBackground from '../../AnimatedBackground';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const PasswordGenerator = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [type, setType] = useState('all');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const [strength, setStrength] = useState({
    score: 0,
    label: 'Weak',
    color: 'text-red-400'
  });

  const strengthLevels = [
    { score: 0, label: 'Weak', color: 'text-red-400' },
    { score: 1, label: 'Fair', color: 'text-orange-400' },
    { score: 2, label: 'Good', color: 'text-yellow-400' },
    { score: 3, label: 'Strong', color: 'text-green-400' }
  ];

  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const easyToSayChars = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnpqrstuvwxyz',
    numbers: '23456789'
  };

  const easyToReadChars = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnpqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const calculateStrength = () => {
    let score = 0;
    const activeOptions = Object.values(options).filter(Boolean).length;
    
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (activeOptions >= 3) score++;
    if (activeOptions === 4) score++;

    score = Math.min(score, 3);
    setStrength(strengthLevels[score]);
  };

  const generatePassword = () => {
    let chars = '';
    let result = '';

    // Determine character set based on type
    const charSet = type === 'easy-to-say' ? easyToSayChars :
                   type === 'easy-to-read' ? easyToReadChars :
                   characters;

    // Build character pool based on selected options
    Object.entries(options).forEach(([key, enabled]) => {
      if (enabled && charSet[key]) {
        chars += charSet[key];
      }
    });

    // Generate password
    if (chars) {
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    setPassword(result);
    calculateStrength();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, type, options]);

  const isGenerateDisabled = !Object.values(options).some(Boolean);

  return (
    <div className="relative min-h-screen bg-black">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />
        <div className="px-3 sm:px-4 md:px-8 lg:px-16 xl:px-40 pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  Password Generator
                </span>
              </h1>
              <p className="text-gray-300 text-xs md:text-sm max-w-2xl mx-auto px-4">
                Generate secure, random passwords to stay protected online
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              {/* Generated Password Display */}
              <div className="relative mb-6">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="min-w-[44px] h-[44px] flex items-center justify-center rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                    title="Copy to clipboard"
                  >
                    {copied ? <MdCheck className="w-5 h-5 text-green-400" /> : <FiCopy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={generatePassword}
                    disabled={isGenerateDisabled}
                    className="min-w-[44px] h-[44px] flex items-center justify-center rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Generate new password"
                  >
                    <FiRefreshCw className="w-5 h-5" />
                  </button>
                </div>

                {/* Strength Indicator */}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Strength:</span>
                  <span className={`${strength.color} font-medium`}>{strength.label}</span>
                </div>
              </div>

              {/* Password Length */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-300 text-sm">Password Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 bg-gray-800/50 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-progress]:bg-purple-500 [&::-moz-range-progress]:rounded-l-lg [&::-moz-range-progress]:h-2"
                    style={{
                      background: `linear-gradient(to right, rgb(168, 85, 247) ${(length / 50) * 100}%, rgb(31, 41, 55) ${(length / 50) * 100}%)`
                    }}
                  />
                </div>
              </div>

              {/* Password Type */}
              <div className="mb-6">
                <label className="text-gray-300 text-sm block mb-2">Password Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="radio"
                      name="type"
                      value="all"
                      checked={type === 'all'}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${type === 'all' ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`} />
                    <span className="text-gray-300 text-sm">All Characters</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="radio"
                      name="type"
                      value="easy-to-read"
                      checked={type === 'easy-to-read'}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${type === 'easy-to-read' ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`} />
                    <span className="text-gray-300 text-sm">Easy to Read</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="radio"
                      name="type"
                      value="easy-to-say"
                      checked={type === 'easy-to-say'}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${type === 'easy-to-say' ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`} />
                    <span className="text-gray-300 text-sm">Easy to Say</span>
                  </label>
                </div>
              </div>

              {/* Character Options */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">Character Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={options.uppercase}
                      onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 ${options.uppercase ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`}>
                      {options.uppercase && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-gray-300 text-sm">Uppercase (A-Z)</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={options.lowercase}
                      onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 ${options.lowercase ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`}>
                      {options.lowercase && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-gray-300 text-sm">Lowercase (a-z)</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={options.numbers}
                      onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 ${options.numbers ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`}>
                      {options.numbers && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-gray-300 text-sm">Numbers (0-9)</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={options.symbols}
                      onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                      className="sr-only"
                      disabled={type === 'easy-to-say'}
                    />
                    <div className={`w-4 h-4 rounded border-2 ${options.symbols ? 'border-purple-500 bg-purple-500' : 'border-gray-600'} mr-3`}>
                      {options.symbols && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-gray-300 text-sm ${type === 'easy-to-say' ? 'opacity-50' : ''}`}>
                      Symbols (!@#$%^&*)
                    </span>
                  </label>
                </div>
              </div>
            </div>
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

export default PasswordGenerator;
