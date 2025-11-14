import { useState, useEffect, useCallback } from 'react';
import { IProspect, ProspectData } from '../interfaces/prospect.interface';
import * as prospectsApi from '../api/prospectsApi';
import toast from 'react-hot-toast';

export const useProspects = () => {
  const [prospects, setProspects] = useState<IProspect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProspects = useCallback(async (searchTerm: string = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await prospectsApi.getProspects(searchTerm);
      setProspects(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      toast.error('Failed to fetch prospects.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProspect = async (prospectData: ProspectData) => {
    setIsLoading(true);
    try {
      const newProspect = await prospectsApi.createProspect(prospectData);
      setProspects(prev => [newProspect, ...prev]);
      toast.success('Prospect added successfully!');
    } catch (err) {
      toast.error('Failed to add prospect. Email may already exist.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editProspect = async (id: number, prospectData: Partial<ProspectData>) => {
    setIsLoading(true);
    try {
      const updatedProspect = await prospectsApi.updateProspect(id, prospectData);
      setProspects(prev => prev.map(p => (p.id === id ? updatedProspect : p)));
      toast.success('Prospect updated successfully!');
    } catch (err) {
      toast.error('Failed to update prospect.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProspect = async (id: number) => {
    try {
      await prospectsApi.deleteProspect(id);
      setProspects(prev => prev.filter(p => p.id !== id));
      toast.success('Prospect deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete prospect.');
    }
  };

  useEffect(() => {
    fetchProspects();
  }, [fetchProspects]);

  return {
    prospects,
    isLoading,
    error,
    fetchProspects,
    addProspect,
    editProspect,
    removeProspect,
  };
};