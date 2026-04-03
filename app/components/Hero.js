'use client';

import React, { forwardRef, useEffect, useState, useMemo, useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate 
} from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Star,
  Hexagon,
  Triangle,
  Command as CommandIcon,
  Ghost,
  Gem,
  Cpu
} from "lucide-react";
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';

// --- MOCK BRANDS for the Marquee ---
const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: CommandIcon },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

// --- SUB-COMPONENTS ---
const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

// Reusable Magnetic Button Component
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
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
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
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.button>
  );
}

const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tilt logic for "Pro" depth effect on cards
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full bg-zinc-950 text-white overflow-hidden font-sans"
    >
      {/* 
        SCOPED ANIMATIONS 
      */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background Image with Gradient Mask */}
      <div 
        className="absolute inset-0 z-0 bg-[url(/hero-bg.png)] bg-cover bg-center opacity-40 transform-gpu"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 80%, transparent)",
        }}
      />

      {/* Ambient Lights (from current theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu overflow-hidden">
        <motion.div
          animate={isMobile ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8 ml-auto ">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-8 pt-8">
            
            {/* Badge */}
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  The Official Event Powerhouse
                  <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              className="animate-fade-in delay-200 text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tighter leading-[0.95] text-white"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
              }}
            >
              We Don’t Just<br />
              Organize Events<br />
              <span className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent italic">
                — We Create Moments.
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed font-medium">
              SIT Tumkur’s premiere event management collective, architecture 
              unforgettable campus experiences through raw talent & immersive production.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <MagneticButton 
                onClick={() => scrollTo(refs.eventsRef)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-sm font-black text-zinc-950 uppercase tracking-widest transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] shadow-lg shadow-cyan-500/10"
              >
                Check Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              
              <MagneticButton 
                onClick={() => scrollTo(refs.teamRef)}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black text-white uppercase tracking-widest backdrop-blur-md transition-colors hover:bg-white/10 hover:border-white/20"
              >
                <Play className="w-4 h-4 fill-current" />
                Meet the Team
              </MagneticButton>
            </div>
          </div>

          {/* --- RIGHT COLUMN --          {/* --- RIGHT COLUMN (Empty now, moved to absolute corner stack) --- */}
          <div className="lg:col-span-6 xl:col-span-7" />
        </div>
      </div>

      {/* --- CORNER STACK: Radiance + Sponsors --- */}
      <div className="animate-fade-in delay-500 absolute top-1/2 -translate-y-1/2 right-8 z-30 flex flex-col items-end gap-6 pointer-events-auto">
        
        {/* Featured Event Card (Radiance) */}
        <motion.div 
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-12 min-h-[600px] w-[650px] flex flex-col justify-between backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.15)] transition-all duration-700 hover:border-cyan-500/40 transform-gpu group"
        >
          {/* --- HOLOGRAPHIC HUD OVERLAYS --- */}
          <div className="absolute inset-10 pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl transition-all duration-700 group-hover:border-cyan-400" />
          </div>

          <motion.div 
            animate={{ top: ["5%", "95%", "5%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-px z-20 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)] pointer-events-none"
          />

          <div className="absolute inset-0 z-10 pointer-events-none transform-gpu overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: [Math.random() * 40 - 20, Math.random() * 40 - 20], 
                  y: [Math.random() * 40 - 20, Math.random() * 40 - 20] 
                }}
                transition={{ duration: 3 + i, repeat: Infinity, repeatType: "mirror" }}
                className="absolute h-1.5 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                style={{ 
                  top: `${10 + Math.random() * 80}%`, 
                  left: `${10 + Math.random() * 80}%` 
                }}
              />
            ))}
          </div>

          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700 transform-gpu overflow-hidden rounded-[2.5rem]">
            <div className="w-full h-full scale-[1.5] origin-center translate-y-12 translate-x-8">
              <InteractiveRobotSpline 
                scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="relative z-20" style={{ transform: "translateZ(80px)" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20 backdrop-blur-sm">
                <Target className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-4xl font-black italic tracking-tight text-white uppercase leading-none shadow-sm">Radiance</div>
                <div className="text-[10px] text-cyan-500/80 font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                   System Active: v2.0
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-4 max-w-[200px]">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-black">
                <span className="text-zinc-500">Scan Status</span>
                <span className="text-cyan-400">92%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/5 border border-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-400 to-indigo-600" />
              </div>
            </div>
          </div>

          <div className="relative z-20 self-end pointer-events-none flex flex-col items-end gap-1 opacity-50 font-black italic text-[10px] uppercase tracking-tighter" style={{ transform: "translateZ(40px)" }}>
             <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Live Interaction Mode
             </div>
             <div className="text-zinc-500 tracking-widest">SIT-PROD-2026-X</div>
          </div>
        </motion.div>

        {/* Marquee Card (Sponsors Placeholder) - Positioned below Radiance */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 py-8 w-[650px] backdrop-blur-xl transition-colors duration-700 hover:border-white/20">
          <h3 className="mb-6 px-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Trusted by Industry Leaders</h3>
          
          <div 
            className="relative flex overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
          >
            <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 opacity-50 transition-all hover:opacity-100 cursor-default grayscale hover:grayscale-0"
                >
                  <client.icon className="h-5 w-5 text-zinc-300" />
                  <span className="text-sm font-bold text-white tracking-tighter uppercase leading-none">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;