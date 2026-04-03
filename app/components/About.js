'use client';

import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Users, Heart, Zap, Globe, ArrowUpRight, Sparkles } from 'lucide-react';

// --- BENTO CARD WRAPPER WITH MOUSE GLOW ---
function BentoCard({ children, className, glowColor = 'rgba(56, 189, 248, 0.15)', bgImage }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/10 backdrop-blur-xl group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 0.99 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Dynamic Glow Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Background Image Layer */}
      {bgImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/80" />
        </>
      )}

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
        {children}
      </div>
    </motion.div>
  );
}

// --- ANIMATED COUNTER ---
function Counter({ value, suffix = "" }) {
  const nodeRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          nodeRef.current.textContent = Math.round(v) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={nodeRef} className="tabular-nums">0{suffix}</span>;
}

// --- MAIN ABOUT COMPONENT ---
const About = forwardRef((props, ref) => {
  const innerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative min-h-screen py-24 md:py-40 bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden"
    >
      {/* Background Ambient Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div ref={innerRef} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* --- HEADER SECTION --- */}
        <motion.div style={{ opacity, y: headerY }} className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-cyan-600 dark:text-cyan-400">
              The Architecture of Hype
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] max-w-4xl">
            We Build <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 italic pr-4">
              Culture.
            </span>
          </h2>
          <p className="mt-8 text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            SIT Tumkur’s event powerhouse. We don’t just book venues; we engineer experiences that dictate the campus heartbeat.
          </p>
        </motion.div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)]">

          {/* Core Identity */}
          <BentoCard 
            className="md:col-span-4 lg:col-span-4 row-span-2 group/card text-white" 
            glowColor="rgba(56, 189, 248, 0.2)"
            bgImage="/gallery/12.jpeg"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl">
                <Zap className="w-8 h-8" />
              </div>
              <ArrowUpRight className="w-8 h-8 text-slate-300 dark:text-slate-700 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="mt-auto">
              <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">Avalanche</h3>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
                The apex of creative leadership. We are the architects behind SIT's most iconic nights, tech-summits, and cultural explosions. Raw talent meets rigorous execution.
              </p>
            </div>
          </BentoCard>

          {/* Stats Box 1 */}


          {/* GOONJ - Social Initiative */}
          <BentoCard className="md:col-span-4 lg:col-span-6 row-span-1 bg-gradient-to-br from-fuchsia-500/5 to-rose-500/5" glowColor="rgba(217, 70, 239, 0.15)">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-xs font-black tracking-[0.3em] uppercase text-fuchsia-600 dark:text-fuchsia-400">The Soul of Avalanche</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                  GOONJ Initiative
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-3xl">
                  We believe in spreading joy beyond borders. GOONJ is our social outreach arm, bridging the gap between campus life and community needs through empathy, teaching, and shared moments.
                </p>
              </div>
              
              <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-52 h-52 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 relative overflow-hidden group/img p-1 shadow-2xl">
                 <img 
                   src="/gallery/five.png" 
                   alt="GOONJ Initiative" 
                   className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover/img:scale-110" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/20 to-transparent pointer-events-none" />
                 <div className="absolute inset-0 border border-fuchsia-500/30 rounded-full scale-[1.05] animate-[spin_10s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}/>
                 <div className="absolute inset-0 border border-cyan-500/30 rounded-full scale-[1.1] animate-[spin_15s_linear_infinite_reverse]" style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }}/>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;