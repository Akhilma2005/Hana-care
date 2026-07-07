import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShieldAlert, Sparkles, Heart, Wind, ChevronRight, ChevronLeft, ShoppingCart, ShieldCheck, Check, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  // Selector states
  const [selectedPackSize, setSelectedPackSize] = useState('14 Pads');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [added, setAdded] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const [orderType, setOrderType] = useState('once');
  const [deliveryInterval, setDeliveryInterval] = useState(2); // months: 1 | 2 | 3
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [pincodeValid, setPincodeValid] = useState(false);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 0, hover: 0, submitted: false });

  const handleCheckDelivery = () => {
    if (pincode.length < 6) {
      setDeliveryMessage("❌ Please enter a valid 6-digit pincode.");
      setPincodeValid(false);
      return;
    }
    setDeliveryMessage("✓ Free Shipping available! Delivery within 2-3 Working Days.");
    setPincodeValid(true);
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedPackSize('M - L (28-32 inches)'); // default size across all products
    } else {
      // Fallback if product not found
      setProduct(products[0]);
    }
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading product...</div>;

  const packSizes = [
    'S - M (22-28 inches)',
    'M - L (28-32 inches)',
    'L - XL (32-38 inches)',
    'XL - XXL (38-42 inches)',
    'XXL - XXXL (42-52 inches)'
  ];

  // Pricing is uniform across sizes
  const getCalculatedPrice = () => {
    let basePrice = product.price;
    
    if (orderType === 'subscribe') {
      if (product.category === 'Period Panties') {
        return Math.round(product.originalPrice * 0.64); // ₹318 (36% off ₹498)
      } else {
        return Math.round(basePrice * 0.85); // 15% discount for subscriptions
      }
    }
    return basePrice;
  };

  const getCalculatedOriginalPrice = () => {
    return product.originalPrice;
  };

  const currentPrice = getCalculatedPrice();
  const currentOriginalPrice = getCalculatedOriginalPrice();
  const discountPercent = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

  const handleAddToCart = () => {
    const customizedProduct = { ...product, price: currentPrice, originalPrice: currentOriginalPrice };
    addToCart(customizedProduct, quantity, selectedPackSize, orderType);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    const customizedProduct = { ...product, price: currentPrice, originalPrice: currentOriginalPrice };
    addToCart(customizedProduct, quantity, selectedPackSize, orderType);
    navigate('/checkout');
  };

  const iconsMap = {
    "Rash Free": <Sparkles className="w-4 h-4 text-primary" />,
    "Leak Lock": <ShieldCheck className="w-4 h-4 text-primary" />,
    "Odour Control": <Wind className="w-4 h-4 text-primary" />,
    "Ultra Thin": <Heart className="w-4 h-4 text-primary" />
  };

  // Dynamic Thumbnail designs mockup with specific details/captions from user
  const getThumbnails = () => {
    if (product.category === 'Period Panties') {
      return [
        { name: "Front Package", theme: product.colorTheme, desc: "Haana Care disposable period panties with zero irritation, high absorbency for heavy flow, seamless fit, and soft airy topsheet made of toxic-free materials." },
        { name: "New Packaging", theme: "from-orange-100 to-rose-200", desc: "New packaging of Haana Care disposable period panties, same trusted zero-irritation design and comfortable, toxic-free protection, you may receive either pack with the same reliable quality." },
        { name: "All-Day Comfort", theme: "from-pink-100 to-rose-200", desc: "Haana Care All-Day Comfort period panties are designed with breathable, rash-free fabric, an ultra-absorbent core for leak-proof protection, and a seamless fit that adapts to active lifestyles, made with toxic-free materials." },
        { name: "High-Waisted Fit", theme: "from-rose-100 to-orange-100", desc: "High-waisted Haana Care period panties with seamless, panty-like design and super-soft no-mark waistband for comfortable, leak-proof period protection." },
        { name: "Multi-Use Comfort", theme: "from-slate-100 to-rose-50", desc: "High-comfort disposable period underwear offering leak protection for heavy flow, early period days, travel days, long hectic days, and postpartum care." },
        { name: "Absorbency Comparison", theme: "from-purple-100 to-rose-100", desc: "Comparison of regular pads and comfort period panties, highlighting 4× absorbency and up to 10 hours of full-coverage menstrual protection." },
        { name: "Size Range", theme: "from-emerald-50 to-orange-100", desc: "Our disposable period panties are available in sizes S-M to XXL-XXXL, fitting waist sizes 22-52 inches and hip sizes 32-54 inches, with uniform absorbency and a comfortable, secure fit." },
        { name: "Step-by-Step Guide", theme: "from-amber-50 to-rose-100", desc: "Step-by-step usage guide to use Haana Care period panties showing the open, wear, and discard process." },
        { name: "Safe Certifications", theme: "from-teal-50 to-emerald-100", desc: "Haana Care disposable period panties with dermatologically tested, non-irritant, cruelty-free, Made Safe, and toxic-free certifications." }
      ];
    }
    return [
      { name: "Front Package", theme: product.colorTheme, desc: "Premium organic cotton pads with zero irritation and high absorbency." },
      { name: "Pad Structure", theme: "from-rose-100 to-rose-200", desc: "Breathable and ultra-soft pad structure designed for rash-free comfort." },
      { name: "Leak Protection Layer", theme: "from-purple-100 to-purple-200", desc: "Advanced leak protection layer to secure side and back flow." },
      { name: "Organic Certificate", theme: "from-teal-50 to-emerald-100", desc: "100% GOTS certified organic cotton topsheet." }
    ];
  };

  const renderDroplets = (dropletCount) => {
    const totalDroplets = 6;
    const filledCount = Math.floor(dropletCount);
    const hasHalf = dropletCount % 1 !== 0;

    return (
      <div className="flex gap-1 items-center">
        {[...Array(totalDroplets)].map((_, i) => {
          const index = i + 1;
          if (index <= filledCount) {
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-6 h-8 fill-secondary text-secondary shrink-0">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" strokeWidth="1.5" stroke="currentColor"/>
              </svg>
            );
          } else if (index === filledCount + 1 && hasHalf) {
            const gradId = `half-grad-${product.id}`;
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-6 h-8 text-secondary shrink-0">
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="#7C5D9F" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" fill={`url(#${gradId})`} strokeWidth="1.5" stroke="currentColor"/>
              </svg>
            );
          } else {
            return (
              <svg key={i} viewBox="0 0 24 24" className="w-6 h-8 fill-transparent text-secondary shrink-0">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" strokeWidth="1.5" stroke="currentColor"/>
              </svg>
            );
          }
        })}
      </div>
    );
  };

  const thumbnails = getThumbnails();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 truncate">{product.name}</span>
      </nav>

      {/* Main product display grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
        
        {/* Left: Images Column */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Main Photo View with Navigation arrows */}
          <div className="w-full aspect-square rounded-3xl bg-[#FAF6F7] p-8 flex items-center justify-center relative shadow-md overflow-hidden border border-rose-100/10">
            {/* Prev arrow button */}
            <button
              onClick={() => setActiveImgIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white text-slate-700 hover:text-primary backdrop-blur-sm rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer border border-rose-50"
              title="Previous Image"
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {activeImgIndex === 0 ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[90%] max-h-[90%] object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 rounded-2xl animate-fade-in"
              />
            ) : (
              <div className={`w-full h-full rounded-2xl bg-gradient-to-tr ${thumbnails[activeImgIndex].theme} p-12 flex flex-col justify-between items-center text-white relative shadow-inner overflow-hidden animate-fade-in`}>
                <span className="font-outfit text-xs font-black tracking-widest opacity-80 uppercase">Haana Care</span>
                <div className="w-20 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/25">
                  <Heart className="w-6 h-6 text-white/50 animate-pulse" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-outfit text-sm font-bold">{thumbnails[activeImgIndex].name}</span>
                  <span className="text-[10px] opacity-75">Premium Details Preview</span>
                </div>
              </div>
            )}

            {/* Next arrow button */}
            <button
              onClick={() => setActiveImgIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white text-slate-700 hover:text-primary backdrop-blur-sm rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer border border-rose-50"
              title="Next Image"
              type="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Active slide description/caption box */}
          <div className="bg-rose-50/15 border border-rose-100/40 p-4 rounded-2xl text-xs font-semibold text-slate-500 leading-relaxed text-center shadow-inner mt-1">
            {thumbnails[activeImgIndex].desc}
          </div>

          {/* Thumbnails list underneath the main image with horizontal sliding option */}
          <div className="relative w-full flex items-center gap-2 mt-2 px-6">
            <button
              onClick={() => {
                const el = document.getElementById('thumb-slider');
                if (el) el.scrollBy({ left: -80, behavior: 'smooth' });
              }}
              className="absolute left-0 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-sm active:scale-90 transition-all cursor-pointer text-[10px] font-bold border border-rose-50"
              type="button"
              title="Scroll Left"
            >
              &lt;
            </button>

            <div
              id="thumb-slider"
              className="flex flex-row gap-3 overflow-x-auto scroll-smooth py-1.5 px-1 max-w-full scrollbar-none items-center snap-x w-full"
            >
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-14 h-14 rounded-xl p-0.5 border-2 transition-all flex items-center justify-center shrink-0 overflow-hidden shadow-sm cursor-pointer snap-start ${
                    activeImgIndex === idx ? 'border-primary scale-[1.03]' : 'border-transparent opacity-85 hover:opacity-100 hover:border-rose-100/50'
                  } ${idx === 0 ? 'bg-[#FAF6F7]' : `bg-gradient-to-tr ${thumb.theme}`}`}
                >
                  {idx === 0 ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full bg-white/75 backdrop-blur-sm rounded-lg flex items-center justify-center p-1 font-semibold text-[8px] text-slate-600 text-center leading-none whitespace-normal">
                      {thumb.name}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('thumb-slider');
                if (el) el.scrollBy({ left: 80, behavior: 'smooth' });
              }}
              className="absolute right-0 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-sm active:scale-90 transition-all cursor-pointer text-[10px] font-bold border border-rose-50"
              type="button"
              title="Scroll Right"
            >
              &gt;
            </button>
          </div>

        </div>

        {/* Right: Details Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          
          <div className="flex flex-col gap-2">
            <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400 font-medium">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="flex items-center gap-3 bg-rose-50/20 border border-rose-50 py-3.5 px-5 rounded-2xl w-max">
            <span className="font-outfit text-2xl font-extrabold text-slate-900">
              ₹{currentPrice}
            </span>
            {currentOriginalPrice > currentPrice && (
              <>
                <span className="text-sm text-slate-400 line-through font-medium">
                  ₹{currentOriginalPrice}
                </span>
                <span className="text-xs text-primary font-bold bg-primary-light px-2.5 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="text-slate-500 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Pack size selection / Waist size */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center pr-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Choose Your Waist Size
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuideModal(true)}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Size Guide
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {packSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedPackSize(size)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedPackSize === size
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'bg-white border-rose-100 text-slate-600 hover:border-primary/20 hover:text-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Choose your quantity pack list */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Choose your quantity {product.category === 'Period Panties' && '(1 Pack consists of 10 panties)'}
            </span>
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((packNum) => {
                const origVal = product.originalPrice * packNum;
                // Exact pricing: 1 pack = 28% off, 2+ packs = 32% off
                const discPct = packNum === 1 ? 0.28 : 0.32;
                const onceVal = Math.round(origVal * (1 - discPct));
                // Subscribe = 40% off MRP
                const subVal = Math.round(origVal * 0.60);
                const activePrice = orderType === 'subscribe' ? subVal : onceVal;
                const activeDiscount = Math.round(((origVal - activePrice) / origVal) * 100);

                return (
                  <button
                    key={packNum}
                    type="button"
                    onClick={() => setQuantity(packNum)}
                    className={`p-3.5 rounded-2xl border transition-all flex justify-between items-center text-left cursor-pointer ${
                      quantity === packNum
                        ? 'border-primary bg-rose-50/10 shadow-sm'
                        : 'border-rose-100 bg-white hover:border-primary/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${quantity === packNum ? 'border-primary' : 'border-slate-300'}`}>
                        {quantity === packNum && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {packNum} Pack{product.category === 'Period Panties' ? ` (${packNum * 10} Panties)` : ''}
                      </span>
                    </div>

                    <div className="text-right flex items-baseline gap-1.5">
                      <span className="text-[10px] text-slate-400 font-medium line-through">MRP ₹{origVal}</span>
                      <span className="text-sm font-extrabold text-slate-900">₹{activePrice}</span>
                      <span className="text-[10px] font-bold text-primary">({activeDiscount}% Off)</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">MRP inclusive of all taxes</p>
          </div>

          {/* Choose your order type */}
          <div className="flex flex-col gap-3 text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Choose your order type</span>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Option 1: Buy Once */}
              {(() => {
                const origVal = product.originalPrice * quantity;
                const discPct = quantity === 1 ? 0.28 : 0.32;
                const onceVal = Math.round(origVal * (1 - discPct));
                const onceDiscount = Math.round(((origVal - onceVal) / origVal) * 100);
                return (
                  <div
                    onClick={() => setOrderType('once')}
                    className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      orderType === 'once'
                        ? 'border-primary bg-rose-50/10 shadow-sm'
                        : 'border-rose-100 bg-white hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${orderType === 'once' ? 'border-primary' : 'border-slate-300'}`}>
                        {orderType === 'once' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <span className="text-xs font-bold text-slate-800">Buy once</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 pl-5">
                      <span className="text-sm font-extrabold text-slate-900">₹{onceVal}</span>
                      <span className="text-[10px] font-bold text-primary">({onceDiscount}% Off)</span>
                    </div>
                  </div>
                );
              })()}

              {/* Option 2: Subscribe & Save */}
              {(() => {
                const origVal = product.originalPrice * quantity;
                const subVal = Math.round(origVal * 0.60);
                return (
                  <div
                    onClick={() => setOrderType('subscribe')}
                    className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2.5 relative overflow-hidden ${
                      orderType === 'subscribe'
                        ? 'border-primary bg-rose-50/10 shadow-sm'
                        : 'border-rose-100 bg-white hover:border-primary/30'
                    }`}
                  >
                    {/* Save badge */}
                    <span className="absolute top-0 right-0 bg-secondary text-white text-[9px] font-extrabold px-2 py-0.5 rounded-bl-xl rounded-tr-2xl">
                      Save 40% each time
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${orderType === 'subscribe' ? 'border-primary' : 'border-slate-300'}`}>
                        {orderType === 'subscribe' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <span className="text-xs font-bold text-slate-800">Subscribe &amp; Save</span>
                    </div>

                    <div className="flex items-baseline gap-1.5 pl-5">
                      <span className="text-sm font-extrabold text-slate-900">₹{subVal}</span>
                      <span className="text-[10px] font-bold text-secondary">(40% Off)</span>
                    </div>

                    <p className="text-[9px] text-slate-400 font-semibold pl-5">
                      Delivered &amp; Billed every {deliveryInterval} {deliveryInterval === 1 ? 'Month' : 'Months'}
                    </p>

                    {/* Interval pills — stop propagation so clicking pill doesn't deselect subscribe */}
                    {orderType === 'subscribe' && (
                      <div
                        className="flex gap-1.5 pl-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[1, 2, 3].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setDeliveryInterval(m); }}
                            className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                              deliveryInterval === m
                                ? 'bg-primary border-primary text-white shadow-sm'
                                : 'bg-white border-rose-100 text-slate-500 hover:border-primary/40 hover:text-primary'
                            }`}
                          >
                            {m} {m === 1 ? 'Month' : 'Months'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* How subscription works link — always visible */}
            <button
              type="button"
              onClick={() => setShowSubscriptionModal(true)}
              className="text-[10px] font-bold text-primary hover:underline text-left w-max cursor-pointer"
            >
              How subscription works?
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 py-3.5 px-6 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer ${
                added
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-primary text-white hover:bg-primary-hover hover:shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
            
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 font-semibold rounded-xl text-primary bg-white border-2 border-primary hover:bg-rose-50/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              Buy Now
            </button>
          </div>

          {/* Check Pincode Delivery checker */}
          <div className="border-t border-rose-50 pt-5 mt-2 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-700 font-outfit">Check Estimated Delivery Date</span>
            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Enter your Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold font-mono"
              />
              <button
                type="button"
                onClick={handleCheckDelivery}
                className="px-5 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Check
              </button>
            </div>
            {deliveryMessage && (
              <p className={`text-xs font-bold mt-1 ${pincodeValid ? 'text-emerald-600' : 'text-rose-500'}`}>
                {deliveryMessage}
              </p>
            )}
          </div>

          {/* Icon Benefits bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-rose-50 mt-4">
            {Object.keys(iconsMap).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  {iconsMap[feat]}
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Products — above details tabs */}
      <section className="border-t border-rose-100 pt-12 pb-4 text-left">
        <div className="mb-8">
          <h3 className="font-outfit text-xl font-extrabold text-slate-800 tracking-tight">You May Also Like</h3>
          <p className="text-slate-400 text-xs font-semibold mt-1">Explore our range of other sanitary care options designed for different cycle flows.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.filter((p) => p.id !== product?.id).slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Tabs description & Details Section */}
      <section className="border-t border-rose-100 pt-10 pb-10 text-left">
        <div className="flex flex-col gap-6">
            <div className="flex border-b border-rose-50 overflow-x-auto scrollbar-none gap-8">
              {['details', 'features', 'how-to-use', 'ingredients', 'faq'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-outfit text-sm font-bold capitalize whitespace-nowrap border-b-2 transition-all relative ${
                    activeTab === tab
                      ? 'border-primary text-primary font-extrabold'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Tab contents & Absorbency Level Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Tab contents */}
              <div className="lg:col-span-8 min-h-[160px] leading-relaxed text-sm text-slate-600 font-medium">
                {activeTab === 'details' && (
                  <div className="flex flex-col gap-4 animate-fade-in text-slate-500 font-semibold text-xs sm:text-sm">
                    <p>
                      {product.name} are specially designed for heavy flow nights. Extra long coverage with leak lock technology gives you peaceful & comfortable sleep.
                    </p>
                    <ul className="flex flex-col gap-2 mt-2">
                      {product.features.slice(0, 5).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="list-disc list-inside flex flex-col gap-2.5 animate-fade-in text-slate-500 font-semibold">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'how-to-use' && (
                  <div className="bg-rose-50/15 p-5 border border-rose-50 rounded-2xl flex flex-col gap-3 animate-fade-in text-slate-500 font-semibold">
                    <p className="font-semibold text-slate-800 text-sm">Follow these simple steps for application:</p>
                    <p>{product.howToUse}</p>
                    <p className="text-xs text-rose-500 font-semibold mt-1">⚠️ Hygiene Recommendation: Always wash hands before pad change and wrap used pad properly in paper bags.</p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="animate-fade-in flex flex-col gap-2 text-slate-500 font-semibold">
                    <p className="font-bold text-slate-700">100% Skin Safe Composition:</p>
                    <p>{product.ingredients}</p>
                    <p className="text-xs text-slate-400 mt-2">Certified by global organic standards (GOTS). Toxicological tests report zero traces of chlorine bleach, artificial fragrance, pesticides, or plastics.</p>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="flex flex-col gap-4 animate-fade-in text-slate-500 font-semibold">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-800 text-sm">How often should I change the pad?</span>
                      <p className="text-xs">We recommend changing your pad every 4-6 hours, depending on your flow, to maintain optimal hygiene and feel fresh.</p>
                    </div>
                    <div className="flex flex-col gap-1 border-t border-rose-50/50 pt-3">
                      <span className="font-bold text-slate-800 text-sm">Are these pads safe for sensitive skin?</span>
                      <p className="text-xs">Yes, our pads are dermatologically tested, hypoallergenic, and free from chlorine, fragrances, or artificial dyes.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Absorbency Level Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#FFF5F7] to-rose-50/20 border border-rose-100/40 rounded-3xl p-6 flex flex-col gap-5 shadow-sm">
                <div>
                  <h4 className="font-outfit font-extrabold text-slate-800 text-base mb-3">Absorbency Level</h4>
                  {renderDroplets(product.droplets)}
                  <p className="text-xs text-secondary font-bold mt-2.5 tracking-wide">
                    {product.absorbencyLabel || `${product.absorbency} Flow`}
                  </p>
                </div>

                {product.idealFor && product.idealFor.length > 0 && (
                  <div className="border-t border-rose-100/50 pt-4 flex flex-col gap-2">
                    <h5 className="font-outfit font-extrabold text-slate-800 text-xs tracking-wider uppercase">Ideal For</h5>
                    <ul className="flex flex-col gap-2.5">
                      {product.idealFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                          <span className="w-2 h-2 rounded-full border border-secondary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
        </div>
      </section>

      {/* Reviews Section — below tabs */}
      <section className="border-t border-rose-100 pt-12 text-left">
        <div className="flex flex-col gap-10">

          {/* Header + rating summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-outfit text-xl font-extrabold text-slate-800 tracking-tight">
                Customer Reviews
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">{product.reviewCount} verified reviews</p>
            </div>
            <div className="flex items-center gap-3 bg-rose-50/30 border border-rose-100/50 px-5 py-3 rounded-2xl">
              <span className="font-outfit text-3xl font-black text-slate-800">{product.rating}</span>
              <div className="flex flex-col gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-bold">out of 5</span>
              </div>
            </div>
          </div>

          {/* Existing reviews list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {product.reviewsList.map((review, idx) => (
              <div key={idx} className="bg-[#FAF7F8] border border-rose-50 rounded-2xl p-5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-800">{review.name}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{review.date}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Write a review form */}
          <div className="bg-gradient-to-br from-[#FFF5F7] to-white border border-rose-100/50 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
            <div>
              <h4 className="font-outfit font-extrabold text-slate-800 text-base">Write a Review</h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Share your experience with other customers.</p>
            </div>

            {reviewForm.submitted ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="font-bold text-slate-800 text-sm">Thank you for your review!</p>
                <p className="text-xs text-slate-400">Your feedback helps other customers make better decisions.</p>
                <button
                  type="button"
                  onClick={() => setReviewForm({ name: '', comment: '', rating: 0, hover: 0, submitted: false })}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Write another review
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Star picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                        onMouseEnter={() => setReviewForm(f => ({ ...f, hover: star }))}
                        onMouseLeave={() => setReviewForm(f => ({ ...f, hover: 0 }))}
                        className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (reviewForm.hover || reviewForm.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    {reviewForm.rating > 0 && (
                      <span className="ml-2 text-xs font-bold text-slate-500 self-center">
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewForm.rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya S."
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm(f => ({ ...f, name: e.target.value }))}
                    className="px-4 py-2.5 text-xs rounded-xl border border-rose-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold"
                  />
                </div>

                {/* Comment */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you loved (or didn't love) about this product…"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    className="px-4 py-3 text-xs rounded-xl border border-rose-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-700 font-medium resize-none leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={() => {
                    if (!reviewForm.rating || !reviewForm.name.trim() || !reviewForm.comment.trim()) return;
                    setReviewForm(f => ({ ...f, submitted: true }));
                  }}
                  disabled={!reviewForm.rating || !reviewForm.name.trim() || !reviewForm.comment.trim()}
                  className="w-full sm:w-auto sm:self-start px-8 py-3 text-sm font-bold text-white rounded-xl shadow-md shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #e8004d 0%, #ff6b9d 100%)' }}
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* How Subscription Works Modal — Premium Redesign */}
      {showSubscriptionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,10,25,0.75)', backdropFilter: 'blur(12px)' }}
          onClick={() => setShowSubscriptionModal(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-rose-100/30 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Hero Header */}
            <div className="relative bg-gradient-to-br from-primary via-rose-500 to-secondary px-7 pt-8 pb-10 text-white overflow-hidden">
              {/* Decorative blobs */}
              <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-white/10 blur-xl" />

              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all cursor-pointer"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10">
                <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full mb-3">
                  Subscription Plan
                </span>
                <h3 className="font-outfit font-black text-2xl leading-tight">How Subscription<br/>Works</h3>
                <p className="text-white/75 text-xs font-semibold mt-1.5">Automated care, delivered your way.</p>
              </div>
            </div>

            {/* Steps — scroll if needed */}
            <div className="px-7 py-6 flex flex-col gap-0 overflow-y-auto max-h-[55vh]">
              {[
                { title: "Choose Your Plan",            desc: "Pick the number of packs you need each month." },
                { title: "Select Your Flow & Frequency", desc: "Customize your pad sizes and how often you want them." },
                { title: "Smart Savings, Every Cycle",   desc: "Enjoy exclusive savings on every subscription order." },
                { title: "Get Automated Deliveries",     desc: "Your packs arrive at your doorstep, right on time." },
                { title: "Skip or Cancel Anytime",       desc: "You will be charged automatically each month, but you're always in control." },
              ].map(({ title, desc }, idx, arr) => (
                <div key={idx} className="flex gap-4">
                  {/* Step number + connector line */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
                      {idx + 1}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-rose-200 to-transparent my-1" />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`flex flex-col gap-0.5 text-left ${idx < arr.length - 1 ? 'pb-5' : 'pb-0'}`}>
                    <span className="text-sm font-bold text-slate-800 font-outfit leading-tight">{title}</span>
                    <span className="text-[11px] text-slate-400 font-medium leading-relaxed">{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-7 pb-7 pt-2">
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="w-full py-3.5 text-sm font-extrabold text-white rounded-2xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #e8004d 0%, #ff6b9d 100%)' }}
                type="button"
              >
                Got It, Let's Subscribe! 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Size Guide Modal */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 z-55 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 flex flex-col gap-6 relative border border-rose-100/50 shadow-2xl animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-rose-50">
              <div className="text-left">
                <h3 className="font-outfit font-black text-slate-800 text-lg">Haana Care Size Guide</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Find your perfect leak-proof fit coordinates.</p>
              </div>
              <button
                onClick={() => setShowSizeGuideModal(false)}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full transition-all cursor-pointer"
                title="Close Size Guide"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Table content */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-medium border-collapse">
                <thead>
                  <tr className="border-b border-rose-100 bg-[#FAF7F8]/80 text-[10px] text-slate-400 font-bold uppercase">
                    <th className="py-3 px-2">Size</th>
                    <th className="py-3 px-2 text-center">Waist (inches)</th>
                    <th className="py-3 px-2 text-center">Hip (inches)</th>
                    <th className="py-3 px-2 text-right">Coverage</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-rose-50 hover:bg-rose-50/10">
                    <td className="py-3.5 px-2 font-bold text-slate-800">S - M</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">22" - 28"</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">32" - 36"</td>
                    <td className="py-3.5 px-2 text-right font-semibold text-emerald-600">Full Protection</td>
                  </tr>
                  <tr className="border-b border-rose-50 hover:bg-rose-50/10">
                    <td className="py-3.5 px-2 font-bold text-slate-800">M - L</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">28" - 32"</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">36" - 40"</td>
                    <td className="py-3.5 px-2 text-right font-semibold text-emerald-600">Full Protection</td>
                  </tr>
                  <tr className="border-b border-rose-50 hover:bg-rose-50/10">
                    <td className="py-3.5 px-2 font-bold text-slate-800">L - XL</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">32" - 38"</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">40" - 46"</td>
                    <td className="py-3.5 px-2 text-right font-semibold text-emerald-600">Full Protection</td>
                  </tr>
                  <tr className="border-b border-rose-50 hover:bg-rose-50/10">
                    <td className="py-3.5 px-2 font-bold text-slate-800">XL - XXL</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">38" - 42"</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">46" - 50"</td>
                    <td className="py-3.5 px-2 text-right font-semibold text-emerald-600">Full Protection</td>
                  </tr>
                  <tr className="border-b-0 hover:bg-rose-50/10">
                    <td className="py-3.5 px-2 font-bold text-slate-800">XXL - XXXL</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">42" - 52"</td>
                    <td className="py-3.5 px-2 text-center font-semibold font-mono">50" - 54"</td>
                    <td className="py-3.5 px-2 text-right font-semibold text-emerald-600">Full Protection</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note alert */}
            <div className="bg-[#FAF7F8] border border-rose-100/30 p-3 rounded-2xl text-[10px] text-slate-400 font-semibold text-left leading-relaxed">
              💡 <strong>Fitting Tip:</strong> If your waist measurements fall on the borderline, we suggest opting for the larger size to guarantee a completely comfortable and stress-free waistband experience.
            </div>

            {/* Got it button */}
            <button
              onClick={() => setShowSizeGuideModal(false)}
              className="w-full py-3 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-md transition-all cursor-pointer border border-transparent"
              type="button"
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
