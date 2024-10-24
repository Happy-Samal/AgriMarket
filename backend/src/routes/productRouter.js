import express from 'express'
import { addProduct, getProducts, updateProduct, deleteProduct} from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// Routes for product management
router.post('/addProduct', authMiddleware, addProduct);
router.get('/getProducts', authMiddleware , getProducts);
router.put('/updateProduct', authMiddleware, updateProduct);
router.delete('/deleteProduct', authMiddleware, deleteProduct);

export default router