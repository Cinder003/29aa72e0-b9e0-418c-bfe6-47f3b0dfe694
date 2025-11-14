export type ProspectStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED';

export const prospectStatuses: ProspectStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED'];

export interface IProspect {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  status: ProspectStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProspectData = Omit<IProspect, 'id' | 'createdAt' | 'updatedAt'>;