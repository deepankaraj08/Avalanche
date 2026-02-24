'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = ({ scrollTo, refs, openModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Faster trigger for better feedback
      
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
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'py-3 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* ===== Brand Logo ===== */}
        <div 
          className="relative group cursor-pointer flex-shrink-0 z-[110]" 
          onClick={() => scrollTo(refs.homeRef)}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500" />
          <div className="relative text-xl md:text-2xl font-black tracking-tighter text-white">
            AVA<span className="text-cyan-400">LANCHE</span>
          </div>
        </div>

        {/* ===== Desktop Menu (Hidden on small tablets/phones) ===== */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 rounded-2xl border border-white/10 px-2 py-1.5 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.ref)}
              className={`relative px-4 py-2 text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-xl ${
                activeSection === item.name ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {activeSection === item.name && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl -z-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ===== Desktop CTA Button ===== */}
        <div className="hidden md:block">
          <button
            onClick={openModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-[10px] uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] active:scale-95 transition-all"
          >
            Join Now
          </button>
        </div>

        {/* ===== Mobile Toggle Button ===== */}
        <button
          className="lg:hidden z-[110] p-2 text-white bg-white/5 rounded-xl border border-white/10 transition-all active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* ===== Mobile Menu Dropdown ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 lg:hidden bg-[#020617] z-[105] flex flex-col justify-center items-center"
          >
             {/* Background Glow for Mobile Menu */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full" />
            
            <div className="flex flex-col space-y-6 w-full px-10">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.name}
                  onClick={() => {
                    scrollTo(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  className="group flex items-center justify-between text-left"
                >
                  <span className={`text-3xl font-black uppercase tracking-tighter transition-colors ${
                    activeSection === item.name ? 'text-cyan-400' : 'text-white/40 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {activeSection === item.name && (
                    <div className="w-12 h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]" />
                  )}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
                className="mt-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-cyan-900/40"
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