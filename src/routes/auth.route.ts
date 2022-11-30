import express from 'express'
import { loginHandller, rigesterHandller } from '../controller/auth.contraller';
import validate from '../middleware/validate';
import { loginSchema, rigesterSchema } from '../zod_schema/auth.schema';
import protect from '../middleware/protect';


const router =express.Router();

router.post('/login',protect,validate(loginSchema) ,loginHandller);
router.post('/rigester',protect,validate(rigesterSchema) ,rigesterHandller);


export default router;