'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { SpaceStars } from '../../components/ui/meteors';

// ==========================================
// 1. Footer Configuration
// ==========================================
const SOCIAL_LINKS = [
  { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram', hoverColor: 'hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10' },
  { icon: <FaLinkedinIn size={18} />, href: '#', label: 'LinkedIn', hoverColor: 'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10' },
  { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter', hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10' },
];

const FOOTER_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Clubs', href: '#clubs' },
  { name: 'Alumni', href: '#alumni' },
];

// ==========================================
// 2. Main Component
// ==========================================
const Footer = () => {
  return (
    <footer className="relative bg-[#020617] border-t border-white/10 pt-20 pb-8 overflow-hidden text-white selection:bg-cyan-500/30">
      
      {/* ===== Shared Deep Space Background Stack ===== */}
      <SpaceStars starCount={40} className="absolute inset-0 pointer-events-none opacity-40" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-black" />
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true" 
        />
        {/* Subtle Bottom Ambient Glow */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-[100%] blur-[120px] mix-blend-screen" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* ===== 1. Brand Column ===== */}
          <div className="space-y-6">
            <div className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
              AVALANCHE
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Siddaganga Institute of Technology's premier cultural and technical hub. Sparking innovation and creativity since inception.
            </p>
            <div className="flex flex-col text-sm text-gray-400 space-y-2 font-medium">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Tumakuru, Karnataka, India
              </span>
              <a href="mailto:avalanche@club.sit.edu" className="hover:text-cyan-400 transition-colors duration-300 w-max">
                avalanche@club.sit.edu
              </a>
            </div>
          </div>

          {/* ===== 2. Navigation ===== */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Quick Navigation</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm inline-flex items-center group font-medium"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300 ease-out" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== 3. Social Presence ===== */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Follow the Pulse</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 shadow-lg ${social.hoverColor}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ===== 4. Newsletter/CTA ===== */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <h4 className="text-white font-bold mb-2 tracking-tight text-xl">Join the Energy</h4>
              <p className="text-gray-400 text-sm mb-6 font-light">Stay updated with our latest events and flagship workshops.</p>
              <button className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                Register Now
              </button>
            </div>
            {/* CTA Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-500" />
          </div>

        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs tracking-wider font-medium">
          <p>© {new Date().getFullYear()} Avalanche Club SIT. Crafted for Excellence.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;