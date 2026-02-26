'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheckCircle } from 'react-icons/hi';

export default function SponsorModal({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Lifecycle: Prevent Background Scroll & Handle ESC Key
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

  // 2. Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto transform-gpu">
      
      {/* ===== High-Performance Backdrop ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm touch-none"
      />

      {/* ===== Responsive Modal Card ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        className="relative w-full max-w-lg bg-[#020617] border border-white/10 rounded-[2.5rem] p-7 md:p-10 shadow-2xl overflow-hidden transform-gpu will-change-transform my-auto min-h-[400px] flex flex-col justify-center"
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form-state"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="relative z-10"
            >
              <header className="mb-8">
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  Become a <span className="text-cyan-400 italic">Sponsor</span>
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">
                  Join the Avalanche Ecosystem
                </p>
              </header>

              <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
                  <input
                    required
                    disabled={isSubmitting}
                    type="text"
                    autoComplete="organization"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700 disabled:opacity-50"
                    placeholder="Ex: TechCorp"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Email</label>
                  <input
                    required
                    disabled={isSubmitting}
                    type="email"
                    inputMode="email"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700 disabled:opacity-50"
                    placeholder="contact@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                    <input
                      required
                      disabled={isSubmitting}
                      type="tel"
                      inputMode="tel"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-gray-700 disabled:opacity-50"
                      placeholder="+91..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tier</label>
                    <div className="relative">
                      <select
                        disabled={isSubmitting}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option className="bg-[#020617]">Title Sponsor</option>
                        <option className="bg-[#020617]">Platinum</option>
                        <option className="bg-[#020617]">Gold</option>
                        <option className="bg-[#020617]">Custom</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full mt-4 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-300 active:scale-[0.98] shadow-xl disabled:opacity-70 flex items-center justify-center overflow-hidden"
                >
                  <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                    Submit Application
                  </span>
                  
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                   <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
                   <HiCheckCircle className="text-cyan-400 relative z-10" size={80} />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Application Sent!</h3>
              <p className="text-gray-400 text-sm font-medium">Our team will contact you shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close Button - Larger Hit Area */}
        <button
          onClick={onClose}
          className="absolute top-7 right-7 p-3 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full active:scale-90 z-[160]"
          aria-label="Close Modal"
        >
          <HiX size={20} />
        </button>

      </motion.div>
    </div>
  );
}