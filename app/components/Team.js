'use client';

/**
 * Team.js  —  Page-level section component
 *
 * MOBILE PERFORMANCE: On mobile, cards render as plain <div> with CSS-only
 * fade-in — zero framer-motion overhead, zero IntersectionObservers, zero
 * GPU compositor layers. Desktop keeps whileInView animations.
 */

import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
//  RAW DATA
// ─────────────────────────────────────────────────────────────────────────────
const ALL_MEMBERS = [
  // ── Year 4 ─────────────────────────────────────────────
  { year: 4, name: 'Anmol Sharan', image: '/PHOTOS/anmol.jpeg', instagram: 'https://www.instagram.com/anmol.0927', linkedin: 'https://www.linkedin.com/in/anmol-sharan-8a01172b7' },
  { year: 4, name: 'Chinmayee D', image: '/PHOTOS/Chinmayee.jpeg', instagram: null, linkedin: null },
  { year: 4, name: 'Rishabh Ojha', image: '/PHOTOS/rishabh.jpg', instagram: 'https://www.instagram.com/yah_rishabh', linkedin: 'https://www.linkedin.com/in/rishabh-ojha-854775294' },
  { year: 4, name: 'Satyam Verma', image: '/PHOTOS/satyam.jpeg', instagram: 'https://www.instagram.com/satyam1260', linkedin: 'https://www.linkedin.com/in/satyam-verma-0b9b922aa/' },
  { year: 4, name: 'Shruti Shreya', image: '/PHOTOS/ShrutiShreya.jpeg', instagram: 'https://www.instagram.com/_shruti_0709_', linkedin: 'https://www.linkedin.com/in/shruti-shreya-450197264/' },
  { year: 4, name: 'Yash Kumar', image: '/PHOTOS/YASH.jpeg', instagram: 'https://www.instagram.com/This_.iz_yash', linkedin: null },

  // ── Year 3 ───────────────────────────────────────────────────────────────
  { year: 3, name: 'Advaita Amrit', image: '/PHOTOS/advaita.jpg', instagram: 'https://www.instagram.com/advaita_amrrit', linkedin: 'https://www.linkedin.com/in/advaita-amrit' },
  { year: 3, name: 'Harsh Raj', image: '/PHOTOS/harsh.jpeg', instagram: 'https://www.instagram.com/harshxraze', linkedin: 'https://www.linkedin.com/in/harsh-raj-346ba3202/' },
  { year: 3, name: 'Jhanvi', image: '/PHOTOS/Jnanavi.jpeg', instagram: 'https://www.instagram.com/jnanaviiii', linkedin: 'https://www.linkedin.com/in/JnanaviHarish' },
  { year: 3, name: 'Manan Agarwal', image: '/PHOTOS/Manan.jpeg', instagram: 'https://www.instagram.com/manan_agarwal06?utm_source=qr&igsh=aWF0anE4NzA4MDB1', linkedin: 'https://www.linkedin.com/in/manan-agarwal-5b290a256' },
  { year: 3, name: 'Mohammed Affan', image: '/PHOTOS/affan.jpg', instagram: null, linkedin: null },
  { year: 3, name: 'Mrinalini', image: '/PHOTOS/mrinalini.jpg', instagram: 'https://www.instagram.com/iitz_mrinal', linkedin: 'https://www.linkedin.com/in/mrinalini-56270b2a6' },
  { year: 3, name: 'Nuha Fathima', image: '/PHOTOS/nuha copy.jpeg', instagram: 'https://www.instagram.com/nuhaaaa24', linkedin: 'https://www.linkedin.com/in/nuha-fathima-559860296' },
  { year: 3, name: 'Prakhar Bansal', image: '/PHOTOS/prakhar.jpg', instagram: 'https://www.instagram.com/prakharrrr_bansal_', linkedin: 'https://www.linkedin.com/in/prakhar-bansal' },
  { year: 3, name: 'Purvi Raj', image: '/PHOTOS/purvi.jpg', instagram: 'https://www.instagram.com/raj_purvi_sd', linkedin: 'https://www.linkedin.com/in/s-d-purvi-raj-775a53331' },
  { year: 3, name: 'Vansh Jha', image: '/PHOTOS/vansh.jpeg', instagram: 'https://www.instagram.com/vanshhjhaa', linkedin: 'https://www.linkedin.com/in/vansh-jha13' },
  { year: 3, name: 'Yash Jadhav', image: '/PHOTOS/yash2year.jpeg', instagram: 'https://www.instagram.com/yash__1910/', linkedin: 'https://www.linkedin.com/in/yash-jadhav-7ba599264/' },

  // ── Year 2 ───────────────────────────────────────────────────────────────
  { year: 2, name: 'Babul Kumar', image: '/PHOTOS/babul.jpg', instagram: 'https://www.instagram.com/babulkr328', linkedin: 'https://www.linkedin.com/in/babul-kumar-a0a45a27b' },

  { year: 2, name: 'Abhinav Raj', image: '/PHOTOS/abhinav.png', instagram: 'https://www.instagram.com/abhinav.en', linkedin: 'https://www.linkedin.com/in/abhinav-raj-9b789731a' },
  { year: 2, name: 'Aditya Kumar', image: '/PHOTOS/aditya.jpeg', instagram: 'https://www.instagram.com/adiiix18', linkedin: 'https://www.linkedin.com/in/aditya-kumar-289162318' },

  { year: 2, name: 'Ankit Kumar', image: '/PHOTOS/ANKIT.jpeg', instagram: 'https://www.instagram.com/iyk.ankit', linkedin: 'https://www.linkedin.com/in/ankit-kumar-4a1b94333' },

  { year: 2, name: 'Deeksha', image: '/PHOTOS/deeksha1 copy.png', instagram: 'https://www.instagram.com/im_deeksha_08', linkedin: 'https://www.linkedin.com/in/deeksha-n-018864' },
  { year: 2, name: 'Deepankar Raj', image: '/PHOTOS/deepankar.jpeg', instagram: 'https://www.instagram.com/deepankaraj?igsh=cjRxbnpveHVtMml3l', linkedin: 'https://www.linkedin.com/in/deepankaraj' },
  { year: 2, name: 'Dhruthi M', image: '/PHOTOS/dhruthi.jpg', instagram: 'https://www.instagram.com/dhruthi__m', linkedin: 'https://www.linkedin.com/in/dhruthi-m-940bb6385' },
  { year: 2, name: 'Inchara Vishwanath', image: '/PHOTOS/inchara.jpg', instagram: 'https://www.instagram.com/inch_vishwanath', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3' },
  { year: 2, name: 'Keerthi Pai', image: '/PHOTOS/keerthi copy.jpg', instagram: null, linkedin: 'https://www.linkedin.com/in/keerthi-pai-506bbb334' },
  { year: 2, name: 'Lasya Shetty', image: '/PHOTOS/lasya.jpg', instagram: 'https://www.instagram.com/nagalasyaaa', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3' },
  { year: 2, name: 'Lisha GL', image: '/PHOTOS/LISHA.jpg', instagram: 'https://www.instagram.com/lisha_gl', linkedin: 'https://www.linkedin.com/in/lisha-g-l-377656372' },
  { year: 2, name: 'Madhurya R', image: '/PHOTOS/madhurya.jpg', instagram: 'https://www.instagram.com/_madhurya__r', linkedin: 'https://www.linkedin.com/in/madhurya-r-336784336' },
  { year: 2, name: 'Nanditha LM', image: '/PHOTOS/nanditha copy.jpg', instagram: 'https://www.instagram.com/nanditha_mallikarjun', linkedin: 'https://www.linkedin.com/in/nanditha-l-m-905057371' },
  { year: 2, name: 'Saket Sinha', image: '/PHOTOS/saket.jpg', instagram: 'https://www.instagram.com/__saket__sinha__', linkedin: 'https://www.linkedin.com/in/saket-sinha-930506331' },
  { year: 2, name: 'Samarth Gupta', image: '/PHOTOS/samarth.jpg', instagram: 'https://www.instagram.com/samarth_542', linkedin: 'https://www.linkedin.com/in/samarth-gupta-7ab08a331' },
  { year: 2, name: 'Sayan Kumar', image: '/PHOTOS/sayan.jpeg', instagram: 'https://www.instagram.com/_sayan38', linkedin: 'https://www.linkedin.com/in/sayan-kumar-342536331' },
  { year: 2, name: 'Soham Khade', image: '/PHOTOS/soham.jpg', instagram: 'https://www.instagram.com/sohamkhade0901', linkedin: 'https://www.linkedin.com/in/soham-khade-410378380' },
  { year: 2, name: 'Vishal Tiwary', image: '/PHOTOS/tiwari.jpeg', instagram: 'https://www.instagram.com/vishaltiwary016', linkedin: 'https://www.linkedin.com/in/vishal-kumar-tiwary-a0b243310' },

  // ── Year 1 ────────────────────────────────────────────────────
  { year: 1, name: 'Abhijeet Satyam', image: '/PHOTOS/jeet.jpeg', instagram: 'https://www.instagram.com/the_jeetx', linkedin: 'https://www.linkedin.com/in/abhijeet-satyam-45b85a3b4' },
  { year: 1, name: 'Anjali Mallur', image: '/PHOTOS/anjali copy.jpg', instagram: 'https://www.instagram.com/anjalimallur', linkedin: 'https://www.linkedin.com/in/anjali-mallur-238031374' },
  { year: 1, name: 'Aryan Shandilya', image: '/PHOTOS/aryan.jpg', instagram: 'https://www.instagram.com/aryan.tf', linkedin: 'https://www.linkedin.com/in/aryan-shandilya-757266382' },
  { year: 1, name: 'Avnish Aman', image: '/PHOTOS/avnish.jpg', instagram: 'https://www.instagram.com/avnish__04', linkedin: 'https://www.linkedin.com/in/avnish-aman-903b39362' },
  { year: 1, name: 'Ayman Akhtar', image: '/PHOTOS/ayman copy.jpg', instagram: 'https://www.instagram.com/akhi_ayman313', linkedin: 'https://www.linkedin.com/in/md-ayman-akhtar-20413735b' },
  { year: 1, name: 'Ayush Ranjan', image: '/PHOTOS/ayush copy.jpeg', instagram: 'https://www.instagram.com/_ayush._.ranjan_', linkedin: 'https://www.linkedin.com/in/ayush-ranjan-614589388' },
  { year: 1, name: 'Geet Roy', image: '/PHOTOS/geet.jpg', instagram: 'https://www.instagram.com/geetroy_07', linkedin: 'https://www.linkedin.com/in/geet-roy-17a618373' },
  { year: 1, name: 'Saarth Singh', image: '/PHOTOS/saarth.jpg', instagram: 'https://www.instagram.com/saarth_singh24', linkedin: 'https://www.linkedin.com/in/saarth-singh-713201229' },
  { year: 1, name: 'Shashank Shekhar', image: '/PHOTOS/shashank.jpg', instagram: 'https://www.instagram.com/shashankk_shk', linkedin: 'https://www.linkedin.com/in/shashank-shekhar-1730b23b4' },
  { year: 1, name: 'Shubham Kanshi', image: '/PHOTOS/shubham.png', instagram: 'https://www.instagram.com/shubham_kanshi', linkedin: 'https://www.linkedin.com/in/shubham-kumar-kanshi-a48264326' },
  { year: 1, name: 'Siddharth Soni', image: '/PHOTOS/sid soni.jpg', instagram: 'https://www.instagram.com/siddharthsoni73577', linkedin: 'https://www.linkedin.com/in/siddharth-soni-2744ba3a2' },
  { year: 1, name: 'Simran Vats', image: '/PHOTOS/simran.jpg', instagram: 'https://www.instagram.com/simran_vats_13', linkedin: 'https://www.linkedin.com/in/simran-vats-148446385' },
  { year: 1, name: 'Snehil Pandey', image: '/PHOTOS/snehil.jpg', instagram: null, linkedin: 'https://www.linkedin.com/in/snehil-pandey-b884a4381' },
  { year: 1, name: 'Suprem Timsina', image: '/PHOTOS/suprem.jpg', instagram: 'https://www.instagram.com/supremm___', linkedin: 'https://www.linkedin.com/in/suprem-timsina-387086392' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  DATA TRANSFORM
// ─────────────────────────────────────────────────────────────────────────────
const TRANSFORMED_MEMBERS = ALL_MEMBERS.map((m) => ({
  name: m.name,
  role: 'Member',
  image: m.image,
  year: m.year,
  position: m.position ?? null,
  instagram: m.instagram,
  linkedin: m.linkedin,
}));

// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATED HEADING (desktop only — never runs on mobile)
// ─────────────────────────────────────────────────────────────────────────────
const wordContainer = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const wordItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', damping: 18, stiffness: 100 },
  },
};

const AnimatedTitle = ({ text, className, delay = 0 }) => (
  <motion.div
    custom={delay}
    variants={wordContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    className={`flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
  >
    {text.split(' ').map((word, i) => (
      <motion.span key={i} variants={wordItem} className="inline-block">
        {word}
      </motion.span>
    ))}
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  CARD INNER — pure HTML, shared by both mobile & desktop wrappers
// ─────────────────────────────────────────────────────────────────────────────
const MemberCardContent = ({ member, onImageClick }) => (
  <>
    {/* Profile picture — tap/click to open full image */}
    <div
      className="w-28 h-28 rounded-full overflow-hidden shadow-sm mb-4 shrink-0 border-4 border-slate-50 dark:border-slate-800/50 cursor-pointer
        hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors"
      onClick={() => onImageClick && onImageClick(member.image)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
        style={{ objectPosition: member.position || 'center' }}
        loading="lazy"
        decoding="async"
      />
    </div>

    <div className="text-center w-full mb-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate px-2">
        {member.name}
      </h3>
      <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
        {member.role}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
        {member.year === 1 ? 'V15' : member.year === 2 ? 'V14' : member.year === 3 ? 'V13' : member.year === 4 ? 'V12' : `Year ${member.year}`}
      </p>
    </div>

    <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-white/5 w-full justify-center">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
          aria-label={`${member.name} LinkedIn`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-1"
          aria-label={`${member.name} Instagram`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      )}
    </div>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
//  TEAM GRID
//  Mobile  → plain <div> + CSS keyframe fade (0 JS animation cost)
//  Desktop → motion.div with whileInView (smooth scroll reveal)
// ─────────────────────────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Mobile card — plain, no glass, no hover effects (performance-safe)
const cardBase =
  'bg-white dark:bg-white/5 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none flex flex-col items-center w-full max-w-[240px] border border-slate-100 dark:border-white/10';

// Desktop card — glassmorphism + animated border on hover (laptop/desktop only)
const desktopCardBase =
  'team-glass-card rounded-2xl p-5 flex flex-col items-center w-full max-w-[240px]';

const TeamSectionInline = ({ members, isMobile, onImageClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center">
    {members.map((member) =>
      isMobile ? (
        // ── Zero JS animation on mobile ──
        <div key={member.name} className={`${cardBase} team-card-fadein`}>
          <MemberCardContent member={member} onImageClick={onImageClick} />
        </div>
      ) : (
        // ── Desktop: framer-motion whileInView + glassmorphism + glow border ──
        <motion.div
          key={member.name}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
          className={desktopCardBase}
        >
          <MemberCardContent member={member} onImageClick={onImageClick} />
        </motion.div>
      )
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  TEAM SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
const Team = forwardRef((props, ref) => {
  const [activeYear, setActiveYear] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const filterOptions = ['All', 4, 3, 2, 1];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filteredMembers = TRANSFORMED_MEMBERS.filter((member) =>
    activeYear === 'All' ? true : member.year === activeYear
  );

  return (
    <section
      ref={ref}
      id="team"
      className="relative w-full min-h-screen overflow-hidden
        bg-slate-50 dark:bg-[#020617]
        transition-colors duration-500
        py-24 md:py-40"
    >
      {/* CSS-only card fade-in — used on mobile, zero JS overhead */}
      <style>{`
        @keyframes teamCardFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .team-card-fadein {
          animation: teamCardFade 0.35s ease-out both;
        }

        /* ── Desktop glass card ── */
        .team-glass-card {
          position: relative;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: box-shadow 0.35s ease, transform 0.25s ease;
          overflow: visible;
        }
        .dark .team-glass-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* gradient glow border via ::before — desktop hover only */
        .team-glass-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #22d3ee, #6366f1, #ec4899, #22d3ee);
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          animation: gradientSpin 4s linear infinite;
          pointer-events: none;
        }
        @keyframes gradientSpin {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .team-glass-card:hover::before {
          opacity: 1;
        }
        .team-glass-card:hover {
          box-shadow: 0 16px 48px rgba(34,211,238,0.18), 0 4px 16px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .dark .team-glass-card:hover {
          box-shadow: 0 16px 48px rgba(34,211,238,0.12), 0 4px 16px rgba(99,102,241,0.10), inset 0 1px 0 rgba(255,255,255,0.08);
        }
      `}</style>

      {/* ── Background grid ── */}
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

      {/* ── Ambient colour blobs (hidden on mobile to save GPU) ── */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[8%] w-[560px] h-[560px] bg-indigo-300/30 dark:bg-indigo-700/12 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[8%] w-[480px] h-[480px] bg-cyan-300/30 dark:bg-cyan-700/12 rounded-full blur-[110px]" />
        <div className="absolute bottom-[8%] left-1/2 w-[660px] h-[380px] bg-blue-400/20 dark:bg-blue-800/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[900px] h-[600px]
          bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15)_0%,transparent_65%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_65%)]
          pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8">

        <div className="text-center mb-10 md:mb-14 flex flex-col items-center gap-3">

        

          {/* Consolidated Team Heading — Impactful, animated, and robust */}
          <div className="flex flex-col items-center mt-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-[clamp(1.5rem,4vw,2.5rem)] md:text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-tight text-center uppercase"
            >
              The Minds Behind
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,7vw,4.5rem)] font-black tracking-tighter leading-none italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 mt-1 uppercase text-center"
            >
              Avalanche  
            </motion.h2>
          </div>
        </div>

        {/* ── FILTER BUTTONS ── */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {filterOptions.map((year) => {
            const isActive = activeYear === year;
            const label = year === 'All' ? 'All Members' : `Year ${year}`;
            return (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25 dark:bg-cyan-500 dark:text-slate-900'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Team Grid ── */}
        <TeamSectionInline members={filteredMembers} isMobile={isMobile} onImageClick={setSelectedImage} />

      </div>

      {/* ── IMAGE MODAL ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[60]"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged profile picture"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain relative z-50"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;