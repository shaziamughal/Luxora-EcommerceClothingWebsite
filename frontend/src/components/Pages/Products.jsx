import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid2X2, Grid3X3, Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../Products/ProductCard';
import { ProductFilter } from '../Products/ProductFilter';
import { getProducts } from '../../api/products';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState('grid4');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  
  // Price range filter
  const [priceRange, setPriceRange] = useState([0, 500]);
  const minPrice = 0;
  const maxPrice = 500;
  
  // Selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    subCategory: [],
    status: [],
  });
  
  // Get the category from URL params
  const categoryParam = searchParams.get('category');
  const isRentableParam = searchParams.get('isRentable');
  
  // Filter categories
  const filterCategories = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { id: 'women', label: 'Women' },
        { id: 'men', label: 'Men' },
        { id: 'accessories', label: 'Accessories' },
      ],
    },
    {
      id: 'subCategory',
      name: 'Product Type',
      options: [
        { id: 'dresses', label: 'Dresses' },
        { id: 'shirts', label: 'Shirts' },
        { id: 'pants', label: 'Pants' },
        { id: 'blazers', label: 'Blazers' },
        { id: 'ethnic', label: 'Ethnic Wear' },
        { id: 'bags', label: 'Bags' },
        { id: 'jewelry', label: 'Jewelry' },
        { id: 'watches', label: 'Watches' },
      ],
    },
    {
      id: 'status',
      name: 'Status',
      options: [
        { id: 'new', label: 'New Arrivals' },
        { id: 'sale', label: 'Sale Items' },
        { id: 'rentable', label: 'Available for Rent' },
      ],
    },
  ];
  
  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      
      try {
        // Prepare filter objects for API
        const filters = {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          search: searchTerm,
        };
        
        // Add category filter from URL params
        if (categoryParam) {
          if (categoryParam === 'new-arrivals') {
            filters.isNew = true;
          } else if (categoryParam === 'sale') {
            filters.isSale = true;
          } else {
            filters.category = categoryParam;
          }
        }
        
        // Add rental filter from URL params
        if (isRentableParam === 'true') {
          filters.isRentable = true;
        }
        
        // Add filters from selected filters state
        if (selectedFilters.category.length > 0) {
          filters.category = selectedFilters.category[0];
        }
        
        if (selectedFilters.subCategory.length > 0) {
          filters.subCategory = selectedFilters.subCategory[0];
        }
        
        if (selectedFilters.status.includes('new')) {
          filters.isNew = true;
        }
        
        if (selectedFilters.status.includes('sale')) {
          filters.isSale = true;
        }
        
        if (selectedFilters.status.includes('rentable')) {
          filters.isRentable = true;
        }
        
        const data = await getProducts(filters);
        
        // Sort products
        let sortedProducts = [...data];
        switch (sortOption) {
          case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            sortedProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
            break;
          default: // featured
            // No sorting needed, use the default order
            break;
        }
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [categoryParam, isRentableParam, selectedFilters, priceRange, searchTerm, sortOption]);
  
  // Update selected filters when category param changes
  useEffect(() => {
    if (categoryParam) {
      const newFilters = { ...selectedFilters };
      
      if (categoryParam === 'new-arrivals') {
        newFilters.status = ['new'];
        newFilters.category = [];
      } else if (categoryParam === 'sale') {
        newFilters.status = ['sale'];
        newFilters.category = [];
      } else {
        newFilters.category = [categoryParam];
        newFilters.status = [];
      }
      
      setSelectedFilters(newFilters);
    }
    
    if (isRentableParam === 'true') {
      setSelectedFilters(prev => ({
        ...prev,
        status: [...prev.status.filter(s => s !== 'rentable'), 'rentable']
      }));
    }
  }, [categoryParam, isRentableParam]);
  
  const handleFilterChange = (categoryId, optionId, isSelected) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      
      if (isSelected) {
        if (categoryId === 'status') {
          // Allow multiple status filters
          updated[categoryId] = [...updated[categoryId], optionId];
        } else {
          // Single select for category and subCategory
          updated[categoryId] = [optionId];
        }
      } else {
        updated[categoryId] = updated[categoryId].filter((id) => id !== optionId);
      }
      
      return updated;
    });
  };
  
  const handleClearFilters = () => {
    setSelectedFilters({
      category: categoryParam && categoryParam !== 'new-arrivals' && categoryParam !== 'sale' ? [categoryParam] : [],
      subCategory: [],
      status: categoryParam === 'new-arrivals' ? ['new'] : categoryParam === 'sale' ? ['sale'] : isRentableParam === 'true' ? ['rentable'] : [],
    });
    setPriceRange([minPrice, maxPrice]);
    setSearchTerm('');
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The products will be reloaded based on the searchTerm state
  };
  
  // Get the title based on the selected category
  const getPageTitle = () => {
    if (isRentableParam === 'true') {
      return 'Rental Collection';
    } else if (categoryParam === 'new-arrivals') {
      return 'New Arrivals';
    } else if (categoryParam === 'sale') {
      return 'Sale Items';
    } else if (categoryParam === 'women') {
      return 'Women\'s Collection';
    } else if (categoryParam === 'men') {
      return 'Men\'s Collection';
    } else if (categoryParam === 'accessories') {
      return 'Accessories';
    } else {
      return 'All Products';
    }
  };
  
  // Calculate active filters count for mobile display
  const activeFiltersCount = 
    Object.values(selectedFilters).flat().length + 
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0) +
    (searchTerm ? 1 : 0);
  
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        {/* Page header */}
        <div className="py-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-center text-secondary">
            {getPageTitle()}
          </h1>
        </div>
        
        {/* Mobile search and filter bar */}
        <div className="flex md:hidden items-center justify-between mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center bg-white border border-neutral-300 rounded-sm py-2 px-4 text-sm"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
          
          <form onSubmit={handleSearchSubmit} className="relative flex-grow mx-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pl-9 border border-neutral-300 rounded-sm text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          </form>
          
          <button
            onClick={() => setGridView(gridView === 'grid3' ? 'grid4' : 'grid3')}
            className="flex items-center justify-center bg-white border border-neutral-300 rounded-sm p-2"
          >
            {gridView === 'grid3' ? <Grid3X3 size={16} /> : <Grid2X2 size={16} />}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <ProductFilter
              categories={filterCategories}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>
          
          {/* Product grid */}
          <div className="flex-grow">
            {/* Desktop search and sort controls */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <form onSubmit={handleSearchSubmit} className="relative w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pl-10 border border-neutral-300 rounded-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm text-neutral-600 mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-neutral-300 rounded-sm py-1.5 px-3 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                </div>
                
                <div className="flex items-center border border-neutral-300 rounded-sm">
                  <button
                    onClick={() => setGridView('grid3')}
                    className={`p-1.5 ${
                      gridView === 'grid3' ? 'bg-primary text-white' : 'bg-white text-neutral-600'
                    }`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button
                    onClick={() => setGridView('grid4')}
                    className={`p-1.5 ${
                      gridView === 'grid4' ? 'bg-primary text-white' : 'bg-white text-neutral-600'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile sort dropdown */}
            <div className="flex md:hidden items-center justify-between mb-4">
              <div className="flex items-center">
                <label htmlFor="mobile-sort" className="text-sm text-neutral-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="mobile-sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-neutral-300 rounded-sm py-1.5 px-3 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
              
              <div className="text-sm text-neutral-600">
                {products.length} Products
              </div>
            </div>
            
            {/* Active filters display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-neutral-600">Active Filters:</span>
                
                {Object.entries(selectedFilters).map(([categoryId, optionIds]) => 
                  optionIds.map(optionId => {
                    const category = filterCategories.find(c => c.id === categoryId);
                    const option = category?.options.find(o => o.id === optionId);
                    
                    if (option) {
                      return (
                        <div
                          key={`${categoryId}-${optionId}`}
                          className="flex items-center bg-neutral-100 px-2 py-1 rounded-sm text-sm"
                        >
                          <span>{option.label}</span>
                          <button
                            onClick={() => handleFilterChange(categoryId, optionId, false)}
                            className="ml-1 text-neutral-500 hover:text-neutral-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })
                )}
                
                {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                  <div className="flex items-center bg-neutral-100 px-2 py-1 rounded-sm text-sm">
                    <span>Price: Rs{priceRange[0]} - Rs{priceRange[1]}</span>
                    <button
                      onClick={() => setPriceRange([minPrice, maxPrice])}
                      className="ml-1 text-neutral-500 hover:text-neutral-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="flex items-center bg-neutral-100 px-2 py-1 rounded-sm text-sm">
                    <span>Search: {searchTerm}</span>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-neutral-500 hover:text-neutral-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Clear All
                </button>
              </div>
            )}
            
            {/* Loading state */}
            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-neutral-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <Filter size={48} className="mx-auto text-neutral-400" />
                <h3 className="mt-4 text-xl font-medium text-neutral-700">No products found</h3>
                <p className="mt-2 text-neutral-500">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${
                gridView === 'grid3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 
                'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              }`}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};