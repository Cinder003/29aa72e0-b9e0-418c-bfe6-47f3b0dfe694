import { IProspect } from '../interfaces/prospect.interface';
import { FiMail, FiPhone, FiBriefcase, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProspectItemProps {
  prospect: IProspect;
  onEdit: (prospect: IProspect) => void;
  onDelete: (id: number) => void;
}

const ProspectItem: React.FC<ProspectItemProps> = ({ prospect, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-purple-200/50 border border-purple-100 hover:shadow-xl hover:shadow-purple-300/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{prospect.name}</h3>
          {prospect.company && (
            <p className="text-sm text-purple-600 font-medium flex items-center gap-2 mt-1">
              <FiBriefcase /> {prospect.company}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(prospect)}
            className="p-2 rounded-full text-blue-500 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
            aria-label={`Edit ${prospect.name}`}
          >
            <FiEdit />
          </button>
          <button
            onClick={() => onDelete(prospect.id)}
            className="p-2 rounded-full text-red-500 bg-red-100 hover:bg-red-200 transition-colors duration-200"
            aria-label={`Delete ${prospect.name}`}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-gray-600">
        <p className="flex items-center gap-3">
          <FiMail className="text-cyan-500" />
          <a href={`mailto:${prospect.email}`} className="hover:text-cyan-600 transition-colors">
            {prospect.email}
          </a>
        </p>
        {prospect.phone && (
          <p className="flex items-center gap-3">
            <FiPhone className="text-cyan-500" />
            <span>{prospect.phone}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProspectItem;