import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛍️ Get all products (with optional filters)
export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.subCategory) params.append('subCategory', filters.subCategory);
    if (filters.search) params.append('keyword', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.isNew) params.append('isNew', 'true');
    if (filters.isSale) params.append('isSale', 'true');
    if (filters.isRentable) params.append('isRentable', 'true');

    const res = await api.get(`/products?${params}`);
    return res.data.products;
  } catch (error) {
    console.error('❌ getProducts:', error.response?.data?.message || error.message);
    throw error;
  }
};

// 📦 Get product by ID
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error('❌ getProductById:', error.response?.data?.message || error.message);
    throw error;
  }
};

// 🌟 Get featured products
export const getFeaturedProducts = async () => {
  try {
    const res = await api.get('/products/featured');
    return res.data;
  } catch (error) {
    console.error('❌ getFeaturedProducts:', error.response?.data?.message || error.message);
    throw error;
  }
};

// 🆕 Get new arrivals
export const getNewArrivals = async () => {
  try {
    const res = await api.get('/products/new-arrivals');
    return res.data;
  } catch (error) {
    console.error('❌ getNewArrivals:', error.response?.data?.message || error.message);
    throw error;
  }
};

// 💸 Get sale products
export const getSaleProducts = async () => {
  try {
    const res = await api.get('/products/sale');
    return res.data;
  } catch (error) {
    console.error('❌ getSaleProducts:', error.response?.data?.message || error.message);
    throw error;
  }
};

// ✍️ Create a product review
export const createProductReview = async (productId, reviewData, token) => {
  try {
    const res = await api.post(`/products/${productId}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ createProductReview:', error.response?.data?.message || error.message);
    throw error;
  }
};
