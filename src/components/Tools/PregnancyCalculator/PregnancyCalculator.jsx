import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import AnimatedBackground from '../../AnimatedBackground';
import PregnancySummary from './PregnancySummary';
import ProgressBar from './ProgressBar';
import GenderPrediction from './GenderPrediction';

const PregnancyCalculator = () => {
    const navigate = useNavigate();
    const [inputType, setInputType] = useState('lmp'); // 'lmp' or 'edd'
    const [lmpDate, setLmpDate] = useState('');
    const [eddDate, setEddDate] = useState('');
    const [motherDob, setMotherDob] = useState('');
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState({});
    const [saveData, setSaveData] = useState(false);

    // Session storage key
    const STORAGE_KEY = 'pregnancyCalculatorData';

    // Load saved data on component mount
    useEffect(() => {
        const savedData = sessionStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData.saveData) {
                    setInputType(parsedData.inputType || 'lmp');
                    setLmpDate(parsedData.lmpDate || '');
                    setEddDate(parsedData.eddDate || '');
                    setMotherDob(parsedData.motherDob || '');
                    setSaveData(true);
                    
                    // Auto-calculate if all required data is present
                    if (parsedData.motherDob && 
                        ((parsedData.inputType === 'lmp' && parsedData.lmpDate) || 
                         (parsedData.inputType === 'edd' && parsedData.eddDate))) {
                        // Set a timeout to allow state to update before calculating
                        setTimeout(() => {
                            calculateResultsFromData(parsedData);
                        }, 100);
                    }
                }
            } catch (error) {
                console.error('Error loading saved data:', error);
                sessionStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    // Save data to session storage
    const saveToSessionStorage = (data) => {
        if (saveData) {
            try {
                const dataToSave = {
                    ...data,
                    saveData: true,
                    timestamp: new Date().toISOString()
                };
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    // Calculate results from provided data (for auto-calculation)
    const calculateResultsFromData = (data) => {
        const currentData = {
            inputType: data.inputType,
            lmpDate: sanitizeDate(data.lmpDate),
            eddDate: sanitizeDate(data.eddDate),
            motherDob: sanitizeDate(data.motherDob)
        };
        
        const { inputType: type, lmpDate: lmp, eddDate: edd, motherDob: dob } = currentData;

        let calculatedLMP;
        let calculatedEDD;

        if (type === 'lmp' && lmp) {
            calculatedLMP = new Date(lmp);
            calculatedEDD = new Date(calculatedLMP);
            calculatedEDD.setDate(calculatedEDD.getDate() + 280);
        } else if (type === 'edd' && edd) {
            calculatedEDD = new Date(edd);
            calculatedLMP = new Date(calculatedEDD);
            calculatedLMP.setDate(calculatedLMP.getDate() - 280);
        } else {
            return;
        }

        const today = new Date();
        const daysSinceLMP = Math.floor((today - calculatedLMP) / (1000 * 60 * 60 * 24));
        const weeksCompleted = Math.max(0, Math.floor(daysSinceLMP / 7));
        const daysInCurrentWeek = Math.max(0, daysSinceLMP % 7);
        const daysLeft = Math.max(0, Math.floor((calculatedEDD - today) / (1000 * 60 * 60 * 24)));
        
        // Conception date (typically 14 days after LMP)
        const conceptionDate = new Date(calculatedLMP);
        conceptionDate.setDate(conceptionDate.getDate() + 14);
        
        // Progress calculation
        const totalDays = 280;
        const progressPercentage = Math.min(100, Math.max(0, (daysSinceLMP / totalDays) * 100));
        
        // Trimester calculation
        let trimester;
        if (weeksCompleted < 12) {
            trimester = { number: 1, name: 'First Trimester', description: 'Weeks 1-12' };
        } else if (weeksCompleted < 27) {
            trimester = { number: 2, name: 'Second Trimester', description: 'Weeks 13-27' };
        } else {
            trimester = { number: 3, name: 'Third Trimester', description: 'Weeks 28-40' };
        }

        // Mother's age at conception for Chinese gender prediction
        const motherBirthDate = new Date(dob);
        const ageAtConception = Math.floor((conceptionDate - motherBirthDate) / (1000 * 60 * 60 * 24 * 365.25));

        setResults({
            lmpDate: calculatedLMP,
            eddDate: calculatedEDD,
            conceptionDate,
            weeksCompleted,
            daysInCurrentWeek,
            daysLeft,
            progressPercentage,
            trimester,
            motherAgeAtConception: ageAtConception,
            conceptionMonth: conceptionDate.getMonth() + 1
        });
    };

    // Validation functions
    const validateInputs = () => {
        const newErrors = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Validate Mother's DOB (mandatory)
        if (!motherDob) {
            newErrors.motherDob = 'Mother\'s date of birth is required';
        } else {
            const motherBirthDate = new Date(motherDob);
            const motherAge = Math.floor((today - motherBirthDate) / (1000 * 60 * 60 * 24 * 365.25));
            
            if (motherBirthDate >= today) {
                newErrors.motherDob = 'Mother\'s date of birth cannot be in the future';
            } else if (motherAge < 10) {
                newErrors.motherDob = 'Mother must be at least 10 years old';
            } else if (motherAge > 60) {
                newErrors.motherDob = 'Please verify the mother\'s date of birth (age over 60)';
            }
        }

        // Validate LMP or EDD based on input type
        if (inputType === 'lmp') {
            if (!lmpDate) {
                newErrors.lmpDate = 'Last Menstrual Period date is required';
            } else {
                const lmpDateObj = new Date(lmpDate);
                const daysSinceLMP = Math.floor((today - lmpDateObj) / (1000 * 60 * 60 * 24));
                
                if (lmpDateObj > today) {
                    newErrors.lmpDate = 'LMP date cannot be in the future';
                } else if (daysSinceLMP > 300) {
                    newErrors.lmpDate = 'LMP date seems too far in the past (over 300 days)';
                } else if (daysSinceLMP < 0) {
                    newErrors.lmpDate = 'LMP date cannot be in the future';
                }
            }
        } else {
            if (!eddDate) {
                newErrors.eddDate = 'Estimated Due Date is required';
            } else {
                const eddDateObj = new Date(eddDate);
                const daysUntilEDD = Math.floor((eddDateObj - today) / (1000 * 60 * 60 * 24));
                
                if (eddDateObj < today && Math.abs(daysUntilEDD) > 30) {
                    newErrors.eddDate = 'Due date seems too far in the past';
                } else if (daysUntilEDD > 300) {
                    newErrors.eddDate = 'Due date seems too far in the future';
                }
            }
        }

        // Cross-validation: Mother's age vs pregnancy
        if (motherDob && ((inputType === 'lmp' && lmpDate) || (inputType === 'edd' && eddDate))) {
            const motherBirthDate = new Date(motherDob);
            let conceptionDate;
            
            if (inputType === 'lmp' && lmpDate) {
                conceptionDate = new Date(lmpDate);
                conceptionDate.setDate(conceptionDate.getDate() + 14);
            } else if (inputType === 'edd' && eddDate) {
                conceptionDate = new Date(eddDate);
                conceptionDate.setDate(conceptionDate.getDate() - 266); // 280 - 14 days
            }
            
            if (conceptionDate) {
                const ageAtConception = Math.floor((conceptionDate - motherBirthDate) / (1000 * 60 * 60 * 24 * 365.25));
                if (ageAtConception < 10) {
                    newErrors.general = 'Mother\'s age at conception seems too young';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Sanitize date input
    const sanitizeDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : dateString;
    };

    const calculateResults = () => {
        if (!validateInputs()) {
            return;
        }

        const currentData = {
            inputType,
            lmpDate: sanitizeDate(lmpDate),
            eddDate: sanitizeDate(eddDate),
            motherDob: sanitizeDate(motherDob)
        };
        
        // Save data to session storage if user opted in
        saveToSessionStorage(currentData);
        
        const { inputType: type, lmpDate: lmp, eddDate: edd, motherDob: dob } = currentData;

        let calculatedLMP;
        let calculatedEDD;

        if (type === 'lmp' && lmp) {
            calculatedLMP = new Date(lmp);
            calculatedEDD = new Date(calculatedLMP);
            calculatedEDD.setDate(calculatedEDD.getDate() + 280);
        } else if (type === 'edd' && edd) {
            calculatedEDD = new Date(edd);
            calculatedLMP = new Date(calculatedEDD);
            calculatedLMP.setDate(calculatedLMP.getDate() - 280);
        } else {
            return;
        }

        const today = new Date();
        const daysSinceLMP = Math.floor((today - calculatedLMP) / (1000 * 60 * 60 * 24));
        const weeksCompleted = Math.max(0, Math.floor(daysSinceLMP / 7));
        const daysInCurrentWeek = Math.max(0, daysSinceLMP % 7);
        const daysLeft = Math.max(0, Math.floor((calculatedEDD - today) / (1000 * 60 * 60 * 24)));
        
        // Conception date (typically 14 days after LMP)
        const conceptionDate = new Date(calculatedLMP);
        conceptionDate.setDate(conceptionDate.getDate() + 14);
        
        // Progress calculation
        const totalDays = 280;
        const progressPercentage = Math.min(100, Math.max(0, (daysSinceLMP / totalDays) * 100));
        
        // Trimester calculation
        let trimester;
        if (weeksCompleted < 12) {
            trimester = { number: 1, name: 'First Trimester', description: 'Weeks 1-12' };
        } else if (weeksCompleted < 27) {
            trimester = { number: 2, name: 'Second Trimester', description: 'Weeks 13-27' };
        } else {
            trimester = { number: 3, name: 'Third Trimester', description: 'Weeks 28-40' };
        }

        // Mother's age at conception for Chinese gender prediction
        const motherBirthDate = new Date(dob);
        const ageAtConception = Math.floor((conceptionDate - motherBirthDate) / (1000 * 60 * 60 * 24 * 365.25));

        setResults({
            lmpDate: calculatedLMP,
            eddDate: calculatedEDD,
            conceptionDate,
            weeksCompleted,
            daysInCurrentWeek,
            daysLeft,
            progressPercentage,
            trimester,
            motherAgeAtConception: ageAtConception,
            conceptionMonth: conceptionDate.getMonth() + 1
        });

        // Clear errors on successful calculation
        setErrors({});
    };

    const handleReset = () => {
        setInputType('lmp');
        setLmpDate('');
        setEddDate('');
        setMotherDob('');
        setResults(null);
        setErrors({});
        
        // Clear session storage
        sessionStorage.removeItem(STORAGE_KEY);
    };

    const handleLmpDateChange = (e) => {
        setLmpDate(sanitizeDate(e.target.value));
        if (errors.lmpDate) {
            setErrors(prev => ({ ...prev, lmpDate: undefined }));
        }
        
        // Save to session storage if enabled
        if (saveData) {
            const currentData = {
                inputType,
                lmpDate: sanitizeDate(e.target.value),
                eddDate,
                motherDob
            };
            saveToSessionStorage(currentData);
        }
    };

    const handleEddDateChange = (e) => {
        setEddDate(sanitizeDate(e.target.value));
        if (errors.eddDate) {
            setErrors(prev => ({ ...prev, eddDate: undefined }));
        }
        
        // Save to session storage if enabled
        if (saveData) {
            const currentData = {
                inputType,
                lmpDate,
                eddDate: sanitizeDate(e.target.value),
                motherDob
            };
            saveToSessionStorage(currentData);
        }
    };

    const handleMotherDobChange = (e) => {
        setMotherDob(sanitizeDate(e.target.value));
        if (errors.motherDob) {
            setErrors(prev => ({ ...prev, motherDob: undefined }));
        }
        
        // Save to session storage if enabled
        if (saveData) {
            const currentData = {
                inputType,
                lmpDate,
                eddDate,
                motherDob: sanitizeDate(e.target.value)
            };
            saveToSessionStorage(currentData);
        }
    };

    const handleSaveDataToggle = (e) => {
        const isChecked = e.target.checked;
        setSaveData(isChecked);
        
        if (isChecked) {
            // Save current data when enabling
            const currentData = {
                inputType,
                lmpDate,
                eddDate,
                motherDob
            };
            saveToSessionStorage(currentData);
        } else {
            // Clear session storage when disabling
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Animated Background with Light Trails */}
            <AnimatedBackground />
            
            <div className="relative z-10">
                {/* Navbar */}
                <Navbar data={{ menu: [] }} showLabsButton={false} showMobileMenu={false} />

                {/* Main Content */}
                <div className="px-4 md:px-8 lg:px-16 xl:px-40 pt-24 pb-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                    Pregnancy Calculator
                                </span>
                            </h1>
                            <p className="text-gray-300 text-sm mx-auto">
                                Calculate your due date, track your pregnancy progress, and get personalized insights
                            </p>
                        </div>

                        {/* Input Form */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">Enter Your Information</h2>
                            
                            {/* General Error */}
                            {errors.general && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                        </svg>
                                        <p className="text-red-200 text-sm">{errors.general}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Input Type Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Calculation Method
                                </label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setInputType('lmp')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                            inputType === 'lmp'
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        Last Menstrual Period
                                    </button>
                                    <button
                                        onClick={() => setInputType('edd')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                            inputType === 'edd'
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        Due Date
                                    </button>
                                </div>
                            </div>

                            {/* Date Inputs */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                {inputType === 'lmp' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Last Menstrual Period (LMP) *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="date"
                                                value={lmpDate}
                                                onChange={handleLmpDateChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                                                    errors.lmpDate ? 'border-red-500' : 'border-gray-700'
                                                }`}
                                            />
                                        </div>
                                        {errors.lmpDate && (
                                            <p className="mt-1 text-sm text-red-400">{errors.lmpDate}</p>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Estimated Due Date (EDD) *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="date"
                                                value={eddDate}
                                                onChange={handleEddDateChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                                                    errors.eddDate ? 'border-red-500' : 'border-gray-700'
                                                }`}
                                            />
                                        </div>
                                        {errors.eddDate && (
                                            <p className="mt-1 text-sm text-red-400">{errors.eddDate}</p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Mother&apos;s Date of Birth *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="date"
                                            value={motherDob}
                                            onChange={handleMotherDobChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                                                errors.motherDob ? 'border-red-500' : 'border-gray-700'
                                            }`}
                                        />
                                    </div>
                                    {errors.motherDob && (
                                        <p className="mt-1 text-sm text-red-400">{errors.motherDob}</p>
                                    )}
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
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="text-sm">Save my data on this device</span>
                                    </div>
                                </label>
                                <p className="text-xs text-gray-400 mt-1 ml-7">
                                    Your data will be stored locally and auto-filled when you return
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={calculateResults}
                                    disabled={!motherDob || !((inputType === 'lmp' && lmpDate) || (inputType === 'edd' && eddDate))}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    Calculate
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Results */}
                        {results && (
                            <div className="space-y-6">
                                <PregnancySummary results={results} formatDate={formatDate} />
                                <ProgressBar results={results} />
                                <GenderPrediction results={results} />
                            </div>
                        )}

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

export default PregnancyCalculator;
