import { FiArrowDown } from 'react-icons/fi';

const WeightInput = ({ value, onChange }) => {
  return (
    <div className="my-6">
      <label className="block text-gray-300 mb-2 flex items-center gap-2">
        <FiArrowDown className="text-blue-400" />
        Weight
      </label>
      
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          placeholder="Enter weight"
          step="0.1"
          min="0"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          kg
        </span>
      </div>
    </div>
  );
};

export default WeightInput;
