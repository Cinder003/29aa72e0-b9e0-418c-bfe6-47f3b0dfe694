import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProspects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const where = search
      ? {
          OR: [
            { name: { contains: String(search), mode: 'insensitive' } },
            { email: { contains: String(search), mode: 'insensitive' } },
            { company: { contains: String(search), mode: 'insensitive' } },
          ],
        }
      : {};
    const prospects = await prisma.prospect.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.status(200).json(prospects);
  } catch (error) {
    next(error);
  }
};

export const createProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProspect = await prisma.prospect.create({
      data: req.body,
    });
    res.status(201).json(newProspect);
  } catch (error) {
    next(error);
  }
};

export const getProspectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const prospect = await prisma.prospect.findUnique({
      where: { id: Number(id) },
    });
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }
    res.status(200).json(prospect);
  } catch (error) {
    next(error);
  }
};

export const updateProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedProspect = await prisma.prospect.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedProspect);
  } catch (error) {
    next(error);
  }
};

export const deleteProspect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.prospect.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};