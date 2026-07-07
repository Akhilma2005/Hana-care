import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { faqData } from '../data/products';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full">Help Center</span>
        <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">Frequently Asked Questions</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Find answers to popular questions about our organic cotton pads, deliveries, and customized subscriptions.</p>
      </div>

      {/* Accordion FAQ Grid */}
      <div className="flex flex-col gap-3.5 text-left mb-16">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-primary shadow-md' : 'border-rose-100/60 shadow-sm'
              }`}
            >
              {/* Question Click bar */}
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full py-4.5 px-5 flex items-center justify-between gap-4 font-outfit text-sm font-bold text-slate-800 hover:text-primary transition-colors text-left focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className={`w-4.5 h-4.5 shrink-0 ${isOpen ? 'text-primary' : 'text-slate-400'}`} />
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {/* Answer expanded area */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? 'max-h-60 border-t border-rose-50' : 'max-h-0'
                }`}
              >
                <p className="p-5 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium bg-rose-50/5">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Support Box */}
      <section className="bg-gradient-to-br from-[#FFF5F7] to-[#FAF3F7] border border-rose-100 rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center gap-4">
        <MessageCircle className="w-10 h-10 text-primary" />
        <div className="flex flex-col gap-1.5">
          <h3 className="font-outfit font-extrabold text-slate-800 text-lg">Still have questions?</h3>
          <p className="text-slate-400 text-xs font-semibold max-w-sm">Connect with our support team directly. We are available to help you configure custom menstrual boxes or resolve cycle calculations details.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-md justify-center">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Support
          </a>
          <a
            href="mailto:support@haanacare.com"
            className="flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold text-primary bg-white border border-rose-200 hover:bg-rose-50/30 rounded-xl shadow-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
        </div>
      </section>
    </div>
  );
}
