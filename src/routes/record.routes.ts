import { Router } from 'express';
import { createRecord, getRecords, getRecordById, updateRecord, deleteRecord } from '../controllers/record.controller';
import { validateResource } from '../middlewares/validateResource';
import { createRecordSchema, updateRecordSchema, getRecordsQuerySchema } from '../validations/record.schema';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { Role } from '../models/User';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(validateResource(getRecordsQuerySchema), getRecords)
  // Only Admin and Analyst can create
  .post(requireRole([Role.ADMIN, Role.ANALYST]), validateResource(createRecordSchema), createRecord);

router.route('/:id')
  .get(getRecordById)
  // Only Admin and Analyst can update
  .put(requireRole([Role.ADMIN, Role.ANALYST]), validateResource(updateRecordSchema), updateRecord)
  // Only Admin can delete
  .delete(requireRole([Role.ADMIN]), deleteRecord);

export default router;
