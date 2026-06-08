import express from 'express';
import categoriesControllers from '../controllers/categoriesControllers';
const router = express.Router();

router.get('/categories', categoriesControllers.getCategories);
router.get('/category/:id', categoriesControllers.getCategory);
router.post('/category', categoriesControllers.registerCategory);
router.put('/category/:id', categoriesControllers.updateCategory);
router.delete('/category/:id', categoriesControllers.deleteCategory);

export default router;