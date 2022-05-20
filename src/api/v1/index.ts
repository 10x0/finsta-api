import express from 'express';

import { errorMiddleware } from './middlewares';
import { authRoutes, postRoutes } from './routes';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/post', postRoutes);

router.use(errorMiddleware);

export default router;
