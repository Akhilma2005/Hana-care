import React, { useMemo, useState, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  LayoutGrid,
  Lock,
  LogOut,
  MessageSquareQuote,
  Package,
  PencilLine,
  Trash2,
  Plus,
  Send,
  ShoppingBag,
  TicketPercent,
  TrendingUp,
  Users,
} from 'lucide-react';

const ADMIN_EMAIL = '1';
const ADMIN_PASS = '1';

const adminNav = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'coupons', label: 'Coupons', icon: TicketPercent },
  { id: 'inventory', label: 'Inventory', icon: Boxes },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'reviews', label: 'Reviews', icon: MessageSquareQuote },
  { id: 'communications', label: 'Emails/SMS', icon: Send },
];

const initialOrders = [];
const initialCustomers = [];
const initialCoupons = [];
const initialReviews = [];

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      onLogin();
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFE] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-rose-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="rounded-2xl bg-primary/10 p-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">Admin Login</h1>
          <p className="text-sm text-slate-500">Hana Care Control Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-600">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter admin email"
              required
            />
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Password
            <div className="relative mt-1">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full rounded-xl border border-rose-100 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

          <button type="submit" className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === 'true');
  const handleLogin = () => { sessionStorage.setItem('admin_authed', 'true'); setAuthed(true); };
  const handleLogout = () => { sessionStorage.removeItem('admin_authed'); setAuthed(false); };
  const [activeSection, setActiveSection] = useState('overview');

  const blankForm = { id: null, name: '', shortName: '', category: 'Sanitary Pads', price: '', originalPrice: '', stock: '', size: '', absorbency: 'Medium', absorbencyLabel: 'Medium Flow', droplets: '3', badge: 'New', description: '', features: '', howToUse: '', ingredients: '', image: '', images: [] };
  const [productForm, setProductForm] = useState(blankForm);
  const mainImgRef = useRef();
  const galleryImgRef = useRef();

  const set = (field) => (e) => setProductForm(f => ({ ...f, [field]: e.target.value }));

  const handleMainImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setProductForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleGalleryImgs = (e) => {
    Array.from(e.target.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setProductForm(f => ({ ...f, images: [...f.images, ev.target.result] }));
      reader.readAsDataURL(file);
    });
  };

  const summaryCards = useMemo(() => [
    { label: 'Today Orders', value: initialOrders.length || '—', accent: 'from-primary/15 to-primary/5', icon: ShoppingBag },
    { label: 'Revenue', value: initialOrders.length ? `₹${initialOrders.reduce((s, o) => s + o.total, 0)}` : '—', accent: 'from-secondary/15 to-secondary/5', icon: TrendingUp },
    { label: 'Active Customers', value: initialCustomers.length || '—', accent: 'from-emerald-500/15 to-emerald-500/5', icon: Users },
    { label: 'Catalog Products', value: products.length || '—', accent: 'from-amber-400/15 to-amber-400/5', icon: AlertTriangle },
  ], [products.length]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;
    const payload = {
      ...productForm,
      features: productForm.features ? productForm.features.split('\n').filter(Boolean) : [],
      price: Number(productForm.price) || 0,
      originalPrice: Number(productForm.originalPrice) || Number(productForm.price) || 0,
      stock: Number(productForm.stock) || 0,
      droplets: Number(productForm.droplets) || 3,
    };
    if (productForm.id) {
      updateProduct(productForm.id, payload);
    } else {
      addProduct(payload);
    }
    setProductForm(blankForm);
  };

  const handleEditProduct = (p) => {
    setProductForm({ ...blankForm, ...p, features: Array.isArray(p.features) ? p.features.join('\n') : (p.features || ''), images: p.images || [] });
    setActiveSection('products');
  };

  const handleDeleteProduct = (id) => deleteProduct(id);

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Product Management</p>
                  <h3 className="text-lg font-semibold text-slate-800">{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>
                </div>
                {productForm.id && <button type="button" onClick={() => setProductForm(blankForm)} className="rounded-full border border-rose-100 px-3 py-1.5 text-xs font-semibold text-slate-500">+ New</button>}
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-600 col-span-2">
                    Product Name *
                    <input value={productForm.name} onChange={set('name')} required className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="e.g. Hana Care Regular Pads" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Short Name
                    <input value={productForm.shortName} onChange={set('shortName')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="e.g. Regular Pads" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Category *
                    <select value={productForm.category} onChange={set('category')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm">
                      <option>Sanitary Pads</option>
                      <option>Panty Liners</option>
                      <option>Maternity Pads</option>
                      <option>Organic Pads</option>
                      <option>Menstrual Cups</option>
                      <option>Tampons</option>
                      <option>Feminine Wash</option>
                      <option>Combo Packs</option>
                    </select>
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Price (₹) *
                    <input type="number" value={productForm.price} onChange={set('price')} required className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="149" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Original / MRP (₹)
                    <input type="number" value={productForm.originalPrice} onChange={set('originalPrice')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="199" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Stock Quantity
                    <input type="number" value={productForm.stock} onChange={set('stock')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="50" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Absorbency
                    <select value={productForm.absorbency} onChange={set('absorbency')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm">
                      <option>Light</option>
                      <option>Medium</option>
                      <option>Heavy</option>
                      <option>Overnight</option>
                      <option>Ultra</option>
                    </select>
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Absorbency Label
                    <input value={productForm.absorbencyLabel} onChange={set('absorbencyLabel')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="Medium Flow" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Droplets (1–6)
                    <input type="number" min="1" max="6" step="0.5" value={productForm.droplets} onChange={set('droplets')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" />
                  </label>
                  <label className="text-sm font-medium text-slate-600">
                    Badge
                    <input value={productForm.badge} onChange={set('badge')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm" placeholder="Bestseller" />
                  </label>
                </div>

                <label className="text-sm font-medium text-slate-600 block">
                  Description
                  <textarea rows={3} value={productForm.description} onChange={set('description')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm resize-none" placeholder="Product description..." />
                </label>
                <label className="text-sm font-medium text-slate-600 block">
                  Features (one per line)
                  <textarea rows={3} value={productForm.features} onChange={set('features')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm resize-none" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
                </label>
                <label className="text-sm font-medium text-slate-600 block">
                  How To Use
                  <textarea rows={2} value={productForm.howToUse} onChange={set('howToUse')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm resize-none" placeholder="Usage instructions..." />
                </label>
                <label className="text-sm font-medium text-slate-600 block">
                  Ingredients / Materials
                  <textarea rows={2} value={productForm.ingredients} onChange={set('ingredients')} className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 text-sm resize-none" placeholder="Organic cotton, ..." />
                </label>

                {/* Main Image Upload */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-slate-600">Main Image (shown on product card)</p>
                  <div className="flex items-center gap-3">
                    {productForm.image && <img src={productForm.image} className="w-16 h-16 rounded-xl object-cover border border-rose-100" />}
                    <button type="button" onClick={() => mainImgRef.current.click()} className="rounded-xl border border-dashed border-rose-200 px-4 py-2 text-xs font-semibold text-primary hover:bg-rose-50">
                      {productForm.image ? 'Change Main Image' : '+ Upload Main Image'}
                    </button>
                    <input ref={mainImgRef} type="file" accept="image/*" className="hidden" onChange={handleMainImg} />
                  </div>
                </div>

                {/* Gallery Images Upload */}
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-slate-600">Gallery Images (shown in product detail slider)</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {productForm.images.map((src, i) => (
                      <div key={i} className="relative">
                        <img src={src} className="w-14 h-14 rounded-xl object-cover border border-rose-100" />
                        <button type="button" onClick={() => setProductForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">×</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => galleryImgRef.current.click()} className="rounded-xl border border-dashed border-rose-200 px-4 py-2 text-xs font-semibold text-primary hover:bg-rose-50">
                      + Add Gallery Images
                    </button>
                    <input ref={galleryImgRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryImgs} />
                  </div>
                </div>

                <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white">
                  {productForm.id ? 'Update Product' : 'Save Product'}
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Current Catalog ({products.length})</h3>
              {products.length === 0 ? (
                <p className="text-sm text-slate-400">No products added yet.</p>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {products.map((product) => (
                    <div key={product.id} className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {product.image && <img src={product.image} className="w-10 h-10 rounded-lg object-cover border border-rose-100 shrink-0" />}
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.category} • ₹{product.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => handleEditProduct(product)} className="rounded-full bg-rose-50 p-2 text-primary">
                            <PencilLine className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="rounded-full bg-red-50 p-2 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>Stock: {product.stock ?? '—'}</span>
                        <span className={`rounded-full px-2 py-0.5 font-semibold ${ (product.stock ?? 99) > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {(product.stock ?? 99) > 10 ? 'Live' : 'Low Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        );
      case 'orders':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Order Management</p>
                <h3 className="text-lg font-semibold text-slate-800">Track, update, and export customer orders</h3>
              </div>
              <button className="rounded-full border border-rose-100 px-3 py-2 text-sm font-semibold text-slate-600">Export Orders</button>
            </div>
            <div className="overflow-x-auto">
              {initialOrders.length === 0 ? (
                <p className="text-sm text-slate-400">No orders yet.</p>
              ) : (
                <table className="min-w-full text-left text-sm text-slate-600">
                  <thead>
                    <tr className="border-b border-rose-100 text-xs uppercase tracking-wide text-slate-400">
                      <th className="py-3">Order</th>
                      <th className="py-3">Customer</th>
                      <th className="py-3">Total</th>
                      <th className="py-3">Payment</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialOrders.map((order) => (
                      <tr key={order.id} className="border-b border-rose-50 last:border-b-0">
                        <td className="py-3 font-semibold text-slate-800">{order.id}</td>
                        <td className="py-3">{order.customer}</td>
                        <td className="py-3">₹{order.total}</td>
                        <td className="py-3">{order.channel}</td>
                        <td className="py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        );
      case 'customers':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Customer Management</p>
                <h3 className="text-lg font-semibold text-slate-800">View customer segments and lifetime value</h3>
              </div>
              <button className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white">Create Segment</button>
            </div>
            {initialCustomers.length === 0 ? (
              <p className="text-sm text-slate-400">No customers yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {initialCustomers.map((customer) => (
                  <div key={customer.id} className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                    <p className="font-semibold text-slate-800">{customer.name}</p>
                    <p className="mt-1 text-sm text-slate-500">Segment: {customer.segment}</p>
                    <p className="mt-2 text-sm text-slate-500">Orders: {customer.orders}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">Lifetime spend: ₹{customer.spend}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      case 'coupons':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Coupon Management</p>
                <h3 className="text-lg font-semibold text-slate-800">Create and monitor promotional offers</h3>
              </div>
              <button className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white">New Coupon</button>
            </div>
            {initialCoupons.length === 0 ? (
              <p className="text-sm text-slate-400">No coupons created yet.</p>
            ) : (
              <div className="space-y-3">
                {initialCoupons.map((coupon) => (
                  <div key={coupon.code} className="flex items-center justify-between rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                    <div>
                      <p className="font-semibold text-slate-800">{coupon.code}</p>
                      <p className="text-sm text-slate-500">Discount: {coupon.discount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Used {coupon.usage} times</p>
                      <p className={`text-sm font-semibold ${coupon.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>{coupon.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      case 'inventory':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Inventory Control</p>
                <h3 className="text-lg font-semibold text-slate-800">Track stock health and reordering needs</h3>
              </div>
              <button className="rounded-full border border-rose-100 px-3 py-2 text-sm font-semibold text-slate-600">Reorder Report</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <div key={product.id} className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">{product.name}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.stock < 10 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{product.stock} units</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{product.stock < 10 ? 'Restock recommended' : 'Healthy stock level'}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'reports':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Reports & Analytics</p>
                <h3 className="text-lg font-semibold text-slate-800">View sales trends and download business reports</h3>
              </div>
              <button className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white">Export Report</button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                <p className="text-sm text-slate-500">Weekly Sales</p>
                <p className="mt-2 text-2xl font-semibold text-slate-800">—</p>
              </div>
              <div className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                <p className="text-sm text-slate-500">Top Category</p>
                <p className="mt-2 text-2xl font-semibold text-slate-800">—</p>
              </div>
              <div className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                <p className="text-sm text-slate-500">Return Rate</p>
                <p className="mt-2 text-2xl font-semibold text-slate-800">—</p>
              </div>
            </div>
          </section>
        );
      case 'reviews':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Review Management</p>
                <h3 className="text-lg font-semibold text-slate-800">Monitor product feedback and approve reviews</h3>
              </div>
            </div>
            {initialReviews.length === 0 ? (
              <p className="text-sm text-slate-400">No reviews submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {initialReviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">{review.customer}</p>
                        <p className="text-sm text-slate-500">{review.product}</p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-600">★ {review.rating}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{review.text}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className={`font-semibold ${review.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'}`}>{review.status}</span>
                      <button className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      case 'communications':
        return (
          <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Communication Center</p>
                <h3 className="text-lg font-semibold text-slate-800">Send promotional emails and SMS campaigns</h3>
              </div>
              <button className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white">Compose Message</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                <p className="font-semibold text-slate-800">Email Campaign</p>
                <p className="mt-2 text-sm text-slate-500">Launch a reminder or offer email to your active customers.</p>
                <button className="mt-4 rounded-full border border-rose-100 px-3 py-2 text-sm font-semibold text-slate-600">Send Email</button>
              </div>
              <div className="rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                <p className="font-semibold text-slate-800">SMS Campaign</p>
                <p className="mt-2 text-sm text-slate-500">Notify customers about dispatch, offers, or restocks instantly.</p>
                <button className="mt-4 rounded-full border border-rose-100 px-3 py-2 text-sm font-semibold text-slate-600">Send SMS</button>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className={`rounded-3xl border border-rose-100 bg-gradient-to-br ${card.accent} p-5 shadow-sm`}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-600">{card.label}</p>
                      <div className="rounded-2xl bg-white/80 p-2">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <p className="mt-4 text-2xl font-semibold text-slate-800">{card.value}</p>
                  </div>
                );
              })}
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">Live Overview</p>
                    <h3 className="text-lg font-semibold text-slate-800">Recent orders and operational health</h3>
                  </div>
                  <button className="rounded-full border border-rose-100 px-3 py-2 text-sm font-semibold text-slate-600">View Reports</button>
                </div>
                <div className="space-y-3">
                  {initialOrders.length === 0 ? (
                    <p className="text-sm text-slate-400">No recent orders.</p>
                  ) : initialOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between rounded-2xl border border-rose-50 bg-[#FFFDFE] p-4">
                      <div>
                        <p className="font-semibold text-slate-800">{order.id}</p>
                        <p className="text-sm text-slate-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">₹{order.total}</p>
                        <p className="text-sm text-primary">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">Quick Actions</p>
                    <h3 className="text-lg font-semibold text-slate-800">Core admin tasks</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Add/Edit Products', description: 'Manage catalog and pricing' },
                    { title: 'Manage Orders', description: 'Update status and shipping' },
                    { title: 'Manage Coupons', description: 'Launch discount campaigns' },
                    { title: 'Send Emails/SMS', description: 'Drive engagement quickly' },
                  ].map((item) => (
                    <button key={item.title} onClick={() => setActiveSection(item.title.toLowerCase().includes('product') ? 'products' : item.title.toLowerCase().includes('order') ? 'orders' : item.title.toLowerCase().includes('coupon') ? 'coupons' : 'communications')} className="flex w-full items-center justify-between rounded-2xl border border-rose-50 bg-[#FFFDFE] px-4 py-3 text-left">
                      <div>
                        <p className="font-semibold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
    }
  };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#FFFDFE]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[32px] border border-rose-100 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Hana Care Admin</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Control center for storefront operations</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Manage products, orders, customers, coupons, inventory, reports, reviews, and communication from one place.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                <Eye className="h-4 w-4 text-primary" />
                Live store monitoring
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-500 hover:border-red-100 transition-colors">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Admin Menu</p>
            <div className="space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveSection(item.id)} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition ${active ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
