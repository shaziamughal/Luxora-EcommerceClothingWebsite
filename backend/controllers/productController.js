import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Rental from '../models/rentalModel.js'; 

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const category = req.query.category ? { category: { $regex: new RegExp(`^${req.query.category}$`, 'i') } } : {};
  const subCategory = req.query.subCategory ? { subCategory: { $regex: new RegExp(`^${req.query.subCategory}$`, 'i') } } : {};
  const isNew = req.query.isNew ? { isNew: true } : {};
  const isSale = req.query.isSale ? { isSale: true } : {};
  const isRentable = req.query.isRentable ? { isRentable: true } : {};

  const priceRange = {};
  if (req.query.minPrice) priceRange.$gte = Number(req.query.minPrice);
  if (req.query.maxPrice) priceRange.$lte = Number(req.query.maxPrice);
  const price = Object.keys(priceRange).length > 0 ? { price: priceRange } : {};

  const count = await Product.countDocuments({
    ...keyword,
    ...category,
    ...subCategory,
    ...isNew,
    ...isSale,
    ...isRentable,
    ...price,
  });

  const products = await Product.find({
    ...keyword,
    ...category,
    ...subCategory,
    ...isNew,
    ...isSale,
    ...isRentable,
    ...price,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.reviewCount = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).limit(4);
  res.json(products);
});

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivals = asyncHandler(async (req, res) => {
  const products = await Product.find({ isNew: true }).limit(4);
  res.json(products);
});

// @desc    Get sale products
// @route   GET /api/products/sale
// @access  Public
const getSaleProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isSale: true }).limit(4);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProductReview,
  getFeaturedProducts,
  getNewArrivals,
  getSaleProducts,
};

// @desc Rent a product
// @route POST /api/products/:id/rent
// @access Private (if auth needed)


export const rentProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { duration } = req.body;

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!product.isRentable) {
    res.status(400);
    throw new Error('This product is not available for rent');
  }

  if (!product.rentalPrices[duration]) {
    res.status(400);
    throw new Error('Invalid rental duration');
  }

  const price = product.rentalPrices[duration];

  const durationToDays = {
    three_days: 3,
    five_days: 5,
    week: 7,
  };

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + durationToDays[duration]);

  const rental = await Rental.create({
    product: product._id,
    user: req.user._id,
    duration,
    price,
    startDate,
    endDate,
  });

  res.status(201).json({
    message: `Product rented for ${duration}`,
    price,
    rental,
  });
});


