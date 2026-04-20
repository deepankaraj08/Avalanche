'use client';

/**
 * About.js - Next Level UI/UX
 * 
 * FEATURES:
 * - Magnetic hover effects on cards
 * - Smooth scroll-triggered animations
 * - Glassmorphism with dynamic borders
 * - Number counter animations
 * - 3D tilt on hover (desktop)
 * - Staggered child animations
 * - Interactive gradient orbs
 * - Typing effect on subtitle
 */

import React, { useRef, useState, useEffect, forwardRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Zap, Heart, ArrowUpRight, Sparkles, Target, Users, Award } from "lucide-react";

/* ---------------- Custom Hooks ---------------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
};

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
  
  return { mouseX, mouseY };
};

/* ---------------- Animated Counter ---------------- */
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const duration = 1500;
        const increment = value / (duration / 16);
        
        const counterTimer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(counterTimer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, value]);
  
  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

/* ---------------- Magnetic Button ---------------- */
const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/* ---------------- 3D Tilt Card ---------------- */
const TiltCard = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setRotateX(y * 10);
    setRotateY(x * 10);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/* ---------------- Bento Card Content ---------------- */
const BentoCardContent = ({ children, bgImage, overlay = true, isMobile }) => {
  if (isMobile && bgImage) {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="relative w-full">
          <img 
            src={bgImage} 
            alt="Content" 
            className="w-full h-auto object-contain block"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          )}
        </div>
        <div className="relative z-10 p-6 flex flex-col flex-1 bg-slate-50 dark:bg-[#0f172a]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[1]" />
          )}
        </>
      )}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8 lg:p-10">
        {children}
      </div>
    </>
  );
};

