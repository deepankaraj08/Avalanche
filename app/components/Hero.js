'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { SpaceStars } from '../../components/ui/meteors';

const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [init, setInit] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      // Delay effects slightly to let the main text animation finish smoothly
      setTimeout(() => setShowEffects(true), 500);
    });
  }, []);

  const particlesOptions = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return {
      background: { color: { value: "transparent" } },
      fpsLimit: isMobile ? 60 : 120, 
      fullScreen: { enable: false },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: !isMobile, 
            mode: "grab",
            parallax: { enable: true, force: 20, smooth: 10 },
          },
          resize: true,
        },
        modes: {
          grab: { 
            distance: isMobile ? 100 : 180, 
            links: { opacity: isMobile ? 0.1 : 0.3, color: "#3b82f6" } 
          },
        },
      },
      particles: {
        color: { value: ["#ffffff", "#3b82f6", "#06b6d4"] },
        links: { 
          color: "#ffffff", 
          distance: isMobile ? 110 : 150, 
          enable: true, 
          opacity: isMobile ? 0.03 : 0.08, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: isMobile ? 0.5 : 0.8, // Slower is smoother for mobile processors
          random: true 
        },
        number: { 
          density: { enable: true, area: 1000 }, 
          value: isMobile ? 20 : 60 
        },
        opacity: { value: { min: 0.1, max: 0.3 } },
        size: { value: { min: 0.8, max: 1.2 } },
      },
      detectRetina: true, // Crucial for sharp visuals on high-end phones
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white pt-16 md:pt-20"
    >
      {/* 1. THE STARS - Layer Promoted */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu opacity-40 md:opacity-70">
        <SpaceStars starCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 250} />
      </div>

      {/* 2. BACKGROUND ATMOSPHERE - Isolated layers */}
      <div className="absolute inset-0 -z-10 h-full w-full transform-gpu">
        {init && showEffects && (
          <Particles id="tsparticles" className="absolute inset-0" options={particlesOptions} />
        )}
        {/* Radial Gradients - Using fixed percentages for layout stability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_20%,_rgba(2,6,23,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(59,130,246,0.1),_transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 py-12 transform-gpu">
        
        <div className="text-center space-y-2 md:space-y-0 select-none">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(2rem,8vw,4.5rem)] font-black tracking-tight leading-[1.1] md:leading-tight"
          >
            We Don’t Just <br className="sm:hidden" /> Organize Events
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2.1rem,8vw,4.5rem)] font-black tracking-tight leading-[1.1] pb-2"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              — We Create Moments.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 md:mt-8 text-center text-gray-400 text-sm md:text-xl max-w-2xl leading-relaxed font-light px-4"
        >
          Proudly organizing <span className="text-white font-medium">Radiance & Advento</span> — premium celebrations of talent, culture, and creativity.
        </motion.p>

        {/* ===== Featured Event Card - Optimized Blur Performance ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mt-12 md:mt-16 w-full max-w-3xl group transform-gpu will-change-transform"
        >
          {/* Subtle Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600/10 via-cyan-400/10 to-indigo-600/10 rounded-[2rem] blur-sm opacity-50" />

          {/* Main Card - Reduced blur to 'xl' for mobile scroll speed */}
          <div className="relative bg-[#020617]/70 backdrop-blur-xl md:backdrop-blur-2xl border border-white/10 rounded-[2.2rem] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl">
            
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-blue-400 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
                Next Event <span className="text-gray-600 mx-1">•</span> <span className="text-gray-300">Mar 22, 2026</span>
              </span>
            </div>

            <h2 className="text-[clamp(3.5rem,12vw,6.5rem)] font-black text-white tracking-tighter mb-4 italic leading-none">
              Radiance
            </h2>
            
            <p className="text-gray-400 text-[10px] md:text-sm mb-8 md:mb-10 max-w-xs font-medium tracking-widest uppercase opacity-70">
              WHERE TALENT SHINES BRIGHTEST.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <button 
                onClick={() => scrollTo(refs.eventsRef)}
                className="px-8 md:px-10 py-4 bg-white text-black rounded-2xl font-bold transition-all duration-300 active:scale-90"
              >
                Check for Events
              </button>

              <button 
                onClick={() => scrollTo(refs.teamRef)}
                className="px-8 md:px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold backdrop-blur-md active:scale-90"
              >
                Meet the Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;