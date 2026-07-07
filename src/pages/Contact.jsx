import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, Check } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-light px-3 py-1 rounded-full">Get In Touch</span>
        <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-outfit">Contact Hana Care</h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">Have a question about our products or your subscription? Reach out to us, and our team will get back to you shortly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#FAF7F8] border border-rose-100 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
            <h3 className="font-outfit font-extrabold text-slate-800 text-lg border-b border-rose-100 pb-3">Contact Information</h3>
            
            <div className="flex flex-col gap-5">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Call Us</span>
                  <span className="text-sm font-bold text-slate-700 mt-0.5">+91 98765 43210</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Email Support</span>
                  <span className="text-sm font-bold text-slate-700 mt-0.5 break-all">support@hanacare.com</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Our Office</span>
                  <span className="text-sm font-bold text-slate-700 mt-0.5">102, Innovation Hub, Outer Ring Road, Bengaluru, 560103</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Working Hours</span>
                  <span className="text-sm font-bold text-slate-700 mt-0.5">Monday - Saturday: 10:00 AM - 07:00 PM</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 bg-white border border-rose-50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-4">
          <h3 className="font-outfit font-extrabold text-slate-800 text-lg border-b border-rose-50 pb-2">Send Us a Message</h3>
          
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 animate-fade-in my-6">
              <div className="w-12 h-12 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-emerald-500 animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">Message Sent Successfully!</span>
                <p className="text-xs opacity-85">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="Enter your email"
                    className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Message</label>
                <textarea
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  placeholder="Type your question or feedback..."
                  className="px-4 py-2.5 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white text-slate-800 font-semibold transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 active:scale-[0.98] transition-all mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
