'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SponsorModal({ onClose }) {

  // 1. Prevent Background Scroll & Handle ESC Key
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto">
      
      {/* ===== High-Performance Backdrop ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transform-gpu"
      />

      {/* ===== Responsive Modal Card ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-lg bg-[#020617]/95 border border-white/10 rounded-[2rem] p-7 md:p-10 shadow-2xl transform-gpu will-change-transform my-auto"
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="relative z-10">
          <header className="mb-8">
            <h3 className="text-3xl font-black text-white tracking-tighter">
              Become a <span className="text-cyan-400 italic">Sponsor</span>
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">
              Join the Avalanche Ecosystem
            </p>
          </header>

          <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
              <input
                type="text"
                autoComplete="organization"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700"
                placeholder="Ex: TechCorp"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700"
                placeholder="contact@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700"
                  placeholder="+91..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tier</label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-[#020617]">Title Sponsor</option>
                    <option className="bg-[#020617]">Platinum</option>
                    <option className="bg-[#020617]">Gold</option>
                    <option className="bg-[#020617]">Custom</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] hover:bg-cyan-400 transition-all duration-300 active:scale-95 shadow-xl shadow-cyan-500/5"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* ===== Close Button - Large Hit Area for Mobile ===== */}
        <button
          onClick={onClose}
          className="absolute top-7 right-7 p-3 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full"
          aria-label="Close Modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </motion.div>
    </div>
  );
}