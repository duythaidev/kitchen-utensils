import { ChevronDown, Clock, Search, Star } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

const FilterSidebar = () => {
  const [filters, setFilters] = useState({
    priceRanges: [],
    brands: [],
    ratings: []
  });

  const [expandedCategories, setExpandedCategories] = useState({
    price: true,
    brands: true,
    ratings: true
  });

  const [searchTerm, setSearchTerm] = useState("");

  const priceRanges = [
    { id: "0-50", label: "$0 - $50", count: 150 },
    { id: "50-100", label: "$50 - $100", count: 220 },
    { id: "100-250", label: "$100 - $250", count: 180 },
    { id: "250-500", label: "$250 - $500", count: 90 },
    { id: "500+", label: "$500+", count: 45 }
  ];

  const brands = [
    { id: "apple", name: "Apple", count: 245, logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=50&h=50&fit=crop" },
    { id: "samsung", name: "Samsung", count: 188, logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=50&h=50&fit=crop" },
    { id: "sony", name: "Sony", count: 156, logo: "https://images.unsplash.com/photo-1617465729890-50704ec79091?w=50&h=50&fit=crop" },
    { id: "lg", name: "LG", count: 134, logo: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=50&h=50&fit=crop" },
    { id: "microsoft", name: "Microsoft", count: 112, logo: "https://images.unsplash.com/photo-1614179689702-355944cd0918?w=50&h=50&fit=crop" }
  ];

  const ratings = [
    { id: "4", label: "4 stars & above", value: 4, count: 320 },
    { id: "3", label: "3 stars & above", value: 3, count: 450 },
    { id: "2", label: "2 stars & above", value: 2, count: 580 },
    { id: "1", label: "1 star & above", value: 1, count: 650 }
  ];

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const index = newFilters[category].indexOf(value);
      
      if (index === -1) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      }
      
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      priceRanges: [],
      brands: [],
      ratings: []
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-[300px] bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        {Object.values(filters).some(arr => arr.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center mb-3"
          onClick={() => toggleCategory("price")}
          aria-expanded={expandedCategories.price}
        >
          <span className="font-medium text-gray-700">Price Range</span>
          <ChevronDown
            className={`transform transition-transform ${expandedCategories.price ? "rotate-180" : ""}`}
          />
        </button>
        {expandedCategories.price && (
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label
                key={range.id}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range.id)}
                  onChange={() => handleFilterChange("priceRanges", range.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="text-gray-700 group-hover:text-gray-900">{range.label}</span>
                <span className="text-gray-500 text-sm">({range.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center mb-3"
          onClick={() => toggleCategory("brands")}
          aria-expanded={expandedCategories.brands}
        >
          <span className="font-medium text-gray-700">Brands</span>
          <ChevronDown
            className={`transform transition-transform ${expandedCategories.brands ? "rotate-180" : ""}`}
          />
        </button>
        {expandedCategories.brands && (
          <div>
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredBrands.map(brand => (
                <label
                  key={brand.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleFilterChange("brands", brand.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=50&h=50&fit=crop";
                    }}
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">{brand.name}</span>
                  <span className="text-gray-500 text-sm">({brand.count})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ratings Filter */}
      <div className="mb-6">
        <button
          className="w-full flex justify-between items-center mb-3"
          onClick={() => toggleCategory("ratings")}
          aria-expanded={expandedCategories.ratings}
        >
          <span className="font-medium text-gray-700">Ratings</span>
          <ChevronDown
            className={`transform transition-transform ${expandedCategories.ratings ? "rotate-180" : ""}`}
          />
        </button>
        {expandedCategories.ratings && (
          <div className="space-y-2">
            {ratings.map(rating => (
              <label
                key={rating.id}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating.id)}
                  onChange={() => handleFilterChange("ratings", rating.id)}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${index < rating.value ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">({rating.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;