'use client';

import React, { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const SPONSORS_DATA = [
  { 
    name: 'TechCorp', 
    type: 'Title Sponsor', 
    phone: '+1 (555) 012-3456', 
    color: 'from-cyan-400 to-blue-500', 
    glow: 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/40', 
    text: 'group-hover:text-cyan-400' 
  },
  { 
    name: 'InnovateX', 
    type: 'Platinum', 
    phone: '+1 (555) 987-6543', 
    color: 'from-purple-400 to-fuchsia-500', 
    glow: 'group-hover:shadow-purple-500/20 group-hover:border-purple-500/40', 
    text: 'group-hover:text-purple-400' 
  },
  { 
    name: 'StellarData', 
    type: 'Gold Sponsor', 
    phone: '+1 (555) 444-1111', 
    color: 'from-blue-400 to-indigo-500', 
    glow: 'group-hover:shadow-blue-500/20 group-hover:border-blue-500/40', 
    text: 'group-hover:text-blue-400' 
  },
  { 
    name: 'NexusAI', 
    type: 'Silver Sponsor', 
    phone: '+1 (555) 222-3333', 
    color: 'from-emerald-400 to-teal-500', 
    glow: 'group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/40', 
    text: 'group-hover:text-emerald-400' 
  },
];

const SponsorCard = ({ sponsor }) => (
  <div className={`relative flex-shrink-0 flex flex-col items-center justify-center w-[200px] h-36 md:w-[280px] md:h-48 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] group transition-all duration-500 hover:-translate-y-2 active:scale-95 md:active:scale-100 ${sponsor.glow}`}>
    {/* Top Accent Line */}
    <div className={`absolute top-0 inset-x-8 h-px bg-gradient-to-r ${sponsor.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
    
    <div className="relative z-10 flex flex-col items-center px-4">
      <span className={`text-xl md:text-3xl font-black text-white/40 transition-all duration-500 tracking-tighter text-center ${sponsor.text}`}>
        {sponsor.name}
      </span>
      <span className="mt-1 md:mt-2 text-[8px] md:text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors tracking-[0.2em]">
        {sponsor.phone}
      </span>
      <div className="mt-4 md:mt-5 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
          {sponsor.type}
        </span>
      </div>
    </div>
  </div>
);

const Sponsors = forwardRef(({ openSponsorModal }, ref) => {
  // Triple the data to ensure the marquee fills even ultra-wide mobile landscapes
  const scrollData = useMemo(() => [...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA], []);

  return (
    <section ref={ref} className="py-16 md:py-32 lg:py-40 relative overflow-hidden bg-[#020617] text-white">
      
      {/* Dynamic Background Elements */}
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none opacity-30" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4"
          >
            <span className="text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase text-cyan-500">
              Partnerships
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-none"
          >
            Strategic 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic"> Sponsors</span>
          </motion.h2>
        </header>

        {/* Responsive Marquee Container */}
        <div className="relative w-full overflow-visible">
          {/* Side Gradients for Desktop, adjusted for Mobile */}
          <div 
            className="relative flex overflow-hidden select-none will-change-transform"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <motion.div 
              className="flex gap-4 md:gap-8 py-8 md:py-12 flex-nowrap"
              animate={{ x: [0, -1200] }} 
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25, // Adjusted speed for all devices
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {scrollData.map((sponsor, idx) => (
                <SponsorCard key={idx} sponsor={sponsor} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Responsive CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 md:mt-24 flex flex-col items-center"
        >
          <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] backdrop-blur-md text-center">
            <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-10 font-medium tracking-tight">
              Fuel the next generation of builders. <br className="hidden sm:block" />
              Join the Avalanche ecosystem today.
            </p>
            <button 
              onClick={openSponsorModal} 
              className="w-full sm:w-auto px-8 md:px-12 py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Become a Sponsor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;