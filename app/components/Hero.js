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
  Cpu,
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { CosmicParallaxBg } from '@/components/parallax-cosmic-background';
import { LightHeroBg }    from '@/components/light-hero-bg';

// --- SPONSOR CALL-TO-ACTION ---
const CLIENTS = [
  { name: "It's your chance", icon: Star },
  { name: 'To be here', icon: Gem },
  { name: 'Partner with Us', icon: Hexagon },
  { name: 'Spotlight your brand', icon: CommandIcon },
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
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        /* ── BROCHURE BAR ── */
        .brochure-bar {
          background: linear-gradient(
            to top,
            rgba(2,6,23,0.85) 0%,
            rgba(2,6,23,0.50) 60%,
            rgba(2,6,23,0.0) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        :root:not(.dark) .brochure-bar {
          background: linear-gradient(
            to top,
            rgba(255,255,255,0.92) 0%,
            rgba(249,250,251,0.75) 60%,
            rgba(255,255,255,0.0) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Animated gradient line */
        .brochure-top-line {
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #22d3ee 20%,
            #6366f1 40%,
            #ec4899 60%,
            #f59e0b 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmerLine 3s linear infinite;
        }
        @keyframes shimmerLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        :root:not(.dark) .brochure-top-line {
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #3b82f6 15%,
            #8b5cf6 35%,
            #ec4899 55%,
            #f59e0b 75%,
            #10b981 90%,
            transparent 100%
          );
          background-size: 200% 100%;
        }

        /* PDF icon pulse glow */
        @keyframes pdfPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(34,211,238,0.15), 0 0 0 rgba(99,102,241,0); }
          50%      { box-shadow: 0 0 16px rgba(34,211,238,0.3), 0 0 30px rgba(99,102,241,0.1); }
        }
        .pdf-icon-wrap {
          animation: pdfPulse 3s ease-in-out infinite;
        }
        :root:not(.dark) .pdf-icon-wrap {
          animation: pdfPulseLight 3s ease-in-out infinite;
        }
        @keyframes pdfPulseLight {
          0%, 100% { box-shadow: 0 0 8px rgba(99,102,241,0.1), 0 0 0 rgba(236,72,153,0); }
          50%      { box-shadow: 0 0 16px rgba(99,102,241,0.2), 0 0 30px rgba(236,72,153,0.08); }
        }

        /* Button hover shimmer */
        @keyframes btnShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .brochure-btn-view:hover,
        .brochure-btn-dl:hover {
          animation: btnShimmer 1.5s ease-in-out;
        }
      `}</style>


      {/* Description + CTA Buttons */}

      {/* MOBILE: anchored just below the horizon, flows downward */}
      <div className="sm:hidden absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-start text-center px-6 w-full max-w-[90vw] pointer-events-none top-[48%]">
        {/* Description */}
        <p className={`max-w-xs flex flex-wrap justify-center text-center text-sm leading-relaxed font-medium mb-6 transition-colors duration-300 ${
          isDark ? 'text-white/60' : 'text-transparent bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text'
        }`}>
          {"WE JUST DON'T ORGANIZE EVENTS, WE CREATE MOMENTS".split(" ").map((word, i) => (
            <span key={i} className="inline-block animate-text-reveal opacity-0" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
              {word}&nbsp;
            </span>
          ))}
        </p>
        <div className="animate-fade-in delay-400 flex flex-col gap-3 justify-center w-full max-w-xs pointer-events-auto">
          <MagneticButton
            onClick={() => scrollTo(refs.eventsRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              isDark ? 'bg-white text-[#090A0F] hover:bg-cyan-300 shadow-cyan-500/20' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/25'
            }`}
          >
            Check Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo(refs.teamRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all ${
              isDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30' : 'border-blue-300 bg-gradient-to-r from-white/80 via-blue-50/60 to-purple-50/60 hover:border-purple-300 shadow-md'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isDark ? '' : 'text-blue-600'}`} />
            <span className={isDark ? '' : 'text-transparent bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text'}>Meet the Team</span>
          </MagneticButton>
        </div>
      </div>

      {/* DESKTOP (sm+): bottom-anchored, flows upward */}
      <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center justify-end text-center px-8 w-full max-w-[90vw] md:max-w-4xl pointer-events-none bottom-[24%] lg:bottom-[30%]">
        <p className={`max-w-xl flex flex-wrap justify-center text-center text-base md:text-lg leading-relaxed font-medium mb-10 transition-colors duration-300 ${
          isDark ? 'text-white/60' : 'text-transparent bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text'
        }`}>
          {"WE JUST DON'T ORGANIZE EVENTS, WE CREATE MOMENTS".split(" ").map((word, i) => (
            <span key={i} className="inline-block animate-text-reveal opacity-0" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
              {word}&nbsp;
            </span>
          ))}
        </p>
        <div className="animate-fade-in delay-400 flex flex-row gap-5 justify-center w-full pointer-events-auto">
          <MagneticButton
            onClick={() => scrollTo(refs.eventsRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full px-10 py-5 text-sm font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              isDark ? 'bg-white text-[#090A0F] hover:bg-cyan-300 shadow-cyan-500/20' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/25'
            }`}
          >
            Check Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo(refs.teamRef)}
            className={`group inline-flex items-center justify-center gap-2 rounded-full border px-10 py-5 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all ${
              isDark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30' : 'border-blue-300 bg-gradient-to-r from-white/80 via-blue-50/60 to-purple-50/60 hover:border-purple-300 shadow-md hover:shadow-lg'
            }`}
          >
            <Play className={`w-4 h-4 fill-current transition-transform group-hover:scale-110 ${isDark ? '' : 'text-blue-600 group-hover:text-purple-600 transition-colors'}`} />
            <span className={isDark ? '' : 'text-transparent bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text'}>Meet the Team</span>
          </MagneticButton>
        </div>
      </div>

      {/* ── Sponsorship Brochure Bar ── */}
      <div
        ref={refs?.sponsorsRef}
        className="brochure-bar animate-fade-in delay-500 absolute bottom-0 left-0 right-0 z-10 w-full"
      >
        <div className="brochure-top-line" />

        {/* Sponsor Label */}
        <div className="flex items-center justify-center gap-3 pt-2.5 pb-1">
          <div className={`h-px w-6 bg-gradient-to-r from-transparent ${
            isDark ? 'to-cyan-500/50' : 'to-blue-400/40'
          }`} />
          <span className={`text-[8px] font-black uppercase tracking-[0.4em] ${
            isDark
              ? 'bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'
          }`}>
            Our Sponsors &amp; Partners
          </span>
          <div className={`h-px w-6 bg-gradient-to-l from-transparent ${
            isDark ? 'to-indigo-500/50' : 'to-purple-400/40'
          }`} />
        </div>

        {/* Mobile: 2 rows | Desktop: 1 row */}
        <div className="py-2 pb-3 px-4 sm:px-8">

          {/* Row 1 on mobile / Left side on desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">

            {/* PDF icon + label */}
            <div className="flex items-center gap-2.5">
              <div className={`pdf-icon-wrap flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 border border-cyan-400/20'
                  : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/50'
              }`}>
                <FileText className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  isDark ? 'text-cyan-400' : 'text-indigo-600'
                }`} />
              </div>
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'
              }`}>
                Sponsorship Brochure
              </span>
            </div>

            {/* Separator — desktop only */}
            <div className={`hidden sm:block flex-shrink-0 w-px h-6 ${
              isDark ? 'bg-white/10' : 'bg-slate-200'
            }`} />

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-1.5 sm:mt-0">
              {/* View */}
              <a
                href="/pdf/Avalanche_Sponsor.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`brochure-btn-view group inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.06] text-white/80 border border-white/10 hover:bg-white/[0.12] hover:border-cyan-400/30 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:shadow-lg hover:shadow-purple-100/50'
                }`}
              >
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:scale-110" />
                View
              </a>

              {/* Download */}
              <a
                href="/pdf/Avalanche_Sponsor.pdf"
                download="Avalanche_Sponsor.pdf"
                className={`brochure-btn-dl group inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-cyan-300 border border-cyan-400/25 hover:from-cyan-500/35 hover:to-indigo-500/35 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-500/15'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white border-0 shadow-md shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-110'
                }`}
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-y-0.5" />
                Download
              </a>
            </div>

          </div>
        </div>
      </div>


    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;