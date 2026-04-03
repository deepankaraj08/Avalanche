'use client';

import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Target, 
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
  { name: "x", icon: Hexagon },
  { name: "y", icon: Triangle },
  { name: "z", icon: CommandIcon },
  { name: "a", icon: Ghost },
  { name: "b", icon: Gem },
  { name: "c", icon: Cpu },
];

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
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      className="relative min-h-[100dvh] w-full bg-background text-foreground overflow-hidden font-sans transition-colors duration-500"
    >
      {/* SCOPED ANIMATIONS */}
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

      {/* Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu overflow-hidden opacity-50 dark:opacity-100">
        <motion.div
          animate={isMobile ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-600/20 dark:bg-cyan-600/15 rounded-full blur-[100px] md:blur-[140px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-indigo-600/20 dark:bg-indigo-600/15 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-8 pt-8 text-center lg:text-left z-20">
            
            {/* Badge */}
            <div className="animate-fade-in delay-100 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 px-3 py-1.5 backdrop-blur-md transition-all hover:bg-zinc-200/50 dark:hover:bg-white/10">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                  The Official Event Powerhouse
                  <Star className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 
              className="animate-fade-in delay-200 text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tighter leading-[0.95] text-foreground mx-auto lg:mx-0 max-w-2xl lg:max-w-none"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
              }}
            >
              We Don’t Just<br />
              Organize Events<br />
              <span className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent italic">
                — We Create Moments.
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-300 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mx-auto lg:mx-0">
              Premiere event management collective, architecting 
              unforgettable campus experiences through raw talent & immersive production.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton 
                onClick={() => scrollTo(refs.eventsRef)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 sm:px-10 sm:py-5 text-sm font-black text-background uppercase tracking-widest transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] shadow-lg shadow-cyan-500/10 dark:shadow-cyan-500/20"
              >
                Check Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              
              <MagneticButton 
                onClick={() => scrollTo(refs.teamRef)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/5 px-8 py-4 sm:px-10 sm:py-5 text-sm font-black text-foreground uppercase tracking-widest backdrop-blur-md transition-all hover:bg-zinc-200/50 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20"
              >
                <Play className="w-4 h-4 fill-current" />
                Meet the Team
              </MagneticButton>
            </div>
          </div>

          {/* --- RIGHT COLUMN SPACER (Keeps layout intact) --- */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7" />
        </div>
      </div>

      {/* --- CORNER STACK: Radiance + Sponsors --- 
          Restored Absolute Positioning for Desktop! 
      */}
      <div className="animate-fade-in delay-500 relative mt-12 px-4 lg:px-0 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-4 xl:right-8 z-30 flex flex-col items-center lg:items-end gap-6 pointer-events-auto pb-12 lg:pb-0">
        
        {/* Featured Event Card (Radiance) */}
        <motion.div 
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/5 p-8 sm:p-12 min-h-[450px] lg:min-h-[550px] xl:min-h-[600px] w-full max-w-[650px] lg:w-[480px] xl:w-[650px] flex flex-col justify-between backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_0_80px_rgba(34,211,238,0.15)] transition-all duration-700 hover:border-cyan-500/40 transform-gpu group mx-auto lg:mx-0"
        >
          {/* --- HOLOGRAPHIC HUD OVERLAYS --- */}
          <div className="absolute inset-6 sm:inset-10 pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl transition-all duration-700 group-hover:border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl transition-all duration-700 group-hover:border-cyan-400" />
          </div>

          <motion.div 
            animate={{ top: ["5%", "95%", "5%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-px z-20 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)] pointer-events-none"
          />

          {/* Reduced particle count for performance on mobile */}
          <div className="absolute inset-0 z-10 pointer-events-none transform-gpu overflow-hidden">
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
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

          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-cyan-500/15 blur-[80px] sm:blur-[100px] pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 top-0 z-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700 transform-gpu overflow-hidden rounded-[2.5rem] hidden lg:block">
            <div 
              className="w-full h-full"
              style={{
                transform: 'scale(1.5) translateY(12px) translateX(8px)',
                transformOrigin: 'center',
              }}
            >
              <InteractiveRobotSpline 
                scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="relative z-20" style={{ transform: "translateZ(80px)" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20 backdrop-blur-sm">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black italic tracking-tight text-foreground uppercase leading-none shadow-sm">Radiance</div>
                <div className="text-[9px] sm:text-[10px] text-cyan-600 dark:text-cyan-500/80 font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                   System Active: v2.0
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-4 max-w-[150px] sm:max-w-[200px]">
              <div className="flex justify-between text-[9px] sm:text-[10px] uppercase tracking-widest font-black">
                <span className="text-zinc-500">Scan Status</span>
                <span className="text-cyan-400">92%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600" />
              </div>
            </div>
          </div>

          <div className="relative z-20 self-end pointer-events-none flex flex-col items-end gap-1 opacity-50 font-black italic text-[9px] sm:text-[10px] uppercase tracking-tighter" style={{ transform: "translateZ(40px)" }}>
             <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Live Interaction Mode
             </div>
             <div className="text-zinc-500 tracking-widest">SIT-PROD-2026-X</div>
          </div>
        </motion.div>

        {/* Marquee Card */}
        <div ref={refs?.sponsorsRef} className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/5 py-6 sm:py-8 w-full max-w-[650px] lg:w-[480px] xl:w-[650px] backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-700 hover:border-zinc-300 dark:hover:border-white/20 mx-auto lg:mx-0">
          <h1 className="mb-4 sm:mb-6 px-6 sm:px-8 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 text-center lg:text-left align-center justify-center">Sponsors</h1>
          
          <div 
            className="relative flex overflow-hidden w-full"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
          >
            <div className="animate-marquee flex gap-8 sm:gap-12 whitespace-nowrap px-4">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 opacity-50 transition-all hover:opacity-100 cursor-default grayscale hover:grayscale-0"
                >
                  <client.icon className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 dark:text-zinc-300" />
                  <span className="text-xs sm:text-sm font-bold text-foreground tracking-tighter uppercase leading-none">
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