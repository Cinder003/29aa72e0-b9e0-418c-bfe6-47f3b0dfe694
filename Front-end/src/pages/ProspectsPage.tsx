import { useState, useEffect } from 'react';
import { useProspects } from '../hooks/useProspects';
import ProspectList from '../components/ProspectList';
import ProspectForm from '../components/ProspectForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import SearchBar from '../components/SearchBar';
import { IProspect, ProspectData, prospectStatuses } from '../interfaces/prospect.interface';
import { FiPlus, FiUsers } from 'react-icons/fi';
import EmptyState from '../components/EmptyState';
import { CgSpinner } from 'react-icons/cg';

const ProspectsPage = () => {
  const { prospects, isLoading: isLoadingList, fetchProspects, addProspect, editProspect, removeProspect } = useProspects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospectToEdit, setProspectToEdit] = useState<IProspect | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProspects(searchTerm, statusFilter);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, statusFilter, fetchProspects]);

  const handleOpenModal = (prospect: IProspect | null = null) => {
    setProspectToEdit(prospect);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProspectToEdit(null);
  };

  const handleSubmit = async (data: ProspectData) => {
    setIsSubmitting(true);
    if (prospectToEdit) {
      await editProspect(prospectToEdit.id, data);
    } else {
      await addProspect(data);
    }
    setIsSubmitting(false);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this prospect?')) {
      await removeProspect(id);
    }
  };

  const FilterButtons = () => (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-md shadow-purple-200/50">
      <button
        onClick={() => setStatusFilter('')}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
          statusFilter === '' ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-100'
        }`}
      >
        All
      </button>
      {prospectStatuses.map(status => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
            statusFilter === status ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-100'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2 animate-gradient-pan">
          Prospect Pilot
        </h1>
        <p className="text-lg text-gray-600">Your compass for navigating sales leads.</p>
      </header>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>
          Add Prospect
        </Button>
      </div>

      <div className="mb-6 flex justify-center">
        <FilterButtons />
      </div>

      {isLoadingList && prospects.length === 0 ? (
        <div className="flex justify-center items-center p-12">
          <CgSpinner className="animate-spin text-5xl text-purple-500" />
        </div>
      ) : prospects.length > 0 ? (
        <ProspectList prospects={prospects} onEdit={handleOpenModal} onDelete={handleDelete} />
      ) : (
        <EmptyState onAddProspect={() => handleOpenModal()} />
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProspectForm
          prospectToEdit={prospectToEdit}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default ProspectsPage;