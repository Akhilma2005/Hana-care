import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Wind, Droplets } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/shop');
  };

  const features = [
    { icon: <Sparkles className="w-5 h-5 text-primary" />, title: "Rash Free", desc: "Dermatologically Tested" },
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: "100% Safe", desc: "FDA Approved" },
    { icon: <Droplets className="w-5 h-5 text-primary" />, title: "Leak Lock", desc: "Up to 12hr Protection" },
    { icon: <Heart className="w-5 h-5 text-primary" />, title: "Ultra Thin", desc: "Extra Comfort" },
    { icon: <Wind className="w-5 h-5 text-primary" />, title: "Odour Control", desc: "Stay Fresh All Day" }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FFF9FA] to-[#FAF3F7] py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Decorative Blur Background Circles */}
      <div className="absolute top-1/4 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-secondary/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copywriting content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-light border border-primary/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span className="text-primary font-outfit text-xs font-semibold uppercase tracking-wider">Comfort. Safety. Confidence.</span>
          </div>

          {/* Main Title */}
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Feel <span className="bg-gradient-to-r from-primary via-primary-hover to-secondary bg-clip-text text-transparent">Fresh</span>.<br />
            Feel <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Protected</span>.<br />
            Every Day.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
            Haana Care gives you the premium comfort and leakage protection you deserve, made with 100% certified organic cotton. Move freely, sleep soundly, and live limitlessly.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto mt-2">
            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/shop?category=Combo%20Packs')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-primary bg-white border border-primary/30 rounded-full hover:bg-rose-50/50 active:scale-[0.98] transition-all"
            >
              Subscribe & Save 15%
            </button>
          </div>
        </div>

        {/* Right Column: Premium Mock Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Trust Badge */}
          <div className="absolute top-4 left-4 sm:-left-4 bg-white/90 backdrop-blur-sm border border-rose-100 shadow-md p-3.5 rounded-2xl flex flex-col items-center justify-center -rotate-6 z-20">
            <span className="text-[10px] uppercase font-bold text-slate-400">India's</span>
            <span className="text-primary font-outfit text-sm font-extrabold">Trusted</span>
            <span className="text-[11px] font-medium text-slate-500">Menstrual Care</span>
            <span className="text-[10px] font-semibold text-secondary">Brand</span>
          </div>

          {/* Wrapper container with pink circle */}
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/10 via-primary-light to-secondary/10 flex items-center justify-center relative p-6">
            
            {/* Inner layered pad container simulation */}
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-white shadow-2xl border border-rose-50 flex flex-col justify-center items-center p-6 text-center animate-pulse duration-[3000ms]">
              <span className="font-outfit text-slate-300 text-[10px] uppercase tracking-widest font-bold">Haana Care</span>
              
              <div className="my-3 w-16 h-28 bg-gradient-to-t from-primary/50 to-primary/80 rounded-2xl flex items-center justify-center text-white relative shadow-lg overflow-hidden">
                <div className="absolute w-8 h-20 border border-white/20 rounded-full opacity-60"></div>
                <span className="font-outfit text-xs font-black tracking-widest rotate-90 whitespace-nowrap">HAANA</span>
              </div>

              <span className="font-outfit text-sm font-bold text-slate-700">Ultra Soft Regular</span>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[140px]">Organic Cotton Top Sheet • 240mm</p>
            </div>
            
            {/* Secondary Floating package simulation */}
            <div className="absolute bottom-4 right-0 bg-white/90 backdrop-blur-sm border border-purple-100 shadow-lg p-3 rounded-xl flex items-center gap-2 max-w-[180px] rotate-6 z-10">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white font-bold text-[10px]">320</div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-700">Overnight Pads</span>
                <span className="text-[9px] text-slate-400">Leak Lock Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Icons bar */}
      <div className="max-w-7xl mx-auto border-t border-rose-100/50 mt-16 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 justify-items-center">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2 max-w-[160px] p-2 hover:translate-y-[-2px] transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shadow-sm">
                {feat.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-bold text-slate-800 text-xs sm:text-sm">{feat.title}</span>
                <span className="text-[10px] text-slate-400 font-medium">{feat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
