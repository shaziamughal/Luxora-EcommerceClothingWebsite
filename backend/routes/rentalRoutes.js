import express from 'express';
import {
  createRental,
  getUserRentals,
  getRentalById,
  updateRentalStatus,
} from '../controllers/rentalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createRental)
  .get(protect, getUserRentals);

router.route('/:id')
  .get(protect, getRentalById);

router.route('/:id/status')
  .put(protect, updateRentalStatus);

export default router;