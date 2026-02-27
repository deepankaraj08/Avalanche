'use client';

import React, { forwardRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const SPONSORS_DATA = [
  { 
    name: 'TechCorp',
    image: '/gallery/#',
    isCTA: false,
    color: 'from-cyan-400 to-blue-500', 
    glow: 'group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/40',
  },
  { 
    name: 'InnovateX', 
    image: '/gallery/#',
    isCTA: false,
    color: 'from-purple-400 to-fuchsia-500', 
    glow: 'group-hover:shadow-purple-500/20 group-hover:border-purple-500/40',
  },
  { 
    name: 'It Could Be Your Turn',
    image: '',
    isCTA: true,
    color: 'from-yellow-400 to-orange-500', 
    glow: 'group-hover:shadow-yellow-500/20 group-hover:border-yellow-500/40',
  },
];

const SponsorCard = ({ sponsor }) => (
  <div className={`relative flex-shrink-0 flex flex-col items-center justify-center w-[180px] h-32 md:w-[280px] md:h-48 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] group transition-all duration-500 hover:-translate-y-2 ${sponsor.glow}`}>

    <div className={`absolute top-0 inset-x-8 h-px bg-gradient-to-r ${sponsor.color} opacity-30`} />

    <div className="relative z-10 flex flex-col items-center px-4">

      {!sponsor.isCTA ? (
        <>
          {/* Sponsor Logo */}
          <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Sponsor Name */}
          <span className="mt-4 text-sm md:text-lg font-bold text-white/70 group-hover:text-white transition">
            {sponsor.name}
          </span>
        </>
      ) : (
        /* CTA Card */
        <>
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${sponsor.color} flex items-center justify-center text-black font-black text-2xl animate-pulse`}>
            ?
          </div>

          <span className="mt-4 text-center text-sm md:text-lg font-bold text-white group-hover:text-yellow-400 transition">
            It Could Be Your Turn
          </span>
        </>
      )}
    </div>
  </div>
);

const Sponsors = forwardRef(({ openSponsorModal }, ref) => {

  const scrollData = useMemo(
    () => [...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA],
    []
  );

  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      setDuration(window.innerWidth < 768 ? 20 : 40);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-40 relative overflow-hidden bg-[#020617] text-white" id="sponsors">

      <SpaceStars 
        starCount={typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 80} 
        className="absolute inset-0 pointer-events-none opacity-20"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <header className="text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic">Sponsors</span>
          </h2>
        </header>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden">

          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

          <motion.div 
            className="flex gap-6 md:gap-10 py-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: duration,
              ease: "linear",
            }}
          >
            {scrollData.map((sponsor, idx) => (
              <SponsorCard key={idx} sponsor={sponsor} />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-24 text-center">
          <button 
            onClick={openSponsorModal}
            className="px-12 py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300 active:scale-95"
          >
            Become a Sponsor
          </button>
        </div>

      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;