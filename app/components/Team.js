'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import { SpaceStars } from '../../components/ui/meteors';

// ==========================================
// 1. Centralized Team Data
// ==========================================
const TEAM_MEMBERS = [
  { name: 'Rahul Sharma', role: 'President', linkedin: '#', instagram: '#' },
  { name: 'Ananya Reddy', role: 'Vice President', linkedin: '#', twitter: '#' },
  { name: 'Vikram Singh', role: 'Head of Events', linkedin: '#', instagram: '#' },
  { name: 'Neha Gupta', role: 'Head of PR', linkedin: '#', instagram: '#' },
  { name: 'Arjun Nair', role: 'Tech Lead', linkedin: '#', twitter: '#' },
  { name: 'Pooja Desai', role: 'Creative Director', linkedin: '#', instagram: '#' },
  { name: 'Karan Patel', role: 'Logistics Lead', linkedin: '#', instagram: '#' },
  { name: 'Sneha Rao', role: 'Finance Head', linkedin: '#', twitter: '#' },
];

// ==========================================
// 2. Animation Variants
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
};

// ==========================================
// 3. Main Component
// ==========================================
const Team = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30">
      
      {/* ===== Shared Deep Space Background Stack ===== */}
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none opacity-50" />
      
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-black" />
        <div 
          className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true" 
        />
        {/* Ambient Corner Glows */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ===== Section Header ===== */}
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Leadership</span>
            <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            The Minds Behind{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic pr-2">
              Avalanche
            </span>
          </motion.h2>
        </header>

        {/* ===== Team Grid ===== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative flex flex-col items-center group bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white/[0.02] hover:border-white/10 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Profile Image Container */}
              <div className="relative w-36 h-36 mb-6">
                
                {/* The "Pro" Hover Glow Ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-md opacity-20 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500" />
                
                <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[3px] group-hover:rotate-[10deg] transition-transform duration-500 shadow-inner">
                  {/* Fixed inner border color to match new backdrop */}
                  <div className="w-full h-full rounded-full bg-[#0a0f1a] overflow-hidden flex items-center justify-center border-4 border-[#0a0f1a]">
                    
                    {/* Placeholder Logic: Initials (Replace with <img src={member.image} /> when you have photos) */}
                    <span className="text-4xl font-black text-white/20 group-hover:text-cyan-400 transition-colors select-none">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    
                  </div>
                </div>

                {/* Floating Social Icons */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                  <a 
                    href={member.linkedin} 
                    aria-label={`${member.name}'s LinkedIn profile`}
                    className="w-10 h-10 rounded-full bg-[#020617] border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all shadow-lg"
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                  <a 
                    href={member.instagram || member.twitter} 
                    aria-label={`${member.name}'s Social profile`}
                    className="w-10 h-10 rounded-full bg-[#020617] border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-400 hover:bg-blue-500/20 transition-all shadow-lg"
                  >
                    {member.instagram ? <FaInstagram size={16} /> : <FaTwitter size={16} />}
                  </a>
                </div>
              </div>

              {/* Text Info */}
              <div className="text-center relative z-10">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {member.name}
                </h3>
                <p className="text-cyan-500/80 font-semibold text-xs mt-2 uppercase tracking-[0.2em]">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;