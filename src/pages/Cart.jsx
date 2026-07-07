import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    promoCode,
    discount,
    applyPromoCode,
    getSubtotal,
    getShippingFee,
    getDiscountAmount,
    getGrandTotal
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState({ text: '', isError: false });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoMsg({ text: result.message, isError: false });
    } else {
      setPromoMsg({ text: result.message, isError: true });
    }
  };

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const discountAmt = getDiscountAmount();
  const grandTotal = getGrandTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Your Cart</span>
      </nav>

      <div className="flex flex-col gap-3 text-left mb-6">
        <h1 className="font-outfit text-3xl font-extrabold text-slate-800 tracking-tight">Your Cart</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage your items and apply subscriptions before checkout.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 bg-white border border-rose-50 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col">
              {cartItems.map((item, idx) => (
                <CartItem key={`${item.product.id}-${item.size}`} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Link
                to="/shop"
                className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
              >
                Continue Shopping
              </Link>
              <span className="text-xs text-slate-400 font-medium">
                Free shipping available on orders over ₹499!
              </span>
            </div>
          </div>

          {/* Right Column: Checkout Summary Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Promo Code Card */}
            <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm text-left">
              <h3 className="font-outfit font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary" />
                Have a coupon code?
              </h3>
              
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HAANA15"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary uppercase font-bold bg-rose-50/10 placeholder-slate-400 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-sm active:scale-95 transition-all"
                >
                  Apply
                </button>
              </form>

              {promoMsg.text && (
                <p className={`text-[10px] font-bold mt-2.5 ${promoMsg.isError ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {promoMsg.text}
                </p>
              )}

              {promoCode && (
                <div className="mt-3 flex justify-between items-center bg-rose-50/50 p-2 rounded-xl border border-rose-100/50">
                  <span className="text-[10px] font-bold text-primary bg-white px-2 py-0.5 rounded-lg border border-primary/20">
                    {promoCode}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {promoCode === 'HAANA15' ? '15% Off Active' : 'Free Shipping Active'}
                  </span>
                </div>
              )}
            </div>

            {/* Calculations Box */}
            <div className="bg-[#FAF7F8] border border-rose-50/50 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
              <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-100 pb-3">Order Summary</h3>

              <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-800">₹{subtotal}</span>
                </div>

                {discountAmt > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmt}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-bold' : 'text-slate-800'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-[10px] text-slate-400 font-semibold text-center border-t border-rose-100/30 pt-2">
                  Add <span className="text-primary font-bold">₹{499 - subtotal}</span> more to unlock <span className="text-emerald-600 font-bold">FREE SHIPPING</span>!
                </p>
              )}

              <div className="border-t border-rose-100 pt-3.5 flex justify-between items-baseline">
                <span className="font-outfit font-bold text-slate-800 text-sm">Grand Total</span>
                <span className="font-outfit font-black text-slate-900 text-xl">₹{grandTotal}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 active:scale-[0.98] transition-all mt-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-rose-50 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-outfit font-bold text-slate-800 text-lg">Your cart is empty</h3>
            <p className="text-xs text-slate-400 font-medium">Looks like you haven't added any products to your cart yet.</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-full transition-all mt-2 shadow-md shadow-primary/10"
          >
            Shop Sanitary Pads
          </button>
        </div>
      )}
    </div>
  );
}
