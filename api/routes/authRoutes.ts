import express from 'express';
import authControllers from '../controllers/authControllers';

const router = express.Router();

router.post('/login', authControllers.userLogin);
router.post('/register', authControllers.userRegistration);

export default router;
