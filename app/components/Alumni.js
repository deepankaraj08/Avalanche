'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const ALUMNI_DATA = [
  { name: 'Aishwarya K', batch: '2022', role: 'Software Engineer' },
  { name: 'Pranav M', batch: '2021', role: 'Product Designer' },
  { name: 'Divya R', batch: '2023', role: 'Data Scientist' },
  { name: 'Karthik S', batch: '2020', role: 'Frontend Lead' },
  { name: 'Sneha P', batch: '2022', role: 'UX Researcher' },
  { name: 'Rohan D', batch: '2019', role: 'Full Stack Dev' },
  { name: 'Meera N', batch: '2021', role: 'Cloud Architect' },
  { name: 'Aditya G', batch: '2023', role: 'AI Specialist' },
];

// Triplicating data ensures a seamless loop without gaps on ultra-wide screens
const SCROLL_DATA = [...ALUMNI_DATA, ...ALUMNI_DATA, ...ALUMNI_DATA];

const Alumni = forwardRef((props, ref) => {
  const [duration, setDuration] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      // Adjusted speeds: lower number = faster movement
      setDuration(window.innerWidth < 768 ? 20 : 50);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-44 bg-[#020617] overflow-hidden text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars starCount={120} className="opacity-40 md:opacity-50" />
      </div>
      
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08)_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-xl"
          >
            <span className="text-cyan-400 font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[8px] md:text-[10px]">Alumni Network</span>
          </motion.div>

          {/* Fluid Typography for the main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,7vw,4.5rem)] md:text-7xl font-black tracking-tighter leading-[1.1] md:leading-none"
          >
            Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 italic">Impact</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-10 text-gray-500 text-xs md:text-lg font-bold tracking-wide uppercase max-w-lg leading-relaxed"
          >
            Avalanche graduates are leading the charge at top-tier global industries.
          </motion.p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden py-4 md:py-10 group touch-pan-x">
        {/* Responsive Gradient Masks: deeper on desktop, lighter on mobile to show content */}
        <div className="absolute left-0 top-0 w-16 md:w-72 h-full bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-72 h-full bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-4 md:gap-10 px-4 md:px-10 will-change-transform"
          style={{ translateZ: 0 }} // Forces GPU acceleration
          animate={{ x: ['0%', '-33.33%'] }} 
          transition={{
            repeat: Infinity,
            duration: duration,
            ease: 'linear',
          }}
          // Pauses for accessibility and reading on desktop
          whileHover={{ animationPlayState: 'paused' }}
        >
          {SCROLL_DATA.map((person, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[240px] md:w-80 group/card relative rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-5 md:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
            >
              <div className="relative w-12 h-12 md:w-20 md:h-20 mb-5 md:mb-8 overflow-hidden rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center bg-[#020617]">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                 <span className="text-base md:text-2xl font-black text-white/20 group-hover/card:text-cyan-400 transition-colors">
                    {person.name.charAt(0)}
                 </span>
              </div>

              <div>
                <h3 className="font-black text-sm md:text-xl text-white/90 group-hover/card:text-white transition-colors tracking-tight">
                  {person.name}
                </h3>

                <p className="text-cyan-500 font-bold text-[8px] md:text-[10px] mt-1 md:mt-2 uppercase tracking-[0.2em] opacity-60 group-hover/card:opacity-100 transition-all">
                  {person.role}
                </p>

                <div className="mt-5 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-widest italic">
                    Batch {person.batch}
                  </span>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/10 flex items-center justify-center text-[8px] md:text-[9px] text-white/20 group-hover/card:bg-cyan-500 group-hover/card:text-white group-hover/card:border-cyan-500 transition-all">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Alumni.displayName = 'Alumni';
export default Alumni;