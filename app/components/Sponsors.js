'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const SPONSORS_DATA = [
  { 
    name: 'TechCorp', 
    type: 'Title Sponsor', 
    phone: '+1 (555) 012-3456', 
    color: 'from-cyan-400 to-blue-500', 
    glow: 'group-hover/card:shadow-cyan-500/20 group-hover/card:border-cyan-500/40', 
    text: 'group-hover/card:text-cyan-400' 
  },
  { 
    name: 'InnovateX', 
    type: 'Platinum', 
    phone: '+1 (555) 987-6543', 
    color: 'from-purple-400 to-fuchsia-500', 
    glow: 'group-hover/card:shadow-purple-500/20 group-hover/card:border-purple-500/40', 
    text: 'group-hover/card:text-purple-400' 
  },
];

const SCROLL_DATA = [...SPONSORS_DATA, ...SPONSORS_DATA];

const Sponsors = forwardRef(({ openSponsorModal }, ref) => {
  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30">
      
      {/* Background Stack */}
      <SpaceStars starCount={120} className="absolute inset-0 pointer-events-none" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-black" />
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/5 rounded-[100%] blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            Our Strategic <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic pr-2">Sponsors</span>
          </motion.h2>
        </header>

        {/* Marquee */}
        <div className="relative group max-w-[100vw] overflow-hidden -mx-6 px-6">
          <div className="flex w-[max-content] animate-infinite-scroll hover:[animation-play-state:paused] gap-6 py-4 px-3">
            {SCROLL_DATA.map((sponsor, idx) => (
              <div
                key={idx}
                className={`relative flex-shrink-0 flex flex-col items-center justify-center w-56 h-40 md:w-64 md:h-44 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl group/card transition-all duration-500 hover:-translate-y-2 ${sponsor.glow}`}
              >
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${sponsor.color} opacity-30 group-hover/card:opacity-100 transition-opacity rounded-t-3xl`} />
                <span className={`text-xl md:text-2xl font-black text-gray-400 transition-colors tracking-tight ${sponsor.text}`}>
                  {sponsor.name}
                </span>
                <span className="mt-1 text-xs font-mono text-gray-500 group-hover/card:text-gray-300 transition-colors">
                  {sponsor.phone}
                </span>
                <span className="mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 backdrop-blur-md">
                  {sponsor.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div className="mt-20 flex flex-col items-center text-center">
          <p className="text-gray-400 text-base md:text-lg mb-6 font-light">
            Interested in partnering with Avalanche?
          </p>
          <button 
            onClick={openSponsorModal} 
            className="group relative px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
          >
            Become a Sponsor →
          </button>
        </motion.div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;