/* ---------------- Bento Card Desktop (with tilt and glow) ---------------- */
const BentoCardDesktop = ({
  children,
  className,
  glowColor = "rgba(56,189,248,0.15)",
  bgImage,
  tilt = true,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const glow = useMotionTemplate`
    radial-gradient(
      400px circle at ${springX}px ${springY}px,
      ${glowColor},
      transparent 80%
    )
  `;
  
  const borderGlow = useMotionTemplate`
    radial-gradient(
      300px circle at ${springX}px ${springY}px,
      rgba(56,189,248,0.4),
      transparent 70%
    )
  `;
  
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }
  
  const CardWrapper = tilt ? TiltCard : motion.div;
  
  return (
    <CardWrapper
      className={`relative transform-gpu overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/40 dark:from-white/[0.08] dark:to-white/[0.02] border border-slate-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 group ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 0.98, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: borderGlow }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
      />
      <BentoCardContent bgImage={bgImage} overlay={!!bgImage} isMobile={false}>
        {children}
      </BentoCardContent>
    </CardWrapper>
  );
};

/* ---------------- Bento Card Mobile (optimized) ---------------- */
const BentoCardMobile = ({ children, className, bgImage }) => (
  <div
    className={`relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-[#0f172a] border border-slate-200/50 dark:border-white/10 shadow-xl ${className}`}
  >
    <BentoCardContent bgImage={bgImage} isMobile={true}>{children}</BentoCardContent>
  </div>
);

/* ---------------- Main About Section ---------------- */
const About = forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const isMobile = useIsMobile();
  const { mouseX, mouseY } = useMousePosition();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], isMobile ? [0, 0] : [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // Parallax for background orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Parallax for cursor (hooks must be unconditional)
  const cursorX = useTransform(mouseX, (x) => x - 400);
  const cursorY = useTransform(mouseY, (y) => y - 400);
  
  const BentoCard = isMobile ? BentoCardMobile : BentoCardDesktop;
  
  // Stagger children variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const headerContent = (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="flex items-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent" />
        <span className="text-xs font-black tracking-[0.4em] uppercase bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
          Who We Are
        </span>
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
      </motion.div>
      
      <motion.h2 variants={staggerItem} className="text-[clamp(2rem,7vw,4.5rem)] font-black tracking-tighter leading-[1] max-w-5xl text-slate-900 dark:text-white flex items-center flex-wrap gap-x-2 md:gap-x-4 mb-2">
        ABOUT
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500">
            US
          </span>
        </span>
        <motion.span 
          className="inline-block w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shrink-0"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.h2>
      
      <motion.div variants={staggerItem} className="mt-8 text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed space-y-6 font-medium">
        <p className="relative">
          <span className="absolute -left-4 top-0 text-cyan-400 text-4xl font-serif">"</span>
          Avalanche is a dynamic community of enthusiastic individuals dedicated to organizing
          impactful events that inspire creativity, collaboration, and growth. With a passion for bringing
          people together, we curate a diverse range of technical and non-technical events, including
          workshops, competitions, cultural activities, and interactive sessions.
        </p>
        <p>
          Established with a vision to create engaging and inclusive experiences, Avalanche provides a
          platform for students to explore their interests, showcase their talents, and build meaningful
          connections.
        </p>
      </motion.div>
      
      <motion.div variants={staggerItem} className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-10">
        <MagneticButton className="relative group w-[calc(50%-0.5rem)] md:w-auto md:min-w-[170px]">
          <div className="w-full h-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm px-3 py-4 md:px-8 md:py-5 text-center relative overflow-hidden rounded-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                <AnimatedCounter value={2012} />
              </div>
              <div className="text-[10px] md:text-xs font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase break-words leading-tight">Established</div>
            </div>
          </div>
        </MagneticButton>
        
        <MagneticButton className="relative group w-[calc(50%-0.5rem)] md:w-auto md:min-w-[170px]">
          <div className="w-full h-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm px-3 py-4 md:px-8 md:py-5 text-center relative overflow-hidden rounded-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <div className="text-[10px] md:text-xs font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase break-words leading-tight">Active Members</div>
            </div>
          </div>
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
  
  return (
    <section
      ref={(node) => {
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
        sectionRef.current = node;
      }}
      id="about"
      className="relative w-full min-h-screen overflow-hidden
        bg-gradient-to-b from-slate-50 via-white to-slate-50
        dark:from-[#020617] dark:via-[#03071e] dark:to-[#020617]
        transition-colors duration-500
        py-20 md:py-32 lg:py-40"
    >
      {/* Animated gradient background orbs */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-[130px]"
            style={{ y: orb1Y }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur-[120px]"
            style={{ y: orb2Y }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-[150px]"
            style={{ y: orb3Y }}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Grid pattern with gradient mask */}
      <div
        className="absolute inset-0 z-0 pointer-events-none 
          bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
          dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"
        style={{
          backgroundSize: '60px 60px',
          maskImage: isMobile ? 'none' : 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />
      
      {/* Cursor follower glow (desktop only) */}
      {!isMobile && (
        <motion.div
          className="fixed w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
            x: cursorX,
            y: cursorY,
          }}
        />
      )}
      
      <div ref={innerRef} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with parallax */}
        {isMobile ? (
          <div className="mb-20 md:mb-32">
            {headerContent}
          </div>
        ) : (
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }} 
            className="mb-20 md:mb-32"
          >
            {headerContent}
          </motion.div>
        )}
        
        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(240px,auto)]"
          style={{ opacity: cardsOpacity }}
        >
          {/* Avalanche Featured Card */}
          <BentoCard
            className="md:col-span-4 lg:col-start-2 lg:col-span-4 max-md:row-span-1 md:row-span-2 group"
            glowColor="rgba(56,189,248,0.25)"
            bgImage="/gallery/six.png"
            tilt={!isMobile}
          >
            <div className="flex justify-between items-start mb-10">
              <motion.div 
                className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl max-md:hidden"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-7 h-7" />
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5, y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowUpRight className="w-7 h-7 text-white/80 hover:text-white transition-colors" />
              </motion.div>
            </div>
            
            <div className="mt-auto">
              <motion.h3 
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Avalanche
              </motion.h3>
              
              <motion.p 
                className="text-white/90 text-lg max-w-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The team behind SIT's most iconic events.
                <br />
                Creators of unforgettable campus experiences.
              </motion.p>
              
            </div>
          </BentoCard>
          
          {/* GOONJ Initiative - Full width card with custom design */}
          {isMobile ? (
            <BentoCard
              className="md:col-span-4 lg:col-span-6 max-md:row-span-1 md:row-span-2"
              glowColor="rgba(217,70,239,0.25)"
              bgImage="/gallery/five.png"
            >
              <div className="mt-auto pt-24">
                <motion.div className="flex items-start gap-2 mb-3">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-fuchsia-400 fill-fuchsia-400" />
                  <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-fuchsia-300">
                    The Soul of Avalanche
                  </span>
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-3 text-white">
                  GOONJ Initiative
                </h3>
                
                <p className="text-white/80 text-sm md:text-lg leading-relaxed">
                  GOONJ connects the campus with the community through empathy, education, and meaningful impact.
                </p>
              </div>
            </BentoCard>
          ) : (
            <motion.div
              className="md:col-span-4 lg:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TiltCard className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-fuchsia-50/30 to-white dark:from-white/[0.08] dark:via-fuchsia-500/10 dark:to-white/[0.02] border border-slate-200/50 dark:border-white/10 backdrop-blur-xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                  <div className="flex-1">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-500/25">
                        <Heart className="w-6 h-6 text-white fill-white" />
                      </div>
                      
                      <span className="text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                        The Soul of Avalanche
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      GOONJ Initiative
                    </motion.h3>
                    
                    <motion.p 
                      className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      GOONJ connects the campus with the community through empathy, education, and meaningful impact.
                      We believe in creating lasting change through collective action and compassion.
                    </motion.p>
                    
                    {/* Impact metrics */}
                    <motion.div 
                      className="flex flex-wrap gap-6 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {[
                        { icon: Users, value: "2000+", label: "Beneficiaries" },
                        { icon: Target, value: "25+", label: "Outreach Programs" },
                      ].map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-fuchsia-500/10">
                            <stat.icon className="w-5 h-5 text-fuchsia-500" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Animated Image Circle */}
                  <motion.div 
                    className="hidden lg:flex items-center justify-center flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative w-56 h-56 rounded-full border-2 border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 overflow-hidden shadow-2xl">
                      <img
                        src="/gallery/five.png"
                        alt="GOONJ Initiative"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Animated rings */}
                      <div className="absolute inset-0 border border-fuchsia-500/40 rounded-full animate-[spin_10s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                      <div className="absolute inset-0 border border-cyan-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }} />
                      <div className="absolute inset-0 border border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite]" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
                      
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/30 via-transparent to-transparent" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
              </TiltCard>
            </motion.div>
          )}
        </motion.div>
        

      </div>
    </section>
  );
});

About.displayName = "About";

export default About;