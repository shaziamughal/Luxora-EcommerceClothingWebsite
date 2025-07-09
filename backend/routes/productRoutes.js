import express from 'express';
import {
  getProducts,
  getProductById,
  createProductReview,
  getFeaturedProducts,
  getNewArrivals,
  getSaleProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/featured').get(getFeaturedProducts);
router.route('/new-arrivals').get(getNewArrivals);
router.route('/sale').get(getSaleProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;