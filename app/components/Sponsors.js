'use client';

import React, { forwardRef, useMemo, useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const SPONSORS_DATA = [
  {
    name: 'TechCorp',
    image: '/gallery/#',
    isCTA: false,
    color: 'from-cyan-400 to-blue-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:border-cyan-500/50',
  },
  {
    name: 'InnovateX',
    image: '/gallery/#',
    isCTA: false,
    color: 'from-purple-400 to-fuchsia-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.3)] group-hover:border-purple-500/50',
  },
  {
    name: 'It Could Be Your Turn',
    image: '',
    isCTA: true,
    color: 'from-yellow-400 to-orange-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] group-hover:border-yellow-500/50',
  },
];

// Magnetic Button Component
function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Letter animation component
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.08, delayChildren: delay } }),
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(5px)" },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const SponsorCard = ({ sponsor }) => (
  <div className={`relative flex-shrink-0 flex flex-col items-center justify-center w-[200px] h-[140px] md:w-[320px] md:h-[220px] bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[2.5rem] group transition-all duration-700 hover:-translate-y-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-none ${sponsor.glow}`}>

    {/* Glowing Top Edge */}
    <div className={`absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r ${sponsor.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[1px]`} />

    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay rounded-[2.5rem]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

    <div className="relative z-10 flex flex-col items-center px-4">

      {!sponsor.isCTA ? (
        <>
          {/* Sponsor Logo Placeholders */}
          <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center transition-transform duration-700 group-hover:scale-110 shadow-inner overflow-hidden border border-white/50 dark:border-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
              <span className="text-slate-400 dark:text-slate-600 font-bold text-xs">LOGO</span>
            </div>
          </div>

          <span className="mt-2 text-xs md:text-sm font-black text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-[0.2em] transition-colors duration-500">
            {sponsor.name}
          </span>
        </>
      ) : (
        /* CTA Card */
        <>
          <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${sponsor.color} flex items-center justify-center text-black font-black text-3xl transition-transform duration-700 group-hover:scale-110 shadow-lg`}>
            {/* Ping effect behind the question mark */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${sponsor.color} animate-ping opacity-50`} />
            <span className="relative z-10">?</span>
          </div>

          <span className="mt-5 text-center text-xs md:text-sm font-black text-slate-500 dark:text-white/60 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 uppercase tracking-widest transition-colors duration-500">
            {sponsor.name}
          </span>
        </>
      )}
    </div>
  </div>
);

const Sponsors = forwardRef(({ openSponsorModal }, ref) => {

  const scrollData = useMemo(
    () => [...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA, ...SPONSORS_DATA],
    []
  );

  const [duration, setDuration] = useState(30);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setDuration(window.innerWidth < 768 ? 25 : 50);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={ref} className={`${isMobile ? 'py-20 mt-[-10px]' : 'py-32 md:py-48 mt-[-2px]'} relative overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white`} id="sponsors">

      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        <SpaceStars starCount={isMobile ? 50 : 150} className="opacity-30" />

        {/* Soft elegant glows */}
        <motion.div
          animate={isMobile ? {} : { x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      {/* Light Mode Specific Ambient Blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none block dark:hidden"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[100rem] mx-auto relative z-10">

        {/* Header */}
        <header className="text-center mb-20 md:mb-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-6 bg-cyan-500" />
            <p className="text-[10px] md:text-xs font-black text-cyan-500 tracking-[0.5em] md:tracking-[0.6em] uppercase">Partnerships</p>
            <div className="h-[1px] w-6 bg-cyan-500" />
          </motion.div>

          <AnimatedTitle
            text="Strategic"
            className="text-[clamp(3.5rem,9vw,6rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
          />
          <AnimatedTitle
            text="Sponsors."
            delay={0.2}
            className="text-[clamp(3.5rem,9vw,6rem)] font-black tracking-tighter leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 pb-2 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          />
        </header>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">

          {/* Edge Fades for smooth entry/exit */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <motion.div
            className="flex gap-6 md:gap-12 py-10 pl-6"
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
        <div className="mt-20 md:mt-32 flex justify-center px-6">
          <MagneticButton
            onClick={openSponsorModal}
            className="group/btn"
          >
            <div className="relative overflow-hidden px-10 md:px-14 py-5 md:py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-transparent rounded-[1.5rem] font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all shadow-xl group-hover/btn:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                Become a Sponsor
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';
export default Sponsors;