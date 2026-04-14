'use client';

/**
 * team-section.jsx
 *
 * Premium glassmorphism team grid.
 *
 * Props  ─  members: Array<{
 *   name        : string
 *   role        : string
 *   image       : string        /PHOTOS/file.jpg  (null → initials fallback)
 *   year        : 1 | 2 | 3 | 4
 *   instagram   : string | null
 *   linkedin    : string | null
 * }>
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 1,     label: '1st Year' },
  { key: 2,     label: '2nd Year' },
  { key: 3,     label: '3rd Year' },
  { key: 4,     label: '4th Year' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const gridVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.91, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 220, damping: 22 },
  },
  exit: {
    opacity: 0, y: -8, scale: 0.93, filter: 'blur(6px)',
    transition: { duration: 0.16, ease: 'easeIn' },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const strToHue = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 37 + s.charCodeAt(i)) % 360;
  return h;
};

const getInitials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// ─────────────────────────────────────────────────────────────────────────────
//  MEMBER CARD
// ─────────────────────────────────────────────────────────────────────────────

const MemberCard = ({ member }) => {
  const [imgErr, setImgErr] = useState(false);
  const hue = strToHue(member.name);
  const hasInsta  = !!member.instagram;
  const hasLinked = !!member.linkedin;

  return (
    <motion.article
      variants={cardVariants}
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="
        group relative flex flex-col items-center
        p-5 sm:p-7
        rounded-[1.75rem]
        bg-gradient-to-b from-white/[0.09] to-white/[0.04]
        backdrop-blur-xl
        border border-white/[0.09]
        shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]
        hover:border-white/[0.18]
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_50px_-10px_rgba(34,211,238,0.22)]
        hover:from-white/[0.13] hover:to-white/[0.06]
        overflow-hidden select-none
        transition-colors duration-300
        cursor-default
      "
    >
      {/* ── Radial glow – top-center, visible on hover ── */}
      <div
        className="
          absolute inset-0 rounded-[1.75rem] pointer-events-none
          bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,211,238,0.09),transparent)]
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />

      {/* ── Top-edge specular shimmer ── */}
      <div
        className="
          absolute top-0 left-8 right-8 h-px
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-400
        "
      />

      {/* ── Avatar ─────────────────────────────────────────────────────────── */}
      <div className="relative mb-5 sm:mb-6">

        {/* Blurred glow halo behind the avatar */}
        <div
          className="
            absolute -inset-2 rounded-full
            bg-gradient-to-tr from-cyan-500/50 via-blue-500/40 to-indigo-500/50
            blur-lg opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />

        {/* Avatar ring shell */}
        <div
          className="
            relative z-10
            w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36
            rounded-full overflow-hidden
            ring-[1.5px] ring-white/[0.12]
            group-hover:ring-2 group-hover:ring-cyan-400/50
            shadow-[0_6px_28px_rgba(0,0,0,0.6)]
            transition-all duration-400
          "
        >
          {imgErr ? (
            /* Initials fallback */
            <div
              className="w-full h-full flex items-center justify-center text-white font-black text-2xl sm:text-3xl tracking-tight"
              style={{
                background: `linear-gradient(145deg,
                  hsl(${hue},50%,28%),
                  hsl(${(hue + 50) % 360},45%,20%))`,
              }}
            >
              {getInitials(member.name)}
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              onError={() => setImgErr(true)}
              className="
                w-full h-full object-cover object-top
                scale-100 group-hover:scale-[1.08]
                transition-transform duration-500 ease-out
              "
            />
          )}
        </div>
      </div>

      {/* ── Text ─────────────────────────────────────────────────────────── */}
      <div className="text-center z-10 flex flex-col items-center">

        {/* Name */}
        <h3
          className="
            text-[0.9rem] sm:text-base md:text-lg
            font-semibold leading-snug
            text-white/90 group-hover:text-white
            transition-colors duration-200
            line-clamp-1
          "
        >
          {member.name}
        </h3>

        {/* Role */}
        <p
          className="
            mt-1 text-[10px] sm:text-xs
            font-medium uppercase tracking-[0.2em]
            text-white/30 group-hover:text-white/50
            transition-colors duration-200
            line-clamp-1
          "
        >
          {member.role}
        </p>

        {/* Year badge */}
        <span
          className="
            inline-flex items-center mt-3
            px-3 py-[3px] rounded-full
            text-[9px] font-black uppercase tracking-widest
            bg-white/[0.05] border border-white/[0.08]
            text-white/25
            group-hover:bg-cyan-500/10 group-hover:border-cyan-500/25 group-hover:text-cyan-400/70
            transition-all duration-300
          "
        >
          {member.year === 1 ? '1st' : member.year === 2 ? '2nd' : member.year === 3 ? '3rd' : '4th'} Year
        </span>
      </div>

      {/* ── Social links — fade + slide up on hover ──────────────────────── */}
      {(hasInsta || hasLinked) && (
        <div
          className="
            flex items-center gap-2.5 mt-5 z-10
            opacity-0 translate-y-3
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ease-out
          "
        >
          {hasInsta && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              onClick={(e) => e.stopPropagation()}
              className="
                w-9 h-9 rounded-full flex items-center justify-center
                bg-white/[0.07] border border-white/[0.09]
                text-white/45 hover:text-white
                hover:bg-gradient-to-tr hover:from-yellow-500/80 hover:via-red-500/80 hover:to-purple-600/80
                hover:border-transparent
                transition-all duration-200 hover:scale-110 active:scale-95
              "
            >
              <Instagram size={14} strokeWidth={1.8} />
            </a>
          )}
          {hasLinked && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
              className="
                w-9 h-9 rounded-full flex items-center justify-center
                bg-white/[0.07] border border-white/[0.09]
                text-white/45 hover:text-white
                hover:bg-[#0a66c2] hover:border-transparent
                transition-all duration-200 hover:scale-110 active:scale-95
              "
            >
              <Linkedin size={14} strokeWidth={1.8} />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FILTER BAR
// ─────────────────────────────────────────────────────────────────────────────

const FilterBar = ({ active, onChange, counts, total }) => (
  <div
    role="tablist"
    aria-label="Filter team by year"
    className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
  >
    {FILTERS.map((f) => {
      const isActive = active === f.key;
      const count    = f.key === 'all' ? total : (counts[f.key] ?? 0);
      return (
        <button
          key={String(f.key)}
          role="tab"
          type="button"
          aria-selected={isActive}
          onClick={() => onChange(f.key)}
          className={`
            relative px-4 sm:px-5 py-2 rounded-full
            text-[11px] font-bold uppercase tracking-widest
            transition-colors duration-200 active:scale-[0.95]
            outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60
            ${isActive
              ? 'text-white'
              : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
            }
          `}
        >
          {/* Sliding pill */}
          {isActive && (
            <motion.span
              layoutId="filter-pill"
              className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
                shadow-[0_0_22px_rgba(34,211,238,0.45)]
              "
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
            />
          )}

          <span className="relative z-10 flex items-center gap-1.5">
            {f.label}
            <span
              className={`
                inline-flex items-center justify-center
                min-w-[18px] h-[18px] rounded-full px-1 text-[9px] font-black
                ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-white/[0.06] text-white/25'
                }
              `}
            >
              {count}
            </span>
          </span>
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function TeamSection({ members }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const c = {};
    members.forEach((m) => { c[m.year] = (c[m.year] ?? 0) + 1; });
    return c;
  }, [members]);

  const filtered = useMemo(
    () => (activeFilter === 'all' ? members : members.filter((m) => m.year === activeFilter)),
    [members, activeFilter],
  );

  const handleFilter = useCallback((key) => setActiveFilter(key), []);

  return (
    <div className="w-full">

      {/* ── Filter tabs ── */}
      <LayoutGroup>
        <FilterBar
          active={activeFilter}
          onChange={handleFilter}
          counts={counts}
          total={members.length}
        />
      </LayoutGroup>

      {/* ── Animated count label ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={String(activeFilter)}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="
            text-center text-[10px] text-white/20
            font-bold tracking-[0.4em] uppercase
            mt-6 mb-10 md:mb-14
          "
        >
          {activeFilter === 'all'
            ? `${members.length} members · SIT Tumakuru`
            : `${filtered.length} member${filtered.length !== 1 ? 's' : ''} · ${FILTERS.find((f) => f.key === activeFilter)?.label}`}
        </motion.p>
      </AnimatePresence>

      {/* ── Card grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(activeFilter)}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3 sm:gap-4 md:gap-5
          "
        >
          {filtered.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
