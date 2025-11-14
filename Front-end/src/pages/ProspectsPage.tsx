import { useState, useEffect } from 'react';
import { useProspects } from '../hooks/useProspects';
import ProspectList from '../components/ProspectList';
import ProspectForm from '../components/ProspectForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import SearchBar from '../components/SearchBar';
import { IProspect, ProspectData } from '../interfaces/prospect.interface';
import { FiPlus, FiUsers } from 'react-icons/fi';
import EmptyState from '../components/EmptyState';
import { CgSpinner } from 'react-icons/cg';

const ProspectsPage = () => {
  const { prospects, isLoading, fetchProspects, addProspect, editProspect, removeProspect } = useProspects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospectToEdit, setProspectToEdit] = useState<IProspect | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProspects(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchProspects]);

  const handleOpenModal = (prospect?: IProspect) => {
    setProspectToEdit(prospect || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProspectToEdit(null);
  };

  const handleSubmit = async (data: ProspectData) => {
    try {
      if (prospectToEdit) {
        await editProspect(prospectToEdit.id, data);
      } else {
        await addProspect(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this prospect?')) {
      removeProspect(id);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center my-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient-pan bg-[200%_auto]">
          Prospect Pilot
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Your new co-pilot for managing and tracking potential leads with ease and style.
        </p>
      </header>

      <div className="mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg shadow-purple-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>
          Add Prospect
        </Button>
      </div>

      {isLoading && prospects.length === 0 ? (
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
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default ProspectsPage;