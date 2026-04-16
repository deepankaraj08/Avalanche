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
  { name: 'Partner 1', image: '/logo.png' }, // Example of an image sponsor
  { name: 'Brand X', icon: Hexagon },
  { name: 'Brand Y', icon: Triangle },
  { name: 'Brand Z', icon: CommandIcon },
  { name: 'Studio A', icon: Ghost },
  { name: 'Agency b', icon: Gem },
  { name: 'Tech C', icon: Cpu },
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
      className="relative min-h-screen w-full overflow-hidden font-sans"
    >
      {/* ── Cosmic parallax star field (full section background) ── */}
      <CosmicParallaxBg
  head="Team Avalanche"
  text="Radiance Coming Soon"
  countdownTo="2026-04-30T17:15:00"
  loop={true}
/>

      {/* SCOPED ANIMATIONS */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-text-reveal {
          animation: textReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        /* ═══════════════════════════════════════════
           SPONSORS BAR — Pro UI
        ═══════════════════════════════════════════ */

        /* Dark mode bar */
        .sponsors-bar {
          background: linear-gradient(
            to bottom,
            rgba(2,6,23,0.0) 0%,
            rgba(2,6,23,0.72) 100%
          );
          border-top: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.25);
        }

        /* Light / Day mode — pure WHITE, no grey */
        :root:not(.dark) .sponsors-bar {
          background: #ffffff;
          border-top: 1px solid rgba(226,232,240,1);
          box-shadow: 0 -4px 24px rgba(0,0,0,0.06);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        /* Gradient accent line (top of bar) */
        .sponsors-gradient-line {
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent  0%,
            #22d3ee      20%,
            #6366f1      50%,
            #ec4899      80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmerLine 4s linear infinite;
        }
        @keyframes shimmerLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        :root:not(.dark) .sponsors-gradient-line {
          background: linear-gradient(
            90deg,
            transparent  0%,
            #22d3ee      20%,
            #6366f1      50%,
            #a855f7      80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmerLine 4s linear infinite;
        }

        /* Label */
        .sponsors-label {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #22d3ee, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Sponsor item pill */
        .sponsor-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid transparent;
          opacity: 0.42;
          filter: grayscale(1);
          transition: opacity 0.3s ease, filter 0.3s ease,
                      transform 0.25s ease, border-color 0.3s ease,
                      background 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          white-space: nowrap;
        }
        .sponsor-item:hover {
          opacity: 1;
          filter: grayscale(0);
          transform: translateY(-2px) scale(1.04);
          border-color: rgba(34,211,238,0.35);
          background: rgba(34,211,238,0.06);
          box-shadow: 0 4px 20px rgba(34,211,238,0.12);
        }

        /* Light mode sponsor item */
        :root:not(.dark) .sponsor-item {
          opacity: 0.50;
          border-color: transparent;
          background: transparent;
        }
        :root:not(.dark) .sponsor-item:hover {
          border-color: rgba(99,102,241,0.30);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 4px 16px rgba(99,102,241,0.12);
          opacity: 1;
        }

        /* Sponsor name text */
        .sponsor-name {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.90);
          line-height: 1;
          transition: color 0.3s ease;
        }
        :root:not(.dark) .sponsor-name {
          color: #334155;
        }

        /* Sponsor icon */
        .sponsor-icon {
          color: rgba(255,255,255,0.80);
          transition: color 0.3s ease;
        }
        :root:not(.dark) .sponsor-icon {
          color: #475569;
        }
        .sponsor-item:hover .sponsor-icon {
          color: #22d3ee;
        }
        :root:not(.dark) .sponsor-item:hover .sponsor-icon {
          color: #6366f1;
        }

        /* Dot separator between items */
        .sponsor-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.20);
          flex-shrink: 0;
        }
        :root:not(.dark) .sponsor-dot {
          background: rgba(0,0,0,0.15);
        }
      `}</style>

      {/* ── Hero content ── */}
      {/* FIX: Changed lg:bottom-[28%] to lg:bottom-[38%] and added xl:bottom-[40%] to lift it off the timer on laptops/desktops. Mobile stays exactly the same. */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-end text-center px-4 sm:px-8 w-full max-w-[90vw] md:max-w-4xl pointer-events-none bottom-[30%] sm:bottom-[24%] lg:bottom-[38%] xl:bottom-[40%]"
      >

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
        {/* FIX: Added lg:mb-12 to give a tiny bit more breathing room above the buttons on desktop */}
        <p className="max-w-xl flex flex-wrap justify-center text-center text-sm sm:text-base md:text-lg text-white/60 leading-relaxed font-medium mb-8 sm:mb-10 lg:mb-12">
          {"WE JUST DON'T ORGANIZE EVENTS, WE CREATE MOMENTS".split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block animate-text-reveal opacity-0"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>

        {/* CTA Buttons */}
        {/* FIX: Increased desktop gap from sm:gap-4 to sm:gap-5 for better visual spacing */}
        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center w-full max-w-xs sm:max-w-none pointer-events-auto">
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
        className="sponsors-bar animate-fade-in delay-500 absolute bottom-0 left-0 right-0 z-10 w-full"
      >
        {/* Animated shimmer top line */}
        <div className="sponsors-gradient-line" />

        {/* Label row */}
        <div className="flex items-center justify-center gap-3 pt-3 pb-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="sponsors-label">Our Sponsors &amp; Partners</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>

        {/* Marquee track */}
        <div
          className="relative flex overflow-hidden w-full py-2 pb-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="animate-marquee flex items-center gap-0 whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <>
                <div key={`item-${i}`} className="sponsor-item">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      loading="lazy"
                      className="h-5 w-auto sm:h-6 object-contain"
                    />
                  ) : (
                    <client.icon className="sponsor-icon h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                  <span className="sponsor-name">{client.name}</span>
                </div>
                <div key={`dot-${i}`} className="sponsor-dot" />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;