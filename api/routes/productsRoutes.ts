import express from 'express';
import productsControllers from '../controllers/productsControllers';
const router = express.Router();

router.get('/products', productsControllers.getProducts);
router.get('/product/:id', productsControllers.getProduct);
router.post('/product', productsControllers.registerProduct);
router.put('/product/:id', productsControllers.updateProduct);
router.delete('/product/:id', productsControllers.deleteProduct);

export default router;