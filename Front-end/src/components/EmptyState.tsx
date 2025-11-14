import { FiUsers } from 'react-icons/fi';

type EmptyStateProps = {
  onAddProspect: () => void;
};

const EmptyState = ({ onAddProspect }: EmptyStateProps) => {
  return (
    <div className="text-center p-12 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-100 border border-purple-200">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full mb-6">
        <FiUsers className="text-4xl text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No Prospects Found</h3>
      <p className="text-gray-500 mb-6">Get started by adding your first prospect.</p>
      <button
        onClick={onAddProspect}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Add First Prospect
      </button>
    </div>
  );
};

export default EmptyState;