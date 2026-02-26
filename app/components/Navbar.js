'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = ({ scrollTo, refs, openModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = useMemo(() => [
    { name: 'Home', ref: refs.homeRef },
    { name: 'About', ref: refs.aboutRef },
    { name: 'Events', ref: refs.eventsRef },
    { name: 'Gallery', ref: refs.galleryRef },
    { name: 'Team', ref: refs.teamRef },
    { name: 'Alumni', ref: refs.alumniRef },
    { name: 'Sponsors', ref: refs.sponsorsRef },
  ], [refs]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Adaptive offset based on screen size for better section tracking
      const offset = window.innerWidth < 768 ? 100 : 150;
      const scrollPosition = window.scrollY + offset;

      const current = navItems.find((item) => {
        if (item.ref?.current) {
          const { offsetTop, offsetHeight } = item.ref.current;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (current) setActiveSection(current.name);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // Added translateZ(0) for GPU promotion
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out will-change-transform ${
          scrolled || mobileMenuOpen
            ? `py-3 ${
                mobileMenuOpen
                  ? 'bg-[#020617]'
                  : 'bg-[#020617]/80 backdrop-blur-2xl'
              } border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]`
            : 'py-5 md:py-6 bg-transparent'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Top Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-[101]"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          
          {/* Brand */}
          <div
            className="relative z-[110] cursor-pointer group"
            onClick={() => {
              scrollTo(refs.homeRef);
              setMobileMenuOpen(false);
            }}
          >
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-1">
              <span className="group-hover:text-cyan-400 transition-colors duration-300">AVA</span>
              <span className="bg-cyan-500 text-[#020617] px-1 rounded-sm">LANCHE</span>
            </div>
          </div>

          {/* Desktop Navigation - Fluid background indicator */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 px-2 py-1.5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.ref)}
                className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeSection === item.name
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.name && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="hidden sm:flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-xl bg-white text-black font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-lg shadow-white/5"
            >
              Join Now
            </motion.button>

            {/* Mobile Toggle - Improved hit target */}
            <button
              className="lg:hidden relative z-[110] p-2.5 text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md lg:hidden z-[101]"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#020617] z-[105] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] lg:hidden flex flex-col will-change-transform"
              >
                <div className="flex flex-col pt-28 md:pt-32 px-8 md:px-10 space-y-1">
                  <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4 md:mb-6 opacity-50">
                    Navigation
                  </span>

                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ease: "easeOut" }}
                      onClick={() => {
                        scrollTo(item.ref);
                        setMobileMenuOpen(false);
                      }}
                      className="group flex items-center justify-between py-4 md:py-5 border-b border-white/5 text-left active:bg-white/5 transition-colors"
                    >
                      <span
                        className={`text-2xl md:text-3xl font-black uppercase tracking-tighter transition-all duration-300 ${
                          activeSection === item.name
                            ? 'text-cyan-400 translate-x-2'
                            : 'text-gray-500 group-hover:text-white'
                        }`}
                      >
                        {item.name}
                      </span>

                      {activeSection === item.name && (
                        <motion.div
                          layoutId="m-active"
                          className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                        />
                      )}
                    </motion.button>
                  ))}

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal();
                    }}
                    className="mt-8 md:mt-10 py-4 md:py-5 rounded-2xl bg-cyan-500 text-[#020617] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-cyan-500/20 active:scale-95 transition-transform"
                  >
                    Launch Application
                  </motion.button>
                </div>

                <div className="mt-auto p-8 md:p-10 border-t border-white/5 bg-white/[0.01]">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    SIT Tumakuru
                  </p>
                  <p className="text-[9px] text-gray-600 mt-2 font-black uppercase tracking-widest">
                    v2.0 • Avalanche Club
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;