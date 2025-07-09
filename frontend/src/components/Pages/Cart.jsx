import React, { useState } from 'react';
import { Link, Routes, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react';
import { useCartStore } from '../../store/cart';
import ComingSoon from './Info/ComingSoon';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleApplyCoupon = () => {
    setCouponError(null);
    setCouponApplied(false);

    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      setCouponApplied(true);
      setDiscount(getTotalPrice() * 0.2);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <ShoppingBag size={30} className="text-neutral-400" />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-secondary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const navigate = useNavigate();

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <h1 className="font-heading text-3xl font-semibold text-secondary mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <h2 className="font-heading text-xl font-medium text-secondary">
                    Items ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div>
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-sm shadow-sm p-6">
              <h2 className="font-heading text-xl font-medium text-secondary mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">Rs{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-Rs{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">Rs{total.toFixed(2)}</span>
                  </div>
                  <div className="text-right text-sm text-neutral-500 mt-1">
                    Including taxes
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-neutral-700 mb-2">
                  Apply Coupon Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className={`input-field rounded-r-none ${couponError ? 'border-error' : ''}`}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-primary text-white px-4 rounded-r-sm hover:bg-primary-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <div className="flex items-center mt-2 text-error text-sm">
                    <AlertCircle size={14} className="mr-1" />
                    <span>{couponError}</span>
                  </div>
                )}

                {couponApplied && (
                  <div className="flex items-center mt-2 text-success text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Coupon applied successfully!</span>
                  </div>
                )}
              </div>
              <button
                className="btn-primary w-full py-3"
                onClick={() => navigate('/coming-soon')}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-sm text-neutral-500 text-center">
                Secure checkout provided by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemRow = ({ item, onQuantityChange, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 border-b border-neutral-200 last:border-0 flex items-center"
    >
      <Link to={`/products/${item.id}`} className="flex-shrink-0 w-20 h-20 bg-neutral-50 mr-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-grow">
        <Link to={`/products/${item.id}`} className="font-medium text-neutral-800 hover:text-primary">
          {item.name}
        </Link>

        {(item.size || item.color) && (
          <div className="text-sm text-neutral-500 mt-1">
            {item.size && <span>Size: {item.size}</span>}
            {item.size && item.color && <span> / </span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-neutral-300 rounded-sm">
            <button
              className="w-8 h-8 flex items-center justify-center text-neutral-600"
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
              className="w-10 h-8 border-x border-neutral-300 text-center text-sm"
            />
            <button
              className="w-8 h-8 flex items-center justify-center text-neutral-600"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="font-medium text-secondary">
            Rs{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>

      <button
        className="ml-4 text-neutral-400 hover:text-error transition-colors"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};
