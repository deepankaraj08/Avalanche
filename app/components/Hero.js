'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { SpaceStars } from '../../components/ui/meteors';

// Destructure scrollTo and refs from the props passed from the parent page
const Hero = forwardRef(({ scrollTo, refs }, ref) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Configuration: 3D Parallax Space Effect
  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      fullScreen: { enable: false },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab",
            parallax: {
              enable: true,
              force: 45,
              smooth: 15,
            },
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.4,
              color: "#3b82f6",
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#3b82f6", "#06b6d4"],
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 120,
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white"
    >
      <SpaceStars starCount={120} className="absolute inset-0" />

      <div className="absolute inset-0 -z-10 h-full w-full">
        {init && (
          <Particles
            id="tsparticles"
            className="absolute inset-0 h-full w-full"
            options={particlesOptions}
          />
        )}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-black" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 mt-16 md:mt-0">
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tight leading-none"
          >
            We Don’t Just Organize Events
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tight leading-none pb-2"
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">
              — We Create Moments.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-center text-gray-200 text-base md:text-lg max-w-2xl leading-relaxed font-light"
        >
          Proudly organizing Radiance & Advento — celebrations of talent, culture, and creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-16 w-full max-w-3xl group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />

          <div className="relative bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-[1.75rem] p-8 md:p-10 flex flex-col items-center text-center shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                Live Now <span className="text-gray-600 mx-2">•</span> <span className="text-gray-300">Mar 22, 2026</span>
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
              Radiance
            </h2>
            <p className="text-gray-400 mb-8 font-medium">
              Where Talent Shines Brightest.
            </p>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Check for Events Button: Scrolls to Events section */}
              <button 
                onClick={() => scrollTo(refs.eventsRef)}
                className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Check for Events
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Meet the Team Button: Scrolls to Team section */}
              <button 
                onClick={() => scrollTo(refs.teamRef)}
                className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Meet the Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;