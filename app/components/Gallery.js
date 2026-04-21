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

// ─────────────────────────────────────────────────────────────────────────────
//  GALLERY CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const GalleryCard = ({ img, i, isMobile, openLightbox }) => {
  if (isMobile) {
    return (
      <div
        className="gallery-card-fadein relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 shadow-md break-inside-avoid h-fit"
        style={{ animationDelay: `${(i % 4) * 0.06}s` }}
      >
        <img
          src={img.src}
          alt={`Archive ${i + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-auto block rounded-[2rem]"
        />
        <button
          className="gallery-expand-btn"
          aria-label="View fullscreen"
          onClick={() => openLightbox(img.src)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key={img.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ delay: (i % 4) * 0.1, duration: 0.6, type: 'spring' }}
      className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 cursor-pointer shadow-lg shadow-black/5 dark:shadow-none hover:shadow-cyan-500/20 break-inside-avoid h-fit"
      onClick={() => openLightbox(img.src)}
    >
      <img
        src={img.src}
        alt={`Archive ${i + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-auto block rounded-[2rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-110"
      />
      <div className="absolute inset-0 rounded-[2rem] border border-black/5 dark:border-white/10 pointer-events-none z-20 transition-all duration-300 group-hover:border-cyan-400/50" />
    </motion.div>
  );
};

const GALLERY_IMAGES = [
  { id: 10, src: '/gallery/ten.jpeg' },
  { id: 4, src: '/gallery/fourth.png' },
  { id: 9, src: '/gallery/nine1.png' },
  { id: 1, src: '/gallery/first1.png' },
  { id: 5, src: '/gallery/five.png' },
  { id: 6, src: '/gallery/six.png' },
  { id: 11, src: '/gallery/12.jpeg' },
  { id: 15, src: '/gallery/pic1.png' },
  { id: 17, src: '/gallery/pic3.png' },
  { id: 18, src: '/gallery/pic4.png' },
  { id: 19, src: '/gallery/pic5.png' },
  { id: 20, src: '/gallery/pic6.png' },
  { id: 2, src: '/gallery/second.png' },
  { id: 7, src: '/gallery/seven.jpeg' },
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

  const openLightbox = useCallback((src) => setLightboxSrc(src), []);
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
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-6 mb-8 group"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:w-16" />
          <p className="text-[10px] md:text-xs font-black text-cyan-600 dark:text-cyan-400 tracking-[0.8em] md:tracking-[1.2em] uppercase select-none whitespace-nowrap">
            Visual Archive
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:w-16" />
        </motion.div>

        {/* Mobile & Desktop heading — Impactful white text as requested */}
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(2.25rem,8vw,5.5rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase text-center"
          >
            Stories In <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-indigo-400">Every Frame </span>
          </motion.h2>
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <div className="relative z-20 max-w-[90vw] 2xl:max-w-[95vw] mx-auto w-full flex flex-col gap-6 md:gap-10">

        {/* TOP LAYER (Featured 3) — horizontal on laptop, vertical on phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10">
          {GALLERY_IMAGES.slice(0, 3).map((img, i) => (
            <GalleryCard
              key={img.id}
              img={img}
              i={i}
              isMobile={isMobile}
              openLightbox={openLightbox}
            />
          ))}
        </div>

        {/* REST OF GALLERY (Masonry) */}
        <div className="columns-1 md:columns-2 2xl:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.slice(3).map((img, i) => (
            <GalleryCard
              key={img.id}
              img={img}
              i={i}
              isMobile={isMobile}
              openLightbox={openLightbox}
            />
          ))}
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