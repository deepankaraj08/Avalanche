'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GALLERY_IMAGES = [
  { id: 1, src: '/gallery/first1.png' },
  { id: 2, src: '/gallery/second.png' },
  { id: 4, src: '/gallery/fourth.png' },
  { id: 5, src: '/gallery/five.png' },
  { id: 6, src: '/gallery/six.png' },
  { id: 7, src: '/gallery/seven.jpeg' },
  { id: 9, src: '/gallery/nine1.png' },
  { id: 10, src: '/gallery/ten.jpeg' },
  { id: 11, src: '/gallery/12.jpeg' },
  { id: 12, src: '/gallery/aurora.png' },
  { id: 13, src: '/gallery/dmc.jpeg' },
  { id: 14, src: '/gallery/vdc.png' },
];

// Staggered Title Animation
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
  };
  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 14, stiffness: 100 } },
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

const Gallery = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      id="gallery"
      className="py-20 md:py-40 mt-[-2px] relative overflow-hidden bg-slate-50 dark:bg-[#020617] flex flex-col justify-center"
    >
      {/* Premium Ambient Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
        {/* Grain Overlay */}
        <div className="hidden md:block absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none block dark:hidden">
        <div className="absolute top-[10%] left-0 w-[600px] h-[600px] bg-cyan-100/60 rounded-full blur-[100px] -translate-x-1/3" />
        <div className="absolute bottom-[10%] right-0 w-[700px] h-[700px] bg-purple-100/60 rounded-full blur-[120px] translate-x-1/3" />
      </div>

      {/* Header */}
      <div className="relative z-20 text-center mb-16 md:mb-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500" />
          <p className="text-[10px] md:text-xs font-black text-cyan-500 tracking-[0.5em] md:tracking-[0.8em] uppercase">Visual Archive</p>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500" />
        </motion.div>

        <AnimatedTitle
          text="Moments In"
          className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
        />
        <AnimatedTitle
          text="Motion."
          delay={0.3}
          className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
        />
      </div>

      {/* ── All Images Showcase Grid (Massive Masonry Layout) ── */}
      <div className="relative z-20 max-w-[90vw] 2xl:max-w-[95vw] mx-auto w-full">
        <div className="columns-1 md:columns-2 2xl:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.6, type: "spring" }}
              className="group relative rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-white/5 cursor-pointer shadow-lg shadow-black/5 dark:shadow-none hover:shadow-cyan-500/20 break-inside-avoid"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={`Archive ${i + 1}`}
                loading="lazy"
                className="w-full h-auto block rounded-[2rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-110"
              />
              
              {/* Inner glass border */}
              <div className="absolute inset-0 rounded-[2rem] border border-black/5 dark:border-white/10 pointer-events-none z-20 transition-all duration-300 group-hover:border-cyan-400/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;