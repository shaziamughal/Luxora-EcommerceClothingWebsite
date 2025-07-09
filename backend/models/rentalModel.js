import mongoose from 'mongoose';

const rentalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      enum: ['3_days', 'five_days', 'week'],
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'active', 'completed', 'cancelled'],
    },
    returnStatus: {
      type: String,
      enum: ['pending', 'returned', 'late', 'damaged'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental;