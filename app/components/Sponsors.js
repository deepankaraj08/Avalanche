'use client';

import React, { forwardRef, useMemo, useState, useEffect } from 'react';
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
  <div className={`relative flex-shrink-0 flex flex-col items-center justify-center w-[180px] h-32 md:w-[280px] md:h-48 bg-white/[0.02] backdrop-blur-md md:backdrop-blur-xl border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] group transition-all duration-500 hover:-translate-y-2 active:scale-95 md:active:scale-100 will-change-transform transform-gpu ${sponsor.glow}`}>
    <div className={`absolute top-0 inset-x-8 h-px bg-gradient-to-r ${sponsor.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
    
    <div className="relative z-10 flex flex-col items-center px-4">
      <span className={`text-lg md:text-3xl font-black text-white/40 transition-all duration-500 tracking-tighter text-center leading-none ${sponsor.text}`}>
        {sponsor.name}
      </span>
      <span className="mt-1 md:mt-2 text-[7px] md:text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors tracking-[0.2em]">
        {sponsor.phone}
      </span>
      <div className="mt-3 md:mt-5 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
          {sponsor.type}
        </span>
      </div>
    </div>
  </div>
);

const Sponsors = forwardRef(({ openSponsorModal }, ref) => {
  const scrollData = useMemo(() => [...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA], []);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      setDuration(window.innerWidth < 768 ? 25 : 45); // Slower speed on mobile to reduce frame skipping
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-40 relative overflow-hidden bg-[#020617] text-white" id="sponsors">
      {/* Reduced star count for mobile marquee performance */}
      <SpaceStars starCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80} className="absolute inset-0 pointer-events-none opacity-30 transform-gpu" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-10 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4"
          >
            <span className="text-[8px] md:text-xs font-bold tracking-[0.3em] uppercase text-cyan-500">
              Partnerships
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter leading-[1.1] md:leading-none"
          >
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic">Sponsors</span>
          </motion.h2>
        </header>

        <div className="relative w-full">
          {/* HIGH PERFORMANCE EDGE MASKS (Replaces heavy linear-gradient masking) */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

          <div className="relative flex overflow-hidden select-none touch-pan-x">
            <motion.div 
              className="flex gap-4 md:gap-8 py-6 md:py-12 will-change-transform transform-gpu"
              animate={{ x: ["0%", "-50%"] }} 
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: duration,
                  ease: "linear",
                },
              }}
              style={{ translateZ: 0 }}
            >
              {scrollData.map((sponsor, idx) => (
                <SponsorCard key={idx} sponsor={sponsor} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 md:mt-20 flex flex-col items-center"
        >
          <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-md text-center transform-gpu">
            <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 font-medium tracking-tight leading-relaxed">
              Fuel the next generation of builders. <br className="hidden sm:block" />
              Join the Avalanche ecosystem today.
            </p>
            <button 
              onClick={openSponsorModal} 
              className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-white text-black rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300 active:scale-95 shadow-2xl"
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