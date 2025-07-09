import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../Products/ProductCard';
import { getFeaturedProducts, getNewArrivals, getSaleProducts } from '../../api/products';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      
      try {
        // Load products in parallel
        const [featured, newItems, sale] = await Promise.all([
          getFeaturedProducts(),
          getNewArrivals(),
          getSaleProducts(),
        ]);
        
        setFeaturedProducts(featured);
        setNewArrivals(newItems);
        setSaleProducts(sale);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const categories = [
    {
      id: 'women',
      name: 'Women',
      image: 'https://images.pexels.com/photos/20407211/pexels-photo-20407211.jpeg?_gl=1*1eq5rlt*_ga*MTA2OTA4NjYuMTczNzQ3MDM0Mg..*_ga_8JE65Q40S6*czE3NTAyMjkwMTIkbzckZzEkdDE3NTAyMzAxMzQkajU5JGwwJGgw',
      description: 'Elegant and stylish women\'s clothing',
    },
    {
      id: 'men',
      name: 'Men',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Modern and comfortable men\'s clothing',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Stylish accessories to complete your look',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[800px]">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/29413536/pexels-photo-29413536.jpeg?_gl=1*lxx4wf*_ga*ODU1MTcwODkyLjE3NTIwNTI2Njk.*_ga_8JE65Q40S6*czE3NTIwNTg5MzQkbzIkZzEkdDE3NTIwNTg5NDckajQ3JGwwJGgw')` 
          }}
        ></div>
        
        <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Elegance Redefined
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl"
          >
            Discover our new collection of timeless fashion pieces - Buy or Rent for special occasions
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/products?category=new-arrivals" 
              className="bg-white text-primary px-8 py-3 font-medium hover:bg-primary-light hover:text-white transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link 
              to="/products?isRentable=true" 
              className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-primary transition-colors"
            >
              Explore Rentals
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-secondary mb-4">
              Shop by Category
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our wide range of fashion categories tailored to your unique style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/products?category=${category.id}`}
                  className="group block relative overflow-hidden rounded-sm"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 z-10 transition-colors duration-300"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="font-heading text-2xl font-semibold mb-2">{category.name}</h3>
                    <p className="mb-4">{category.description}</p>
                    <span className="inline-flex items-center border-b border-white pb-1 group-hover:border-primary transition-colors">
                      Shop Now <ArrowRight size={16} className="ml-2" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-secondary">
              New Arrivals
            </h2>
            <Link 
              to="/products?category=new-arrivals"
              className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : (
            <div className="product-grid">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Banner */}
      <section className="py-20 bg-secondary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
                Rent for Special Occasions
              </h2>
              <p className="text-neutral-200 mb-6">
                Perfect for weddings, parties, and special events. Wear designer pieces without the full price. Our rental collection features premium brands and latest fashion trends.
              </p>
              <Link 
                to="/products?isRentable=true"
                className="inline-block bg-white text-primary px-8 py-3 font-medium hover:bg-primary-light hover:text-white transition-colors"
              >
                Browse Rentals
              </Link>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Rental Collection" 
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-secondary">
              Featured Products
            </h2>
            <Link 
              to="/products"
              className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Sale Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-secondary">
              On Sale
            </h2>
            <Link 
              to="/products?category=sale"
              className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : (
            <div className="product-grid">
              {saleProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-secondary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Emma Thompson",
                quote: "The rental service is amazing! I wore a designer dress to my friend's wedding without breaking the bank. The quality was perfect and the process was so easy.",
                avatar: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Michael Davis",
                quote: "Fast shipping and excellent customer service. When I needed to exchange a size, the process was seamless. I'll definitely be shopping here again.",
                avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Sophia Chen",
                quote: "I love both buying and renting from here. The rental option is perfect for special events, and their regular collection has become a staple in my wardrobe.",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-sm shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-neutral-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for rating stars
const Star = ({ size, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);