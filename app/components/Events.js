'use client';

import React, { forwardRef, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

/* ==========================================
   1. Content Configuration (Clean Space Theme)
========================================== */

const EVENT_DATA = [
  {
    id: '01',
    title: 'ADVENTO',
    subtitle: 'The Freshman Genesis',
    description:
      'A week-long high-octane extravaganza designed to welcome new talent. From technical workshops to electrifying concert nights, this is where your journey begins.',
    tags: ['1 Day', 'Concert'],

    // Deep Space Blue
    color: 'from-blue-500/40 to-cyan-400/40',
    accent: 'text-blue-400',

    glow:
      'group-hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.45)] group-hover:border-blue-400/40'
  },
  {
    id: '02',
    title: 'RADIANCE',
    subtitle: 'The Cultural Epicenter',
    description:
      'The definitive stage for performers. A grand showcase of dance, music, drama, and fashion where campus legends are born and the spotlight never fades.',
    tags: ['Annual', 'Cultural', '3 DAYS'],

    // Cyan Ice Accent
    color: 'from-cyan-400/40 to-sky-500/40',
    accent: 'text-cyan-400',

    glow:
      'group-hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)] group-hover:border-cyan-400/40'
  }
];

/* ==========================================
   2. 3D Tilt Card
========================================== */

const TiltCard = ({ event, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative h-full perspective-[1000px]"
    >
      {/* Subtle Gradient Border Glow */}
      <div
        className={`absolute -inset-[1.5px] rounded-[2.5rem] bg-gradient-to-r ${event.color} opacity-20 group-hover:opacity-60 blur-md transition-all duration-500`}
      />

      {/* Main Card */}
      <div
        className={`relative bg-black/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 h-full flex flex-col border border-white/10 transition-all duration-500 ${event.glow}`}
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Background Number */}
        <span className="absolute -right-4 -top-8 text-[12rem] font-black text-white/[0.03] select-none group-hover:text-white/[0.06] group-hover:-translate-y-4 transition-all duration-700 pointer-events-none">
          {event.id}
        </span>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-wrap gap-2 mb-8">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-wider backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`text-5xl md:text-6xl font-black mb-4 tracking-tighter ${event.accent}`}
          >
            {event.title}
          </h3>

          <p className="text-2xl font-semibold text-white mb-6">
            {event.subtitle}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed flex-grow font-light">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================
   3. Main Events Section
========================================== */

const Events = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30"
    >
      {/* Space Background */}
      <SpaceStars starCount={120} />

      {/* Ambient Background Layers */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-black" />
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-cyan-500" />
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm">
                Experience the Pulse
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">
              Flagship{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
                Events
              </span>
            </h2>
          </div>

          <p className="text-gray-400 max-w-sm md:text-right font-light leading-relaxed">
            Where ambition meets execution. Two legendary experiences that define the spirit of our campus.
          </p>
        </header>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10">
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