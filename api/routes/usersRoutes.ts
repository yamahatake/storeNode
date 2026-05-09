import express from 'express';
import usersControllers from '../controllers/usersControllers';
const router = express.Router();

router.get('/user', usersControllers.getUser);
router.get('/users', usersControllers.getUsers);

export default router;
