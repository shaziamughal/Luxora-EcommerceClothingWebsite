// backend/server.js
import express from 'express'
import mongoose from 'mongoose'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';


dotenv.config()
connectDB();

const app = express()
// Middleware to parse JSON bodies
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', // React frontend
  credentials: true,
}));

// ✅ Mount the userRoutes here
app.use('/api/users', userRoutes);
// Mount the productRoutes here
app.use('/api/products', productRoutes);
// Mount the rentalRoutes here
app.use('/api/rentals', rentalRoutes);

app.use('/api/contactus', contactRoutes);
// Global error handler
app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Example Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))