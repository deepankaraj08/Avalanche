'use client';

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const EVENT_DATA = [
  {
    id: '01',
    title: 'ADVENTO',
    subtitle: 'The Freshman Genesis',
    description: 'A week-long high-octane extravaganza designed to welcome new talent. From technical workshops to electrifying concert nights, this is where your journey begins.',
    tags: ['1 Day', 'Concert'],
    color: 'from-blue-600/30 to-cyan-400/30',
    accent: 'text-blue-400',
    border: 'group-hover:border-blue-500/50',
    glow: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: '02',
    title: 'RADIANCE',
    subtitle: 'The Cultural Epicenter',
    description: 'The definitive stage for performers. A grand showcase of dance, music, drama, and fashion where campus legends are born and the spotlight never fades.',
    tags: ['Annual', 'Cultural', '3 DAYS'],
    color: 'from-cyan-400/30 to-sky-500/30',
    accent: 'text-cyan-400',
    border: 'group-hover:border-cyan-500/50',
    glow: 'rgba(34, 211, 238, 0.4)'
  }
];

const TiltCard = ({ event, index }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Completely disable rotation values on mobile to save CPU
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: "-20px" }}
      className="group relative perspective-[1500px] transform-gpu will-change-transform"
    >
      {/* Dynamic Glow Layer - Reduced blur for mobile performance */}
      <div
        className={`absolute -inset-[2px] rounded-[3rem] bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 blur-xl md:blur-2xl transition-opacity duration-700 pointer-events-none`}
      />

      {/* Main Card */}
      <div className={`relative bg-white/90 dark:bg-[#020617]/70 backdrop-blur-xl md:backdrop-blur-3xl rounded-[2.5rem] md:rounded-[2.8rem] p-7 md:p-14 h-full flex flex-col border border-slate-200 dark:border-white/5 transition-all duration-500 overflow-hidden ${event.border}`}>

        {/* ID Number: Simplified animation for mobile */}
        <span className="absolute -right-6 -top-10 text-[8rem] md:text-[14rem] font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-all duration-1000 leading-none">
          {event.id}
        </span>

        {/* Content Container: Removed translateZ on mobile to prevent "stair-step" lag */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: isMobile ? "none" : "translateZ(50px)" }}>
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10">
            {event.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[8px] md:text-[10px] font-black text-slate-500 dark:text-white/60 uppercase tracking-[0.2em]">
                {tag}
              </span>
            ))}
          </div>

          <h3 className={`text-[clamp(2.5rem,8vw,4.5rem)] font-black mb-3 md:mb-4 tracking-tighter leading-none ${event.accent}`}>
            {event.title}
          </h3>

          <p className="text-base md:text-2xl font-bold text-slate-800 dark:text-white/90 mb-5 md:mb-8 italic tracking-tight">
            {event.subtitle}
          </p>

          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-lg leading-relaxed font-medium opacity-80 max-w-md">
            {event.description}
          </p>

          <div className="mt-auto pt-8 md:pt-12 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              Explore Timeline
            </span>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-300 dark:border-white/10 flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
              →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Events = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-20 md:py-44 relative bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden" id="events">

      {/* 1. THE STARS - Optimized count for mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block">
        <SpaceStars starCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 180} className="opacity-40" />
      </div>

      {/* 2. BACKGROUND POLISH */}
      <div className="absolute inset-0 -z-10 pointer-events-none transform-gpu hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_10%,_#020617_90%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-14 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "50px" }}
              viewport={{ once: true }}
              className="h-[2px] bg-cyan-500"
            />
            <h2 className="text-[clamp(3rem,10vw,6rem)] font-black text-white tracking-tighter leading-[0.9]">
              Flagship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Events</span>
            </h2>
          </div>

          <p className="text-slate-400 dark:text-gray-500 max-w-[280px] md:max-w-sm lg:text-right font-bold text-[10px] md:text-base leading-relaxed tracking-widest uppercase">
            WE DEFINE THE SPIRIT OF THE CAMPUS THROUGH TWO LEGENDARY EXPERIENCES.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          {EVENT_DATA.map((event, idx) => (
            <TiltCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});

Events.displayName = 'Events';
export default Events;