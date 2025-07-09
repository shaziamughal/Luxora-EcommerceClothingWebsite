import asyncHandler from 'express-async-handler';
import Rental from '../models/rentalModel.js';
import Product from '../models/productModel.js';

// @desc    Create new rental
// @route   POST /api/rentals
// @access  Private
const createRental = asyncHandler(async (req, res) => {
  const { productId, startDate, duration } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!product.isRentable) {
    res.status(400);
    throw new Error('Product is not available for rent');
  }

  // Calculate end date based on duration
  const start = new Date(startDate);
  const end = new Date(startDate);
  switch (duration) {
    case '3_days':
      end.setDate(end.getDate() + 3);
      break;
    case 'five_days':
      end.setDate(end.getDate() + 5);
      break;
    case 'week':
      end.setDate(end.getDate() + 7);
      break;
    default:
      res.status(400);
      throw new Error('Invalid rental duration');
  }

  // Check if product is available for the selected dates
  const existingRental = await Rental.findOne({
    product: productId,
    status: { $in: ['pending', 'active'] },
    startDate: { $lte: end },
    endDate: { $gte: start },
  });

  if (existingRental) {
    res.status(400);
    throw new Error('Product is not available for these dates');
  }

  // Calculate rental price
  const rentalPrice = product.rentalPrices[duration];

  const rental = await Rental.create({
    user: req.user._id,
    product: productId,
    startDate: start,
    endDate: end,
    duration,
    price: rentalPrice,
  });

  res.status(201).json(rental);
});

// @desc    Get user rentals
// @route   GET /api/rentals
// @access  Private
const getUserRentals = asyncHandler(async (req, res) => {
  const rentals = await Rental.find({ user: req.user._id })
    .populate('product', 'name images price')
    .sort('-createdAt');

  res.json(rentals);
});

// @desc    Get rental by ID
// @route   GET /api/rentals/:id
// @access  Private
const getRentalById = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id)
    .populate('product', 'name images price description')
    .populate('user', 'name email');

  if (rental) {
    res.json(rental);
  } else {
    res.status(404);
    throw new Error('Rental not found');
  }
});

// @desc    Update rental status
// @route   PUT /api/rentals/:id/status
// @access  Private
const updateRentalStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const rental = await Rental.findById(req.params.id);

  if (rental) {
    rental.status = status;
    const updatedRental = await rental.save();
    res.json(updatedRental);
  } else {
    res.status(404);
    throw new Error('Rental not found');
  }
});

export {
  createRental,
  getUserRentals,
  getRentalById,
  updateRentalStatus,
};