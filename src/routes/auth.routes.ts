import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { validateResource } from '../middlewares/validateResource';
import { loginSchema } from '../validations/auth.schema';

const router = Router();

router.post('/login', validateResource(loginSchema), login);

export default router;
