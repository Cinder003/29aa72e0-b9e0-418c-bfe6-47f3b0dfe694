import { IProspect } from '../interfaces/prospect.interface';
import ProspectItem from './ProspectItem';
import { AnimatePresence } from 'framer-motion';

interface ProspectListProps {
  prospects: IProspect[];
  onEdit: (prospect: IProspect) => void;
  onDelete: (id: number) => void;
}

const ProspectList: React.FC<ProspectListProps> = ({ prospects, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {prospects.map(prospect => (
          <ProspectItem key={prospect.id} prospect={prospect} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProspectList;