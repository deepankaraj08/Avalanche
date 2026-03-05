'use client';

import React, { forwardRef, useEffect, useState, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useMotionTemplate } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { SpaceStars } from '../../components/ui/meteors';

// Reusable Magnetic Button Component
function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Letter animation component
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(5px)" },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};


const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tilt logic for "Pro" depth effect on the Featured Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
      number: { value: isMobile ? 15 : 50, density: { enable: true, area: 1000 } },
      color: { value: ["#22d3ee", "#818cf8", "#c084fc"] },
      links: {
        enable: !isMobile,
        distance: 140,
        color: "#818cf8",
        opacity: 0.15,
        width: 1
      },
      move: { enable: true, speed: isMobile ? 0.4 : 0.8, random: true },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 2.5 } }
    },
    detectRetina: true
  }), [isMobile]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white pt-24 pb-0"
    >
      {/* 1. LAYERED BACKGROUND EFFECTS */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block"
        style={{
          maskImage: `linear-gradient(to bottom, black ${isMobile ? '80%' : '90%'}, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black ${isMobile ? '80%' : '90%'}, transparent 100%)`
        }}
      >
        <SpaceStars starCount={isMobile ? 80 : 250} className="opacity-60" />

        {/* Deep ambient glows */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] mix-blend-screen"
        />

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      {/* Light Mode Specific Ambient Blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none block dark:hidden overflow-hidden"
        style={{
          maskImage: `linear-gradient(to bottom, black ${isMobile ? '85%' : '94%'}, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black ${isMobile ? '85%' : '94%'}, transparent 100%)`
        }}
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      {init && (
        <Particles className="absolute inset-0 opacity-50 z-[1] pointer-events-none" options={particlesOptions} />
      )}

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">

        {/* Main Typography */}
        <div className="text-center mb-16 select-none relative z-20">
          <AnimatedTitle
            text="We Don’t Just Organize Events"
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter leading-[1.05] text-slate-800 dark:text-white"
          />
          <AnimatedTitle
            text="— We Create Moments."
            delay={0.6}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] pb-2"
          />

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="mt-8 relative inline-block group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-indigo-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="relative px-8 py-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-600 dark:text-slate-300 text-sm md:text-lg font-medium tracking-wide shadow-sm">
              Organizing <span className="text-slate-900 dark:text-white font-black">Radiance & Advento</span> —
              where premium talent meets immersive production.
            </p>
          </motion.div>
        </div>

        {/* 3. THE "PRO" FEATURED CARD */}
        <motion.div
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, type: "spring", damping: 20 }}
          className="relative w-full max-w-5xl rounded-[3rem] bg-white/60 dark:bg-[#0b1121]/80 backdrop-blur-[40px] border border-white/60 dark:border-white/10 p-8 md:p-16 overflow-hidden shadow-2xl transition-colors duration-700 hover:border-slate-300 dark:hover:border-white/20 transform-gpu"
        >
          {/* Card Body */}
          <div className="relative overflow-hidden bg-white/70 dark:bg-[#060b18]/60 backdrop-blur-[40px] border border-white/50 dark:border-white/10 rounded-[3rem] p-10 md:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(0,0,0,0.5)] transition duration-700 group-hover:border-cyan-500/30">

            {/* Dynamic Spotlight inside the card */}
            <motion.div
              className="absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    800px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])},
                    rgba(34, 211, 238, 0.15),
                    transparent 60%
                  )
                `,
              }}
            />

            {/* Liquid Glint Animation */}
            <motion.div
              animate={{ x: ['-200%', '300%'], skewX: -25 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"
            />

            <div className="relative z-10 text-center flex flex-col items-center" style={{ transform: "translateZ(50px)" }}>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]"></span>
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
                    Upcoming // Mar 22, 2026
                  </span>
                </div>
              </div>

              <h3 className="text-[clamp(4rem,18vw,10rem)] font-black italic tracking-tighter text-slate-900 dark:text-white leading-none drop-shadow-xl bg-clip-text">
                Radiance
              </h3>

              <p className="mt-6 text-slate-500 dark:text-cyan-400/70 uppercase text-xs md:text-sm font-black tracking-[0.6em] md:tracking-[0.8em]">
                Where Talent Shines Brightest
              </p>

              {/* Action Buttons */}
              <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
                <MagneticButton
                  onClick={() => scrollTo(refs.eventsRef)}
                  className="w-full sm:w-1/2 group/btn"
                >
                  <div className="relative overflow-hidden px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-transparent rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl group-hover/btn:shadow-cyan-500/25">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Check Events
                      <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </MagneticButton>

                <MagneticButton
                  onClick={() => scrollTo(refs.teamRef)}
                  className="w-full sm:w-1/2 group/btn2"
                >
                  <div className="relative overflow-hidden px-8 py-5 bg-white/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-[1.25rem] text-slate-800 dark:text-white font-black text-xs uppercase tracking-widest backdrop-blur-xl transition-all shadow-lg hover:border-slate-400 dark:hover:border-white/20">
                    <span className="relative z-10">Meet the Team</span>
                  </div>
                </MagneticButton>
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