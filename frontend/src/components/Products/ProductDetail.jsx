import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, Share2, ShoppingBag, Truck, Calendar, CheckCircle, Star } from 'lucide-react';
import { getProductById } from '../../api/products';
import { useCartStore } from '../../store/cart';
import { useWishlistStore } from '../../store/wishlist';
import { RENTAL_DURATION, RENTAL_PRICES } from '../../types/rental';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [isRental, setIsRental] = useState(false);
  const [rentalDuration, setRentalDuration] = useState(RENTAL_DURATION.THREE_DAYS);
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          if (data.sizes?.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
          if (data.colors?.length > 0) {
            setSelectedColor(data.colors[0].name);
          }
        } else {
          navigate('/products');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id, navigate]);

  const calculatePrice = () => {
    if (!product) return 0;
    if (!isRental) return product.price;
    return product.price * RENTAL_PRICES[rentalDuration];
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && !selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (product.colors && !selectedColor) {
      setError('Please select a color');
      return;
    }
    
    setError(null);
    
    addItem({
      id: product.id,
      name: product.name,
      price: calculatePrice(),
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
      isRental,
      rentalDuration: isRental ? rentalDuration : null
    });
    
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-neutral-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-heading font-semibold text-secondary mb-4">Product Not Found</h2>
        <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="py-4">
          <ol className="flex items-center text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-neutral-500 hover:text-primary transition-colors">Home</Link>
              <span className="mx-2 text-neutral-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="text-neutral-500 hover:text-primary transition-colors">Products</Link>
              <span className="mx-2 text-neutral-400">/</span>
            </li>
            <li className="text-neutral-900 font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg ${
                    index === activeImageIndex ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-heading font-semibold text-gray-900">{product.name}</h1>
            
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Rs{calculatePrice().toFixed(2)}</h2>
                {product.originalPrice && !isRental && (
                  <span className="ml-3 text-gray-500 line-through">
                    Rs{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Purchase/Rent Toggle */}
              <div className="mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsRental(false)}
                    className={`px-4 py-2 rounded-lg ${
                      !isRental 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Purchase
                  </button>
                  <button
                    onClick={() => setIsRental(true)}
                    className={`px-4 py-2 rounded-lg ${
                      isRental 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Rental Options */}
              {isRental && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">Rental Duration</h3>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setRentalDuration(RENTAL_DURATION.THREE_DAYS)}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        rentalDuration === RENTAL_DURATION.THREE_DAYS
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      3 Days
                    </button>
                    <button
                      onClick={() => setRentalDuration(RENTAL_DURATION.FIVE_DAYS)}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        rentalDuration === RENTAL_DURATION.FIVE_DAYS
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      5 Days
                    </button>
                    <button
                      onClick={() => setRentalDuration(RENTAL_DURATION.WEEK)}
                      className={`px-4 py-2 text-sm rounded-lg ${
                        rentalDuration === RENTAL_DURATION.WEEK
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      1 Week
                    </button>
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-sm rounded-lg ${
                          selectedSize === size
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        {selectedColor === color.name && (
                          <CheckCircle size={16} className="text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 border rounded-lg"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">
                    ({product.stock} available)
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-lg ${
                    isInWishlist(product.id)
                      ? 'bg-primary/10 text-primary'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart
                    size={24}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Product Description */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div className="mt-2 prose prose-sm text-gray-500">
                  {product.description}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-8">
                <div className="flex items-center">
                  <Truck size={20} className="text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    Free shipping on orders over Rs4000
                  </span>
                </div>
                {isRental && (
                  <div className="flex items-center mt-2">
                    <Calendar size={20} className="text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      {rentalDuration === RENTAL_DURATION.THREE_DAYS && '3-day rental period'}
                      {rentalDuration === RENTAL_DURATION.FIVE_DAYS && '5-day rental period'}
                      {rentalDuration === RENTAL_DURATION.WEEK && '7-day rental period'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};