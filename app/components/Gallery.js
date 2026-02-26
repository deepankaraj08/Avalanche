'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SpaceStars } from '../../components/ui/meteors';

const GALLERY_IMAGES = [
  { id: 1, title: 'Concert Night', size: 'h-[300px] md:h-[400px]', category: 'Events', url: 'https://images.unsplash.com/photo-1540039155733-d74421cc7438?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Tech Workshop', size: 'h-[250px] md:h-[350px]', category: 'Education', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Drama Performance', size: 'h-[400px] md:h-[550px]', category: 'Theatre', url: 'https://images.unsplash.com/photo-1507676184212-d03305a527f4?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Dance Face-off', size: 'h-[300px] md:h-[450px]', category: 'Dance', url: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Alumni Meet', size: 'h-[280px] md:h-[400px]', category: 'Network', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Fashion Show', size: 'h-[250px] md:h-[380px]', category: 'Culture', url: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Hackathon', size: 'h-[320px] md:h-[480px]', category: 'Tech', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop' },
];

const Gallery = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-20 md:py-44 relative overflow-hidden bg-[#020617] text-white" id="gallery">
      
      {/* 1. THE STARS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceStars starCount={150} className="opacity-40 md:opacity-60" />
      </div>

      {/* 2. ATMOSPHERIC LAYERS */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-50" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.1),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.1),_transparent_50%)]" />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ===== Header ===== */}
        <header className="mb-16 md:mb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6 backdrop-blur-md"
          >
            <span className="text-cyan-400 font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[8px] md:text-[10px]">Visual Legacy</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,10vw,6.5rem)] md:text-8xl font-black text-white tracking-tighter leading-[0.9] md:leading-none"
          >
            Moments In <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 italic pr-2">Motion</span>
          </motion.h2>
          
          <motion.p className="mt-6 md:mt-8 text-gray-500 text-xs md:text-lg font-bold max-w-xl uppercase tracking-[0.15em] opacity-80 leading-relaxed">
            A visual journey through the soul of Avalanche.
          </motion.p>
        </header>

        {/* ===== Masonry Grid (Optimized for performance) ===== */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="break-inside-avoid relative group cursor-pointer will-change-transform"
            >
              <div className={`relative overflow-hidden rounded-[1.8rem] md:rounded-[2.5rem] border border-white/5 ${img.size} bg-[#020617]/40 backdrop-blur-xl transition-all duration-700 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                
                <img 
                  src={img.url} 
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 will-change-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  <div className="mb-3 md:mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/80">
                      {img.category}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-3xl font-black text-white tracking-tighter translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    {img.title}
                  </h3>
                </div>

                {/* Desktop-only action button to reduce mobile clutter */}
                <div className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
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