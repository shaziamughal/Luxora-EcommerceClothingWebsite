import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cart';
import { useWishlistStore } from '../../store/wishlist';

export const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  
  const productId = product.id || product._id;
  const isWishlisted = isInWishlist(productId);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.sizes ? product.sizes[0] : undefined,
      color: product.colors ? product.colors[0].name : undefined,
    });
  };
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(productId);

    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
  };
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <Link to={`/products/${product._id}`}>
      <motion.div 
        className="product-card group relative rounded-sm overflow-hidden bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        {/* Product Image */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="product-card-img w-full h-full object-cover"
          />
          
          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="bg-white text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag size={20} />
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted 
                    ? 'bg-primary text-white hover:bg-white hover:text-primary' 
                    : 'bg-white text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.isNew && (
              <span className="badge badge-new">New</span>
            )}
            {product.isSale && (
              <span className="badge badge-sale">-{discountPercentage}%</span>
            )}
            {product.isRentable && (
              <span className="badge bg-accent text-white">Rentable</span>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-800 mb-1">{product.name}</h3>
          <div className="flex items-baseline">
            <span className="text-primary font-semibold">Rs{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-neutral-500 text-sm line-through">
                Rs{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-500' 
                      : i < product.rating 
                        ? 'text-yellow-500' 
                        : 'text-neutral-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-neutral-500 ml-1">
              ({product.reviewCount})
            </span>
          </div>
          
          {/* Stock status */}
          <div className="mt-2">
            {product.countInStock > 0 ? (
              <span className="text-xs text-success">In Stock ({product.countInStock})</span>
            ) : (
              <span className="text-xs text-error">Out of Stock</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};