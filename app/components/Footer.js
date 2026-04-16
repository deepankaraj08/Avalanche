'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

// ── Quick nav links ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',    href: null },        // No id on Hero — scroll to top
  { label: 'About',   href: '#about' },
  { label: 'Events',  href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team',    href: '#team' },
];

const SOCIAL_LINKS = [
  {
    icon: <FaInstagram size={18} />,
    href: 'https://www.instagram.com/team_avalanche_official?igsh=MWw4anl0YnE5c3B2ZQ==',
    label: 'Instagram',
    color: 'hover:text-pink-400 hover:border-pink-500/60 hover:shadow-pink-500/20',
    bg: 'hover:bg-pink-500/10',
  },
  {
    icon: <FaWhatsapp size={18} />,
    href: 'https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t',
    label: 'WhatsApp',
    color: 'hover:text-emerald-400 hover:border-emerald-500/60 hover:shadow-emerald-500/20',
    bg: 'hover:bg-emerald-500/10',
  },
];

const Footer = () => {
  const openWhatsApp = () => {
    window.open('https://chat.whatsapp.com/EnEaVSW1D8mDo16ySfihHm?mode=gi_t', '_blank');
  };

  return (
    <footer
      id="footer"
      className="relative bg-slate-50 dark:bg-[#020617] pt-20 pb-8 overflow-hidden text-slate-800 dark:text-white"
    >
      {/* ── Inline styles ────────────────────────────────────────────────── */}
      <style>{`
        /* Gradient top divider */
        .footer-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(34,211,238,0.5) 30%,
            rgba(99,102,241,0.5) 70%,
            transparent 100%
          );
          margin-bottom: 0;
        }

        /* Animated gradient border on CTA card */
        .footer-cta-glow {
          position: relative;
        }
        .footer-cta-glow::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 1.75rem;
          background: linear-gradient(135deg, #22d3ee, #6366f1, #ec4899, #22d3ee);
          background-size: 300% 300%;
          animation: footerGradSpin 5s linear infinite;
          z-index: 0;
          opacity: 0.6;
        }
        @keyframes footerGradSpin {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .footer-cta-inner {
          position: relative;
          z-index: 1;
          border-radius: 1.65rem;
        }

        /* Social icon base */
        .footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid;
          transition: all 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }

        /* Desktop blob — hidden on mobile */
        @media (max-width: 767px) {
          .footer-blob { display: none !important; }
        }
      `}</style>

      {/* ── Background atmosphere ─────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-[#020617] via-slate-100/80 dark:via-[#0f172a]/60 to-slate-200 dark:to-black"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black)',
          }}
        />
        {/* Glow blobs — desktop only via CSS */}
        <div className="footer-blob absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-cyan-600/8 rounded-[100%] blur-[100px]" />
        <div className="footer-blob absolute top-0 left-[10%] w-[400px] h-[300px] bg-indigo-500/8 rounded-full blur-[80px]" />
        <div className="footer-blob absolute top-0 right-[10%] w-[300px] h-[250px] bg-pink-500/6 rounded-full blur-[70px]" />
      </div>

      {/* ── Top gradient divider line ─────────────────────────────────────── */}
      <div className="footer-divider max-w-7xl mx-auto px-6 mb-16" />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Grid: 1 col on mobile → 2 on sm → 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* ── Col 1 · Brand ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            {/* Logo + name */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-1.5 rounded-full bg-white/80 dark:bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] dark:shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                <img
                  src="/gallery/Avalanche%20Logo.png"
                  alt="Avalanche Logo"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                AVALANCHE
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              The premier tech &amp; innovation club of Siddaganga Institute of Technology,
              Tumakuru — building the next generation of creators.
            </p>

            {/* Location + Email */}
            <div className="flex flex-col gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-2">
                {/* Ping dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </span>
                Tumakuru, Karnataka, India
              </span>
              <a
                href="mailto:avalanche@club.sit.edu"
                className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-cyan-400/50 w-max"
              >
                avalanche@club.sit.edu
              </a>
            </div>
          </div>

          {/* ── Col 2 · Quick Links ──────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black tracking-[0.35em] uppercase text-slate-400 dark:text-slate-500">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <span className="w-4 h-px bg-slate-300 dark:bg-slate-600 group-hover:w-6 group-hover:bg-cyan-500 transition-all duration-300" />
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="group flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <span className="w-4 h-px bg-slate-300 dark:bg-slate-600 group-hover:w-6 group-hover:bg-cyan-500 transition-all duration-300" />
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 · Social ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black tracking-[0.35em] uppercase text-slate-400 dark:text-slate-500">
              Social Pulse
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`group flex items-center gap-3 w-max text-sm font-semibold text-slate-500 dark:text-slate-400 transition-all duration-250 ${s.color}`}
                >
                  <span
                    className={`footer-social-btn border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-white/5 ${s.color} ${s.bg} shadow-sm`}
                  >
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 4 · CTA Card ─────────────────────────────────────────── */}
          <div className="footer-cta-glow self-start">
            <div className="footer-cta-inner bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 md:p-7 flex flex-col gap-4 shadow-xl shadow-black/10 dark:shadow-black/40">
              {/* Heading */}
              <div>
                <h4 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                  Join the Energy
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mt-1">
                  Connect via WhatsApp
                </p>
              </div>

              {/* Sub-text */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Be part of a community that builds, experiments, and drives innovation forward.
              </p>

              {/* Button */}
              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.18em] transition-all duration-300 shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <FaWhatsapp size={14} />
                Register Now
              </button>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 dark:text-slate-600">
          <p>© {new Date().getFullYear()} Avalanche Club · SIT Tumakuru</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy</a>
            <span className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms</a>
            <span className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;