'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { SpaceStars } from '../../components/ui/meteors';

const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    fullScreen: { enable: false },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
          parallax: { enable: true, force: 45, smooth: 15 },
        },
        resize: true,
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.4, color: "#3b82f6" } },
      },
    },
    particles: {
      color: { value: ["#ffffff", "#3b82f6", "#06b6d4"] },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
      move: { enable: true, speed: 1.2, random: true },
      number: { density: { enable: true, area: 1000 }, value: 80 },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 2 } },
    },
    detectRetina: true,
  }), []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white pt-20"
    >
      {/* 1. THE STARS (Increased count and opacity, placed in a high-visibility layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars starCount={250} className="opacity-70" />
      </div>

      {/* 2. BACKGROUND ATMOSPHERE (Layered below content but above stars) */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        {init && (
          <Particles id="tsparticles" className="absolute inset-0" options={particlesOptions} />
        )}
        {/* We use a transparent radial gradient so stars aren't blocked in the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_20%,_rgba(2,6,23,0.8)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(59,130,246,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6">
        
        {/* ===== Main Header ===== */}
        <div className="text-center space-y-4 md:space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] md:leading-none"
          >
            We Don’t Just <br className="sm:hidden" /> Organize Events
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] pb-2"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              — We Create Moments.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 md:mt-8 text-center text-gray-400 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed font-light"
        >
          Proudly organizing <span className="text-white font-medium">Radiance & Advento</span> — premium celebrations of talent, culture, and creativity.
        </motion.p>

        {/* ===== Featured Event Card ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative mt-12 md:mt-16 w-full max-w-3xl group"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600/50 via-cyan-400/50 to-indigo-600/50 rounded-[2rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-1000" />

          <div className="relative bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-blue-400 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
                Next Event <span className="text-gray-600 mx-2">•</span> <span className="text-gray-300">Mar 22, 2026</span>
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 italic leading-none">
              Radiance
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base mb-10 max-w-xs font-medium tracking-wide">
              WHERE TALENT SHINES BRIGHTEST.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={() => scrollTo(refs.eventsRef)}
                className="group relative px-10 py-4 bg-white text-black rounded-2xl font-bold transition-all duration-300 hover:scale-[1.05] active:scale-95"
              >
                Check for Events
              </button>

              <button 
                onClick={() => scrollTo(refs.teamRef)}
                className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              >
                Meet the Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== Scroll Indicator ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-[24px] h-[40px] rounded-full border-2 border-white/10 flex justify-center p-1.5">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;