import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, BookOpen, Clock, User, X } from 'lucide-react';
import { blogPosts } from '../data/products';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Period Guides', 'Hygiene & Health', 'Nutrition & Lifestyle'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-8 text-left">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Health Blog</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-outfit">Hana Care Health Blog</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Your guide to cycle wellness, body hygiene, and positive period health.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-1.5 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'bg-white border-rose-100 text-slate-600 hover:border-primary/20 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group cursor-pointer bg-white rounded-3xl border border-rose-50/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            
            {/* Mock Header Image */}
            <div className={`w-full h-44 bg-gradient-to-br ${post.imageBg} p-5 flex flex-col justify-between text-slate-800 relative overflow-hidden group-hover:opacity-95 transition-opacity`}>
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/70 backdrop-blur-sm rounded-full w-max text-primary">
                {post.category}
              </span>
              
              <div className="self-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <BookOpen className="w-5 h-5 text-primary/70" />
              </div>

              <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold bg-white/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between text-left gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-400 font-bold">{post.date}</span>
                <h3 className="font-outfit font-bold text-slate-800 text-base md:text-lg group-hover:text-primary leading-tight line-clamp-2 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <span className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-2">
                Read Full Article
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal View */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-rose-50 flex flex-col text-left">
            
            {/* Modal sticky close */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100/80 backdrop-blur-sm text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-all"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image Header banner */}
            <div className={`w-full h-48 sm:h-56 bg-gradient-to-br ${activeArticle.imageBg} p-6 sm:p-8 flex flex-col justify-end text-slate-800 relative overflow-hidden`}>
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 bg-white/80 rounded-full text-primary shadow-sm">
                  {activeArticle.category}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 text-slate-700">
                <span className="text-[10px] font-bold opacity-60">{activeArticle.date}</span>
                <h2 className="font-outfit text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight pr-8">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Read text content details */}
            <div className="p-6 sm:p-8 flex flex-col gap-6 text-sm md:text-base leading-relaxed text-slate-600 font-medium">
              
              {/* Author & duration bar */}
              <div className="flex items-center gap-6 border-b border-rose-50 pb-4 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>By {activeArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="font-bold text-slate-700 italic border-l-4 border-primary pl-4 py-1 text-sm bg-rose-50/10">
                "{activeArticle.excerpt}"
              </p>

              {/* Core Content Body */}
              <p>{activeArticle.content}</p>
              
              <p>Understanding these cycle health details helps women proactively anticipate natural physical transitions, maintain optimum hormonal balances, and adapt sanitary care sizes correctly based on flow levels.</p>

              {/* Close trigger */}
              <button
                onClick={() => setActiveArticle(null)}
                className="py-2.5 px-4 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl text-center self-end border border-slate-200 mt-2"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
