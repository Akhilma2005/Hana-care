import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All Products';
  const initialSearch = queryParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAbsorbency, setSelectedAbsorbency] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [priceLimit, setPriceLimit] = useState(599);
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Sync category or search query from url navigation
  useEffect(() => {
    const category = queryParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    const search = queryParams.get('search');
    if (search !== null) {
      setSearchTerm(search);
    }
  }, [location.search]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory("All Products");
    setSelectedAbsorbency([]);
    setSelectedSize([]);
    setPriceLimit(599);
    setSearchTerm('');
    setSortBy('popular');
  };

  // Filter Logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (selectedCategory !== "All Products" && product.category !== selectedCategory) {
      return false;
    }
    // 2. Absorbency Filter
    if (selectedAbsorbency.length > 0 && !selectedAbsorbency.includes(product.absorbency)) {
      return false;
    }
    // 3. Size Filter
    if (selectedSize.length > 0) {
      const matchSize = selectedSize.some(size => product.size.includes(size));
      if (!matchSize) return false;
    }
    // 4. Price Filter
    if (product.price > priceLimit) {
      return false;
    }
    // 5. Search Text Filter
    if (searchTerm.trim() !== '') {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }
    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // default 'popular' (or by id order)
    return b.reviewCount - a.reviewCount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-6 text-left">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Shop</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Filter Panel */}
        <div className="lg:col-span-1">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedAbsorbency={selectedAbsorbency}
            setSelectedAbsorbency={setSelectedAbsorbency}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceLimit={priceLimit}
            setPriceLimit={setPriceLimit}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Side: Products Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 text-left">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-50">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight font-outfit">All Products</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto text-sm">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-3 rounded-xl border border-rose-100 bg-white text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-xs cursor-pointer shadow-sm"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Active Search Notification */}
          {searchTerm && (
            <div className="bg-rose-50/55 text-primary text-xs font-semibold px-4 py-2.5 rounded-2xl border border-rose-100/50 flex items-center justify-between">
              <span>Showing search results for "{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-primary text-[10px]">
                Clear Search
              </button>
            </div>
          )}

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-rose-50/10 rounded-3xl border border-dashed border-rose-100 flex flex-col items-center justify-center gap-3">
              <p className="text-slate-400 text-sm font-medium">No products match your active filters.</p>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-primary border border-primary/20 bg-white hover:bg-rose-50/20 px-4 py-2 rounded-full transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination Mockup */}
          {sortedProducts.length > 0 && (
            <div className="flex justify-center items-center gap-1.5 mt-10">
              <button className="px-3 py-1.5 rounded-lg border border-rose-100 text-xs font-bold text-slate-500 hover:bg-rose-50/30 transition-all">Prev</button>
              <button className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">1</button>
              <button className="px-3.5 py-1.5 rounded-lg border border-rose-100 text-xs font-bold text-slate-500 hover:bg-rose-50/30 transition-all">2</button>
              <button className="px-3.5 py-1.5 rounded-lg border border-rose-100 text-xs font-bold text-slate-500 hover:bg-rose-50/30 transition-all">3</button>
              <button className="px-3 py-1.5 rounded-lg border border-rose-100 text-xs font-bold text-slate-500 hover:bg-rose-50/30 transition-all">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
