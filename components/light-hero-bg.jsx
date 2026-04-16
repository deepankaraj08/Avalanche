'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   LightHeroBg  —  "Background Paths" white-mode hero
   Adapted from the BackgroundPaths concept (user-supplied).
   Dark mode is completely unaffected — this component is only rendered
   when isDark === false in Hero.js.
───────────────────────────────────────────────────────────────────────────── */

/** One set of 36 animated SVG paths that flow across the screen */
function FloatingPaths({ position, durationMult = 1, strokeMult = 1 }) {
  // useMemo so durations are stable (avoids hydration mismatch from Math.random)
  const paths = useMemo(() =>
    Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      strokeOpacity: 0.1 + i * 0.03,
      strokeWidth: (0.5 + i * 0.03) * strokeMult,
      // stable pseudo-random duration × speed multiplier
      duration: (20 + (i * 7919) % 10) * durationMult,
    })),
    [position, durationMult, strokeMult]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="rgba(15,23,42,1)"
            strokeWidth={path.strokeWidth}
            strokeOpacity={path.strokeOpacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
const LightHeroBg = ({ head, text, countdownTo, loop = true }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  // Detect mobile for faster path animation speed
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile: 0.35× duration (~3× faster) + 0.45× stroke (thinner lines)
  const durationMult = isMobile ? 0.35 : 1;
  const strokeMult = isMobile ? 0.45 : 1;

  /* animation-iteration CSS var — keeps typewriter in sync with CosmicParallaxBg */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1',
    );
  }, [loop]);

  /* Countdown timer */
  useEffect(() => {
    if (!countdownTo) return;
    const calc = () => {
      const diff = new Date(countdownTo).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
      return true;
    };
    calc();
    const id = setInterval(() => { if (!calc()) clearInterval(id); }, 1000);
    return () => clearInterval(id);
  }, [countdownTo]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        background: '#ffffff',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        /* ── Title ── */
        .lhb-title {
          position: absolute;
          top: 28%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(2rem, 5vw, 5.5rem);
          font-weight: 900;
          letter-spacing: 0.2em;
          padding-left: 0.2em;
          text-align: center;
          pointer-events: none;
          width: 95%;
          white-space: normal;
          line-height: 1.1;
          z-index: 2;
          /* Soft dark glow to contrast the bright paths */
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
          
          /* The 'Pro' Holographic/Oil-Slick Gradient */
          background: linear-gradient(
            to right,
            #1e1b4b 0%,    /* Midnight Indigo */
            #8b5cf6 20%,   /* Vivid Violet */
            #06b6d4 40%,   /* Electric Cyan */
            #f472b6 60%,   /* Neon Pink */
            #3b82f6 80%,   /* Electric Blue */
            #1e1b4b 100%   /* Seamless Loop */
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lhbHoloFlow 5s linear infinite;
        }

        /* Animate the gradient horizontally */
        @keyframes lhbHoloFlow {
          to { background-position: -200% center; }
        }

        .lhb-char {
          display: inline-block;
          visibility: hidden; /* Replaces opacity to prevent clipping bugs on the parent! */
          animation: lhbCharType 6s var(--animation-iteration, infinite) step-end;
        }

        @keyframes lhbCharType {
          0%, 7%    { visibility: hidden; }
          8%, 79%   { visibility: visible; }
          80%, 100% { visibility: hidden; }
        }
        .lhb-cursor {
          display: inline-block;
          color: #0f172a;
          font-weight: 100;
          font-size: 0.85em;
          margin-left: 2px;
          vertical-align: middle;
          animation:
            lhbCursorBlink 0.55s step-end infinite,
            lhbCursorFade  6s var(--animation-iteration, infinite) step-end;
        }
        @keyframes lhbCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes lhbCursorFade {
          0%        { opacity: 0; }
          6%        { opacity: 1; }
          78%       { opacity: 1; }
          80%, 100% { opacity: 0; }
        }

        /* ── Countdown ── */
        .lhb-subtitle {
          position: absolute;
          bottom: 13%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          pointer-events: auto;
        }
        @media (min-width: 640px) { .lhb-subtitle { bottom: 18%; } }

        .lhb-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          /* frosted white glass — subtle, consistent with the minimal paths aesthetic */
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(15, 23, 42, 0.10);
          padding: 16px 28px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 8px 32px rgba(15, 23, 42, 0.08),
            0 1px 0 rgba(255,255,255,0.90) inset;
        }
        @media (min-width: 768px) { .lhb-card { padding: 14px 22px; border-radius: 20px; } }

        .lhb-header {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(15, 23, 42, 0.55);
          animation: lhbPulse 2.5s ease-in-out infinite;
        }
        @keyframes lhbPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.90; }
        }

        .lhb-digits { display: flex; align-items: center; justify-content: center; gap: 10px; }
        @media (min-width: 768px) { .lhb-digits { gap: 14px; } }

        .lhb-unit  { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 35px; }
        @media (min-width: 768px) { .lhb-unit { min-width: 40px; } }

        .lhb-num {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          color: #0f172a;
          transition: color 0.4s;
        }
        @media (min-width: 768px) { .lhb-num { font-size: 1.875rem; } }
        .lhb-unit:hover .lhb-num { color: rgba(15,23,42,0.60); }

        .lhb-label {
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(15, 23, 42, 0.35);
        }
        @media (min-width: 768px) { .lhb-label { font-size: 7.5px; } }

        .lhb-sep {
          color: rgba(15, 23, 42, 0.20);
          font-size: 1.25rem;
          font-weight: 300;
          padding-bottom: 12px;
          line-height: 1;
        }
        .lhb-num-sec  { color: rgba(15,23,42,0.45); }
        .lhb-label-sec { color: rgba(15,23,42,0.30); }
      `}</style>

      {/* ── Flowing SVG paths (two mirrored sets = full symmetric fill) ── */}
      <FloatingPaths position={1} durationMult={durationMult} strokeMult={strokeMult} />
      <FloatingPaths position={-1} durationMult={durationMult} strokeMult={strokeMult} />

      {/* ── Title (matching CosmicParallaxBg positioning) ── */}
      <div className="lhb-title">
        {head.toUpperCase().split('').map((char, i) =>
          char === ' ' ? (
            <span key={i}>
              <br className="block md:hidden" />
              <span
                className="hidden md:inline-block lhb-char"
                style={{ animationDelay: `${i * 0.08}s`, minWidth: '0.4em' }}
              >&nbsp;</span>
            </span>
          ) : (
            <span
              key={i}
              className="lhb-char"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char}
            </span>
          )
        )}
        <span className="lhb-cursor">|</span>
      </div>

      {/* ── Countdown widget ── */}
      {countdownTo && (
        <div className="lhb-subtitle">
          <div className="lhb-card">
            <div className="lhb-header">{text.toUpperCase()}</div>
            <div className="lhb-digits">

              <div className="lhb-unit">
                <span className="lhb-num">{timeLeft.days}</span>
                <span className="lhb-label">Days</span>
              </div>
              <span className="lhb-sep">:</span>

              <div className="lhb-unit">
                <span className="lhb-num">{pad(timeLeft.hours)}</span>
                <span className="lhb-label">Hrs</span>
              </div>
              <span className="lhb-sep">:</span>

              <div className="lhb-unit">
                <span className="lhb-num">{pad(timeLeft.minutes)}</span>
                <span className="lhb-label">Min</span>
              </div>
              <span className="lhb-sep">:</span>

              <div className="lhb-unit">
                <span className="lhb-num lhb-num-sec">{pad(timeLeft.seconds)}</span>
                <span className="lhb-label lhb-label-sec">Sec</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { LightHeroBg };
