'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = ({ scrollTo, refs, openModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [theme, setTheme] = useState('dark');

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

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
    { name: 'Sponsors', ref: refs.sponsorsRef },
  ], [refs]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;

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
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${scrolled || mobileMenuOpen
            ? `py-3 ${
            // Reduced blur for a cleaner glass look
            mobileMenuOpen
              ? 'bg-transparent'
              : 'bg-[#020617]/50 backdrop-blur-lg'
            } border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]`
            : 'py-6 bg-transparent'
          }`}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-[101]"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <div
            className="relative z-[110] cursor-pointer group"
            onClick={() => {
              scrollTo(refs.homeRef);
              setMobileMenuOpen(false);
            }}
          >
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-1">
              <span className="group-hover:text-cyan-400 transition-colors duration-300">AVA</span>
              <span className="bg-cyan-500 text-[#020617] px-1 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.6)]">LANCHE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 px-2 py-1.5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.ref)}
                className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${activeSection === item.name ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.name && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-inner"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative p-2.5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark'
                    ? <HiSun size={18} className="text-yellow-300" />
                    : <HiMoon size={18} className="text-cyan-300" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-xl"
            >
              Join Now
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-[110] p-3 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl border border-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* MODERATED BLUR OVERLAY */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-md lg:hidden z-[101]"
              />

              {/* Glass Panel - Reduced Blur for Clarity */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-sm
                bg-white/[0.05]
                backdrop-blur-[24px] 
                border-l border-white/10
                shadow-[-10px_0_40px_rgba(0,0,0,0.5)]
                lg:hidden flex flex-col z-[105]"
              >
                <div className="flex flex-col pt-32 px-10 space-y-2">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-6 opacity-70">
                    Navigation
                  </span>

                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        scrollTo(item.ref);
                        setMobileMenuOpen(false);
                      }}
                      className="group flex items-center justify-between py-5 border-b border-white/10 text-left"
                    >
                      <span
                        className={`text-3xl font-black uppercase tracking-tighter transition-all duration-300 ${activeSection === item.name
                            ? 'text-white scale-105 origin-left'
                            : 'text-white/40 group-hover:text-white/90'
                          }`}
                      >
                        {item.name}
                      </span>

                      {activeSection === item.name && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                      )}
                    </motion.button>
                  ))}

                  {/* Mobile Theme Toggle */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={toggleTheme}
                    className="group flex items-center justify-between py-5 border-b border-white/10 text-left w-full"
                  >
                    <span className="text-3xl font-black uppercase tracking-tighter text-white/40 group-hover:text-white/90 transition-all duration-300">
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                      {theme === 'dark'
                        ? <HiSun size={16} className="text-yellow-300" />
                        : <HiMoon size={16} className="text-cyan-300" />}
                    </div>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal();
                    }}
                    className="mt-10 py-5 rounded-2xl bg-cyan-500 text-[#020617] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-transform"
                  >
                    Launch Application
                  </motion.button>
                </div>

                <div className="mt-auto p-10 border-t border-white/10 bg-white/[0.02]">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    SIT Tumakuru
                  </p>
                  <p className="text-[10px] text-white/20 mt-1 font-black">
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