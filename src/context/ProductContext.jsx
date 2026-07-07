import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'hana_products_v4';

const SEED = [
  {
    id: "regular-pads-240", image: "/products/regular-pads.png",
    name: "Hana Care Regular Pads (240mm)", shortName: "Regular Pads",
    category: "Sanitary Pads", price: 149, originalPrice: 169,
    rating: 4.8, reviewCount: 112, size: "240mm", absorbency: "Medium",
    droplets: 3, absorbencyLabel: "Medium Flow",
    idealFor: ["Moderate flow days", "Daytime active wear", "Average flow cycles"],
    description: "Hana Care Regular Pads are specially designed for moderate flow days. Extra soft top layer with leak lock technology gives you peaceful & comfortable days without worry.",
    features: ["Extra long 240mm for moderate protection", "Quick absorption & dry-feel top sheet", "Cottony soft top layer prevents rashes", "Breathable back layer for fresh feeling", "Dermatologically tested"],
    howToUse: "Peel the paper backing from the pad and press it firmly into your underwear. Peel the paper from the wings, wrap them around the sides, and press. Change every 4-6 hours.",
    ingredients: "Organic cotton top sheet, sustainable wood pulp absorbent core, plant-based backing, non-toxic hot melt adhesive.",
    reviewsList: [{ name: "Priya Sharma", rating: 5, date: "June 14, 2026", comment: "Absolutely love these! Extremely thin yet holds up well. No rashes at all!" }],
    colorTheme: "from-pink-400 to-rose-500", badge: "Bestseller", stock: 50
  },
  {
    id: "xl-pads-280", image: "/products/xl-pads.png",
    name: "Hana Care XL Pads (280mm)", shortName: "XL Pads",
    category: "Sanitary Pads", price: 179, originalPrice: 229,
    rating: 4.9, reviewCount: 135, size: "280mm", absorbency: "Heavy",
    droplets: 4, absorbencyLabel: "Heavy Flow",
    idealFor: ["Heavy flow days", "Office or college hours", "Extended daytime use"],
    description: "Hana Care XL Pads offer superior protection for heavy flow days. The extra coverage and secure wings ensure zero leakage even during active movement.",
    features: ["280mm length with wider back for heavy flow", "Double wings for maximum grip and security", "Advanced gel core locks moisture instantly", "Hypoallergenic organic cotton top layer", "FDA Approved & Dermatologically Tested"],
    howToUse: "Unwrap pad, remove backing strip, place on underwear. Remove wing strips and wrap around the sides. Recommended for day use on heavy flow days.",
    ingredients: "Certified organic cotton sheet, super-absorbent polymer (SAP) core, bio-plastic barrier film, toxic-free glue.",
    reviewsList: [{ name: "Ananya Iyer", rating: 5, date: "July 01, 2026", comment: "The extra size is perfect. I felt secure all day during my college lectures." }],
    colorTheme: "from-rose-400 to-pink-600", badge: "Popular", stock: 40
  },
  {
    id: "overnight-pads-320", image: "/products/overnight-pads.png",
    name: "Hana Care Overnight Pads (320mm)", shortName: "Overnight Pads",
    category: "Sanitary Pads", price: 199, originalPrice: 249,
    rating: 4.9, reviewCount: 142, size: "320mm", absorbency: "Overnight",
    droplets: 4.5, absorbencyLabel: "Overnight / Heavy Flow",
    idealFor: ["Heavy flow nights", "Post-delivery nights", "Up to 12 hours sleep"],
    description: "Hana Care Overnight Pads are specially designed for heavy flow nights. Extra long 320mm and wide back with leak lock technology gives you peaceful and confident sleep up to 12 hours.",
    features: ["Extra long 320mm for full night protection", "Quick absorption & dry feel core", "Cottony soft top layer for zero irritation", "Breathable bottom layer keeps skin dry", "Dermatologically tested & chemical-free"],
    howToUse: "Unwrap the pad. Remove the center adhesive strip and stick it onto the underwear. Wrap the wings firmly around the edges. Best worn before sleeping.",
    ingredients: "100% Organic Cotton Top Sheet, Natural wood pulp fluff, Super-Absorbent Polymer, Breathable Polyethylene backsheet.",
    reviewsList: [{ name: "Kriti Sen", rating: 5, date: "June 28, 2026", comment: "Finally, I can sleep without checking for stains in the morning!" }],
    colorTheme: "from-indigo-900 via-purple-800 to-secondary", badge: "12hr Protection", stock: 35
  },
  {
    id: "panty-liners-155", image: "/products/panty-liners.png",
    name: "Hana Care Panty Liners (155mm)", shortName: "Panty Liners",
    category: "Panty Liners", price: 99, originalPrice: 129,
    rating: 4.7, reviewCount: 98, size: "155mm", absorbency: "Light",
    droplets: 1, absorbencyLabel: "Light Flow",
    idealFor: ["Daily discharge & freshness", "Spotting days", "Tampon/cup backup"],
    description: "Hana Care Panty Liners are ultra-thin and flexible, designed for everyday freshness, light discharge days, or backup for tampons/cups.",
    features: ["155mm ultra-thin daily comfort design", "Breathable layers prevent moisture build-up", "Soft cotton layer feels like regular underwear", "Stays securely in place all day", "Ideal for discharge, spotting, or backup"],
    howToUse: "Remove backing paper. Place liner onto the crotch of your underwear. Replace as needed throughout the day for fresh comfort.",
    ingredients: "Ultra-thin organic cotton cover, breathable backing, skin-safe adhesive.",
    reviewsList: [{ name: "Riya Verma", rating: 4, date: "July 03, 2026", comment: "Perfect for daily discharge. Very thin and breathable." }],
    colorTheme: "from-teal-400 to-emerald-500", badge: "Daily Freshness", stock: 60
  },
  {
    id: "combo-pack-monthly", image: "/products/combo-pack.png",
    name: "Hana Care Combo Pack (Monthly Pack)", shortName: "Combo Pack",
    category: "Combo Packs", price: 499, originalPrice: 599,
    rating: 4.9, reviewCount: 215, size: "Mixed Sizes", absorbency: "Heavy",
    droplets: 4, absorbencyLabel: "Mixed Flows",
    idealFor: ["Complete period cycle", "Day-to-night transitions", "Customizing flow needs"],
    description: "The ultimate monthly cycle care package. Includes a curated combination of Regular, XL, and Overnight pads to cover your entire period flow cycle from day to night.",
    features: ["All-in-one pack: 12 Regular, 10 XL, 8 Overnight pads", "Saves up to 15% compared to individual purchases", "Allows you to customize pad sizes dynamically", "Comes in an elegant, discrete storage box", "Free bio-degradable disposal bags included"],
    howToUse: "Use Regular pads on days 3-5, XL pads on days 1-2 (daytime), and Overnight pads during sleep.",
    ingredients: "All pads in combo pack are made of 100% organic cotton top sheet and chemical-free materials.",
    reviewsList: [{ name: "Shalini D.", rating: 5, date: "July 02, 2026", comment: "So convenient. I don't need to buy different packs every month anymore." }],
    colorTheme: "from-pink-500 to-purple-600", badge: "Best Value", stock: 25
  },
  {
    id: "trial-pack-mix", image: "/products/trial-pack.png",
    name: "Hana Care Trial Pack (Mix Pack)", shortName: "Trial Pack",
    category: "Combo Packs", price: 149, originalPrice: 199,
    rating: 4.8, reviewCount: 87, size: "Mixed Sizes", absorbency: "Medium",
    droplets: 3, absorbencyLabel: "Mixed Flows",
    idealFor: ["Finding your perfect fit", "First-time users", "Travel convenience"],
    description: "New to Hana Care? Try our mixed sample pack containing 2 Regular, 2 XL, and 2 Overnight pads to discover your perfect fit and absorbency comfort level.",
    features: ["Includes 6 total pads across all size ranges", "Perfect for trying out the texture and fit", "Ideal for travel or gifting to friends", "100% skin safe, hypoallergenic premium materials", "Biodegradable individual wrap papers"],
    howToUse: "Try each pad size during different phases of your cycle to see which size feels most comfortable.",
    ingredients: "Organic cotton top layer, natural plant cellulose core, secure backing sheet.",
    reviewsList: [{ name: "Nisha J.", rating: 5, date: "May 29, 2026", comment: "Glad I tried this! Ended up subscribing to the Monthly Combo Pack." }],
    colorTheme: "from-rose-400 via-pink-500 to-purple-500", badge: "Starter Kit", stock: 30
  },
  {
    id: "comfort-period-panties", image: "/products/period-panties.png",
    name: "Hana Care Comfort Period Panties", shortName: "Period Panties",
    category: "Sanitary Pads", price: 358, originalPrice: 498,
    rating: 4.6, reviewCount: 197, size: "M - L (28-32 inches)", absorbency: "Ultra",
    droplets: 6, absorbencyLabel: "Super Heavy / Overnight",
    idealFor: ["Extreme heavy flow nights", "360° leak protection", "Active movement sleep"],
    description: "Hana Care Comfort Period Panties are disposable menstrual underwear designed for maximum overnight flow security. Offers 360-degree leak protection, ultra-absorbent core, and a discreet, seamless fit.",
    features: ["Ultra-absorbent Core", "Discreet and Seamless Fit", "Soft and Airy Topsheet", "100% Safe, Toxic-Free Materials"],
    howToUse: "Wear like regular underwear during heavy flow nights or days. Pull off and wrap in paper wrapper for disposal. Do not flush.",
    ingredients: "Organic cotton topsheet, breathable back sheet, safe non-toxic polymers, flexible spandex waistband.",
    reviewsList: [{ name: "Pooja V.", rating: 5, date: "June 29, 2026", comment: "So comfortable and absolutely leak-proof. Perfect for heavy flow nights!" }],
    colorTheme: "from-orange-200 via-rose-300 to-primary", badge: "Seamless Fit", stock: 20
  }
];

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const p = JSON.parse(s);
        if (Array.isArray(p) && p.length) return p;
      }
    } catch {}
    return SEED;
  });

  useEffect(() => {
    // BroadcastChannel: instant sync across tabs (same origin)
    const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(STORAGE_KEY) : null;
    if (bc) {
      bc.onmessage = (e) => {
        if (Array.isArray(e.data)) setProducts(e.data);
      };
    }
    // storage event fallback for older browsers
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const p = JSON.parse(e.newValue);
          if (Array.isArray(p)) setProducts(p);
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      bc?.close();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const persist = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // Broadcast to other tabs instantly
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel(STORAGE_KEY);
        bc.postMessage(next);
        bc.close();
      }
    } catch {}
  };

  const addProduct = (p) => {
    const item = {
      id: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      image: p.image || '',
      images: Array.isArray(p.images) ? p.images : [],
      name: p.name,
      shortName: p.shortName || p.name,
      category: p.category || 'Sanitary Pads',
      price: Number(p.price) || 0,
      originalPrice: Number(p.originalPrice) || Number(p.price) || 0,
      rating: 4.5,
      reviewCount: 0,
      size: p.size || 'Standard',
      absorbency: p.absorbency || 'Medium',
      droplets: Number(p.droplets) || 3,
      absorbencyLabel: p.absorbencyLabel || 'Medium Flow',
      idealFor: [],
      description: p.description || '',
      features: Array.isArray(p.features) ? p.features : [],
      howToUse: p.howToUse || '',
      ingredients: p.ingredients || '',
      reviewsList: [],
      colorTheme: 'from-pink-400 to-rose-500',
      badge: p.badge || 'New',
      stock: Number(p.stock) || 0,
    };
    setProducts(prev => {
      const next = [item, ...prev];
      persist(next);
      return next;
    });
    return item;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      persist(next);
      return next;
    });
  };

  const deleteProduct = (id) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      persist(next);
      return next;
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
