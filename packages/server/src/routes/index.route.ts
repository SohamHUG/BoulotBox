import { Router } from "express";
import authRoutes from './auth.route'
import usersRoutes from './user.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;