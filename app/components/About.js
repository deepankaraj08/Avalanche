'use client';

import React, { useRef, useState, useEffect, forwardRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Zap, Heart, ArrowUpRight } from "lucide-react";

/* ---------------- Bento Card ---------------- */

function BentoCard({
  children,
  className,
  glowColor = "rgba(56,189,248,0.15)",
  bgImage,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}px ${mouseY}px,
      ${glowColor},
      transparent 80%
    )
  `;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (isMobile) return;

    const rect = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  return (
    <motion.div
      className={`relative transform-gpu overflow-hidden rounded-3xl bg-white/60 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/10 backdrop-blur-md group ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={isMobile ? {} : { scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition"
          style={{ background: glow }}
        />
      )}

      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
        </>
      )}

      <div className="relative z-10 h-full flex flex-col p-6 md:p-8 lg:p-10">
        {children}
      </div>
    </motion.div>
  );
}

/* ---------------- Main About Section ---------------- */

const About = forwardRef((props, ref) => {
  const innerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full min-h-screen overflow-hidden
        bg-slate-50 dark:bg-[#020617]
        transition-colors duration-500
        py-20 md:py-32 lg:py-40"
    >
      {/* ── Background grid (Matches Team & Gallery) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none 
        bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]
        dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]"
        style={{
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />

      {/* ── Ambient colour blobs (Matches Team & Gallery) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[8%] w-[560px] h-[560px] bg-indigo-300/30 dark:bg-indigo-700/12 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[8%] w-[480px] h-[480px] bg-cyan-300/30 dark:bg-cyan-700/12 rounded-full blur-[110px]" />
        <div className="absolute bottom-[8%] left-1/2 w-[660px] h-[380px] bg-blue-400/20 dark:bg-blue-800/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[600px]
          bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15)_0%,transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_65%)]
          pointer-events-none" />
      </div>

      <div ref={innerRef} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div style={{ opacity, y: headerY }} className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-xs font-black tracking-[0.4em] uppercase text-cyan-600 dark:text-cyan-400">
              The Architecture of Hype
            </span>
          </div>

          <h2 className="text-[clamp(3rem,10vw,6rem)] font-black tracking-tighter leading-[0.9] max-w-4xl text-slate-900 dark:text-white">
            We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500 italic">
              Culture
            </span>
          </h2>

          <p className="mt-8 text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            SIT Tumkur’s event powerhouse. We engineer experiences that define
            the campus heartbeat.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(240px,auto)]">
          
          {/* Avalanche */}
          <BentoCard
            className="md:col-span-4 lg:col-start-2 lg:col-span-4 row-span-2 text-white"
            glowColor="rgba(56,189,248,0.2)"
            bgImage="/gallery/12.jpeg"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 rounded-2xl bg-black text-white shadow-xl">
                <Zap className="w-7 h-7" />
              </div>

              <ArrowUpRight className="w-7 h-7 opacity-60" />
            </div>

            <div className="mt-auto">
              <h3 className="text-4xl md:text-6xl font-black mb-4">
                Avalanche
              </h3>

              <p className="text-white/80 text-lg max-w-xl">
                The apex of creative leadership. Architects behind SIT’s most
                iconic nights and cultural explosions.
              </p>
            </div>
          </BentoCard>

          {/* GOONJ */}
          <BentoCard className="md:col-span-4 lg:col-span-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>

                  <span className="text-xs font-black tracking-[0.3em] uppercase text-fuchsia-600 dark:text-fuchsia-400">
                    The Soul of Avalanche
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                  GOONJ Initiative
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-3xl">
                  GOONJ bridges campus life with community needs through empathy, teaching and shared moments.
                </p>
              </div>

              {/* Image Circle */}
              <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-48 h-48 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 relative overflow-hidden p-1 shadow-xl">
                <img
                  src="/gallery/five.png"
                  alt="GOONJ Initiative"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/20 to-transparent pointer-events-none" />

                {/* spinning rings only on desktop */}
                <div className="absolute inset-0 border border-fuchsia-500/30 rounded-full scale-[1.05] hidden lg:block animate-[spin_10s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                <div className="absolute inset-0 border border-cyan-500/30 rounded-full scale-[1.1] hidden lg:block animate-[spin_15s_linear_infinite_reverse]" style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }} />
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;