'use client';

import React, { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

// ==========================================
// 1. Content Configuration
// ==========================================

const ABOUT_CONTENT = [
  {
    id: 'avalanche',
    title: 'About Avalanche',
    subtitle: 'The Heart of Campus Events',
    description: () => (
      <>
        <span className="text-cyan-400 font-semibold">Avalanche</span> is the official event management club of SIT Tumkur, dedicated
        to creating unforgettable campus experiences. From planning to execution,
        Avalanche brings together creativity, teamwork, and leadership to organize
        large-scale events that celebrate talent, culture, and student energy.
      </>
    ),
    gradientText: 'from-cyan-400 via-blue-400 to-blue-600',
    spotlightColor: 'rgba(59, 130, 246, 0.15)', // Blue glow
  },
  {
    id: 'goonj',
    title: 'GOONJ',
    subtitle: 'Spreading Joy Beyond Borders',
    description: () => (
      <>
        <span className="text-purple-400 font-semibold">Goonj</span> is a social
        outreach initiative by <span className="text-cyan-400 font-medium">Avalanche</span>,
        dedicated to spreading joy, kindness, and connection beyond campus.
        Through visits to orphanages and old-age homes, we spend meaningful time
        playing, teaching, learning together, and sharing gifts. Goonj strives to
        create moments of happiness while fostering empathy, compassion, and social
        responsibility among students.
      </>
    ),
    gradientText: 'from-purple-400 via-fuchsia-400 to-pink-500',
    spotlightColor: 'rgba(168, 85, 247, 0.15)', // Purple glow
  }
];

// ==========================================
// 2. Interactive Card Sub-Component
// ==========================================

function InteractiveCard({ item, parallaxY }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      style={{ y: parallaxY }}
      onMouseMove={handleMouseMove}
      className="relative group rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${item.spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r ${item.gradientText} bg-clip-text text-transparent inline-block mb-2`}>
          {item.title}
        </h3>
        
        <p className="text-gray-400 font-medium tracking-wide text-sm md:text-base uppercase mb-6 border-b border-white/10 pb-4 inline-block">
          {item.subtitle}
        </p>

        <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light">
          {item.description()}
        </p>
      </div>
    </motion.article>
  );
}

// ==========================================
// 3. Main Component
// ==========================================

const About = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30"
      id="about"
    >
      {/* ===== Shared Deep Space Background Stack ===== */}
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        {/* Deep Space Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-black" />
        
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true" 
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* ===== Main Content ===== */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            The Minds Behind The Magic.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <InteractiveCard item={ABOUT_CONTENT[0]} parallaxY={y1} />
          
          <div className="lg:pt-16">
            <InteractiveCard item={ABOUT_CONTENT[1]} parallaxY={y2} />
          </div>
        </div>

      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;