'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { SpaceStars } from '../../components/ui/meteors';

const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tilt logic for "Pro" depth effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const particlesOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: isMobile ? 15 : 40, density: { enable: true, area: 1000 } },
      color: { value: ["#22d3ee", "#3b82f6", "#ffffff"] },
      links: {
        enable: true,
        distance: 150,
        color: "#3b82f6",
        opacity: 0.1,
        width: 1
      },
      move: { enable: true, speed: 0.6, random: true },
      opacity: { value: { min: 0.1, max: 0.4 } },
      size: { value: { min: 1, max: 2 } }
    },
    detectRetina: true
  }), [isMobile]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white pt-20"
    >
      {/* 1. LAYERED BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        <SpaceStars starCount={isMobile ? 60 : 200} />
        {/* Hardware-accelerated Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {init && (
        <Particles className="absolute inset-0 opacity-40" options={particlesOptions} />
      )}

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        
        {/* Main Typography */}
        <div className="text-center mb-12 select-none">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,9vw,5.5rem)] font-black tracking-tighter leading-[1.1]"
          >
            We Don’t Just Organize Events
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,9vw,5.5rem)] font-black tracking-tighter mt-1"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              — We Create Moments.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8 text-gray-400 max-w-2xl mx-auto text-sm md:text-xl font-light tracking-wide leading-relaxed"
          >
            Organizing <span className="text-white font-bold">Radiance & Advento</span> — 
            where premium talent meets immersive production.
          </motion.p>
        </div>

        {/* 3. THE "PRO" FEATURED CARD */}
        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative w-full max-w-4xl group transform-gpu"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

          {/* Card Body */}
          <div className="relative overflow-hidden bg-[#0a0f1e]/60 backdrop-blur-[30px] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
            
            {/* Liquid Glint Animation */}
            <motion.div
              animate={{ x: ['-150%', '300%'], skewX: -25 }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
            />

            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
                    Upcoming // Mar 22, 2026
                  </span>
                </div>
              </div>

              <h3 className="text-[clamp(3.5rem,14vw,8rem)] font-black italic tracking-tighter text-white leading-none">
                Radiance
              </h3>

              <p className="mt-6 text-cyan-400/60 uppercase text-[10px] md:text-sm font-black tracking-[0.5em]">
                Where Talent Shines Brightest
              </p>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(34, 211, 238, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo(refs.eventsRef)}
                  className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Check Events
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollTo(refs.teamRef)}
                  className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest backdrop-blur-xl transition-all"
                >
                  Meet the Team
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;