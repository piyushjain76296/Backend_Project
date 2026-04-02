import { Router } from 'express';
import { createUser, getUsers, updateUserRole } from '../controllers/user.controller';
import { validateResource } from '../middlewares/validateResource';
import { createUserSchema, updateUserRoleSchema } from '../validations/user.schema';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { Role } from '../models/User';

const router = Router();

// Only ADMIN can manage users
router.use(authMiddleware);
router.use(requireRole([Role.ADMIN]));

router.route('/')
  .post(validateResource(createUserSchema), createUser)
  .get(getUsers);

router.route('/:id/role')
  .put(validateResource(updateUserRoleSchema), updateUserRole);

export default router;
