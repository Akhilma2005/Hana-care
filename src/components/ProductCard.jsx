import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Use the 5 waist sizes for all products as requested
  const sizeOptions = [
    'S - M (22-28 inches)',
    'M - L (28-32 inches)',
    'L - XL (32-38 inches)',
    'XL - XXL (38-42 inches)',
    'XXL - XXXL (42-52 inches)'
  ];

  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]); // Default to M - L

  const currentPrice = product.price;
  const currentOriginalPrice = product.originalPrice;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking button
    addToCart(product, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Calculate discount percentage
  const discountPercent = Math.round(
    ((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100
  );

  const renderSmallDroplets = (dropletCount) => {
    const totalDroplets = 6;
    const filledCount = Math.floor(dropletCount);
    const hasHalf = dropletCount % 1 !== 0;

    return (
      <div className="flex gap-0.5 items-center">
        {[...Array(totalDroplets)].map((_, i) => {
          const index = i + 1;
          if (index <= filledCount) {
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-3 h-4 fill-secondary text-secondary shrink-0">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" strokeWidth="2" stroke="currentColor"/>
              </svg>
            );
          } else if (index === filledCount + 1 && hasHalf) {
            const gradId = `half-grad-card-${product.id}`;
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-3 h-4 text-secondary shrink-0">
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="#7C5D9F" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" fill={`url(#${gradId})`} strokeWidth="2" stroke="currentColor"/>
              </svg>
            );
          } else {
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-3 h-4 fill-transparent text-secondary shrink-0">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" strokeWidth="2" stroke="currentColor"/>
              </svg>
            );
          }
        })}
      </div>
    );
  };

  // Get mockup category theme color
  const getMockupThemeBg = (productId) => {
    if (productId.includes("panties")) return "bg-[#FFEBE5]";
    if (productId.includes("regular")) return "bg-[#F0EBFA]";
    if (productId.includes("xl")) return "bg-[#FFF0F4]";
    if (productId.includes("overnight")) return "bg-[#E8EDFC]";
    if (productId.includes("panty")) return "bg-[#EBF7F2]";
    if (productId.includes("combo")) return "bg-[#FFF0F8]";
    if (productId.includes("trial")) return "bg-[#FFF3EC]";
    return "bg-[#FAF6F7]";
  };

  return (
    <div className="group bg-white rounded-3xl border border-rose-50/50 shadow-sm hover:shadow-xl hover:border-rose-100/50 transition-all duration-300 flex flex-col overflow-hidden relative h-full">
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Save {discountPercent}%
        </span>
      )}

      {/* Specialty Badge */}
      {product.badge && (
        <span className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Card Image area */}
      <Link to={`/product/${product.id}`} className="block relative pt-6 px-6">
        <div className={`w-full aspect-square rounded-2xl ${getMockupThemeBg(product.id)} p-5 flex items-center justify-center relative shadow-inner overflow-hidden group-hover:scale-[1.02] transition-transform duration-300`}>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[90%] max-h-[90%] object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 animate-fade-in"
          />
        </div>
      </Link>

      {/* Details Area */}
      <div className="p-5 flex flex-col justify-between flex-grow text-left">
        <div>
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors block mb-1">
            <h3 className="font-outfit font-bold text-slate-800 text-sm leading-snug tracking-tight line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
          </Link>

          {/* Star ratings */}
          <div className="flex items-center gap-1.5 mb-2 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[10px] text-slate-400 font-medium">({product.reviewCount} reviews)</span>
          </div>

          {/* Absorbency Flow Level */}
          <div className="flex items-center justify-between mt-2.5 mb-5 bg-rose-50/10 border border-rose-100/35 rounded-2xl px-3 py-2">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Flow</span>
            <div className="flex items-center gap-2">
              {renderSmallDroplets(product.droplets)}
              <span className="text-[10px] font-bold text-secondary truncate max-w-[85px]">
                {product.absorbencyLabel || `${product.absorbency} Flow`}
              </span>
            </div>
          </div>

          {/* Size Select Dropdown / Popdown */}
          <div className="flex flex-col gap-1 mt-2 mb-3 text-left">
            <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Select Waist Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-rose-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer font-sans font-mono"
            >
              {sizeOptions.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-outfit text-base md:text-lg font-extrabold text-slate-900">
              ₹{currentPrice}
            </span>
            {currentOriginalPrice > currentPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{currentOriginalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 border active:scale-[0.97] ${
              added
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-white text-primary border-primary/40 hover:border-primary hover:bg-rose-50/15 cursor-pointer'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added!
              </>
            ) : (
              <>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
