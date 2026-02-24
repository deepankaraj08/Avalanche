'use client';

import React, { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const ABOUT_CONTENT = [
  {
    id: 'avalanche',
    title: 'About Avalanche',
    subtitle: 'The Heart of Campus Events',
    description: "Avalanche is the official event management club of SIT Tumkur, dedicated to creating unforgettable campus experiences. From planning to execution, we bring together creativity, teamwork, and leadership to celebrate talent, culture, and student energy.",
    gradientText: 'from-cyan-400 via-blue-400 to-blue-600',
    spotlightColor: 'rgba(59, 130, 246, 0.2)', 
    accent: 'bg-blue-500'
  },
  {
    id: 'goonj',
    title: 'GOONJ',
    subtitle: 'Spreading Joy Beyond Borders',
    description: "A social outreach initiative by Avalanche, Goonj is dedicated to spreading joy beyond campus. Through visits to orphanages and old-age homes, we foster empathy and social responsibility by teaching, learning, and sharing moments of happiness.",
    gradientText: 'from-purple-400 via-fuchsia-400 to-pink-500',
    spotlightColor: 'rgba(168, 85, 247, 0.2)',
    accent: 'bg-purple-500'
  }
];

function InteractiveCard({ item, parallaxY }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      style={{ y: parallaxY }}
      onMouseMove={handleMouseMove}
      className="relative group rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl border border-white/10 p-8 md:p-14 overflow-hidden shadow-2xl transition-colors duration-500 hover:border-white/20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${smoothMouseX}px ${smoothMouseY}px,
              ${item.spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-12 h-1 rounded-full ${item.accent} mb-8 opacity-50`} />
        
        <h3 className={`text-3xl md:text-5xl font-black tracking-tighter bg-gradient-to-r ${item.gradientText} bg-clip-text text-transparent inline-block mb-3`}>
          {item.title}
        </h3>
        
        <p className="text-white/50 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-8">
          {item.subtitle}
        </p>

        <p className="text-gray-300 leading-relaxed text-base md:text-xl font-medium opacity-90">
          {item.description}
        </p>
        
        <div className="mt-10 pt-8 border-t border-white/5">
           <span className="text-white text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             Discover More +
           </span>
        </div>
      </div>
    </motion.article>
  );
}

const About = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 relative overflow-hidden bg-[#020617] text-white"
      id="about"
    >
      {/* 1. THE STARS (Ensuring they are high up in visibility) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars starCount={150} className="opacity-60" />
      </div>
      
      {/* 2. BACKGROUND POLISH (Using transparent radial gradients to let stars bleed through) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Soft center window for stars */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#020617_100%)] opacity-40" />
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-28 gap-6">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 text-xs font-black tracking-[0.4em] uppercase mb-4"
            >
              Who We Are
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]"
            >
              The Minds Behind <br/> <span className="text-white/20">The Magic.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden lg:block text-gray-500 text-sm font-medium max-w-[200px] text-right"
          >
            SIT Tumkur's Premier Event Management Collective.
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <InteractiveCard item={ABOUT_CONTENT[0]} parallaxY={y1} />
          
          <div className="lg:pt-32">
            <InteractiveCard item={ABOUT_CONTENT[1]} parallaxY={y2} />
          </div>
        </div>

      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;