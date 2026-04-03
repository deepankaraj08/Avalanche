'use client';

import React, { useRef, useState, useEffect, forwardRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  AnimatePresence
} from 'framer-motion';


const ABOUT_CONTENT = [
  {
    id: 'avalanche',
    title: 'Avalanche',
    subtitle: 'The Heart of Campus Events',
    description: "The official event management powerhouse of SIT Tumkur. We architect unforgettable campus experiences through a fusion of creativity, leadership, and raw student energy.",
    gradientText: 'from-cyan-400 via-blue-500 to-indigo-600',
    spotlightColor: 'rgba(56, 189, 248, 0.2)',
    accent: 'bg-cyan-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'goonj',
    title: 'GOONJ',
    subtitle: 'Spreading Joy Beyond Borders',
    description: "Our soul. A social outreach initiative bridging the gap between campus life and community needs. Fostering empathy through visits, teaching, and shared moments of happiness.",
    gradientText: 'from-purple-400 via-fuchsia-400 to-rose-500',
    spotlightColor: 'rgba(217, 70, 239, 0.2)',
    accent: 'bg-fuchsia-500',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

// Reusable Magnetic Button Component
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouse(e) {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

function InteractiveCard({ item, parallaxY }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-smooth physics tailored for high-end web experiences
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: parallaxY,
        rotateX: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : rotateX,
        rotateY: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-[1200px] transform-gpu"
    >
      <article className="relative h-full w-full rounded-[2.5rem] bg-white/60 dark:bg-[#0b1121]/80 backdrop-blur-[20px] md:backdrop-blur-[40px] border border-white/60 dark:border-white/10 p-8 md:p-14 overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_-20px_rgba(0,0,0,0.3)] transition-colors duration-700 hover:border-slate-300 dark:hover:border-white/20">

        {/* Animated Gradient Border Overlay */}
        <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ maskImage: 'linear-gradient(white, white)', maskComposite: 'exclude' }} />

        {/* Dynamic Interactive Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                700px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])},
                ${item.spotlightColor},
                transparent 80%
              )
            `,
          }}
        />

        {/* Noise Texture Overlay for Premium Feel — desktop only */}
        {typeof window !== 'undefined' && window.innerWidth >= 768 && (
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        )}

        {/* Content with 3D Z-translation POP */}
        <div className="relative z-10 flex flex-col h-full transform-gpu transition-transform duration-500 ease-out" style={{ transform: isHovered ? "translateZ(50px) scale(1.02)" : "translateZ(0px) scale(1)" }}>

          <div className="flex items-center justify-between mb-10">
            <div className={`w-14 h-1 rounded-full ${item.accent} transition-all duration-700 group-hover:w-24 group-hover:opacity-100 opacity-30 shadow-[0_0_20px_rgba(255,255,255,0.5)]`} />
            <motion.div
              initial={{ rotate: -45, opacity: 0 }}
              animate={isHovered ? { rotate: 0, opacity: 1, scale: 1.1 } : { rotate: -45, opacity: 0.5, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className={`p-3 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 text-slate-800 dark:text-white shadow-xl ${isHovered ? 'shadow-' + item.accent.split('-')[1] + '-500/20' : ''}`}
            >
              {item.icon}
            </motion.div>
          </div>

          <h3 className={`text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br ${item.gradientText} bg-clip-text text-transparent mb-5 filter drop-shadow-sm`}>
            {item.title}
          </h3>

          <p className="text-slate-500 dark:text-white/50 font-bold tracking-[0.25em] text-[10px] md:text-xs uppercase mb-8">
            {item.subtitle}
          </p>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg font-medium">
            {item.description}
          </p>

          <div className="mt-auto pt-10">
            <MagneticButton className="cursor-pointer group/btn flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-transform duration-500 group-hover/btn:scale-110 shadow-lg`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <span className="text-slate-900 dark:text-white text-xs font-black tracking-widest uppercase group-hover/btn:opacity-100 opacity-60 transition-opacity duration-300">
                Explore Initiative
              </span>
            </MagneticButton>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

// Letter animation component for the header
const AnimatedTitle = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 16, stiffness: 100 } },
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(5px)" },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
          {word.includes('Magic.') && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring" }}
              className="absolute -right-6 -top-2 text-cyan-400 text-3xl"
            >
              ✦
            </motion.span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

const About = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Balanced parallax offsets with a scale effect for extra depth
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      className={`${isMobile ? 'mt-[-10px]' : 'mt-[-2px]'} pt-0 pb-32 md:pb-60 relative overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white`}
      id="about"
    >
      {/* High-End Background Atmosphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{
          maskImage: `linear-gradient(to top, black ${isMobile ? '80%' : '95%'}, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to top, black ${isMobile ? '80%' : '95%'}, transparent 100%)`
        }}
      >

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.08)_0%,_transparent_60%)]" />

        {/* Animated ambient blobs */}
        <motion.div
          animate={isMobile ? {} : { x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      {/* Light Mode Specific Ambient Blobs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none block dark:hidden overflow-hidden overflow-x-hidden w-full h-full max-w-full"
        style={{
          maskImage: `linear-gradient(to top, black ${isMobile ? '85%' : '90%'}, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to top, black ${isMobile ? '85%' : '90%'}, transparent 100%)`
        }}
      >
        <motion.div
          animate={isMobile ? {} : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 right-10 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[80px]"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        ref={containerRef}
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full"
      >

        {/* Designer Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-24 md:mb-40 gap-10">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
              <p className="text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.6em] uppercase">
                The Collective
              </p>
            </motion.div>

            <AnimatedTitle
              text="The Minds Behind The Magic."
              className="text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden xl:block text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-[280px] text-right leading-relaxed shrink-0 pb-4"
          >
            SIT Tumkur's Premier Event Management Collective, orchestrating experiences that resonate and endure.
          </motion.p>
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start pb-20 max-w-full overflow-hidden">
          <div className="lg:col-span-6 w-full lg:sticky lg:top-40 z-20">
            <InteractiveCard item={ABOUT_CONTENT[0]} parallaxY={isMobile ? 0 : y1} />
          </div>
          <div className="lg:col-span-6 lg:mt-64 w-full z-10">
            <InteractiveCard item={ABOUT_CONTENT[1]} parallaxY={isMobile ? 0 : y2} />
          </div>
        </div>

      </motion.div>
    </section>
  );
});

About.displayName = 'About';

export default About;