'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SponsorModal({ onClose }) {

  // 1. Prevent Background Scroll & Handle ESC Key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      
      {/* ===== High-Performance Backdrop ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* ===== Responsive Modal Card ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-[#020617]/90 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl overflow-hidden transform-gpu"
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="relative z-10">
          <header className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
              Become a <span className="text-cyan-400 italic">Sponsor</span>
            </h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">
              Join the Avalanche Ecosystem
            </p>
          </header>

          <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-600"
                placeholder="Ex: TechCorp"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-600"
                placeholder="contact@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-600"
                  placeholder="+91..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tier</label>
                <select
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                >
                  <option className="bg-[#020617]">Title Sponsor</option>
                  <option className="bg-[#020617]">Platinum</option>
                  <option className="bg-[#020617]">Gold</option>
                  <option className="bg-[#020617]">Custom</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 bg-white text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all duration-300 active:scale-95 shadow-xl shadow-cyan-500/10"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* ===== Close Button - Large Hit Area for Mobile ===== */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </motion.div>
    </div>
  );
}