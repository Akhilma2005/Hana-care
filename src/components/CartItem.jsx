import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, orderType } = item;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-rose-50/50 font-sans">
      
      {/* Top row: image + name */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-16 h-16 rounded-xl bg-[#FAF6F7] p-2 flex items-center justify-center shrink-0 shadow-sm border border-rose-100/30 overflow-hidden">
          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <h4 className="font-outfit font-bold text-slate-800 text-sm truncate">{product.name}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            <p className="text-xs text-slate-400 font-medium">Size: <span className="text-slate-600 font-bold">{size}</span></p>
            {orderType === 'subscribe' && (
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-secondary text-white font-extrabold uppercase tracking-wide shadow-sm inline-flex items-center gap-0.5">🔄 Subscribed</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row: price + qty + total + remove */}
      <div className="flex items-center justify-between gap-3 sm:gap-6 shrink-0">
        <span className="text-sm font-bold text-slate-700 min-w-[50px]">₹{product.price}</span>

        <div className="flex items-center border border-rose-100 rounded-full bg-white px-1 py-0.5">
          <button onClick={() => updateQuantity(product.id, size, -1, orderType)} disabled={quantity <= 1} className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-primary hover:bg-rose-50/50 disabled:opacity-40 transition-all">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-slate-700 font-mono">{quantity}</span>
          <button onClick={() => updateQuantity(product.id, size, 1, orderType)} className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-primary hover:bg-rose-50/50 transition-all">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-sm font-outfit font-extrabold text-slate-900 min-w-[60px] text-right">₹{product.price * quantity}</span>

        <button onClick={() => removeFromCart(product.id, size, orderType)} className="text-slate-400 hover:text-primary p-2 rounded-full hover:bg-rose-50/50 transition-all" title="Remove item">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
