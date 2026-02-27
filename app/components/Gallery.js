'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const GALLERY_IMAGES = [
  { id: 1, image: '/gallery/first1.png' },
  { id: 2, image: '/gallery/second.png' },
  { id: 3, image: '/gallery/third.png' },
  { id: 4, image: '/gallery/fourth.png' },
  { id: 5, image: '/gallery/five.png' },
  { id: 6, image: '/gallery/six.png' },
  { id: 7, image: '/gallery/seven.jpeg' },
  { id: 8, image: '/gallery/nine1.png' },
  { id: 9, image: '/gallery/ten.jpeg' },
  { id: 10, image: '/gallery/dmc.jpeg' },
  { id: 11, image: '/gallery/vdc.png' },
  { id: 12, image: '/gallery/aurora.png' },
  { id: 13, image: '/gallery/black.png' },
];

const Gallery = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className="py-20 md:py-44 relative overflow-hidden bg-[#020617] text-white"
      id="gallery"
    >
      {/* ⭐ Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars
          starCount={
            typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 150
          }
          className="opacity-40 md:opacity-60"
        />
      </div>

      {/* 🌌 Background Layers */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.1),_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <header className="mb-16 md:mb-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,10vw,6.5rem)] md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            Moments In <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 italic">
              Motion
            </span>
          </motion.h2>
        </header>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="break-inside-avoid group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-white/20">

                <img
                  src={img.image}
                  alt="gallery"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;