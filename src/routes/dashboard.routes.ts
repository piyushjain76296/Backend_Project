import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/summary', getDashboardSummary);

export default router;
