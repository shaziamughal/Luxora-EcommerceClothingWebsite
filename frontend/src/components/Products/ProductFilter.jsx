import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductFilter = ({
  categories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  priceRange,
  onPriceRangeChange,
  minPrice,
  maxPrice,
  isOpen,
  onToggle,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category.id]: true }), {})
  );

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value;

    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }

    onPriceRangeChange(newRange);
  };

  const totalSelectedFilters = Object.values(selectedFilters).reduce(
    (count, selected) => count + selected.length,
    0
  );

  return (
    <div className="bg-white rounded-sm shadow-sm">
      <div className="md:hidden p-4 flex items-center justify-between border-b border-neutral-200">
        <button onClick={onToggle} className="flex items-center text-neutral-800 font-medium">
          <span>Filters</span>
          {totalSelectedFilters > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalSelectedFilters}
            </span>
          )}
          <ChevronDown size={18} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {totalSelectedFilters > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-dark transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:overflow-visible"
          >
            <div className="p-4">
              <div className="hidden md:flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg text-neutral-800">Filters</h3>
                {totalSelectedFilters > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-primary hover:text-primary-dark transition-colors flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-neutral-800">Price Range</h4>
                  <span className="text-sm text-neutral-500">
                    Rs{priceRange[0]} - Rs{priceRange[1]}
                  </span>
                </div>

                <div className="px-1">
                  <div className="relative h-1 bg-neutral-200 rounded-full">
                    <div
                      className="absolute h-1 bg-primary rounded-full"
                      style={{
                        left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div>
                    <label htmlFor="min-price" className="text-xs text-neutral-500 mb-1 block">
                      Min Price
                    </label>
                    <input
                      id="min-price"
                      type="number"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                      className="input-field py-1 px-2 text-sm w-24"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="text-xs text-neutral-500 mb-1 block">
                      Max Price
                    </label>
                    <input
                      id="max-price"
                      type="number"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                      className="input-field py-1 px-2 text-sm w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="border-b border-neutral-100 pb-4 last:border-0">
                    <button
                      onClick={() => handleCategoryToggle(category.id)}
                      className="flex items-center justify-between w-full text-left font-medium text-neutral-800 mb-2"
                    >
                      <span>{category.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          expandedCategories[category.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedCategories[category.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mt-2">
                            {category.options.map((option) => (
                              <div key={option.id} className="flex items-center">
                                <input
                                  id={`filter-${category.id}-${option.id}`}
                                  type="checkbox"
                                  className="filter-checkbox h-4 w-4 opacity-0 absolute"
                                  checked={selectedFilters[category.id]?.includes(option.id) || false}
                                  onChange={(e) =>
                                    onFilterChange(category.id, option.id, e.target.checked)
                                  }
                                />
                                <label
                                  htmlFor={`filter-${category.id}-${option.id}`}
                                  className="flex items-center cursor-pointer text-sm text-neutral-700"
                                >
                                  <span className="h-4 w-4 mr-2 border border-neutral-300 rounded flex items-center justify-center transition-colors">
                                    <svg
                                      className="h-3 w-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                      ></path>
                                    </svg>
                                  </span>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
