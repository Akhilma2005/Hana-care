import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { Eye, X } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PeriodCalculator from './pages/PeriodCalculator';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const [showMockup, setShowMockup] = useState(false);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FFFDFE] relative">
          <Header />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/period-calculator" element={<PeriodCalculator />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />

          {/* Floating Action Button to View Design Mockup */}
          <button
            onClick={() => setShowMockup(true)}
            className="fixed bottom-6 left-6 z-40 bg-secondary text-white py-3 px-4.5 rounded-full shadow-2xl flex items-center gap-2 hover:bg-secondary-dark transition-all scale-100 hover:scale-105 active:scale-95 font-semibold text-xs border border-white/20"
            title="Compare with Original Mockup"
          >
            <Eye className="w-4 h-4" />
            <span>View Design Mockup</span>
          </button>

          {/* Full Screen Mockup Modal Overlay */}
          {showMockup && (
            <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in">
              <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col relative border border-rose-100 shadow-2xl">
                
                {/* Header */}
                <div className="py-4 px-6 border-b border-rose-50 flex justify-between items-center bg-rose-50/10">
                  <div className="flex flex-col text-left">
                    <h3 className="font-outfit font-extrabold text-slate-800 text-sm md:text-base">Original Design Mockup Reference</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Provided UI design mockup for Haana Care project.</p>
                  </div>
                  
                  <button
                    onClick={() => setShowMockup(false)}
                    className="p-2 bg-slate-100/80 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-all"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content body showing scrollable full resolution image */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-100/50 custom-scrollbar">
                  <div className="flex justify-center items-start">
                    <img
                      src="/mockup.png"
                      alt="Original Design Mockup"
                      className="max-w-full h-auto rounded-xl shadow-md border border-slate-200"
                    />
                  </div>
                </div>

                {/* Footer status info */}
                <div className="py-3 px-6 border-t border-rose-50 bg-slate-50 text-[10px] font-bold text-slate-400 text-center">
                  Scroll up and down to inspect details of all screens.
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
