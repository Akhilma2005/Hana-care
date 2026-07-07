import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Wind, Droplets } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const features = [
    { icon: <Sparkles className="w-5 h-5 text-primary" />, title: 'Rash Free',     desc: 'Dermatologically Tested' },
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: '100% Safe',  desc: 'FDA Approved' },
    { icon: <Droplets className="w-5 h-5 text-primary" />, title: 'Leak Lock',     desc: 'Up to 12hr Protection' },
    { icon: <Heart className="w-5 h-5 text-primary" />, title: 'Ultra Thin',       desc: 'Extra Comfort' },
    { icon: <Wind className="w-5 h-5 text-primary" />, title: 'Odour Control',     desc: 'Stay Fresh All Day' },
  ];

  return (
    <section className="relative w-full font-sans overflow-hidden">

      {/* ─────────────────────────────────────────────────────
          HERO BANNER
          The hero image is a wide landscape banner with the
          girl on the right half and soft pink on the left.
          We show the FULL image as the background so colors
          match perfectly, and overlay text on the left.
      ───────────────────────────────────────────────────── */}
      {/* ── MOBILE layout (< md) — image on top, text below ── */}
      <div className="block md:hidden">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src="/home-page.png"
            alt="Hana Care hero"
            className="w-full h-full object-cover object-[70%_top] select-none pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="bg-[#FFF0F4] px-6 py-8 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-primary/20 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span className="text-primary font-outfit text-xs font-semibold uppercase tracking-wider">Comfort. Safety. Confidence.</span>
          </div>
          <h1 className="font-outfit text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Feel <span className="bg-gradient-to-r from-primary to-[#c0245a] bg-clip-text text-transparent">Fresh</span>.<br />
            Feel <span className="bg-gradient-to-r from-[#c0245a] to-primary bg-clip-text text-transparent">Protected</span>.<br />
            Every Day.
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hana Care gives you the comfort and protection you deserve, so you can focus on living your best life.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/shop')}
              className="px-7 py-3 text-sm font-bold text-white bg-primary rounded-full shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/shop?category=Combo%20Packs')}
              className="px-7 py-3 text-sm font-bold text-primary bg-white border border-primary/30 rounded-full active:scale-[0.98] transition-all"
            >
              Subscribe &amp; Save 15%
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (md+) — full-width background image with text overlay ── */}
      <div className="hidden md:block relative w-full min-h-[480px] lg:min-h-[560px]">
        <img
          src="/home-page.png"
          alt="Hana Care hero – woman holding Hana Care product"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] select-none pointer-events-none"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(255,240,244,0.95) 0%, rgba(255,240,244,0.82) 38%, rgba(255,240,244,0.25) 62%, transparent 78%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-10 lg:px-14 flex items-center min-h-[480px] lg:min-h-[560px]">
          <div className="flex flex-col items-start gap-5 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-outfit text-xs font-semibold uppercase tracking-wider">Comfort. Safety. Confidence.</span>
            </div>
            <h1 className="font-outfit text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
              Feel{' '}<span className="bg-gradient-to-r from-primary to-[#c0245a] bg-clip-text text-transparent">Fresh</span>.<br />
              Feel{' '}<span className="bg-gradient-to-r from-[#c0245a] to-primary bg-clip-text text-transparent">Protected</span>.<br />
              Every Day.
            </h1>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-sm">
              Hana Care gives you the comfort and protection you deserve, so you can focus on living your best life.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary-hover shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/shop?category=Combo%20Packs')}
                className="px-8 py-3 text-sm font-bold text-primary bg-white/90 backdrop-blur-sm border border-primary/30 rounded-full hover:bg-white active:scale-[0.98] transition-all"
              >
                Subscribe &amp; Save 15%
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-12 lg:right-24 z-20 flex flex-col items-center bg-white/90 backdrop-blur-sm border border-rose-200 shadow-xl px-4 py-3 rounded-2xl text-center -rotate-6">
          <span className="text-[10px] uppercase font-bold text-slate-400 leading-tight">India's</span>
          <span className="text-primary font-outfit text-sm font-extrabold leading-tight">Trusted</span>
          <span className="text-[11px] font-semibold text-slate-500 leading-tight">Menstrual Care</span>
          <span className="text-[10px] font-bold text-secondary leading-tight">Brand</span>
        </div>
      </div>

      {/* ─── Bottom Feature Bar ─── */}
      <div className="bg-white border-t border-rose-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-2 group cursor-default"
              >
                <div className="w-11 h-11 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary-light group-hover:shadow-md transition-all duration-300">
                  {feat.icon}
                </div>
                <div>
                  <p className="font-outfit font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                    {feat.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
