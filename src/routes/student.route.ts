import express from 'express'
import validate from '../middleware/validate';
import { addStudent, getAllStudent, getByStudentId } from '../controller/student.controller';




const router =express.Router();

router.get('/students',getAllStudent);
router.post('/newStudent',addStudent);
router.get('/getStudent',getByStudentId)



export default router;