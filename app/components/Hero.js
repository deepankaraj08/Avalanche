'use client';

import React, { forwardRef, useRef, useState, useEffect } from 'react';
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
import { LightHeroBg }    from '@/components/light-hero-bg';

// --- MOCK BRANDS for the Marquee ---
const CLIENTS = [
  { name: 'Partner 1', image: '/logo.png' },
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden font-sans"
    >
      {isDark
        ? <CosmicParallaxBg
            head="Team Avalanche"
            text="Radiance Coming Soon"
            countdownTo="2026-04-29T15:15:00"
            loop={true}
          />
        : <LightHeroBg
            head="Team Avalanche"
            text="Radiance Coming Soon"
            countdownTo="2026-04-29T15:15:00"
            loop={true}
          />
      }

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

        /* SPONSORS BAR — Pro UI with beautiful colors */
        
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

        /* Light mode — VIBRANT COLOR PALETTE */
        :root:not(.dark) .sponsors-bar {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0) 0%,
            rgba(249,250,251,0.85) 50%,
            rgba(241,245,249,0.95) 100%
          );
          border-top: 1px solid rgba(147,197,253,0.3);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 
            0 -8px 32px rgba(59,130,246,0.06),
            0 -2px 8px rgba(168,85,247,0.04),
            0 -1px 0 rgba(147,197,253,0.2) inset;
        }

        /* Gradient accent line — VIBRANT */
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
            #3b82f6      15%,
            #8b5cf6      35%,
            #ec4899      55%,
            #f59e0b      75%,
            #10b981      90%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmerLine 4s linear infinite;
          opacity: 1;
        }

        /* Label — COLORFUL */
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
        :root:not(.dark) .sponsors-label {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          filter: drop-shadow(0 2px 4px rgba(59,130,246,0.1));
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

        /* Light mode sponsor item — COLORFUL & VIBRANT */
        :root:not(.dark) .sponsor-item {
          opacity: 0.65;
          border: 1px solid rgba(148,163,184,0.1);
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.6),
            rgba(249,250,251,0.4)
          );
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        :root:not(.dark) .sponsor-item:hover {
          opacity: 1;
          border-color: rgba(139,92,246,0.4);
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.95),
            rgba(239,246,255,0.8)
          );
          box-shadow: 
            0 8px 20px rgba(139,92,246,0.15),
            0 2px 6px rgba(59,130,246,0.1),
            0 0 0 1px rgba(236,72,153,0.1);
          transform: translateY(-2px) scale(1.04);
        }

        /* Sponsor name text — COLORFUL */
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
          background: linear-gradient(135deg, #1e293b, #334155);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
        :root:not(.dark) .sponsor-item:hover .sponsor-name {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Sponsor icon — COLORFUL */
        .sponsor-icon {
          color: rgba(255,255,255,0.80);
          transition: all 0.3s ease;
        }
        :root:not(.dark) .sponsor-icon {
          color: #64748b;
        }
        .sponsor-item:hover .sponsor-icon {
          color: #22d3ee;
        }
        :root:not(.dark) .sponsor-item:hover .sponsor-icon {
          color: #8b5cf6;
          filter: drop-shadow(0 2px 4px rgba(139,92,246,0.3));
        }

        /* Dot separator — COLORFUL */
        .sponsor-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.20);
          flex-shrink: 0;
        }
        :root:not(.dark) .sponsor-dot {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          opacity: 0.3;
        }

        /* Label dividers — COLORFUL light mode */
        :root:not(.dark) .h-px {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59,130,246,0.4),
            rgba(139,92,246,0.4),
            rgba(236,72,153,0.3),
            transparent
          ) !important;
        }
      `}</style>

      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-end text-center px-4 sm:px-8 w-full max-w-[90vw] md:max-w-4xl pointer-events-none bottom-[30%] sm:bottom-[24%] lg:bottom-[46%] xl:bottom-[48%]"
      >

        {/* Description — COLORFUL */}
        <p className={`max-w-xl flex flex-wrap justify-center text-center text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-8 sm:mb-10 lg:mb-12 transition-colors duration-300 ${
          isDark ? 'text-white/60' : 'text-transparent bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text'
        }`}>
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

        {/* CTA Buttons — COLORFUL */}
        <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center w-full max-w-xs sm:max-w-none pointer-events-auto lg:translate-y-8 xl:translate-y-10">
          <MagneticButton
            onClick={() => scrollTo(refs.eventsRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 sm:px-10 sm:py-5 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              isDark
                ? 'bg-white text-[#090A0F] hover:bg-cyan-300 shadow-cyan-500/20'
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/25'
            }`}
          >
            Check Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo(refs.teamRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 sm:px-10 sm:py-5 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all ${
              isDark
                ? 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30'
                : 'border-blue-300 bg-gradient-to-r from-white/80 via-blue-50/60 to-purple-50/60 hover:border-purple-300 shadow-md hover:shadow-lg'
            }`}
          >
            <Play className={`w-4 h-4 fill-current transition-transform group-hover:scale-110 ${
              isDark ? '' : 'text-blue-600 group-hover:text-purple-600 transition-colors'
            }`} />
            <span className={isDark ? '' : 'text-transparent bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text'}>
              Meet the Team
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Sponsors Marquee */}
      <div
        ref={refs?.sponsorsRef}
        className="sponsors-bar animate-fade-in delay-500 absolute bottom-0 left-0 right-0 z-10 w-full"
      >
        <div className="sponsors-gradient-line" />

        <div className="flex items-center justify-center gap-3 pt-3 pb-2">
          <div className={`h-px w-8 bg-gradient-to-r from-transparent ${
            isDark ? 'to-cyan-500/50' : 'to-blue-400/40'
          }`} />
          <span className="sponsors-label">Our Sponsors &amp; Partners</span>
          <div className={`h-px w-8 bg-gradient-to-l from-transparent ${
            isDark ? 'to-indigo-500/50' : 'to-purple-400/40'
          }`} />
        </div>

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