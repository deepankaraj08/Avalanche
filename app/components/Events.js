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
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative perspective-[1500px]"
    >
      {/* Dynamic Glow Layer */}
      <div 
        className={`absolute -inset-[2px] rounded-[3rem] bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700`} 
        style={{ filter: `drop-shadow(0 0 20px ${event.glow})` }}
      />

      {/* Main Card - Lowered background opacity for star visibility */}
      <div className={`relative bg-[#020617]/60 backdrop-blur-3xl rounded-[2.8rem] p-8 md:p-14 h-full flex flex-col border border-white/5 transition-all duration-500 overflow-hidden ${event.border}`}>
        
        <span className="absolute -right-6 -top-10 text-[10rem] md:text-[14rem] font-black text-white/[0.02] select-none group-hover:text-white/[0.05] group-hover:translate-x-[-20px] transition-all duration-1000">
          {event.id}
        </span>

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
          <div className="flex flex-wrap gap-3 mb-6 md:mb-10">
            {event.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-white/70 uppercase tracking-[0.2em] backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>

          <h3 className={`text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none ${event.accent}`}>
            {event.title}
          </h3>

          <p className="text-lg md:text-2xl font-bold text-white/90 mb-6 md:mb-8 italic tracking-tight">
            {event.subtitle}
          </p>

          <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-medium opacity-80 max-w-md">
            {event.description}
          </p>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Explore Timeline
            </span>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all`}>
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
    <section ref={ref} className="py-24 md:py-44 relative bg-[#020617] text-white">
      {/* 1. THE STARS - Increased count and placed at bottom */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars starCount={180} className="opacity-60" />
      </div>
      
      {/* 2. BACKGROUND POLISH - Gradient window to keep stars visible */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_10%,_#020617_90%)] opacity-50" />
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              className="h-[2px] bg-cyan-500" 
            />
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
              Flagship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Events</span>
            </h2>
          </div>

          <p className="text-gray-500 max-w-sm lg:text-right font-bold text-xs md:text-base leading-relaxed tracking-wide uppercase">
            WE DEFINE THE SPIRIT OF THE CAMPUS THROUGH TWO LEGENDARY EXPERIENCES.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-20">
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