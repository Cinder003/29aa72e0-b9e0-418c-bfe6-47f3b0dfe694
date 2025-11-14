export interface IProspect {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProspectData = Omit<IProspect, 'id' | 'createdAt' | 'updatedAt'>;