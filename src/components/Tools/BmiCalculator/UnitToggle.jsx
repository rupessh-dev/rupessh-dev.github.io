import { motion } from 'framer-motion';
import { FiRepeat } from 'react-icons/fi';

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="my-6">
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={onToggle}
          className="relative inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
        >
          <FiRepeat className="w-4 h-4 text-purple-400" />
          <span className="text-gray-300">
            {unit === 'metric' ? 'Metric (cm/kg)' : 'Imperial (ft/lb)'}
          </span>
        </button>
      </div>
      
      {/* Unit Pills */}
      <div className="flex justify-center gap-8 mt-4 text-sm">
        <motion.div
          animate={{ opacity: unit === 'metric' ? 1 : 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="text-purple-400">cm</div>
          <div className="text-blue-400">kg</div>
        </motion.div>
        <motion.div
          animate={{ opacity: unit === 'imperial' ? 1 : 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="text-purple-400">ft/in</div>
          <div className="text-blue-400">lb</div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnitToggle; 