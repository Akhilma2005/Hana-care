import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Period Calculator', path: '/period-calculator' },
    { name: 'Blogs', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full z-50 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-primary text-white text-[11px] md:text-xs py-2 px-4 flex justify-between items-center font-medium tracking-wide">
        <span className="animate-pulse">Free Shipping on orders above ₹499 | COD Available</span>
        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:underline opacity-90 transition-opacity">Track Order</Link>
          <span className="opacity-50">|</span>
          <Link to="/faq" className="hover:underline opacity-90 transition-opacity">Help & Support</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm transition-all duration-300">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center focus:outline-none h-12 md:h-16">
            <img src="/logo.png" alt="Hana Care Logo" className="h-9 md:h-12 object-contain" />
          </Link>

          {/* Search bar Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-1/3 max-w-sm">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-1.5 pl-4 pr-10 rounded-full border border-rose-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-rose-50/20 placeholder-slate-400 transition-all"
            />
            <button type="submit" className="absolute right-3 text-rose-400 hover:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Nav Icons & Mobile Button */}
          <div className="flex items-center gap-4">
            {/* Search icon for Mobile */}
            <form onSubmit={handleSearchSubmit} className="flex md:hidden items-center relative mr-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 focus:w-40 py-1 pl-3 pr-7 rounded-full border border-rose-100 focus:outline-none text-xs bg-rose-50/10 transition-all focus:border-primary"
              />
              <button type="submit" className="absolute right-2.5 text-rose-400">
                <Search className="w-3 h-3" />
              </button>
            </form>

            <Link to="/dashboard" className="p-2 text-slate-600 hover:text-primary hover:bg-rose-50/30 rounded-full transition-all" title="My Account">
              <User className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="p-2 text-slate-600 hover:text-primary hover:bg-rose-50/30 rounded-full relative transition-all" title="Shopping Cart">
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-primary hover:bg-rose-50/30 rounded-full md:hidden transition-all focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Menu links */}
        <div className="hidden md:flex justify-center border-t border-rose-50 bg-white/40">
          <nav className="flex space-x-8 py-2.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all py-1 px-2.5 rounded-md hover:text-primary hover:bg-rose-50/40 ${
                    isActive ? 'text-primary font-semibold bg-rose-50/50' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 animate-fade-in">
          <nav className="flex flex-col gap-6 text-lg font-outfit font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 border-b border-rose-50 transition-colors ${
                    isActive ? 'text-primary border-primary' : 'text-slate-700'
                  }`
                }
              >
                {link.name}
                <ArrowRight className="w-4 h-4 opacity-50" />
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
