import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Award, Feather, Sparkles, Clock, Compass } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, blogPosts } from '../data/products';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const categories = ["All Products", "Regular Pads", "XL Pads", "Overnight Pads", "Panty Liners", "Combo Packs"];

  // Filter products based on selected bestselling category pill
  const filteredProducts = activeCategory === "All Products"
    ? products
    : products.filter(p => p.category === activeCategory);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const whyChooseItems = [
    {
      icon: <Feather className="w-6 h-6 text-primary" />,
      title: "Cotton Soft",
      desc: "Hypoallergenic 100% organic cotton top sheet prevents rashes."
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Leak Lock",
      desc: "Advanced channel grids lock fluid immediately to avoid leakage."
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Up to 12 Hours",
      desc: "Superior absorbency provides all-day fresh and dry protection."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Breathable & Fresh",
      desc: "Microporous backsheet allows air circulation to keep skin cool."
    },
    {
      icon: <Compass className="w-6 h-6 text-primary" />,
      title: "Made for Every Woman",
      desc: "Varying dimensions tailored to fit every body and flow type."
    }
  ];

  return (
    <div className="w-full pb-16 font-sans">
      <Hero />

      {/* Our Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">Our Bestsellers</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Explore our top-selling period care solutions selected by thousands of women.</p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                  : 'bg-white border-rose-100 text-slate-600 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Slider with arrow buttons */}
        {filteredProducts.length > 0 ? (
          <div className="flex items-center gap-3">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className="shrink-0 w-10 h-10 bg-white border border-rose-100 rounded-full flex items-center justify-center text-primary shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Slide Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable cards */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory flex-1"
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="snap-start shrink-0 w-[calc(25%-12px)] min-w-[220px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className="shrink-0 w-10 h-10 bg-white border border-rose-100 rounded-full flex items-center justify-center text-primary shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Slide Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12 bg-rose-50/20 rounded-3xl border border-dashed border-rose-100">
            <p className="text-slate-400 text-sm">No products found in this category.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover group transition-colors"
          >
            Explore All Products
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Subscribe & Save Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl -z-0"></div>

          <div className="flex flex-col text-left max-w-xl relative z-10 gap-3">
            <span className="font-outfit text-xs font-bold uppercase tracking-widest bg-white/20 text-white w-max px-3 py-1 rounded-full">
              Subscription Plan
            </span>
            <h3 className="font-outfit text-3xl font-extrabold tracking-tight">Subscribe & Save More</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Get your favorite pads box delivered automatically to your doorstep every month. Cancel anytime, enjoy free shipping, and get a flat <strong className="text-white">15% discount</strong> on every cycle package.
            </p>
          </div>

          <button
            onClick={() => navigate('/shop?category=Combo%20Packs')}
            className="bg-white text-primary hover:bg-rose-50 font-bold px-8 py-3.5 rounded-full shadow-lg transition-all transform active:scale-95 whitespace-nowrap shrink-0 relative z-10"
          >
            Choose Your Plan
          </button>
        </div>
      </section>

      {/* Why Choose Haana Care */}
      <section className="bg-gradient-to-b from-white to-[#FAF7F8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">Why Choose Haana Care?</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Designed for comfort, validated for skin health safety.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
            {/* Card 1 - Cotton Soft */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square rounded-3xl bg-[#EEF3FB] flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Pad illustration */}
                    <svg viewBox="0 0 120 120" className="w-3/4 h-3/4 drop-shadow-md">
                      <ellipse cx="60" cy="60" rx="48" ry="28" fill="white" stroke="#e2d8f5" strokeWidth="1.5"/>
                      <ellipse cx="60" cy="60" rx="36" ry="18" fill="#f0ebfa" stroke="#d4c6f0" strokeWidth="1"/>
                      <ellipse cx="60" cy="60" rx="22" ry="10" fill="#e8dff7"/>
                      <ellipse cx="60" cy="60" rx="10" ry="5" fill="#d4c6f0"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-outfit font-bold text-slate-800 text-sm leading-tight">Cotton Soft</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">Top Layer</p>
              </div>
            </div>

            {/* Card 2 - Leak Lock */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square rounded-3xl bg-[#FFF0F5] flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <svg viewBox="0 0 120 120" className="w-3/4 h-3/4 drop-shadow-md">
                    <ellipse cx="60" cy="65" rx="40" ry="22" fill="white" stroke="#ffc8dc" strokeWidth="1.5"/>
                    <ellipse cx="60" cy="65" rx="28" ry="14" fill="#ffe5ef" stroke="#ffaac8" strokeWidth="1"/>
                    <path d="M60 35 C60 35 40 55 40 68 C40 79 49 88 60 88 C71 88 80 79 80 68 C80 55 60 35 60 35Z" fill="#ff85ad" opacity="0.25"/>
                    <path d="M60 48 C60 48 48 62 48 70 C48 77 53 83 60 83 C67 83 72 77 72 70 C72 62 60 48 60 48Z" fill="#ff5588" opacity="0.35"/>
                    <circle cx="60" cy="70" r="6" fill="#e8004d" opacity="0.5"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-outfit font-bold text-slate-800 text-sm leading-tight">Leak Lock</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">Technology</p>
              </div>
            </div>

            {/* Card 3 - Up to 12 Hours — woman photo style */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square rounded-3xl bg-[#FFF5E5] flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <svg viewBox="0 0 120 120" className="w-3/4 h-3/4 drop-shadow-md">
                    <circle cx="60" cy="60" r="42" fill="white" stroke="#ffd9a8" strokeWidth="1.5"/>
                    <circle cx="60" cy="60" r="34" fill="#fff0d9" stroke="#ffc880" strokeWidth="1"/>
                    <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="800" fill="#e8730a" fontFamily="Arial">12h</text>
                    <text x="60" y="72" textAnchor="middle" fontSize="8" fontWeight="600" fill="#f0a050" fontFamily="Arial">PROTECTION</text>
                    {/* Clock hands */}
                    <line x1="60" y1="60" x2="60" y2="38" stroke="#e8730a" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="60" y1="60" x2="78" y2="60" stroke="#e8730a" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-outfit font-bold text-slate-800 text-sm leading-tight">Up to 12 Hours</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">Protection</p>
              </div>
            </div>

            {/* Card 4 - Breathable & Fresh */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square rounded-3xl bg-[#E8FAF2] flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <svg viewBox="0 0 120 120" className="w-3/4 h-3/4 drop-shadow-md">
                    <ellipse cx="60" cy="65" rx="38" ry="22" fill="white" stroke="#a8e8c8" strokeWidth="1.5"/>
                    <ellipse cx="60" cy="65" rx="26" ry="14" fill="#d0f5e8" stroke="#70d4a8" strokeWidth="1"/>
                    {/* Air wave lines */}
                    <path d="M30 40 Q40 32 50 40 Q60 48 70 40 Q80 32 90 40" fill="none" stroke="#00b871" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                    <path d="M34 52 Q44 44 54 52 Q64 60 74 52 Q84 44 94 52" fill="none" stroke="#00b871" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    <path d="M38 64 Q48 56 58 64 Q68 72 78 64" fill="none" stroke="#00b871" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-outfit font-bold text-slate-800 text-sm leading-tight">Breathable &amp; Fresh</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">Rash Free</p>
              </div>
            </div>

            {/* Card 5 - Made for Every Woman */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square rounded-3xl bg-[#FFF0F8] flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 relative">
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <svg viewBox="0 0 120 120" className="w-3/4 h-3/4 drop-shadow-md">
                    {/* Three silhouettes */}
                    <circle cx="35" cy="42" r="10" fill="#ffb3d4"/>
                    <path d="M22 85 Q22 60 35 60 Q48 60 48 85Z" fill="#ffb3d4"/>
                    <circle cx="60" cy="38" r="12" fill="#ff5588"/>
                    <path d="M45 85 Q45 58 60 58 Q75 58 75 85Z" fill="#ff5588"/>
                    <circle cx="85" cy="42" r="10" fill="#ffb3d4"/>
                    <path d="M72 85 Q72 60 85 60 Q98 60 98 85Z" fill="#ffb3d4"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-outfit font-bold text-slate-800 text-sm leading-tight">Made for Every Woman</h4>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">Every Body</p>
              </div>
            </div>
          </div>

          {/* Feature tags row below */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: "Hypoallergenic 100% organic cotton top sheet prevents rashes." },
              { label: "Advanced channel grids lock fluid immediately to avoid leakage." },
              { label: "Superior absorbency provides all-day fresh and dry protection." },
              { label: "Microporous backsheet allows air circulation to keep skin cool." },
              { label: "Varying dimensions tailored to fit every body and flow type." },
            ].map((f, i) => (
              <p key={i} className="text-[10px] text-slate-400 font-medium leading-relaxed text-center px-1">
                {f.label}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* From Our Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">From Our Blog</h2>
            <p className="text-slate-500 mt-1 text-sm">Educational health guides, tips, and personal hygiene advice.</p>
          </div>
          <Link
            to="/blog"
            className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 shrink-0"
          >
            View All Blogs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl border border-rose-50/50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
              
              {/* Blog Header Image representation */}
              <div className={`w-full h-48 bg-gradient-to-br ${post.imageBg} p-6 flex flex-col justify-between text-slate-800 relative overflow-hidden`}>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/70 backdrop-blur-sm rounded-full w-max text-primary">
                  {post.category}
                </span>
                
                {/* Visual heart silhouette */}
                <div className="self-center w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Feather className="w-6 h-6 text-primary/70" />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold bg-white/50 backdrop-blur-sm p-1 px-3 rounded-full">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Blog content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-slate-400 font-bold">{post.date}</span>
                  <h3 className="font-outfit font-bold text-slate-800 text-base md:text-lg line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <Link
                  to={`/blog`}
                  className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-2"
                >
                  Read Full Post
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
