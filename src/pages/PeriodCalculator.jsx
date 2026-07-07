import React, { useState } from 'react';
import { Calendar, Clock, Heart, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PeriodCalculator() {
  const { periodInfo, updatePeriodInfo, getCalculatedCycle } = useCart();

  // Local state initialized with context values
  const [lastPeriodDate, setLastPeriodDate] = useState(periodInfo.lastPeriodDate);
  const [cycleLength, setCycleLength] = useState(periodInfo.cycleLength);
  const [periodLength, setPeriodLength] = useState(periodInfo.periodLength);

  const [saved, setSaved] = useState(false);
  const [calculated, setCalculated] = useState(true); // show by default

  const handleCalculate = (e) => {
    e.preventDefault();
    updatePeriodInfo({
      lastPeriodDate,
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength)
    });
    setCalculated(true);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const { nextPeriod, ovulation, fertileWindow, safeDays } = getCalculatedCycle();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Period Calculator</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">Period Calculator</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Get accurate predictions about your upcoming cycles, fertile windows, and ovulation days.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <form onSubmit={handleCalculate} className="lg:col-span-6 bg-white border border-rose-50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-5 text-left">
          <h3 className="font-outfit font-bold text-slate-800 text-lg border-b border-rose-50 pb-3">Enter Cycle Details</h3>

          {/* Last Period Date */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              Last Period Start Date
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-700 font-semibold"
            />
          </div>

          {/* Cycle Length Range */}
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                Average Cycle Length
              </label>
              <span className="text-xs font-bold text-primary">{cycleLength} Days</span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>Short (20 days)</span>
              <span>Long (45 days)</span>
            </div>
          </div>

          {/* Period Length Range */}
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-primary" />
                Period Length (Duration)
              </label>
              <span className="text-xs font-bold text-primary">{periodLength} Days</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              value={periodLength}
              onChange={(e) => setPeriodLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>Short (3 days)</span>
              <span>Long (10 days)</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 active:scale-[0.98] transition-all mt-3"
          >
            Calculate Predictions
          </button>
        </form>

        {/* Right Column: Result Cards */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {calculated ? (
            <div className="bg-gradient-to-br from-[#FFF8FA] via-[#FAF3F7] to-[#F5EFF6] border border-rose-100/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left animate-fade-in">
              <h3 className="font-outfit font-extrabold text-slate-800 text-lg flex items-center gap-1.5 border-b border-rose-100 pb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                Your Next Cycle Predictions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Next Period Date Card */}
                <div className="bg-white p-5 border border-rose-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Next Period Start</span>
                  <span className="font-outfit text-base font-extrabold text-primary">{nextPeriod}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">Keep your pads ready!</span>
                </div>

                {/* Ovulation Date Card */}
                <div className="bg-white p-5 border border-rose-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Ovulation</span>
                  <span className="font-outfit text-base font-extrabold text-secondary">{ovulation}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">Approximate peak fertility day.</span>
                </div>

                {/* Fertile Window Card */}
                <div className="bg-white p-5 border border-rose-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Fertile Window</span>
                  <span className="font-outfit text-base font-extrabold text-slate-800">{fertileWindow}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">Highest chance of conception.</span>
                </div>

                {/* Safe Days Card */}
                <div className="bg-white p-5 border border-rose-50 rounded-2xl flex flex-col gap-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Safe Days (Safe Time)</span>
                  <span className="font-outfit text-base font-extrabold text-emerald-600">{safeDays}</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">Lowest chance of conception.</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handleSave}
                disabled={saved}
                className={`w-full py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98] ${
                  saved
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-secondary text-white hover:bg-secondary-dark'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Predictions Synced to Account!
                  </>
                ) : (
                  <>
                    Save & Set Reminder
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white border border-rose-50 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center gap-4 min-h-[300px]">
              <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                <Heart className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-slate-400 text-sm max-w-xs font-medium">Input your last cycle details on the left to compute next ovulation windows.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
