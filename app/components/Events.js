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
    accent: 'text-cyan-400',
    glowColor: 'cyan',
  },
  {
    id: '02',
    title: 'Advento',
    subtitle: 'The Freshman Genesis',
    description:
      'A high-octane extravaganza designed to welcome new talent. Workshops, performances and unforgettable nights.',
    tags: ['1 Day', 'Concert'],
    accent: 'text-indigo-400',
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

        <div className="relative bg-white/80 dark:bg-[#060b18]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col border border-white/40 dark:border-white/10 shadow-lg transition-all">

          <div className="flex flex-wrap gap-2 mb-6">

            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider"
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

          <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
            {event.subtitle}
          </p>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md">
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
      className={`relative overflow-hidden bg-slate-50 dark:bg-[#020617] ${
        isMobile ? 'py-16' : 'py-32'
      }`}
    >

      {/* background blobs */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[60px]" />

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[60px]" />

      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* header */}

        <div className="mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">

          <div>

            <p className="text-cyan-500 text-xs font-bold tracking-[0.5em] uppercase mb-4">
              The Core Experiences
            </p>

            <h2 className="text-[clamp(2.5rem,9vw,6rem)] font-black leading-[0.9]">
              Flagship Events
            </h2>

          </div>

          <p className="text-sm text-gray-500 max-w-xs lg:text-right">
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