import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlist';
import { useCartStore } from '../../store/cart';

export const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

  const { addItem } = useCartStore();
  
  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    
    // Optionally remove from wishlist after adding to cart
    removeFromWishlist(item.id);
  };
  
  if (items.length === 0) {
    return (
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
              <Heart size={30} className="text-neutral-400" />
            </div>
            <h1 className="font-heading text-3xl font-semibold text-secondary mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Add items to your wishlist by clicking the heart icon on any product.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-semibold text-secondary">
            My Wishlist
          </h1>
          
          <button
            onClick={clearWishlist}
            className="text-neutral-600 hover:text-primary transition-colors flex items-center"
          >
            <Trash2 size={18} className="mr-2" />
            Clear Wishlist
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card group overflow-hidden"
            >
              <Link to={`/products/${item.id}`} className="block relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(item.id);
                    }}
                    className="p-2 bg-white rounded-full text-error hover:bg-error hover:text-white transition-colors shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${item.id}`} className="block">
                  <h3 className="font-medium text-neutral-800 mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Rs{item.price.toFixed(2)}</span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center justify-center text-neutral-700 hover:text-primary transition-colors"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};