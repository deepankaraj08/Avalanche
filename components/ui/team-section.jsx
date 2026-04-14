'use client';

/**
 * TeamSection — reusable card-grid component
 *
 * Props:
 *   members  Array<{
 *     name        : string
 *     designation : string
 *     imageSrc    : string
 *     year        : 1 | 2 | 3 | 4
 *     socialLinks : Array<{ icon: LucideIcon, href: string, label: string }>
 *   }>
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
//  FILTER TABS — update labels here if needed
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
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.9,  filter: 'blur(6px)' },
  show:   {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
  exit:   { opacity: 0, y: -10, scale: 0.92, filter: 'blur(4px)',
    transition: { duration: 0.16, ease: 'easeIn' } },
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

  return (
    <motion.article
      variants={cardVariants}
      layout
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex flex-col items-center p-5 sm:p-6
        rounded-2xl cursor-default select-none overflow-hidden
        bg-white/[0.03]
        border border-white/[0.07]
        hover:border-cyan-500/30
        hover:bg-white/[0.065]
        hover:shadow-[0_0_45px_-8px_rgba(34,211,238,0.28)]
        transition-colors duration-300"
    >
      {/* Top specular shimmer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Hover inner glow overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none
        bg-gradient-to-b from-cyan-400/[0.04] via-transparent to-blue-600/[0.04]
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* ── Avatar ── */}
      <div className="relative mb-5 z-10">
        {/* Animated glow ring */}
        <div className="absolute -inset-1 rounded-full
          bg-gradient-to-tr from-cyan-500/40 via-blue-500/40 to-indigo-500/40
          opacity-0 group-hover:opacity-100 blur-sm
          transition-opacity duration-300" />

        <div
          className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden z-10
            ring-2 ring-white/10 group-hover:ring-cyan-400/50
            shadow-[0_4px_20px_rgba(0,0,0,0.5)]
            transition-all duration-300"
        >
          {imgErr ? (
            <div
              className="w-full h-full flex items-center justify-center
                text-white font-black text-lg tracking-tight"
              style={{
                background: `linear-gradient(135deg, hsl(${hue},52%,26%), hsl(${(hue + 40) % 360},48%,22%))`,
              }}
            >
              {getInitials(member.name)}
            </div>
          ) : (
            <img
              src={member.imageSrc}
              alt={member.name}
              loading="lazy"
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover object-top
                group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>

        {/* Year pill anchored below avatar */}
        <span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2
            px-2.5 py-0.5 rounded-full
            text-[8px] font-black uppercase tracking-widest whitespace-nowrap
            bg-[#0d1117] border border-white/[0.08] text-white/40
            group-hover:border-cyan-500/30 group-hover:text-cyan-400/70
            transition-colors duration-300 z-20"
        >
          Year {member.year}
        </span>
      </div>

      {/* ── Name & role ── */}
      <div className="text-center z-10 mt-1">
        <h3
          className="text-white font-bold text-[0.82rem] sm:text-sm leading-snug
            group-hover:text-cyan-200 transition-colors duration-200 line-clamp-1"
        >
          {member.name}
        </h3>
        <p
          className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em]
            text-slate-500 group-hover:text-cyan-500/80
            transition-colors duration-200 mt-1 line-clamp-1"
        >
          {member.designation}
        </p>
      </div>

      {/* ── Social icons — fade + slide up on hover ── */}
      {member.socialLinks.length > 0 && (
        <div
          className="flex items-center gap-2 mt-4 z-10
            opacity-0 translate-y-3
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ease-out"
        >
          {member.socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full flex items-center justify-center
                bg-white/[0.06] hover:bg-white/[0.14]
                border border-white/[0.08] hover:border-white/20
                text-white/50 hover:text-white
                transition-all duration-200
                hover:scale-110 active:scale-95"
            >
              <link.icon size={14} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FILTER TABS
// ─────────────────────────────────────────────────────────────────────────────
const FilterBar = ({ active, onChange, counts, total }) => (
  <div
    role="tablist"
    aria-label="Filter by year"
    className="flex flex-wrap justify-center gap-2"
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
          className={`relative px-4 sm:px-5 py-2 rounded-full
            text-[11px] font-black uppercase tracking-widest
            transition-all duration-200 active:scale-[0.96]
            outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70
            ${isActive
              ? 'text-white'
              : 'text-white/35 hover:text-white/65 hover:bg-white/[0.04]'
            }`}
        >
          {isActive && (
            <motion.span
              layoutId="team-year-pill"
              className="absolute inset-0 rounded-full
                bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {f.label}
            <span
              className={`inline-flex items-center justify-center
                min-w-[18px] h-[18px] rounded-full px-1
                text-[9px] font-black
                ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-white/[0.07] text-white/30'
                }`}
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
//  EXPORTED COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function TeamSection({ members }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const c = {};
    members.forEach((m) => { c[m.year] = (c[m.year] ?? 0) + 1; });
    return c;
  }, [members]);

  const filtered = useMemo(
    () => activeFilter === 'all' ? members : members.filter((m) => m.year === activeFilter),
    [members, activeFilter],
  );

  const handleFilter = useCallback((key) => setActiveFilter(key), []);

  return (
    <div className="w-full">
      {/* Filter tabs */}
      <LayoutGroup>
        <FilterBar
          active={activeFilter}
          onChange={handleFilter}
          counts={counts}
          total={members.length}
        />
      </LayoutGroup>

      {/* Animated count label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={String(activeFilter)}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="text-center text-[10px] text-white/20 font-bold
            tracking-[0.35em] uppercase mt-6 mb-10 md:mb-12"
        >
          {activeFilter === 'all'
            ? `All ${members.length} members`
            : `${filtered.length} member${filtered.length !== 1 ? 's' : ''} · ${
                FILTERS.find((f) => f.key === activeFilter)?.label
              }`}
        </motion.p>
      </AnimatePresence>

      {/* Card grid — re-mounts on filter change for stagger replay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(activeFilter)}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
        >
          {filtered.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
