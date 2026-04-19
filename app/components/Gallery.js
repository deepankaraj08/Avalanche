'use client';

/**
 * Gallery.js
 *
 * MOBILE PERFORMANCE: Zero framer-motion on mobile.
 * Cards use CSS-only fade-in. Hover scale/transitions disabled.
 * AnimatedTitle replaced with plain <h2> on mobile.
 * Desktop keeps full whileInView + spring animations.
 */

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_IMAGES = [
  { id: 1,  src: '/gallery/first1.png' },
  { id: 4,  src: '/gallery/fourth.png' },
  { id: 5,  src: '/gallery/five.png' },
  { id: 6,  src: '/gallery/six.png' },
  { id: 9,  src: '/gallery/nine1.png' },
  { id: 10, src: '/gallery/ten.jpeg' },
  { id: 11, src: '/gallery/12.jpeg' },
  { id: 15, src: '/gallery/pic1.png' },
  { id: 16, src: '/gallery/pic2.png' },
  { id: 17, src: '/gallery/pic3.png' },
  { id: 18, src: '/gallery/pic4.png' },
  { id: 19, src: '/gallery/pic5.png' },
  { id: 20, src: '/gallery/pic6.png' },
  { id: 2,  src: '/gallery/second.png' },
  { id: 7,  src: '/gallery/seven.jpeg' },
  { id: 12, src: '/gallery/aurora.png' },
  { id: 13, src: '/gallery/dmc.jpeg' },
  { id: 14, src: '/gallery/vdc.png' },
];

// ── Desktop-only animated title (never mounts on mobile) ──────────────────────
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
  };
  const child = {
    hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', damping: 14, stiffness: 100 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Gallery = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const openLightbox  = useCallback((src) => setLightboxSrc(src), []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close lightbox on back-swipe / Escape key
  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxSrc, closeLightbox]);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative w-full min-h-screen overflow-hidden
        bg-slate-50 dark:bg-[#020617]
        transition-colors duration-500
        py-24 md:py-40 flex flex-col justify-center"
    >
      {/* CSS-only fade-in for gallery cards on mobile */}
      <style>{`
        @keyframes galleryFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gallery-card-fadein {
          animation: galleryFade 0.4s ease-out both;
        }
        /* Expand button */
        .gallery-expand-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .gallery-expand-btn:active {
          background: rgba(34,211,238,0.55);
          transform: scale(0.92);
        }
      `}</style>

      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none
          bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]"
        style={{
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />

      {/* ── Ambient colour blobs (hidden on mobile to save GPU) ── */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[8%] w-[560px] h-[560px] bg-indigo-300/30 dark:bg-indigo-700/12 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[8%] w-[480px] h-[480px] bg-cyan-300/30 dark:bg-cyan-700/12 rounded-full blur-[110px]" />
        <div className="absolute bottom-[8%] left-1/2 w-[660px] h-[380px] bg-blue-400/20 dark:bg-blue-800/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[600px]
          bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15)_0%,transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_65%)]
          pointer-events-none" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 text-center mb-16 md:mb-24 px-6">

        {/* Badge — simple motion (just opacity+scale, one element, fine on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500" />
          <p className="text-[10px] md:text-xs font-black text-cyan-600 dark:text-cyan-500 tracking-[0.5em] md:tracking-[0.8em] uppercase">
            Visual Archive
          </p>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500" />
        </motion.div>

        {/* Mobile heading — plain HTML, zero animation cost */}
        <div className="flex md:hidden flex-col items-center">
          <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Moments In
          </h2>
          <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
            Motion.
          </h2>
        </div>

        {/* Desktop heading — animated word reveal */}
        <div className="hidden md:block">
          <AnimatedTitle
            text="Moments In"
            className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
          />
          <AnimatedTitle
            text="Motion."
            delay={0.3}
            className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tighter leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 md:drop-shadow-[0_0_30px_rgba(34,211,238,0.15)] dark:md:drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          />
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <div className="relative z-20 max-w-[90vw] 2xl:max-w-[95vw] mx-auto w-full">
        <div className="columns-1 md:columns-2 2xl:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.map((img, i) =>
            isMobile ? (
              // ── MOBILE: plain div + CSS fade + expand button ──
              <div
                key={img.id}
                className="gallery-card-fadein relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 shadow-md break-inside-avoid"
                style={{ animationDelay: `${(i % 4) * 0.06}s` }}
              >
                <img
                  src={img.src}
                  alt={`Archive ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block rounded-[2rem]"
                />
                {/* ── Expand / Fullscreen button ── */}
                <button
                  className="gallery-expand-btn"
                  aria-label="View fullscreen"
                  onClick={() => openLightbox(img.src)}
                >
                  {/* Expand icon (same as the four-corner icon in the prompt) */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            ) : (
              // ── DESKTOP: full framer-motion + hover effects ──
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.6, type: 'spring' }}
                className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 cursor-pointer shadow-lg shadow-black/5 dark:shadow-none hover:shadow-cyan-500/20 break-inside-avoid"
              >
                <img
                  src={img.src}
                  alt={`Archive ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block rounded-[2rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Inner glass border */}
                <div className="absolute inset-0 rounded-[2rem] border border-black/5 dark:border-white/10 pointer-events-none z-20 transition-all duration-300 group-hover:border-cyan-400/50" />
              </motion.div>
            )
          )}
        </div>
      </div>
      {/* ── Mobile Lightbox ── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.img
              src={lightboxSrc}
              alt="Fullscreen view"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="max-w-[92vw] max-h-[82vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close fullscreen"
              className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                backdropFilter: 'blur(6px)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;