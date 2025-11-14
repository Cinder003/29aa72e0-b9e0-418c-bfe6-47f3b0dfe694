import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => ({ path: e.path, message: e.message })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({ message: `Conflict: A record with this value already exists.`, details: err.meta });
    }
    // Record to update not found
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Record not found.' });
    }
  }

  return res.status(500).json({ message: 'An unexpected error occurred' });
};