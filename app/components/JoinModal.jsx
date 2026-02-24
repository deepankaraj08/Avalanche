'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Ensure consistency with your framer-motion version
import { HiX } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function JoinModal({ onClose }) {
  // Replace this with your actual WhatsApp Group Invite Link
  const WHATSAPP_LINK = "https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop: Smoother blur and darker overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content: Adjusted to match #020617 and your card styles */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#020617] border border-white/10 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]"
      >
        {/* Animated Glow Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button with better hover state */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 z-20"
          aria-label="Close Modal"
        >
          <HiX size={20} />
        </button>

        <div className="text-center relative z-10">
          {/* WhatsApp Brand Icon */}
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <FaWhatsapp size={32} />
          </div>

          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Join Avalanche</h3>
          <p className="text-gray-400 text-sm mb-8 font-light leading-relaxed">
            Scan the QR code below to join our official WhatsApp community and stay updated with the latest events.
          </p>

          {/* QR Code Container with subtle outer glow */}
          <div className="bg-white p-4 rounded-3xl inline-block shadow-[0_0_40px_rgba(34,211,238,0.15)] group transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t`} 
              alt="WhatsApp QR Code"
              className="w-48 h-48 select-none"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs hover:text-cyan-300 transition-colors tracking-[0.2em] uppercase"
            >
              Or click here to join directly
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}