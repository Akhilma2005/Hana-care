import React, { useState } from 'react';
import { User, ShoppingCart, Calendar, Heart, Shield, Award, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Dashboard() {
  const { orders, getCalculatedCycle } = useCart();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const { nextPeriod, ovulation, safeDays, currentCycleDay, cycleProgressPercent } = getCalculatedCycle();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <User className="w-4 h-4" /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'subscriptions', label: 'Subscriptions', icon: <Calendar className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <Heart className="w-4 h-4" /> },
    { id: 'addresses', label: 'Addresses', icon: <Shield className="w-4 h-4" /> },
    { id: 'payments', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">My Dashboard</span>
      </nav>

      {/* Mobile: horizontal tab bar */}
      <div className="lg:hidden flex overflow-x-auto scrollbar-none gap-2 mb-6 pb-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              activeMenu === item.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-rose-100 text-slate-500'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
        
        {/* Left Side: Sidebar Panel — desktop only */}
        <aside className="hidden lg:flex lg:col-span-3 bg-white border border-rose-50 rounded-3xl p-5 shadow-sm flex-col gap-2">
          {/* User Brief profile card */}
          <div className="flex items-center gap-3 p-3 border-b border-rose-50 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center font-outfit font-black text-primary">
              AR
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-800 truncate">Ananya R.</span>
              <span className="text-[10px] text-slate-400 truncate">ananya.r@email.com</span>
            </div>
          </div>

          {/* Nav List */}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeMenu === item.id
                  ? 'bg-rose-50/70 text-primary font-bold shadow-inner'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <a href="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-50/50 mt-4 border-t border-rose-50 pt-4">
            <LogOut className="w-4 h-4" />
            Logout
          </a>
        </aside>

        {/* Right Side: Tab Contents */}
        <main className="col-span-1 lg:col-span-9 flex flex-col gap-6">
          
          {/* 1. DASHBOARD OVERVIEW PANEL */}
          {activeMenu === 'dashboard' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Upcoming Period Date */}
                <div className="bg-white border border-rose-50 p-6 rounded-3xl shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Upcoming Period</span>
                  <span className="font-outfit text-base font-extrabold text-primary">{nextPeriod}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">Predictions active</span>
                </div>

                {/* Cycle Day Circle Progress Gauge */}
                <div className="bg-white border border-rose-50 p-6 rounded-3xl shadow-sm flex items-center justify-between relative overflow-hidden">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Current Cycle Day</span>
                    <span className="font-outfit text-xl font-black text-slate-800">
                      {currentCycleDay} <span className="text-xs text-slate-400 font-medium">/ 28</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">Normal health pattern</span>
                  </div>

                  {/* Circular progress bar representation */}
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" className="text-rose-50" strokeWidth="3" stroke="currentColor" fill="transparent" />
                      <circle cx="24" cy="24" r="20" className="text-primary" strokeWidth="3" stroke="currentColor" fill="transparent"
                        strokeDasharray={125}
                        strokeDashoffset={125 - (125 * cycleProgressPercent) / 100}
                      />
                    </svg>
                    <span className="absolute text-[8px] font-bold text-primary font-mono">{cycleProgressPercent}%</span>
                  </div>
                </div>

                {/* Next Ovulation Date */}
                <div className="bg-white border border-rose-50 p-6 rounded-3xl shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Next Ovulation</span>
                  <span className="font-outfit text-base font-extrabold text-secondary">{ovulation}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">Highest fertility window</span>
                </div>

                {/* Safe Days Range (Safe Time) */}
                <div className="bg-white border border-rose-50 p-6 rounded-3xl shadow-sm flex flex-col gap-1.5 relative overflow-hidden">
                  <div className="absolute -top-1 -right-1 w-12 h-12 bg-emerald-50/30 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Safe Days (Safe Time)</span>
                  <span className="font-outfit text-base font-extrabold text-emerald-600">{safeDays}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">Lowest cycle risk time</span>
                </div>
              </div>

              {/* Order history and active subscription plan list */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Recent Orders table preview */}
                <div className="lg:col-span-8 bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-rose-50 pb-2">
                    <h3 className="font-outfit font-bold text-slate-800 text-sm">My Recent Orders</h3>
                    <button onClick={() => setActiveMenu('orders')} className="text-[10px] font-bold text-primary hover:underline">View All</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-500 font-medium">
                      <thead>
                        <tr className="border-b border-rose-50 text-[10px] text-slate-400 font-bold uppercase">
                          <th className="py-2.5">Order ID</th>
                          <th className="py-2.5">Date</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 3).map((ord) => (
                          <tr key={ord.id} className="border-b border-rose-50/50 last:border-b-0 hover:bg-rose-50/10">
                            <td className="py-3 font-mono font-bold text-slate-700">#HN-{ord.id}</td>
                            <td className="py-3">{ord.date}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                  : 'bg-rose-50 text-primary border border-rose-100 animate-pulse'
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-3 text-right font-bold text-slate-700 font-mono">₹{ord.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Active subscription card panel */}
                <div className="lg:col-span-4 bg-[#FAF7F8] border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
                  <h3 className="font-outfit font-bold text-slate-800 text-sm border-b border-rose-100 pb-2">Subscription Plan</h3>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-800 font-bold text-xs">Monthly Pack Plan</span>
                    <p className="text-[10px] text-slate-400 font-semibold">Next dispatch date: <strong className="text-slate-700 font-bold">{nextPeriod}</strong></p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-rose-50/50 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-500">Monthly Combo Box</span>
                    <span className="font-bold text-primary">₹499/mo</span>
                  </div>

                  <button className="w-full py-2.5 text-xs text-white bg-primary hover:bg-primary-hover font-semibold rounded-xl transition-all shadow-sm">
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS PANEL */}
          {activeMenu === 'orders' && (
            <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left animate-fade-in">
              <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-50 pb-2">My Orders</h3>
              <div className="flex flex-col gap-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-rose-50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono font-bold text-slate-800 text-sm">Order #HN-{ord.id}</span>
                      <span className="text-slate-400 font-semibold">Placed on {ord.date}</span>
                      <p className="text-slate-500 font-medium mt-1">Items: <strong className="text-slate-700">{ord.items}</strong></p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] w-max ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-rose-50 text-primary border border-rose-100'
                      }`}>
                        {ord.status}
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-sm">₹{ord.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SUBSCRIPTIONS PANEL */}
          {activeMenu === 'subscriptions' && (
            <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left animate-fade-in">
              <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-rose-50 pb-2">Active Subscriptions</h3>
              <div className="border border-rose-50 rounded-2xl p-5 bg-[#FAF7F8] flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase font-extrabold text-primary">Monthly Combo Box</span>
                  <span className="font-bold text-slate-800 text-sm">Hana Care Combo Pack (Monthly Pack)</span>
                  <p className="text-slate-400 font-semibold mt-0.5">Dispatches: <strong className="text-slate-700 font-bold">Every 28 Days</strong></p>
                  <p className="text-slate-400 font-semibold">Next Dispatch: <strong className="text-slate-700 font-bold">{nextPeriod}</strong></p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 sm:items-end">
                  <span className="font-bold text-slate-800 text-base">₹499 / Month</span>
                  <div className="flex gap-2">
                    <button className="px-3.5 py-1.5 text-[10px] font-bold text-slate-500 bg-white border border-rose-100 rounded-lg hover:bg-rose-50/30 transition-all">Pause</button>
                    <button className="px-3.5 py-1.5 text-[10px] font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-all shadow-sm">Modify Box</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER STATIC PLACEHOLDER PANELS */}
          {['profile', 'addresses', 'payments', 'rewards'].includes(activeMenu) && (
            <div className="bg-white border border-rose-50 rounded-3xl p-8 text-center shadow-sm flex flex-col items-center justify-center gap-3 animate-fade-in min-h-[300px]">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-slate-800 text-base capitalize">{activeMenu} Settings</h3>
              <p className="text-xs text-slate-400 max-w-xs font-semibold leading-relaxed">
                This dashboard settings directory is secured under simulate protocols. Your delivery coordinates, card credentials, and loyalty rewards points are verified safe.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
