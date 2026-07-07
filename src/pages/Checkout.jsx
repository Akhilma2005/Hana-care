import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    getSubtotal,
    getShippingFee,
    getDiscountAmount,
    getGrandTotal,
    placeOrder
  } = useCart();

  const [form, setForm] = useState({
    name: 'Ananya R.',
    email: 'ananya.r@email.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Rosewood Apartments, 12th Main Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001'
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState(null);

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const discountAmt = getDiscountAmount();
  const grandTotal = getGrandTotal();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone || !form.pincode) return;

    setIsPlacing(true);
    setTimeout(() => {
      const orderId = placeOrder(form);
      setOrderSuccessId(orderId);
      setIsPlacing(false);
    }, 1500);
  };

  if (orderSuccessId) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center font-sans animate-fade-in">
        <div className="bg-white border border-rose-100 rounded-3xl p-8 shadow-lg flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center animate-bounce">
            <ClipboardCheck className="w-8 h-8" />
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="font-outfit text-2xl font-extrabold text-slate-800">Order Placed Successfully!</h2>
            <p className="text-xs text-slate-400 font-medium">Thank you for shopping with Hana Care. Your hygiene package is on its way.</p>
          </div>

          <div className="w-full bg-[#FAF7F8] p-4 rounded-2xl text-left text-xs font-semibold text-slate-500 flex flex-col gap-2.5 my-2 border border-rose-100/50">
            <div className="flex justify-between">
              <span>Order ID</span>
              <span className="text-slate-800 font-mono font-bold">#HN-{orderSuccessId}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery</span>
              <span className="text-slate-800 font-bold">Within 2-3 Working Days</span>
            </div>
            <div className="flex justify-between">
              <span>Total Paid</span>
              <span className="text-slate-800 font-bold">₹{grandTotal}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-sm transition-all"
            >
              View Order History
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4 font-semibold text-sm">Your cart is empty. Add items to checkout.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-2.5 text-xs text-white bg-primary rounded-full">
          Shop Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/cart" className="hover:text-primary transition-colors">Your Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Checkout</span>
      </nav>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
        
        {/* Left Side: Shipping & Payments */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Shipping Form */}
          <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-50 pb-2">Delivery Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Contact Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">Street Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                required
                className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">State</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-50 pb-2">Payment Options</h3>
            
            <div className="flex flex-col gap-3">
              <label className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-rose-50/10' : 'border-rose-100 hover:border-primary/20'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-primary accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</span>
                  <span className="text-[10px] text-slate-400">Pay inside cash when delivery arrives. Free flat check.</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-primary bg-rose-50/10' : 'border-rose-100 hover:border-primary/20'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="w-4 h-4 text-primary accent-primary cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">UPI / Card Payment</span>
                  <span className="text-[10px] text-slate-400">Pay using Google Pay, PhonePe, Paytm, or Credit/Debit cards.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Review Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-100 pb-2">Review Order</h3>

            {/* Cart Items Quick List */}
            <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-start text-xs border-b border-rose-50/30 pb-2.5 last:border-b-0 last:pb-0">
                  <div className="flex flex-col max-w-[200px]">
                    <span className="font-bold text-slate-800 leading-tight">{item.product.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Size: {item.size} • Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-slate-700 font-mono">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Financial Calculations list */}
            <div className="flex flex-col gap-2.5 border-t border-rose-100 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-800">₹{subtotal}</span>
              </div>

              {discountAmt > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span>-₹{discountAmt}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>

              <div className="border-t border-rose-50 pt-3 flex justify-between items-baseline text-slate-800">
                <span className="font-outfit font-bold">Total Amount</span>
                <span className="font-outfit font-black text-slate-900 text-lg">₹{grandTotal}</span>
              </div>
            </div>

            {/* Placement action */}
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 active:scale-[0.98] disabled:opacity-75 transition-all mt-2"
            >
              {isPlacing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying Details...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Place Order (COD)
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
