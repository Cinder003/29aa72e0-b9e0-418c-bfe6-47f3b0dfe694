import { Router } from 'express';
import {
  createProspect,
  deleteProspect,
  getAllProspects,
  getProspectById,
  updateProspect,
} from '../controller/prospect.controller';
import { validateRequest } from '../middleware/validateRequest';
import { createProspectSchema, updateProspectSchema } from '../validation/prospect.validation';

const router = Router();

router.route('/')
  .get(getAllProspects)
  .post(validateRequest(createProspectSchema), createProspect);

router.route('/:id')
  .get(getProspectById)
  .put(validateRequest(updateProspectSchema), updateProspect)
  .delete(deleteProspect);

export { router as prospectRouter };