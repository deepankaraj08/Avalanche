'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function JoinModal({ onClose }) {
  // Prevent background scroll on mount
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  const WHATSAPP_LINK = "https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop: Optimized for mobile GPU */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer transform-gpu touch-none"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        className="relative w-full max-w-md bg-[#020617] border border-white/10 rounded-[2.5rem] p-7 md:p-10 shadow-2xl transform-gpu will-change-transform"
      >
        {/* Animated Glow Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none transform-gpu" />

        {/* Close Button - Larger touch target for mobile */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-all z-20 active:scale-90"
          aria-label="Close Modal"
        >
          <HiX size={20} />
        </button>

        <div className="text-center relative z-10">
          {/* WhatsApp Brand Icon */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6 text-green-500">
            <FaWhatsapp size={28} className="md:w-8 md:h-8" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Join Avalanche</h3>
          <p className="text-gray-400 text-[13px] md:text-sm mb-6 md:mb-8 font-medium leading-relaxed px-2">
            Scan the QR code to join our official WhatsApp community and stay updated.
          </p>

          {/* QR Code Container - Responsive Scaling */}
          <div className="bg-white p-3 md:p-4 rounded-3xl inline-block shadow-2xl group transition-transform duration-500 transform-gpu">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(WHATSAPP_LINK)}`} 
              alt="WhatsApp QR Code"
              className="w-40 h-40 md:w-48 md:h-48 select-none"
              loading="eager"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 font-black text-[10px] md:text-xs hover:text-cyan-300 transition-colors tracking-[0.2em] uppercase active:scale-95"
            >
              Or join directly via link
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}