'use client';

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
    // Fixed for light/dark mode contrast
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
    // Fixed for light/dark mode contrast
    accent: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'indigo',
  },
];

const TiltCard = ({ event, index }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <GlowCard glowColor={event.glowColor} radius={36} border={1} className="w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="group relative w-full h-full"
      >
        <div className="relative bg-white/80 dark:bg-[#060b18]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col border border-slate-200 dark:border-white/10 shadow-lg transition-all h-full">
          
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag) => (
              <span
                key={tag}
                // Fixed bg and text colors for light/dark mode contrast
                className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-white/80 text-[10px] font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`text-[clamp(2rem,7vw,4rem)] font-black mb-3 leading-none ${event.accent}`}
          >
            {event.title}
          </h3>

          <p className="text-xs md:text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 font-semibold">
            {event.subtitle}
          </p>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-md">
            {event.description}
          </p>
        </div>
      </motion.div>
    </GlowCard>
  );
};

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
      className={`relative w-full overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500 ${
        isMobile ? 'py-16' : 'py-32'
      }`}
    >
      {/* ── Background grid (Matches Team, Gallery & About) ── */}
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

      {/* ── Ambient colour blobs (Matches Team, Gallery & About) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
        
        {/* header */}
        <div className="mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-cyan-600 dark:text-cyan-500 text-xs font-bold tracking-[0.5em] uppercase mb-4">
              The Core Experiences
            </p>
            {/* Fixed text color for light mode visibility */}
            <h2 className="text-[clamp(2.5rem,9vw,6rem)] font-black leading-[0.9] text-slate-900 dark:text-white">
              Flagship Events
            </h2>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs lg:text-right">
            Two legendary experiences defining the spirit of the campus.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16">
          {EVENT_DATA.map((event, idx) => (
            <div key={event.id} className={idx === 1 ? "xl:mt-24" : ""}>
              <TiltCard event={event} index={idx} />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
});

Events.displayName = 'Events';
export default Events;