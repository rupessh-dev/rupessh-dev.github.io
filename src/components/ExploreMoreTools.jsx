import { Link } from 'react-router-dom';
import { FiBox } from 'react-icons/fi';

const ExploreMoreTools = () => {
  return (
    <Link
      to="/labs"
      className="fixed bottom-24 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
    >
      <FiBox className="w-5 h-5" />
      <span>Explore More Tools</span>
    </Link>
  );
};

export default ExploreMoreTools; 