'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = ({ scrollTo, refs, openModal }) => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('Home');
  const [theme, setTheme]               = useState('dark');

  // Initialize theme from localStorage
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
    stiffness: 100, damping: 30, restDelta: 0.001,
  });

  const navItems = useMemo(() => [
    { name: 'Home',     ref: refs.homeRef },
    { name: 'About',    ref: refs.aboutRef },
    { name: 'Events',   ref: refs.eventsRef },
    { name: 'Gallery',  ref: refs.galleryRef },
    { name: 'Team',     ref: refs.teamRef },
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

  const dark = theme === 'dark';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
          scrolled || mobileMenuOpen
            ? `py-3 ${
                mobileMenuOpen
                  ? 'bg-transparent'
                  : dark
                    ? 'bg-[#020617]/50 backdrop-blur-lg border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
                    : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
              }`
            : 'py-6 bg-transparent'
        }`}
      >
        {/* ── Scroll progress bar ── */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[2px] origin-left z-[101] ${
            dark ? 'bg-cyan-500' : 'bg-slate-900'
          }`}
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">

          {/* ── Logo ── */}
          <div
            className="relative z-[110] cursor-pointer group flex items-center gap-3"
            onClick={() => { scrollTo(refs.homeRef); setMobileMenuOpen(false); }}
          >
            <div className="relative flex items-center justify-center p-1.5 rounded-full bg-white/80 dark:bg-white dark:shadow-[0_0_25px_rgba(255,255,255,0.8)] backdrop-blur-md transition-all duration-300">
              <img
                src="/gallery/Avalanche%20Logo.png"
                alt="Avalanche Logo"
                className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
              />
            </div>
          </div>

          {/* ── Desktop navigation pill ── */}
          <div className={`hidden lg:flex items-center gap-1 backdrop-blur-xl rounded-2xl px-2 py-1.5 ${
            dark
              ? 'bg-white/[0.06] border border-white/10'
              : 'bg-slate-100/80 border border-slate-200/80'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.ref)}
                className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeSection === item.name
                    ? dark ? 'text-white' : 'text-slate-900'
                    : dark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="relative z-10">{item.name}</span>

                {activeSection === item.name && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-xl shadow-inner ${
                      dark
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-white border border-slate-200 shadow-sm'
                    }`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Right-side actions ── */}
          <div className="flex items-center gap-3">

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
                dark
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  {dark
                    ? <HiSun  size={18} className="text-yellow-300" />
                    : <HiMoon size={18} className="text-slate-600" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Join Now — desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors shadow-xl ${
                dark
                  ? 'bg-white text-black hover:bg-cyan-400'
                  : 'bg-slate-950 text-white hover:bg-slate-700'
              }`}
            >
              Join Now
            </motion.button>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden relative z-[110] p-3 rounded-xl border backdrop-blur-md transition-colors ${
                dark
                  ? 'text-white bg-white/10 border-white/20 hover:bg-white/20'
                  : 'text-slate-700 bg-slate-100 border-slate-200 hover:bg-slate-200'
              }`}
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

        {/* ════════════════════════════════════════
            MOBILE MENU
        ════════════════════════════════════════ */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className={`fixed inset-0 lg:hidden z-[9998] ${
                  dark
                    ? 'bg-black/60 backdrop-blur-md'
                    : 'bg-slate-900/40 backdrop-blur-md'
                }`}
              />

              {/* Side panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className={`fixed top-0 right-0 h-full w-[80%] max-w-sm lg:hidden flex flex-col z-[9999] ${
                  dark
                    ? 'bg-[#020617]/95 backdrop-blur-[32px] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.8)]'
                    : 'bg-white/[0.98] backdrop-blur-xl border-l border-slate-200 shadow-[-10px_0_40px_rgba(0,0,0,0.10)]'
                }`}
              >
                <div className="flex flex-col pt-32 px-10 space-y-2">

                  {/* "Navigation" label */}
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-70 ${
                    dark ? 'text-cyan-400' : 'text-slate-500'
                  }`}>
                    Navigation
                  </span>

                  {/* Nav links */}
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { scrollTo(item.ref); setMobileMenuOpen(false); }}
                      className={`group flex items-center justify-between py-5 border-b text-left ${
                        dark ? 'border-white/10' : 'border-slate-200/80'
                      }`}
                    >
                      <span className={`text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
                        activeSection === item.name
                          ? dark ? 'text-white scale-105 origin-left' : 'text-slate-900 scale-105 origin-left'
                          : dark ? 'text-white/40 group-hover:text-white/90' : 'text-slate-300 group-hover:text-slate-800'
                      }`}>
                        {item.name}
                      </span>

                      {activeSection === item.name && (
                        <div className={`w-2 h-2 rounded-full ${
                          dark
                            ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]'
                            : 'bg-slate-900'
                        }`} />
                      )}
                    </motion.button>
                  ))}

                  {/* Theme toggle row */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={toggleTheme}
                    className={`group flex items-center justify-between py-5 border-b text-left w-full ${
                      dark ? 'border-white/10' : 'border-slate-200/80'
                    }`}
                  >
                    <span className={`text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
                      dark
                        ? 'text-white/40 group-hover:text-white/90'
                        : 'text-slate-300 group-hover:text-slate-800'
                    }`}>
                      {dark ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      dark ? 'bg-white/10' : 'bg-slate-100'
                    }`}>
                      {dark
                        ? <HiSun  size={16} className="text-yellow-300" />
                        : <HiMoon size={16} className="text-slate-600" />}
                    </div>
                  </motion.button>

                  {/* CTA */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setMobileMenuOpen(false); openModal(); }}
                    className={`mt-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all ${
                      dark
                        ? 'bg-cyan-500 text-[#020617]'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    Launch Application
                  </motion.button>
                </div>

                {/* Panel footer */}
                <div className={`mt-auto p-10 border-t ${
                  dark
                    ? 'border-white/10 bg-white/[0.02]'
                    : 'border-slate-200/80 bg-slate-50/60'
                }`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                    dark ? 'text-white/40' : 'text-slate-400'
                  }`}>
                    SIT Tumakuru
                  </p>
                  <p className={`text-[10px] mt-1 font-black ${
                    dark ? 'text-white/20' : 'text-slate-300'
                  }`}>
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