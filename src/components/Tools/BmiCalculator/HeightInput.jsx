import { FiArrowUp } from 'react-icons/fi';

const HeightInput = ({ value, onChange }) => {
  // Parse the current decimal value into feet and inches
  const feet = value ? Math.floor(parseFloat(value)) : '';
  const inches = value ? Math.round((parseFloat(value) % 1) * 12) : '';

  const handleChange = (newFeet, newInches) => {
    let finalFeet = parseFloat(newFeet || 0);
    let finalInches = parseFloat(newInches || 0);

    // If 12 inches is selected, convert it to 1 foot
    if (finalInches === 12) {
      finalFeet += 1;
      finalInches = 0;
    }

    // Convert feet and inches to decimal feet
    const totalFeet = finalFeet + (finalInches / 12);
    onChange(totalFeet.toString());
  };

  // Generate options for feet (1-8) and inches (0-12)
  const feetOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const inchesOptions = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div className="my-4 sm:my-6">
      <label className="block text-gray-300 mb-2 flex items-center gap-2 text-sm sm:text-base">
        <FiArrowUp className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
        Height
      </label>
      
      <div className="flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <select
            value={feet}
            onChange={(e) => handleChange(e.target.value, inches)}
            className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-12 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Feet</option>
            {feetOptions.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base">
            ft
          </span>
          <div className="pointer-events-none absolute inset-y-0 right-8 sm:right-10 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative flex-1">
          <select
            value={inches}
            onChange={(e) => handleChange(feet, e.target.value)}
            className="w-full appearance-none pl-3 sm:pl-4 pr-8 sm:pr-12 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Inches</option>
            {inchesOptions.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base">
            in
          </span>
          <div className="pointer-events-none absolute inset-y-0 right-8 sm:right-10 flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightInput; 