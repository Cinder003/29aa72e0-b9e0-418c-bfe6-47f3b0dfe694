import { IProspect, ProspectStatus } from '../interfaces/prospect.interface';
import { FiMail, FiPhone, FiBriefcase, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProspectItemProps {
  prospect: IProspect;
  onEdit: (prospect: IProspect) => void;
  onDelete: (id: number) => void;
}

const statusStyles: Record<ProspectStatus, { bg: string; text: string; dot: string }> = {
  NEW: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  CONTACTED: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  QUALIFIED: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  CONVERTED: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
};

const StatusBadge: React.FC<{ status: ProspectStatus }> = ({ status }) => {
  const { bg, text, dot } = statusStyles[status] || statusStyles.NEW;
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </div>
  );
};

const ProspectItem: React.FC<ProspectItemProps> = ({ prospect, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg shadow-purple-200/50 border border-purple-100 hover:shadow-xl hover:shadow-purple-300/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{prospect.name}</h3>
            {prospect.company && <p className="text-sm text-gray-500 flex items-center gap-2"><FiBriefcase /> {prospect.company}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit(prospect)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><FiEdit /></button>
            <button onClick={() => onDelete(prospect.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"><FiTrash2 /></button>
          </div>
        </div>
        <div className="mt-4">
          <StatusBadge status={prospect.status} />
        </div>
      </div>
      <div className="mt-4 space-y-2 text-gray-600 border-t border-purple-100 pt-4">
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