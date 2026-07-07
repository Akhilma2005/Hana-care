import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#FAF6F7] border-t border-rose-100 pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center overflow-hidden h-16 w-max">
            <img src="/logo.png" alt="Haana Care Logo" className="h-40 object-contain mix-blend-multiply my-[-12px]" />
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Haana Care is committed to providing premium, skin-friendly, and organic menstrual care products. Designed by women, for women, to ensure rash-free, leak-proof confidence every single day.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-rose-100 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6.5c0-.82.18-1 1-1h1.72V2.5A21.1 21.1 0 0 0 12.18 2c-2.73 0-4.18 1.45-4.18 4.18Z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-rose-100 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-rose-100 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column - Shop */}
        <div className="flex flex-col gap-3">
          <h4 className="font-outfit font-bold text-slate-800 text-sm tracking-wider uppercase">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link to="/shop?category=Regular%20Pads" className="hover:text-primary transition-colors">Regular Pads (240mm)</Link></li>
            <li><Link to="/shop?category=XL%20Pads" className="hover:text-primary transition-colors">XL Pads (280mm)</Link></li>
            <li><Link to="/shop?category=Overnight%20Pads" className="hover:text-primary transition-colors">Overnight Pads (320mm)</Link></li>
            <li><Link to="/shop?category=Panty%20Liners" className="hover:text-primary transition-colors">Panty Liners (155mm)</Link></li>
            <li><Link to="/shop?category=Combo%20Packs" className="hover:text-primary transition-colors">Combo & Trial Packs</Link></li>
          </ul>
        </div>

        {/* Company & Support Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-outfit font-bold text-slate-800 text-sm tracking-wider uppercase">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-500">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Our Blog</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ & Help</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Get in Touch Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-outfit font-bold text-slate-800 text-sm tracking-wider uppercase">Get in Touch</h4>
          <ul className="flex flex-col gap-3.5 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="break-all">support@haanacare.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Mon - Sat: 10 AM - 7 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter signup & bottom border */}
      <div className="max-w-7xl mx-auto border-t border-rose-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Newsletter Box */}
        <div className="w-full md:max-w-md flex flex-col gap-1 text-center md:text-left">
          <h4 className="font-outfit font-semibold text-slate-800 text-base">Subscribe to our Newsletter</h4>
          <p className="text-slate-400 text-xs">Stay updated on special deals, subscription offers, and girls' health tips.</p>
        </div>
        <form onSubmit={handleSubscribe} className="w-full md:max-w-md flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 text-sm rounded-full border border-rose-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white placeholder-slate-400 transition-all"
          />
          <button
            type="submit"
            className="px-5 py-2 text-sm text-white font-medium bg-primary rounded-full hover:bg-primary-hover flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto text-center mt-12 text-slate-400 text-xs">
        <p>&copy; {new Date().getFullYear()} Haana Care. All Rights Reserved. Crafted for premium hygiene and ultimate comfort.</p>
      </div>
    </footer>
  );
}
