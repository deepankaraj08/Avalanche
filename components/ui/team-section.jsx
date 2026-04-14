'use client';

/**
 * team-section.jsx  —  Premium glassmorphism team grid
 *
 * Props  ─  members: Array<{
 *   name        : string
 *   role        : string
 *   image       : string          /PHOTOS/file.jpg  (null → initials fallback)
 *   year        : 1 | 2 | 3 | 4
 *   position    : string | null   CSS object-position e.g. "50% 20%" (default "top")
 *                                  Use this to fix cropped faces per member
 *   instagram   : string | null
 *   linkedin    : string | null
 * }>
 *
 * Advanced interactions added:
 *   • 3-D card tilt     — rotateX/Y follows mouse, resets on leave
 *   • Cursor spotlight  — radial glow tracks cursor inside each card
 *   • Magnetic avatar   — avatar shifts slightly toward cursor
 *   • objectPosition    — per-member face positioning, no cropping
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 4, label: '4th Year' },
  { key: 3, label: '3rd Year' },
  { key: 2, label: '2nd Year' },
  { key: 1, label: '1st Year' },
];

const TILT_MAX = 11;   // degrees
const MAGNETIC_PX = 8;    // max avatar magnetic shift (px)

// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATION VARIANTS  (unchanged logic — just refined values)
// ─────────────────────────────────────────────────────────────────────────────

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.90, filter: 'blur(10px)' },
  show: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  exit: {
    opacity: 0, y: -10, scale: 0.92, filter: 'blur(6px)',
    transition: { duration: 0.18, ease: 'easeIn' },
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

const ordinal = (n) => ['1st', '2nd', '3rd', '4th'][n - 1] ?? `${n}th`;

// ─────────────────────────────────────────────────────────────────────────────
//  MEMBER CARD  — with 3-D tilt + cursor spotlight + magnetic avatar
// ─────────────────────────────────────────────────────────────────────────────

const MemberCard = ({ member }) => {
  const [imgErr, setImgErr] = useState(false);
  // imgLoaded: tracks when <img> fires onLoad — drives skeleton → real image swap
  const [imgLoaded, setImgLoaded] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });
  const cardRef = useRef(null);
  const hue = strToHue(member.name);
  const hasInsta = !!member.instagram;
  const hasLinked = !!member.linkedin;

  // ── Motion values for 3-D tilt ──────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 260, damping: 26, mass: 0.6 };
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-TILT_MAX, TILT_MAX]), springCfg);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [TILT_MAX, -TILT_MAX]), springCfg);

  // ── Motion values for magnetic avatar ───────────────────────────────────
  const magRawX = useMotionValue(0);
  const magRawY = useMotionValue(0);
  const magX = useSpring(useTransform(magRawX, [-1, 1], [-MAGNETIC_PX, MAGNETIC_PX]), { stiffness: 300, damping: 28 });
  const magY = useSpring(useTransform(magRawY, [-1, 1], [-MAGNETIC_PX, MAGNETIC_PX]), { stiffness: 300, damping: 28 });

  // ── Mouse tracking ───────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();

    // Normalised −1 → +1
    const nx = ((e.clientX - left) / width) * 2 - 1;
    const ny = ((e.clientY - top) / height) * 2 - 1;

    rawX.set(nx);
    rawY.set(ny);
    magRawX.set(nx);
    magRawY.set(ny);

    // Spotlight percentage
    setSpotlight({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
      visible: true,
    });
  }, [rawX, rawY, magRawX, magRawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    magRawX.set(0);
    magRawY.set(0);
    setSpotlight((s) => ({ ...s, visible: false }));
  }, [rawX, rawY, magRawX, magRawY]);

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      layout
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className="
        group relative flex flex-col items-center
        p-6 sm:p-8 md:p-10
        rounded-[1.75rem]
        bg-gradient-to-b from-white/[0.09] to-white/[0.04]
        dark:from-white/[0.06] dark:to-white/[0.02]
        backdrop-blur-md sm:backdrop-blur-xl
        border border-white/[0.09]
        dark:border-white/[0.07]
        shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]
        hover:border-white/[0.22]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_70px_-12px_rgba(34,211,238,0.30)]
        overflow-hidden select-none
        transition-[border-color,box-shadow,background] duration-400
        cursor-pointer will-change-transform
        active:scale-[0.98]
        min-h-[360px] sm:min-h-[420px] md:min-h-[520px]
      "
    >
      {/* ── Cursor spotlight ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-[1.75rem] pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(34,211,238,0.13) 0%, transparent 62%)`,
        }}
      />

      {/* ── Static top-center radial glow ────────────────────────────────── */}
      <div
        className="
          absolute inset-0 rounded-[1.75rem] pointer-events-none z-0
          bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.07),transparent)]
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />

      {/* ── Top-edge specular shimmer ─────────────────────────────────────── */}
      <div
        className="
          absolute top-0 left-10 right-10 h-px z-0
          bg-gradient-to-r from-transparent via-white/35 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />
      {/* ── Shine sweep — animated light ray on hover ─────────────────────── */}
      <div className="absolute inset-0 rounded-[1.75rem] pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="card-shine absolute inset-y-0 w-1/3
              bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          />
        </div>
      </div>

      {/* ── Avatar (magnetic) ─────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mb-6 sm:mb-7"
        style={{ x: magX, y: magY }}
      >
        {/* Glow bloom behind avatar */}
        <div
          className="
            absolute -inset-3 rounded-full
            bg-gradient-to-tr from-cyan-500/55 via-blue-500/45 to-indigo-500/55
            blur-xl opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />

        {/* Avatar shell */}
        <div
          className="
            relative z-10
            w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56
            rounded-full overflow-hidden
            ring-[1.5px] ring-white/[0.13]
            group-hover:ring-2 group-hover:ring-cyan-400/55
            shadow-[0_8px_32px_rgba(0,0,0,0.7)]
            group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_32px_rgba(34,211,238,0.30)]
            transition-all duration-400
          "
        >
          {imgErr ? (
            /* ── Initials fallback ── */
            <div
              className="w-full h-full flex items-center justify-center text-white font-black text-2xl sm:text-3xl tracking-tight"
              style={{
                background: `linear-gradient(145deg, hsl(${hue},50%,28%), hsl(${(hue + 50) % 360},45%,20%))`,
              }}
            >
              {getInitials(member.name)}
            </div>
          ) : (
            <>
              {/* ── Skeleton pulse — shown until image loads ── */}
              {!imgLoaded && (
                <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              )}
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                draggable={false}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgErr(true)}
                className={`
                  w-full h-full object-cover
                  will-change-transform transform-gpu
                  scale-[0.96] group-hover:scale-[1.05]
                  transition-all duration-500 ease-out
                  ${imgLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ objectPosition: member.position ?? '50% 15%' }}
              />
            </>
          )}
        </div>
      </motion.div>

      {/* ── Text ─────────────────────────────────────────────────────────── */}
      <div className="text-center z-10 flex flex-col items-center mt-6">

        {/* Name */}
        <h3
          className="
            text-lg sm:text-xl md:text-2xl
            font-semibold tracking-tight leading-snug
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
            mt-2 text-sm md:text-base
            font-medium uppercase tracking-[0.16em]
            text-white/30 group-hover:text-white/55
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
            px-3.5 py-[4px] rounded-full
            text-[10px] font-black uppercase tracking-widest
            bg-white/[0.05] border border-white/[0.08]
            text-white/25
            group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-300/75
            transition-all duration-300
          "
        >
          {ordinal(member.year)} Year
        </span>
      </div>

      {/* ── Social links — fade + slide up on hover ───────────────────────── */}
      {(hasInsta || hasLinked) && (
        <div
          className="
            flex items-center gap-4 mt-5 z-10
            opacity-100 translate-y-0
            sm:opacity-0 sm:translate-y-3
            sm:group-hover:opacity-100 sm:group-hover:translate-y-0
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
                hover:bg-gradient-to-tr hover:from-yellow-500/90 hover:via-red-500/90 hover:to-purple-600/90
                hover:border-transparent
                transition-all duration-200 hover:scale-110 active:scale-95
              "
            >
              <Instagram size={14} strokeWidth={1.75} />
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
              <Linkedin size={14} strokeWidth={1.75} />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  FILTER BAR  (unchanged logic — minor spacing tweak)
// ─────────────────────────────────────────────────────────────────────────────

const FilterBar = ({ active, onChange, counts, total }) => (
  <div
    role="tablist"
    aria-label="Filter team by year"
    className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
  >
    {FILTERS.map((f) => {
      const isActive = active === f.key;
      const count = f.key === 'all' ? total : (counts[f.key] ?? 0);
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
          {isActive && (
            <motion.span
              layoutId="filter-pill"
              className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
                shadow-[0_0_24px_rgba(34,211,238,0.5)]
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
                ${isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-white/25'}
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
//  MAIN EXPORT  (filtering logic untouched)
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
          transition={{ duration: 0.22 }}
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

      {/* Card grid — max 3 per row, scroll-triggered entrance */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(activeFilter)}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            mx-auto max-w-6xl
            gap-6 sm:gap-8 md:gap-12
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
