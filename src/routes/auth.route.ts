import express from 'express'
import { loginHandller, rigesterHandller } from '../controller/auth.contraller';
import validate from '../middleware/validate';
import { loginSchema, rigesterSchema } from '../zod_schema/auth.schema';





const router =express.Router();

router.post('/login',validate(loginSchema) ,loginHandller);
router.post('/rigester',validate(rigesterSchema) ,rigesterHandller);


export default router;