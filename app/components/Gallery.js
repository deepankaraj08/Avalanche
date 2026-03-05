'use client';

import React, { forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const GALLERY_IMAGES = [
  { id: 1, src: '/gallery/first1.png', title: 'Momentum' },
  { id: 2, src: '/gallery/second.png', title: 'Focus' },
  { id: 3, src: '/gallery/third.png', title: 'Vision' },
  { id: 4, src: '/gallery/fourth.png', title: 'Energy' },
  { id: 5, src: '/gallery/five.png', title: 'Legacy' },
  { id: 6, src: '/gallery/six.png', title: 'Archive' },
  { id: 7, src: '/gallery/seven.jpeg', title: 'Atmosphere' },
  { id: 8, src: '/gallery/nine1.png', title: 'Motion' },
];

// Magnetic Button Component for Controls
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
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
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
      whileTap={{ scale: 0.9 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Staggered Title Animation
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
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
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      ref={ref}
      id="gallery"
      className="py-32 md:py-48 relative overflow-hidden bg-slate-50 dark:bg-[#020617] min-h-[100dvh] flex flex-col justify-center"
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block">
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
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
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

      {/* ── Auto-Size 3D Slider ── */}
      <div className="relative h-[450px] md:h-[650px] w-full flex items-center justify-center perspective-[2500px] overflow-hidden z-10">
        <div className="relative w-full h-[120%] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {GALLERY_IMAGES.map((img, i) => {
              let offset = i - index;
              if (offset > GALLERY_IMAGES.length / 2) offset -= GALLERY_IMAGES.length;
              if (offset < -GALLERY_IMAGES.length / 2) offset += GALLERY_IMAGES.length;

              const absOffset = Math.abs(offset);
              const isCenter = i === index;

              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={img.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) prev();
                    else if (info.offset.x < -80) next();
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: isMobile ? offset * 180 : offset * 350,
                    scale: 1 - absOffset * 0.15,
                    opacity: 1 - absOffset * 0.4,
                    rotateY: offset * -18,
                    z: -absOffset * 100,
                    zIndex: 100 - absOffset,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
                  onClick={() => setIndex(i)}
                  className="absolute h-[80%] w-auto max-w-[85vw] md:max-w-[70vw] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto group"
                >
                  <div className="relative h-full flex items-center justify-center rounded-[2.5rem] md:rounded-[3rem] transition-all duration-700 hover:shadow-[0_0_80px_rgba(34,211,238,0.4)]">
                    {/* Glass Border Overlay */}
                    <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] border border-white/20 dark:border-white/10 pointer-events-none z-20" />

                    <img
                      src={img.src}
                      alt={img.title}
                      draggable={false}
                      className="max-h-full w-auto object-contain rounded-[2.5rem] md:rounded-[3rem] shadow-2xl dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] filter transition-all duration-700 group-hover:brightness-110"
                    />

                    {/* Premium Caption Overlay */}
                    <div
                      className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[85%] md:w-[60%] p-4 md:p-5 rounded-3xl bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl ${isCenter ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                        }`}
                    >
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000" />
                      <p className="text-slate-900 dark:text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-xs text-center">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Premium Controls */}
      <div className="mt-12 md:mt-24 flex flex-col items-center gap-10 relative z-30 px-6">
        <div className="flex items-center gap-8 md:gap-14 bg-white/50 dark:bg-white/5 p-3 md:p-4 rounded-full backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl">
          <MagneticButton onClick={prev} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-white dark:hover:bg-white hover:text-cyan-500 dark:text-white text-slate-800 transition-colors shadow-sm">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </MagneticButton>

          <div className="flex gap-3 items-center">
            {GALLERY_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 md:h-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full ${i === index ? 'w-10 md:w-14 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'w-2 md:w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'}`}
              />
            ))}
          </div>

          <MagneticButton onClick={next} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-white dark:hover:bg-white hover:text-cyan-500 dark:text-white text-slate-800 transition-colors shadow-sm">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;