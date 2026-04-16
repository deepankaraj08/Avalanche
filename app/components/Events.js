'use client';

/**
 * Events.js
 *
 * MOBILE PERFORMANCE: On mobile, TiltCard skips GlowCard (which runs a global
 * pointermove listener + background-attachment:fixed causing full repaints),
 * skips all framer-motion spring hooks, and skips backdrop-blur.
 * Desktop keeps full 3D tilt + GlowCard spotlight effect.
 */

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlowCard } from '@/app/components/ui/spotlight-card';

const EVENT_DATA = [
  {
    id: '01',
    title: 'Radiance',
    subtitle: 'The Cultural Epicenter',
    description:
      'The definitive stage for performers. A grand showcase of dance, music, drama, and fashion where campus legends are born.',
    tags: ['Annual', 'Cultural', '3 DAYS'],
    accent: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'cyan',
  },
  {
    id: '02',
    title: 'Advento',
    subtitle: 'The Freshman Genesis',
    description:
      'A high-octane extravaganza designed to welcome new talent. Workshops, performances and unforgettable nights.',
    tags: ['1 Day', 'Concert'],
    accent: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'indigo',
  },
];

// ── Shared card content — no animation cost ──────────────────────────────────
const EventCardContent = ({ event }) => (
  <div className="relative bg-white/80 dark:bg-[#060b18]/70 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col border border-slate-200 dark:border-white/10 shadow-lg h-full">
    <div className="flex flex-wrap gap-2 mb-6">
      {event.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-white/80 text-[10px] font-bold uppercase tracking-wider"
        >
          {tag}
        </span>
      ))}
    </div>

    <h3 className={`text-[clamp(2rem,7vw,4rem)] font-black mb-3 leading-none ${event.accent}`}>
      {event.title}
    </h3>

    <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-semibold">
      {event.subtitle}
    </p>

    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-md">
      {event.description}
    </p>
  </div>
);

// ── Desktop-only TiltCard with 3D tilt + GlowCard ────────────────────────────
const TiltCardDesktop = ({ event, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <GlowCard glowColor={event.glowColor} radius={36} border={1} className="w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="group relative w-full h-full"
      >
        <EventCardContent event={event} />
      </motion.div>
    </GlowCard>
  );
};

// ── Mobile-only card — zero JS animation / GPU cost ──────────────────────────
const TiltCardMobile = ({ event, index }) => (
  <div
    className="event-card-fadein rounded-[2.25rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <EventCardContent event={event} />
  </div>
);

const Events = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      ref={ref}
      id="events"
      className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500 py-16 md:py-32"
    >
      {/* CSS fade-in for mobile cards */}
      <style>{`
        @keyframes eventCardFade {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .event-card-fadein {
          animation: eventCardFade 0.4s ease-out both;
        }
      `}</style>

      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none
          bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]"
        style={{
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />

      {/* ── Ambient colour blobs (hidden on mobile to save GPU) ── */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[8%] w-[560px] h-[560px] bg-indigo-300/30 dark:bg-indigo-700/12 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[8%] w-[480px] h-[480px] bg-cyan-300/30 dark:bg-cyan-700/12 rounded-full blur-[110px]" />
        <div className="absolute bottom-[8%] left-1/2 w-[660px] h-[380px] bg-blue-400/20 dark:bg-blue-800/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[600px]
          bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15)_0%,transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_65%)]
          pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-cyan-600 dark:text-cyan-500 text-xs font-bold tracking-[0.5em] uppercase mb-4">
              The Core Experiences
            </p>
            <h2 className="text-[clamp(2.5rem,9vw,6rem)] font-black leading-[0.9] text-slate-900 dark:text-white">
              Flagship Events
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs lg:text-right">
            Two legendary experiences defining the spirit of the campus.
          </p>
        </div>

        {/* ── Event Cards ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16">
          {EVENT_DATA.map((event, idx) => (
            <div key={event.id} className={idx === 1 ? 'xl:mt-24' : ''}>
              {isMobile
                ? <TiltCardMobile event={event} index={idx} />
                : <TiltCardDesktop event={event} index={idx} />
              }
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

Events.displayName = 'Events';
export default Events;