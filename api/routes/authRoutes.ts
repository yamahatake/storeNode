import express from 'express';
import authControllers from '../controllers/authControllers';

const router = express.Router();

router.post('/admin-login', authControllers.adminLogin);

export default router;
