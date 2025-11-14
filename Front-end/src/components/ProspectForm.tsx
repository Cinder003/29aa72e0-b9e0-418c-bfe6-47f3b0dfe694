import React, { useState, useEffect } from 'react';
import { IProspect, ProspectData } from '../interfaces/prospect.interface';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiSave, FiX } from 'react-icons/fi';
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
  });

  useEffect(() => {
    if (prospectToEdit) {
      setFormData({
        name: prospectToEdit.name,
        email: prospectToEdit.email,
        phone: prospectToEdit.phone || '',
        company: prospectToEdit.company || '',
      });
    } else {
      setFormData({ name: '', email: '', phone: '', company: '' });
    }
  }, [prospectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
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