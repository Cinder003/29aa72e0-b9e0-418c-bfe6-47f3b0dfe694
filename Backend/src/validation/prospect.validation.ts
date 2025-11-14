import { z } from 'zod';

const prospectStatus = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED']);

export const createProspectSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
    status: prospectStatus.optional(),
  }),
});

export const updateProspectSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    status: prospectStatus.optional(),
  }).partial(),
});