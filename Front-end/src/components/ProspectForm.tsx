import React, { useState, useEffect } from 'react';
import { IProspect, ProspectData, prospectStatuses } from '../interfaces/prospect.interface';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiSave, FiX, FiFlag } from 'react-icons/fi';
import Button from './ui/Button';
import Input from './ui/Input';

interface ProspectFormProps {
  prospectToEdit?: IProspect | null;
  onSubmit: (data: ProspectData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ProspectForm: React.FC<ProspectFormProps> = ({ prospectToEdit, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState<ProspectData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'NEW',
  });

  useEffect(() => {
    if (prospectToEdit) {
      setFormData({
        name: prospectToEdit.name,
        email: prospectToEdit.email,
        phone: prospectToEdit.phone || '',
        company: prospectToEdit.company || '',
        status: prospectToEdit.status,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'NEW',
      });
    }
  }, [prospectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {prospectToEdit ? 'Edit Prospect' : 'Add New Prospect'}
      </h2>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        label="Full Name"
        icon={<FiUser />}
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        value={formData.email}
        onChange={handleChange}
        label="Email Address"
        icon={<FiMail />}
        required
      />
      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="(123) 456-7890"
        value={formData.phone}
        onChange={handleChange}
        label="Phone Number"
        icon={<FiPhone />}
      />
      <Input
        id="company"
        name="company"
        type="text"
        placeholder="Acme Inc."
        value={formData.company}
        onChange={handleChange}
        label="Company"
        icon={<FiBriefcase />}
      />
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
          Status
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="text-gray-400"><FiFlag /></span>
          </div>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full py-3 pl-12 pr-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300"
          >
            {prospectStatuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} icon={<FiX />}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} icon={<FiSave />}>
          {prospectToEdit ? 'Save Changes' : 'Create Prospect'}
        </Button>
      </div>
    </form>
  );
};

export default ProspectForm;