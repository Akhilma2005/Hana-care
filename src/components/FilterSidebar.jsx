import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedAbsorbency,
  setSelectedAbsorbency,
  selectedSize,
  setSelectedSize,
  priceLimit,
  setPriceLimit,
  onReset
}) {
  const categories = ["All Products", "Regular Pads", "XL Pads", "Overnight Pads", "Panty Liners", "Combo Packs"];
  const absorbencies = ["Light", "Medium", "Heavy", "Overnight"];
  const sizes = ["155mm", "240mm", "280mm", "320mm"];

  return (
    <aside className="w-full bg-white rounded-3xl border border-rose-50 p-6 flex flex-col gap-6 shadow-sm sticky top-28 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-rose-50">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-outfit font-bold text-slate-800 text-base">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-primary flex items-center gap-1 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-outfit font-semibold text-slate-800 text-sm">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="w-4 h-4 text-primary border-rose-200 focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className={selectedCategory === cat ? 'font-semibold text-primary' : ''}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Absorbency Level */}
      <div className="flex flex-col gap-3">
        <h4 className="font-outfit font-semibold text-slate-800 text-sm">Absorbency</h4>
        <div className="flex flex-col gap-2">
          {absorbencies.map((abs) => (
            <label key={abs} className="flex items-center gap-3 cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={selectedAbsorbency.includes(abs)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAbsorbency([...selectedAbsorbency, abs]);
                  } else {
                    setSelectedAbsorbency(selectedAbsorbency.filter(item => item !== abs));
                  }
                }}
                className="w-4 h-4 rounded text-primary border-rose-200 focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className={selectedAbsorbency.includes(abs) ? 'font-semibold text-slate-800' : ''}>
                {abs}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-outfit font-semibold text-slate-800 text-sm">Size</h4>
        <div className="flex flex-col gap-2">
          {sizes.map((sz) => (
            <label key={sz} className="flex items-center gap-3 cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={selectedSize.includes(sz)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSize([...selectedSize, sz]);
                  } else {
                    setSelectedSize(selectedSize.filter(item => item !== sz));
                  }
                }}
                className="w-4 h-4 rounded text-primary border-rose-200 focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className={selectedSize.includes(sz) ? 'font-semibold text-slate-800' : ''}>
                {sz}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h4 className="font-outfit font-semibold text-slate-800 text-sm">Price</h4>
          <span className="text-xs font-bold text-primary">Up to ₹{priceLimit}</span>
        </div>
        <input
          type="range"
          min="99"
          max="599"
          value={priceLimit}
          onChange={(e) => setPriceLimit(parseInt(e.target.value))}
          className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>₹99</span>
          <span>₹599</span>
        </div>
      </div>
    </aside>
  );
}
