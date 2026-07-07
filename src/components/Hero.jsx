import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Wind, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    { icon: <Sparkles className="w-5 h-5 text-primary" />, title: 'Rash Free',     desc: 'Dermatologically Tested' },
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: '100% Safe',  desc: 'FDA Approved' },
    { icon: <Droplets className="w-5 h-5 text-primary" />, title: 'Leak Lock',     desc: 'Up to 12hr Protection' },
    { icon: <Heart className="w-5 h-5 text-primary" />, title: 'Ultra Thin',       desc: 'Extra Comfort' },
    { icon: <Wind className="w-5 h-5 text-primary" />, title: 'Odour Control',     desc: 'Stay Fresh All Day' },
  ];

  const slides = [
    {
      image: '/hero-girl.jpg',
      bgColor: 'bg-[#FFF0F4]',
      gradientColor: '#FFF0F4',
      gradientOverlay: 'linear-gradient(to right, #FFF0F4 0%, #FFF0F4 40%, rgba(255,240,244,0.85) 55%, rgba(255,240,244,0) 75%)',
      mobileGradient: 'linear-gradient(to top, #FFF0F4 0%, rgba(255,240,244,0.95) 45%, rgba(255,240,244,0.6) 65%, rgba(255,240,244,0.1) 85%, transparent 100%)',
      title: (
        <>
          Feel <span className="bg-gradient-to-r from-primary to-[#c0245a] bg-clip-text text-transparent">Fresh</span>.<br />
          Feel <span className="bg-gradient-to-r from-[#c0245a] to-primary bg-clip-text text-transparent">Protected</span>.<br />
          Every Day.
        </>
      ),
      description: "Hana Care gives you the comfort and protection you deserve, so you can focus on living your best life.",
      badgeText: "Comfort. Safety. Confidence.",
      badgeColor: "text-primary border-primary/20",
      buttonPrimaryBg: "bg-primary hover:bg-primary-hover shadow-primary/30",
      buttonSecondaryText: "text-primary border-primary/30",
    },
    {
      image: '/green-hero.jpg',
      bgColor: 'bg-[#EBF7F2]',
      gradientColor: '#EBF7F2',
      gradientOverlay: 'linear-gradient(to right, #EBF7F2 0%, #EBF7F2 40%, rgba(235,247,242,0.85) 55%, rgba(235,247,242,0) 75%)',
      mobileGradient: 'linear-gradient(to top, #EBF7F2 0%, rgba(235,247,242,0.95) 45%, rgba(235,247,242,0.6) 65%, rgba(235,247,242,0.1) 85%, transparent 100%)',
      title: (
        <>
          100% Certified<br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Organic Cotton</span><br />
          Sanitary Pads.
        </>
      ),
      description: "Breathable, rash-free protection designed with non-toxic, sustainable materials for your ultimate skin health.",
      badgeText: "Pure. Natural. Biodegradable.",
      badgeColor: "text-emerald-700 border-emerald-500/20",
      buttonPrimaryBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30",
      buttonSecondaryText: "text-emerald-700 border-emerald-600/30",
    },
    {
      image: '/blue-hero.jpg',
      bgColor: 'bg-[#EBF1F7]',
      gradientColor: '#EBF1F7',
      gradientOverlay: 'linear-gradient(to right, #EBF1F7 0%, #EBF1F7 40%, rgba(235,241,247,0.85) 55%, rgba(235,241,247,0) 75%)',
      mobileGradient: 'linear-gradient(to top, #EBF1F7 0%, rgba(235,241,247,0.95) 45%, rgba(235,241,247,0.6) 65%, rgba(235,241,247,0.1) 85%, transparent 100%)',
      title: (
        <>
          Ultimate Comfort &amp;<br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Leak-Proof Security</span><br />
          For Heavy Flow.
        </>
      ),
      description: "Super-absorbent micro-grids lock moisture away instantly, offering up to 12 hours of dry and worry-free confidence.",
      badgeText: "High Absorbency. 12hr Lock.",
      badgeColor: "text-blue-700 border-blue-500/20",
      buttonPrimaryBg: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30",
      buttonSecondaryText: "text-blue-700 border-blue-600/30",
    },
    {
      image: '/violet-hero.jpg',
      bgColor: 'bg-[#F5EFF6]',
      gradientColor: '#F5EFF6',
      gradientOverlay: 'linear-gradient(to right, #F5EFF6 0%, #F5EFF6 40%, rgba(245,239,246,0.85) 55%, rgba(245,239,246,0) 75%)',
      mobileGradient: 'linear-gradient(to top, #F5EFF6 0%, rgba(245,239,246,0.95) 45%, rgba(245,239,246,0.6) 65%, rgba(245,239,246,0.1) 85%, transparent 100%)',
      title: (
        <>
          12-Hour Protection &amp;<br />
          <span className="bg-gradient-to-r from-secondary to-purple-500 bg-clip-text text-transparent">Peaceful Nights</span><br />
          Without Interruption.
        </>
      ),
      description: "Designed with a 360-degree leak guard and extra-wide back coverage for a restful and comfortable sleep.",
      badgeText: "Overnight Care. Zero Worry.",
      badgeColor: "text-secondary border-secondary/20",
      buttonPrimaryBg: "bg-secondary hover:bg-secondary-dark shadow-secondary/30",
      buttonSecondaryText: "text-secondary border-secondary/30",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full font-sans overflow-hidden group">
      
      {/* ── MOBILE layout (< md) — text overlaid on top of background image ── */}
      <div className="block md:hidden relative w-full h-[520px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col justify-end bg-rose-50 ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt="Hana Care hero"
              className="absolute inset-0 w-full h-full object-cover object-[73%_center] select-none pointer-events-none"
              draggable={false}
            />
            
            {/* Soft overlay gradient from bottom-to-top to ensure text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: slide.mobileGradient }}
            />

            {/* Content Box overlaid at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 pt-20 flex flex-col items-start gap-4">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white border ${slide.badgeColor} rounded-full shadow-sm`}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span className="font-outfit text-xs font-semibold uppercase tracking-wider">{slide.badgeText}</span>
              </div>
              <h1 className="font-outfit text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                {slide.title}
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
                {slide.description}
              </p>
              <div className="flex gap-3 w-full sm:w-auto mt-1">
                <button
                  onClick={() => navigate('/shop')}
                  className={`flex-1 sm:flex-initial px-7 py-3 text-sm font-bold text-white ${slide.buttonPrimaryBg} rounded-full active:scale-[0.98] transition-all text-center`}
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate('/shop?category=Combo%20Packs')}
                  className={`flex-1 sm:flex-initial px-7 py-3 text-sm font-bold bg-white border ${slide.buttonSecondaryText} rounded-full active:scale-[0.98] transition-all text-center`}
                >
                  Subscribe &amp; Save 15%
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Floating badge for mobile */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-center bg-white/90 backdrop-blur-sm border border-rose-100 shadow-md px-3 py-1.5 rounded-xl text-center -rotate-6 scale-90">
          <span className="text-[8px] uppercase font-bold text-slate-400 leading-tight">India's</span>
          <span className="text-primary font-outfit text-xs font-extrabold leading-tight">Trusted</span>
          <span className="text-[9px] font-semibold text-slate-500 leading-tight">Menstrual Care</span>
          <span className="text-[8px] font-bold text-secondary leading-tight">Brand</span>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === idx ? 'bg-primary w-5' : 'bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout (md+) — full-width background with image on the right ── */}
      <div className="hidden md:block relative w-full min-h-[480px] lg:min-h-[560px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${slide.bgColor} ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Right aligned image that is fully contained */}
            <div className="absolute right-0 top-0 bottom-0 w-[55%] h-full flex justify-end">
              <img
                src={slide.image}
                alt="Hana Care hero – woman holding Hana Care product"
                className="h-full w-auto object-contain object-right select-none pointer-events-none"
                draggable={false}
              />
            </div>
            
            {/* Soft overlay gradient to blend left side text area with the image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: slide.gradientOverlay }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-10 lg:px-14 flex items-center w-full">
              <div className="flex flex-col items-start gap-5 max-w-lg">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm border ${slide.badgeColor} rounded-full shadow-sm`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span className="font-outfit text-xs font-semibold uppercase tracking-wider">{slide.badgeText}</span>
                </div>
                <h1 className="font-outfit text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
                  {slide.title}
                </h1>
                <p className="text-slate-600 text-[15px] leading-relaxed max-w-sm font-medium">
                  {slide.description}
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => navigate('/shop')}
                    className={`px-8 py-3 text-sm font-bold text-white ${slide.buttonPrimaryBg} rounded-full active:scale-[0.98] transition-all`}
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => navigate('/shop?category=Combo%20Packs')}
                    className={`px-8 py-3 text-sm font-bold bg-white/90 backdrop-blur-sm border ${slide.buttonSecondaryText} rounded-full active:scale-[0.98] transition-all`}
                  >
                    Subscribe &amp; Save 15%
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating badge for desktop */}
        <div className="absolute top-8 right-12 lg:right-24 z-20 flex flex-col items-center bg-white/90 backdrop-blur-sm border border-rose-200 shadow-xl px-4 py-3 rounded-2xl text-center -rotate-6">
          <span className="text-[10px] uppercase font-bold text-slate-400 leading-tight">India's</span>
          <span className="text-primary font-outfit text-sm font-extrabold leading-tight">Trusted</span>
          <span className="text-[11px] font-semibold text-slate-500 leading-tight">Menstrual Care</span>
          <span className="text-[10px] font-bold text-secondary leading-tight">Brand</span>
        </div>

        {/* Slide navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white text-slate-700 hover:text-primary backdrop-blur-sm rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer border border-rose-50"
          title="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white text-slate-700 hover:text-primary backdrop-blur-sm rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer border border-rose-50"
          title="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx ? 'bg-primary w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ─── Bottom Feature Bar ─── */}
      <div className="bg-white border-t border-rose-100 relative z-20">
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
