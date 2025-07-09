import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';
import { useWishlistStore } from '../../store/wishlist';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { items } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const { items: wishlist } = useWishlistStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
    setIsScrolled(window.scrollY > 50 || location.pathname !== '/');
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);


  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`;

  const iconColor = isScrolled ? 'text-neutral-700' : 'text-white';
  const linkColor = isScrolled ? 'text-neutral-800' : 'text-white';

  const categories = [
    { name: 'New Arrivals', path: '/products?category=new-arrivals' },
    { name: 'Women', path: '/products?category=women' },
    { name: 'Men', path: '/products?category=men' },
    { name: 'Accessories', path: '/products?category=accessories' },
    { name: 'Sale', path: '/products?category=sale' },
    { name: 'Rent', path: '/products?rental=true' },
  ];

  return (
    <header className={navbarClasses}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className={`font-heading text-2xl sm:text-3xl font-bold ${linkColor}`} >
            Luxora
          </Link>
      
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link 
              to={category.path} 
              className={`text-sm font-medium ${linkColor} hover:text-primary transition-colors`} >

              {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1 ${iconColor} hover:text-primary transition-colors`}
              aria-label="Search"
            >
              <Search size={20} />
            </button> */}

            <Link to="/wishlist" className={`p-1 ${iconColor} hover:text-primary transition-colors relative`}>
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className={`p-1 ${iconColor} hover:text-primary transition-colors relative`}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to={isAuthenticated ? "/profile" : "/login"} className={`p-1 ${iconColor} hover:text-primary transition-colors relative`}>
              <User size={20} />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-neutral-700 md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {/* <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="pt-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full py-2 pl-10 pr-4 border-b border-neutral-300 bg-transparent focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              </form>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-200 mt-2"
          >
            <div className="container-custom py-4">
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.path}
                      className="block py-2 text-neutral-800 hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};