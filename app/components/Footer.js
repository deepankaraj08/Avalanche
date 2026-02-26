'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { 
    icon: <FaInstagram size={18} />, 
    href: 'https://www.instagram.com/team_avalanche_official?igsh=MWw4anl0YnE5c3B2ZQ==', 
    label: 'Instagram', 
    hoverColor: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10' 
  },
];

const Footer = () => {
  const openWhatsApp = () => {
    window.open('https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t', '_blank');
  };

  return (
    // Updated to a slate-gray base as requested
    <footer className="relative bg-[#0f172a] border-t border-white/5 pt-16 md:pt-24 pb-10 overflow-hidden text-white" id="footer">
      
      {/* ===== Background Atmosphere ===== */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-black" />
        
        {/* Responsive Ambient Glow */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[300px] md:h-[500px] bg-cyan-600/5 rounded-[100%] blur-[80px] md:blur-[120px]" />
        
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 100% Responsive Grid: Adaptive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* ===== 1. Brand Column ===== */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent inline-block">
              AVALANCHE
            </div>
            <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed max-w-xs font-bold uppercase tracking-wide opacity-80">
              Siddaganga Institute of Technology's premier cultural and technical hub.
            </p>
            <div className="flex flex-col text-[10px] text-slate-400 space-y-3 font-black tracking-widest uppercase">
              <span className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </span>
                Tumakuru, Karnataka, India
              </span>
              <a href="mailto:avalanche@club.sit.edu" className="hover:text-cyan-400 transition-all w-max underline underline-offset-8 decoration-white/5 hover:decoration-cyan-400/40">
                avalanche@club.sit.edu
              </a>
            </div>
          </div>

          {/* Spacer for layout balance on large screens */}
          <div className="hidden lg:block" />

          {/* ===== 2. Social Presence ===== */}
          <div className="space-y-6">
            <h4 className="text-slate-500 font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Social Pulse</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 transition-all duration-300 will-change-transform ${social.hoverColor}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ===== 3. CTA Card ===== */}
          <div className="relative group mt-4 lg:mt-0">
            <div className="absolute -inset-px bg-cyan-500/20 rounded-[2rem] md:rounded-[2.5rem] blur-md group-hover:bg-cyan-500/40 transition-all duration-700" />
            
            <div className="relative bg-cyan-500/10 backdrop-blur-2xl border border-cyan-500/20 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <h4 className="text-white font-black mb-1 md:mb-2 tracking-tighter text-xl md:text-2xl leading-none">Join the Energy</h4>
              <p className="text-cyan-400/60 text-[8px] md:text-[9px] mb-6 md:mb-8 font-black uppercase tracking-widest">Connect via WhatsApp</p>
              
              <button 
                onClick={openWhatsApp}
                className="w-full py-4 px-6 bg-cyan-500 text-[#0f172a] rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                Register Now
              </button>
            </div>
          </div>

        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="pt-8 md:pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
          <p>© {new Date().getFullYear()} Avalanche Club SIT.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;