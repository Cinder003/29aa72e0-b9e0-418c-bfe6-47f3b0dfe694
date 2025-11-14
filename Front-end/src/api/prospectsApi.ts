import axios from 'axios';
import { IProspect, ProspectData } from '../interfaces/prospect.interface';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getProspects = async (searchTerm: string = ''): Promise<IProspect[]> => {
  const response = await api.get(`/prospects?search=${searchTerm}`);
  return response.data;
};

export const createProspect = async (prospectData: ProspectData): Promise<IProspect> => {
  const response = await api.post('/prospects', prospectData);
  return response.data;
};

export const updateProspect = async (id: number, prospectData: Partial<ProspectData>): Promise<IProspect> => {
  const response = await api.put(`/prospects/${id}`, prospectData);
  return response.data;
};

export const deleteProspect = async (id: number): Promise<void> => {
  await api.delete(`/prospects/${id}`);
};