'use client';

/**
 * Events.js - Premium Pro UI (Restored & Fixed)
 * 
 * RESOLVED:
 * - Fixed 500 error caused by invalid emoji component rendering.
 * - Restored 3D Flip Cards for desktop.
 * - Fixed visibility issues on non-scrolling pages.
 */

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, ArrowRight, Star, Music, Zap, Terminal } from 'lucide-react';

const EVENT_DATA = [
  {
    id: '01',
    title: 'Radiance',
    subtitle: 'A Celebration of Art & Culture',
    description: 'A celebration of art, culture, and creativity — bringing the campus alive with vibrant performances, captivating exhibitions, and boundless talent. This event showcases the dynamic spirit of our student community, where various clubs come together to present electrifying dance routines, soulful musical acts, and powerful theatrical performances.',
    tags: ['Cultural', 'Annual Fest', 'Performances'],
    accent: 'cyan',
    icon: Music,
    emoji: '🎭',
    gradient: 'from-cyan-500 to-blue-500',
    tagBg: 'bg-cyan-500/10',
    tagBorder: 'border-cyan-500/20',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50'
  },
  {
    id: '02',
    title: 'Advento',
    subtitle: 'Technical & Cultural Extravaganza',
    description: 'Our annual technical and cultural extravaganza — a flagship fresher\'s fest designed to welcome new beginnings with energy, excitement, and a spark of creativity. It brings together fresh minds and vibrant personalities through a mix of fun-filled games, engaging activities, and lively interactions.',
    tags: ["Fresher's Fest", 'Interactions', 'Games'],
    accent: 'amber',
    icon: Zap,
    emoji: '🎪',
    gradient: 'from-amber-400 to-orange-500',
    tagBg: 'bg-amber-500/10',
    tagBorder: 'border-amber-500/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'group-hover:border-amber-500/50'
  },
  {
    id: '03',
    title: 'AVA - Connect',
    subtitle: 'Innovation & Collaboration',
    description: 'A dynamic platform for innovation and collaboration — connecting students, alumni, and industry through the power of technology. Focused on technical excellence, this event brings together passionate coders and problem-solvers to engage in coding challenges, hackathons, and hands-on competitions.',
    tags: ['Hackathons', 'Tech Excellence', 'Coding'],
    accent: 'cyan',
    icon: Terminal,
    emoji: '💻',
    gradient: 'from-cyan-500 to-indigo-500',
    tagBg: 'bg-cyan-500/10',
    tagBorder: 'border-cyan-500/20',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50'
  },
];



const FlipCard = ({ frontContent, backContent, isFlipped, onFlip }) => {
  return (
    <div className="relative w-full h-full cursor-pointer [transform-style:preserve-3d]" onClick={onFlip}>
      <motion.div
        className="absolute w-full h-full [backface-visibility:hidden]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {frontContent}
      </motion.div>
      <motion.div
        className="absolute w-full h-full [backface-visibility:hidden]"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transform: 'rotateY(180deg)' }}
      >
        {backContent}
      </motion.div>
    </div>
  );
};

const EventCardFront = ({ event, isHovered }) => {
  return (
    <div className={`relative bg-gradient-to-br from-white to-slate-50 dark:from-white/[0.08] dark:to-white/[0.02] rounded-3xl p-8 flex flex-col border border-slate-200/60 dark:border-white/10 shadow-xl h-full transition-all duration-500 ${event.borderColor} overflow-hidden`}>
      {/* Top Accent Border from Image */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.gradient}`} />
      
      <div className="absolute top-8 right-8 text-6xl font-black text-slate-200 dark:text-white/5 opacity-50 select-none">
        {event.id}
      </div>
      
      {/* Icon */}
      <div className={`p-4 w-fit rounded-2xl bg-white dark:bg-black/20 shadow-lg mb-8 ${event.textColor}`}>
        <event.icon className="w-8 h-8" />
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {event.tags.map(tag => (
          <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${event.tagBorder} ${event.tagBg} ${event.textColor}`}>
            {tag}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h3 className={`text-4xl font-black mb-3 tracking-tight bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent uppercase`}>
        {event.title}
      </h3>
      
      {/* subtitle */}
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 font-bold flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        {event.subtitle}
      </p>
      
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
        {event.description}
      </p>
      
    </div>
  );
};

const EventCardBack = ({ event }) => {
  return (
    <div className="relative bg-slate-900 dark:bg-[#0a0f1a] rounded-3xl p-8 flex flex-col border border-slate-200/20 dark:border-white/10 shadow-xl h-full">
      <div className="relative z-10 flex flex-col h-full text-white">
        <h3 className="text-2xl font-bold mb-6">Event Highlights</h3>
        <div className="space-y-4 mb-8 text-sm">
          <div className="flex items-start gap-4">
            <span className="text-xl">{event.emoji}</span>
            <div>
              <div className="font-bold">Venue</div>
              <div className="text-slate-400">SIT Campus • Main Arena</div>
            </div>
          </div>
        </div>
        <button className="mt-auto w-full py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors">
          Register Interest
        </button>
      </div>
    </div>
  );
};

const EventCardDesktop = ({ event, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      className={`relative [perspective:1000px] h-[580px] ${index === 1 ? 'lg:mt-12' : index === 2 ? 'lg:mt-24' : ''}`}
    >
      <FlipCard
        frontContent={<EventCardFront event={event} />}
        backContent={<EventCardBack event={event} />}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />
    </motion.div>
  );
};

const Events = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section ref={ref} id="events" className="relative w-full py-20 md:py-32 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="mb-12 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500">Events</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {EVENT_DATA.map((event, idx) => (
            <div key={event.id}>
              {isMobile ? (
                <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col shadow-xl overflow-hidden min-h-[400px]">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.gradient}`} />
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl">{event.emoji}</span>
                    <span className="text-3xl font-black text-slate-200 dark:text-white/5 uppercase">{event.id}</span>
                  </div>
                  <h3 className={`text-3xl font-black mb-2 uppercase tracking-tight bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.slice(0, 2).map(tag => (
                      <span key={tag} className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${event.tagBorder} ${event.tagBg} ${event.textColor}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                    {event.description}
                  </p>
                </div>
              ) : (
                <EventCardDesktop event={event} index={idx} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Events.displayName = 'Events';
export default Events;