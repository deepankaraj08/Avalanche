'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

// ==========================================
// 1. Data Structure with Unsplash Placeholders
// ==========================================
const GALLERY_IMAGES = [
  { id: 1, title: 'Concert Night', size: 'h-80', category: 'Events', url: 'https://images.unsplash.com/photo-1540039155733-d74421cc7438?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Tech Workshop', size: 'h-64', category: 'Education', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Drama Performance', size: 'h-96', category: 'Theatre', url: 'https://images.unsplash.com/photo-1507676184212-d03305a527f4?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Dance Face-off', size: 'h-72', category: 'Dance', url: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Alumni Meet', size: 'h-80', category: 'Network', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Fashion Show', size: 'h-64', category: 'Culture', url: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Hackathon', size: 'h-72', category: 'Tech', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop' },
];

// ==========================================
// 2. Main Component
// ==========================================

const Gallery = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30">
      
      {/* ===== Shared Deep Space Background Stack (Exact match to Home) ===== */}
      <SpaceStars starCount={120} className="absolute inset-0 pointer-events-none" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        {/* Deep Space Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-black" />
        
        {/* Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true" 
        />
        
        {/* Ambient Glows (Matched to Hero) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ===== Section Header (Synced with Design System) ===== */}
        <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm">Visual Legacy</span>
            <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight"
          >
            Moments In <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent italic pr-2">Motion</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg md:text-xl font-light max-w-2xl"
          >
            A visual journey through the soul of Avalanche. The energy, the people, and the unforgettable memories.
          </motion.p>
        </header>

        {/* ===== Pro Masonry Grid ===== */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="break-inside-avoid relative group"
            >
              {/* Image Wrapper */}
              <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${img.size} bg-black/40 backdrop-blur-xl transition-all duration-500 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]`}>
                
                {/* The Image */}
                <img 
                  src={img.url} 
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />

                {/* Dark Vignette Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Glassmorphism Info Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1.5 block drop-shadow-md">
                      {img.category}
                    </span>
                    <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg tracking-tight">
                      {img.title}
                    </h3>
                  </div>
                </div>

                {/* Expand Icon (Top Right) */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>

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