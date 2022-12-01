import express from 'express';
import {
  adminHandler,
  getAllUsersHandler,
  loginHandller,
  rigesterHandller,
  userHandler,
} from '../controller/auth.contraller';
import { authorize, protect } from '../middleware/protect';
import validate from '../middleware/validate';
import { loginSchema, rigesterSchema } from '../zod_schema/auth.schema';

const router =express.Router();

router.post('/login', validate(loginSchema), loginHandller);
router.get('/users', protect, getAllUsersHandler);
router.post('/register', validate(rigesterSchema), rigesterHandller);
router.get('/admin', protect, authorize('ADMIN'), adminHandler);
router.get('/user', protect, authorize('USER', 'ADMIN'), userHandler);
router.get('/superuser', protect, authorize('ADMIN'), adminHandler);

export default router;