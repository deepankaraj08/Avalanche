'use client';

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

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

const Gallery = forwardRef((props, ref) => {
  const [index, setIndex] = useState(0);

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
      className="py-20 md:py-32 relative overflow-hidden bg-[#fdfcf9] dark:bg-[#050505] min-h-[850px] flex flex-col justify-center"
    >
      {/* Header */}
      <div className="relative z-20 text-center mb-12 md:mb-20 px-6">
        <p className="text-[10px] font-black text-cyan-500 tracking-[0.5em] uppercase mb-4">Visual Archive</p>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter dark:text-white text-slate-900 leading-none">
          Moments In <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Motion</span>
        </h2>
      </div>

      {/* ── Auto-Size 3D Slider ── */}
      <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center perspective-[2000px]">
        <div className="relative w-full h-full flex items-center justify-center">
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
                  animate={{
                    x: typeof window !== 'undefined' && window.innerWidth < 768 ? offset * 160 : offset * 280,
                    scale: 1 - absOffset * 0.1,
                    opacity: 1 - absOffset * 0.3,
                    rotateY: offset * -15,
                    zIndex: 100 - absOffset,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  onClick={() => setIndex(i)}
                  // REMOVED fixed aspect ratio, ADDED h-full and w-auto logic
                  className="absolute h-full w-auto max-w-[90vw] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
                >
                  <div className="relative h-full flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.title}
                      draggable={false}
                      // Uses max-h-full to ensure image never clips, and w-auto for natural sizing
                      className="max-h-full w-auto object-contain rounded-[2rem] md:rounded-[3rem] shadow-2xl dark:shadow-cyan-900/20 border border-white/5"
                    />

                    {/* Caption Overlay - Adjusted to stay inside the image bounds */}
                    <div
                      className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 ${isCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                      <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] text-center">
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

      {/* Controls */}
      <div className="mt-16 flex flex-col items-center gap-10 relative z-30">
        <div className="flex items-center gap-6 md:gap-10">
          <button onClick={prev} className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center dark:text-white text-slate-900 hover:bg-cyan-500 transition-all active:scale-90"><HiChevronLeft size={24} /></button>

          <div className="flex gap-2.5">
            {GALLERY_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-10 bg-cyan-500' : 'w-2 bg-slate-300 dark:bg-white/10'}`} />
            ))}
          </div>

          <button onClick={next} className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center dark:text-white text-slate-900 hover:bg-cyan-500 transition-all active:scale-90"><HiChevronRight size={24} /></button>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;