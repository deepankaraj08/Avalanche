'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors'; // Added import

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

// Duplicate for seamless loop
const SCROLL_DATA = [...ALUMNI_DATA, ...ALUMNI_DATA];

const Alumni = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      // Changed base background color to match the Home/Hero section
      className="relative py-32 bg-[#020617] overflow-hidden text-white"
    >
      {/* ===== Shared Deep Space Background Stack ===== */}
      <SpaceStars starCount={40} className="absolute inset-0 pointer-events-none opacity-40" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        {/* Deep Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-black" />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true" 
        />
        
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block"
        >
          Our Global Alumni
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-400 text-lg"
        >
          Graduates from Avalanche leading the way in top-tier industries.
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden group">
        {/* Updated Edge fade masks to use #020617 instead of #0a0f1a so they blend perfectly */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-8 py-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: 'linear',
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {SCROLL_DATA.map((person, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 group/card relative rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="relative w-24 h-24 mb-6 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full blur-md opacity-20 group-hover/card:opacity-50 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-[#111827] border border-white/10 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {person.name.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-xl text-white group-hover/card:text-cyan-400 transition-colors">
                  {person.name}
                </h3>

                <p className="text-cyan-400/80 font-medium text-xs mt-2 uppercase tracking-[0.2em]">
                  {person.role}
                </p>

                <div className="mt-5 pt-5 border-t border-white/5 text-gray-500 text-xs tracking-wide">
                  Batch of {person.batch}
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