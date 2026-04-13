'use client';

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { GlowCard } from '@/app/components/ui/spotlight-card';

const EVENT_DATA = [
  {
    id: '01',
    title: 'Radiance',
    subtitle: 'The Cultural Epicenter',
    description: 'The definitive stage for performers. A grand showcase of dance, music, drama, and fashion where campus legends are born and the spotlight never fades.',
    tags: ['Annual', 'Cultural', '3 DAYS'],
    color: 'from-cyan-400/30 to-sky-500/30',
    accent: 'text-cyan-400',
    border: 'group-hover:border-cyan-500/40',
    glow: 'rgba(34, 211, 238, 0.25)',
    glowColor: 'cyan',
  },
  {
    id: '02',
    title: 'Advento',
    subtitle: 'The Freshman Genesis',
    description: 'A week-long high-octane extravaganza designed to welcome new talent. From technical workshops to electrifying concert nights, this is where your journey begins.',
    tags: ['1 Day', 'Concert'],
    color: 'from-blue-600/30 to-indigo-500/30',
    accent: 'text-indigo-400',
    border: 'group-hover:border-indigo-500/40',
    glow: 'rgba(99, 102, 241, 0.25)',
    glowColor: 'indigo',
  }
];

// Staggered Title Animation
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
  };
  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 14, stiffness: 100 } },
    hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(5px)" },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TiltCard = ({ event, index }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, premium spring physics
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <GlowCard glowColor={event.glowColor} radius={48} border={2} className="w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : rotateX,
          rotateY: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8, type: "spring", damping: 20 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative perspective-[1500px] transform-gpu w-full h-full"
      >
        {/* Deep Shadow Glow behind the card */}
        <div
          className={`absolute -inset-2 rounded-[3.5rem] bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 pointer-events-none`}
        />

        {/* Main Glass Card */}
        <div className={`relative bg-white/70 dark:bg-[#060b18]/60 backdrop-blur-xl md:backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 h-full flex flex-col border border-white/60 dark:border-white/10 transition-all duration-700 overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(0,0,0,0.2)] ${event.border}`}>

          {/* Dynamic Inner Spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  700px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])},
                  ${event.glow},
                  transparent 70%
                )
              `,
            }}
          />

          {/* Ambient Noise Texture — desktop only */}
          {!isMobile && (
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
          )}

          {/* Liquid Glint Animation */}
          <motion.div
            animate={{ x: ['-200%', '300%'], skewX: -25 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear", repeatDelay: event.id === '01' ? 1 : 4 }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
          />

          {/* ID Number Watermark */}
          <span className="absolute -right-10 -top-16 text-[12rem] md:text-[20rem] font-black text-slate-100 dark:text-white/[0.02] select-none group-hover:text-slate-200 dark:group-hover:text-white/[0.05] transition-colors duration-1000 leading-none">
            {event.id}
          </span>

          {/* Interactive 3D Content Container */}
          <div className="relative z-10 flex flex-col h-full transform-gpu transition-transform duration-500 ease-out" style={{ transform: isHovered && !isMobile ? "translateZ(60px) scale(1.02)" : "translateZ(0px)" }}>

            <div className="flex flex-wrap gap-3 mb-10 w-full">
              {event.tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] md:text-[10px] font-black text-slate-500 dark:text-white/60 uppercase tracking-[0.25em] shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className={`text-[clamp(2.5rem,8vw,6rem)] font-black mb-4 tracking-tighter leading-none italic ${event.accent} drop-shadow-sm`}>
              {event.title}
            </h3>

            <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white/90 mb-8 tracking-widest uppercase text-[10px] md:text-xs">
              {event.subtitle}
            </p>

            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-lg leading-relaxed font-medium opacity-90 max-w-md">
              {event.description}
            </p>

            <div className="mt-auto pt-14 border-t border-slate-200 dark:border-white/10 flex items-center justify-between cursor-pointer group/btn">
              <span className="text-xs font-black tracking-widest uppercase text-slate-800 dark:text-white opacity-60 group-hover/btn:opacity-100 transition-opacity">
                Explore Timeline
              </span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border border-slate-300 dark:border-white/20 group-hover/btn:bg-slate-900 group-hover/btn:dark:bg-white group-hover/btn:text-white group-hover/btn:dark:text-slate-900 group-hover/btn:scale-110 shadow-lg`}>
                <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </GlowCard>
  );
};

const Events = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={ref} className={`${isMobile ? 'py-16 mt-[-10px]' : 'py-24 md:py-40 lg:py-52 mt-[-2px]'} relative bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden`} id="events">

      {/* 1. HIGH-END AMBIENT BACKGROUND */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >


        {/* Soft, moving gradient orbs */}
        <motion.div
          animate={isMobile ? {} : { x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 translate-x-1/3"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, 60, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen translate-y-1/4 -translate-x-1/4"
        />
      </div>

      {/* Light Mode Specific Ambient Blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none block dark:hidden"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        <div className="absolute top-[10%] left-0 w-[600px] h-[600px] bg-cyan-100/60 rounded-full blur-[100px] -translate-x-1/3" />
        <div className="absolute bottom-[10%] right-0 w-[700px] h-[700px] bg-indigo-100/60 rounded-full blur-[120px] translate-x-1/3" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Designer Header */}
        <header className="mb-16 md:mb-28 lg:mb-40 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
          <div className="space-y-6 md:space-y-8 max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
              <p className="text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.6em] uppercase">
                The Core Experiences
              </p>
            </motion.div>

            <AnimatedTitle
              text="Flagship Events."
              className="text-[clamp(3rem,10vw,8rem)] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-500 xl:text-right font-bold text-xs md:text-sm leading-relaxed tracking-[0.2em] uppercase max-w-[320px] shrink-0 pb-4"
          >
            We define the spirit of the campus through two legendary, meticulously crafted experiences.
          </motion.p>
        </header>

        {/* Premium Event Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-20 items-stretch">
          {EVENT_DATA.map((event, idx) => (
            <div key={event.id} className={idx === 1 ? "xl:mt-32" : ""}>
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