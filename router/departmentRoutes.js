import express from 'express';
import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
}  from '../controller/departmentController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// CRUD routes
router.post('/addnew', upload, createDepartment);
router.get('/getall', getDepartments);
router.get('/:id', getDepartmentById);
router.put('/update/:id', upload, updateDepartment);
router.delete('/delete/:id', deleteDepartment);

export default router;
