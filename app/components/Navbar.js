'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = ({ scrollTo, refs, openModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // 1. Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      for (const [name, ref] of Object.entries(refs)) {
        if (ref && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(name.replace('Ref', '').charAt(0).toUpperCase() + name.replace('Ref', '').slice(1));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refs]);

  // 2. Navigation Items
  const navItems = [
    { name: 'Home', ref: refs.homeRef },
    { name: 'About', ref: refs.aboutRef },
    { name: 'Events', ref: refs.eventsRef },
    { name: 'Gallery', ref: refs.galleryRef },
    { name: 'Team', ref: refs.teamRef },
    { name: 'Alumni', ref: refs.alumniRef },
    { name: 'Sponsors', ref: refs.sponsorsRef },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* ===== Brand Logo ===== */}
        <div className="relative group cursor-pointer flex-shrink-0" onClick={() => scrollTo(refs.homeRef)}>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500" />
          <div className="relative text-2xl font-black tracking-tighter text-white">
            AVA<span className="text-cyan-400">LANCHE</span>
          </div>
        </div>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden lg:flex items-center bg-white/5 rounded-2xl border border-white/10 px-1.5 py-1.5 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.ref)}
              className={`relative px-3 xl:px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl ${
                activeSection === item.name ? 'text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {activeSection === item.name && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl -z-0"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ===== Desktop CTA Button ===== */}
        <div className="hidden lg:block flex-shrink-0">
          <button
            onClick={openModal}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
          >
            Join Now
          </button>
        </div>

        {/* ===== Mobile Toggle Button ===== */}
        <button
          className="lg:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10 transition-colors hover:bg-white/10 active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {/* ===== Mobile Menu Dropdown ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617]/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.name}
                  onClick={() => {
                    scrollTo(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                    activeSection === item.name 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                      : 'bg-white/[0.02] border-white/5 text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeSection === item.name ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-white/20'}`} />
                </motion.button>
              ))}
              
              {/* Added openModal to Mobile Menu Button as well */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-cyan-500/20 active:scale-95 transition-transform"
              >
                Join Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;