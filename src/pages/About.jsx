import React from 'react';
import { ShieldCheck, Heart, Sparkles, Feather, Compass, CheckCircle } from 'lucide-react';

export default function About() {
  const safetyList = [
    "100% certified organic cotton topsheet",
    "Hypoallergenic and dermatologically tested to prevent vaginal rashes",
    "Free from chlorine bleaching, artificial fragrances, dyes, or wood fillers",
    "Highly flexible wing adhesion keeps pads in position securely",
    "Microporous bottom layers encourage optimal aeration to eliminate heat"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full">Our Story</span>
        <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">About Haana Care</h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">We are committed to redrawing the parameters of feminine hygiene care with 100% skin-safe, rash-free, and natural organic materials.</p>
      </div>

      {/* Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 text-left">
        <div className="flex flex-col gap-5 leading-relaxed text-sm text-slate-600 font-medium">
          <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight border-l-4 border-primary pl-4 py-1">How We Started</h2>
          <p>
            Haana Care was conceptualized by women who were fatigued by the recurring discomforts of conventional sanitary pads. Plastic top-sheets, toxic adhesives, and chlorine-bleached fibers regularly caused skin rashes, friction irritation, and moisture blockages.
          </p>
          <p>
            We realized that menstrual care shouldn't come at the cost of skin health or comfort. By combining scientific absorbent grids with 100% organic cotton layers, we crafted a pad that keeps you dry and fresh, while remaining fully breathable and kind to sensitive skin.
          </p>
        </div>

        {/* Visual Graphics box simulation */}
        <div className="bg-gradient-to-br from-primary-light/50 to-secondary-light/50 p-8 rounded-3xl border border-rose-100 flex flex-col justify-center items-center text-center gap-4 relative overflow-hidden min-h-[300px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 rounded-full blur-2xl -z-10"></div>
          <Heart className="w-12 h-12 text-primary animate-pulse" />
          <h3 className="font-outfit font-extrabold text-slate-800 text-lg">Our Core Value</h3>
          <p className="text-xs text-slate-500 max-w-xs font-semibold leading-relaxed">
            "We believe period protection should be absolute and comfortable. Zero leaks, zero irritation, and zero chemicals."
          </p>
        </div>
      </div>

      {/* Safety standards check list */}
      <section className="bg-gradient-to-b from-[#FAF7F8] to-[#F5EFF6] p-8 sm:p-12 rounded-3xl border border-rose-100/50 mb-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Scientific Safety</span>
            <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">Our Quality Benchmarks</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Every pad is engineered using eco-friendly wood pulp and certified organic components. We ensure rigorous quality testing to obtain optimal absorbency without chemical alterations.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3.5 bg-white p-6 sm:p-8 rounded-2xl border border-rose-50 shadow-sm">
            {safetyList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-600">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-8 border-t border-rose-100/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <Feather className="w-5 h-5" />
          </div>
          <h4 className="font-outfit font-bold text-slate-800 text-sm">Hypoallergenic Sheet</h4>
          <p className="text-[11px] text-slate-400 font-semibold max-w-[200px]">Optimal pH balance matches natural intimate chemistry.</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-outfit font-bold text-slate-800 text-sm">Premium Absorbency</h4>
          <p className="text-[11px] text-slate-400 font-semibold max-w-[200px]">Leak Lock micro-grids lock fluid up to 12 hours.</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-outfit font-bold text-slate-800 text-sm">Eco-Conscious</h4>
          <p className="text-[11px] text-slate-400 font-semibold max-w-[200px]">Biodegradable wrappers and paper disposal packaging.</p>
        </div>
      </div>
    </div>
  );
}
