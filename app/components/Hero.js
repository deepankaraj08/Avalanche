'use client';

import React, { forwardRef, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Star,
  Hexagon,
  Triangle,
  Command as CommandIcon,
  Ghost,
  Gem,
  Cpu
} from 'lucide-react';
import { CosmicParallaxBg } from '@/components/parallax-cosmic-background';

// --- MOCK BRANDS for the Marquee ---
const CLIENTS = [
  { name: 'x', icon: Hexagon },
  { name: 'y', icon: Triangle },
  { name: 'z', icon: CommandIcon },
  { name: 'a', icon: Ghost },
  { name: 'b', icon: Gem },
  { name: 'c', icon: Cpu },
];

// Reusable Magnetic Button
function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.25);
    y.set((e.clientY - (top + height / 2)) * 0.25);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.button>
  );
}

const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden font-sans flex flex-col"
    >
      {/* ── Cosmic parallax star field (full section background) ── */}
      <CosmicParallaxBg
        head="Team Avalanche"
        text="We, Create, Moment"
        loop={true}
      />

      {/* SCOPED ANIMATIONS */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* ── Hero content — inside the dark earth semicircle ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end text-center px-4 sm:px-8 pb-32 sm:pb-36 max-w-5xl mx-auto w-full">

        {/* Badge */}
        <div className="animate-fade-in delay-100 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center gap-2">
              The Official Event Powerhouse
              <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="animate-fade-in delay-200 max-w-xl text-sm sm:text-base md:text-lg text-white/60 leading-relaxed font-medium mb-8 sm:mb-10">
          WE JUST DON'T ORGANIZE EVENTS, WE CREATE MOMENTS
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
          <MagneticButton
            onClick={() => scrollTo(refs.eventsRef)}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 sm:px-10 sm:py-5 text-sm font-black text-[#090A0F] uppercase tracking-widest transition-all hover:scale-[1.02] hover:bg-cyan-300 active:scale-[0.98] shadow-lg shadow-cyan-500/20"
          >
            Check Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo(refs.teamRef)}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 sm:px-10 sm:py-5 text-sm font-black text-white uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
          >
            <Play className="w-4 h-4 fill-current" />
            Meet the Team
          </MagneticButton>
        </div>
      </div>

      {/* ── Sponsors Marquee ── */}
      <div
        ref={refs?.sponsorsRef}
        className="animate-fade-in delay-500 relative z-10 w-full border-t border-white/10 bg-white/[0.03] backdrop-blur-xl py-5 sm:py-6"
      >
        <p className="mb-3 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">
          Sponsors
        </p>
        <div
          className="relative flex overflow-hidden w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="animate-marquee flex gap-8 sm:gap-12 whitespace-nowrap px-4">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-3 opacity-40 transition-all hover:opacity-100 cursor-default grayscale hover:grayscale-0"
              >
                <client.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-tighter uppercase leading-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;