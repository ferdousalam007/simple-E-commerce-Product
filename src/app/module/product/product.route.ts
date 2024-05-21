import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

//
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);
router.delete('/:productId', ProductController.deleteProductById);
router.put('/:productId', ProductController.updateProductById);

export const ProductRouter = router;
