'use client';

/**
 * Team.js  —  Page-level section component
 *
 * • Defines ALL_MEMBERS with year, image, and social links
 * • Transforms data into the format TeamSection expects
 * • All old circular-avatar UI is removed
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { TeamSection } from '@/components/ui/team-section';

// ─────────────────────────────────────────────────────────────────────────────
//  RAW DATA
//  • year        : 1 | 2 | 3 | 4  (update to match actual batches)
//  • instagram   : full URL or null  (null = not shown anywhere)
//  • linkedin    : full URL or null
//  • image       : /PHOTOS/<file>   (must be .jpg / .jpeg / .png)
//                  Unsupported formats (.heic, .heif, .pdf) → set to null
// ─────────────────────────────────────────────────────────────────────────────
const ALL_MEMBERS = [
  // ── Year 4 (seniors / leads) ─────────────────────────────────────────────
  { year: 4, name: 'Anmol Sharan', image: '/PHOTOS/anmol.jpg', instagram: null, linkedin: null },
  { year: 4, name: 'Yash Kumar', image: '/PHOTOS/yash.jpg', instagram: null, linkedin: null },
  { year: 4, name: 'Chinmayee Bhatt', image: '/PHOTOS/chinmayee.jpg', instagram: null, linkedin: null },
  { year: 4, name: 'Rishabh Ojha', image: '/PHOTOS/rishabh.jpg', instagram: 'https://www.instagram.com/yah_rishabh', linkedin: 'https://www.linkedin.com/in/rishabh-ojha-854775294' },
  { year: 4, name: 'Satyam Verma', image: '/PHOTOS/satyam.jpeg', instagram: 'https://www.instagram.com/satyam1260', linkedin: 'https://www.linkedin.com/in/satyam-verma-0b9b922aa/' },
  { year: 4, name: 'Shruti Shreya', image: '/PHOTOS/shruti.jpg', instagram: null, linkedin: null },

  // ── Year 3 ───────────────────────────────────────────────────────────────
  { year: 3, name: 'Advaita Amrit', image: '/PHOTOS/advaita.jpg', instagram: 'https://www.instagram.com/advaita_amrrit', linkedin: 'https://www.linkedin.com/in/advaita-amrit' },
  { year: 3, name: 'Harsh Raj', image: '/PHOTOS/harsh.jpg', instagram: 'https://www.instagram.com/harshxraze', linkedin: 'https://www.linkedin.com/in/harsh-raj-346ba3202/' },
  { year: 3, name: 'Manan Agarwal', image: '/PHOTOS/manan.jpg', instagram: null, linkedin: null },
  { year: 3, name: 'Mrinalini', image: '/PHOTOS/mrinalini.jpg', instagram: 'https://www.instagram.com/iitz_mrinal', linkedin: 'https://www.linkedin.com/in/mrinalini-56270b2a6' },
  { year: 3, name: 'Vansh Jha', image: '/PHOTOS/vansh.jpeg', instagram: 'https://www.instagram.com/vanshhjhaa', linkedin: 'https://www.linkedin.com/in/vansh-jha13' },
  { year: 3, name: 'Nuha Fathima', image: '/PHOTOS/nuha copy.jpeg', instagram: 'https://www.instagram.com/nuhaaaa24', linkedin: 'https://www.linkedin.com/in/nuha-fathima-559860296' },
  { year: 3, name: 'Purvi Raj', image: '/PHOTOS/purvi.jpg', instagram: 'https://www.instagram.com/raj_purvi_sd', linkedin: 'https://www.linkedin.com/in/s-d-purvi-raj-775a53331' },
  { year: 3, name: 'Prakhar Bansal', image: '/PHOTOS/prakhar.jpg', instagram: 'https://www.instagram.com/prakharrrr_bansal_', linkedin: 'https://www.linkedin.com/in/prakhar-bansal' },
  { year: 3, name: 'Yash Jadhav', image: '/PHOTOS/yashjadhav.jpg', instagram: null, linkedin: null },
  { year: 3, name: 'Mohammed Affan', image: '/PHOTOS/affan.jpg', instagram: null, linkedin: null },
  { year: 3, name: 'Jhanvi', image: '/PHOTOS/jhanvi.jpg', instagram: null, linkedin: null },
  
  // ── Year 2 ───────────────────────────────────────────────────────────────
  { year: 2, name: 'Deepankar Raj', image: '/PHOTOS/deepankar.jpeg', instagram: 'https://www.instagram.com/deepankaraj?igsh=cjRxbnpveHVtMml3l', linkedin: 'https://www.linkedin.com/in/deepankaraj' },
  { year: 2, name: 'Ankit Kumar', image: '/PHOTOS/ANKIT.jpeg', instagram: 'https://www.instagram.com/iyk.ankit', linkedin: 'https://www.linkedin.com/in/ankit-kumar-4a1b94333' },
  { year: 2, name: 'Deeksha', image: '/PHOTOS/deeksha1 copy.png', instagram: 'https://www.instagram.com/im_deeksha_08', linkedin: 'https://www.linkedin.com/in/deeksha-n-018864' },
  { year: 2, name: 'Abhinav Raj', image: '/PHOTOS/abhinav.png', instagram: 'https://www.instagram.com/abhinav.en', linkedin: 'https://www.linkedin.com/in/abhinav-raj-9b789731a' },
  { year: 2, name: 'Babul Kumar', image: '/PHOTOS/babul.jpg', instagram: 'https://www.instagram.com/babulkr328', linkedin: 'https://www.linkedin.com/in/babul-kumar-a0a45a27b' },
  { year: 2, name: 'Dhruthi M', image: '/PHOTOS/dhruthi.jpg', instagram: 'https://www.instagram.com/dhruthi__m', linkedin: 'https://www.linkedin.com/in/dhruthi-m-940bb6385' },
  { year: 2, name: 'Samarth Gupta', image: '/PHOTOS/samarth.jpg', instagram: 'https://www.instagram.com/samarth_542', linkedin: 'https://www.linkedin.com/in/samarth-gupta-7ab08a331' },
  { year: 2, name: 'Keerthi Pai', image: '/PHOTOS/keerthi copy.jpg', instagram: null, linkedin: 'https://www.linkedin.com/in/keerthi-pai-506bbb334' },
  { year: 2, name: 'Nanditha LM', image: '/PHOTOS/nanditha copy.jpg', instagram: 'https://www.instagram.com/nanditha_mallikarjun', linkedin: 'https://www.linkedin.com/in/nanditha-l-m-905057371' },
  { year: 2, name: 'Saket Sinha', image: '/PHOTOS/saket.jpg', instagram: 'https://www.instagram.com/__saket__sinha__', linkedin: 'https://www.linkedin.com/in/saket-sinha-930506331' },
  { year: 2, name: 'Soham Khade', image: '/PHOTOS/soham.jpg', instagram: 'https://www.instagram.com/sohamkhade0901', linkedin: 'https://www.linkedin.com/in/soham-khade-410378380' },
  { year: 2, name: 'Vishal Tiwary', image: '/PHOTOS/tiwari.jpeg', instagram: 'https://www.instagram.com/vishaltiwary016', linkedin: 'https://www.linkedin.com/in/vishal-kumar-tiwary-a0b243310' },
  { year: 2, name: 'Aditya Kumar', image: '/PHOTOS/aditya.jpg', instagram: 'https://www.instagram.com/adiiix18', linkedin: 'https://www.linkedin.com/in/aditya-kumar-289162318' },
  { year: 2, name: 'Inchara Vishwanath', image: '/PHOTOS/inchara.jpg', instagram: 'https://www.instagram.com/inch_vishwanath', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3' },
  { year: 2, name: 'Sayan Kumar', image: '/PHOTOS/sayan.jpg', instagram: 'https://www.instagram.com/_sayan38', linkedin: 'https://www.linkedin.com/in/sayan-kumar-342536331' },
  { year: 2, name: 'Lisha GL', image: '/PHOTOS/LISHA.jpg', instagram: 'https://www.instagram.com/lisha_gl', linkedin: 'https://www.linkedin.com/in/lisha-g-l-377656372' },
  { year: 2, name: 'Madhurya R', image: '/PHOTOS/madhurya.jpg', instagram: 'https://www.instagram.com/_madhurya__r', linkedin: 'https://www.linkedin.com/in/madhurya-r-336784336' },
  { year: 2, name: 'Lasya Shetty', image: '/PHOTOS/lasya.jpg', instagram: 'https://www.instagram.com/nagalasyaaa', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3' },
  
  // ── Year 1 (freshers) ────────────────────────────────────────────────────
  { year: 1, name: 'Avnish Aman', image: '/PHOTOS/avnish.jpg', instagram: 'https://www.instagram.com/avnish__04', linkedin: 'https://www.linkedin.com/in/avnish-aman-903b39362' },
  { year: 1, name: 'Aryan Shandilya', image: '/PHOTOS/aryan.jpg', instagram: 'https://www.instagram.com/aryan.tf', linkedin: 'https://www.linkedin.com/in/aryan-shandilya-757266382' },
  { year: 1, name: 'Abhijeet Satyam', image: '/PHOTOS/jeet.jpeg', instagram: 'https://www.instagram.com/the_jeetx', linkedin: 'https://www.linkedin.com/in/abhijeet-satyam-45b85a3b4' },
  { year: 1, name: 'Simran Vats', image: '/PHOTOS/simran.jpg', instagram: 'https://www.instagram.com/simran_vats_13', linkedin: 'https://www.linkedin.com/in/simran-vats-148446385' },
  { year: 1, name: 'Ayush Ranjan', image: '/PHOTOS/ayush copy.jpeg', instagram: 'https://www.instagram.com/_ayush._.ranjan_', linkedin: 'https://www.linkedin.com/in/ayush-ranjan-614589388' },
  { year: 1, name: 'Shashank Shekhar', image: '/PHOTOS/shashank.jpg', instagram: 'https://www.instagram.com/shashankk_shk', linkedin: 'https://www.linkedin.com/in/shashank-shekhar-1730b23b4' },
  { year: 1, name: 'Ayman Akhtar', image: '/PHOTOS/ayman copy.jpg', instagram: 'https://www.instagram.com/akhi_ayman313', linkedin: 'https://www.linkedin.com/in/md-ayman-akhtar-20413735b' },
  { year: 1, name: 'Shubham Kanshi', image: '/PHOTOS/shubham.png', instagram: 'https://www.instagram.com/shubham_kanshi', linkedin: 'https://www.linkedin.com/in/shubham-kumar-kanshi-a48264326' },
  { year: 1, name: 'Siddharth Soni', image: '/PHOTOS/sid soni.jpg', instagram: 'https://www.instagram.com/siddharthsoni73577', linkedin: 'https://www.linkedin.com/in/siddharth-soni-2744ba3a2' },
  { year: 1, name: 'Anjali Mallur', image: '/PHOTOS/anjali copy.jpg', instagram: 'https://www.instagram.com/anjalimallur', linkedin: 'https://www.linkedin.com/in/anjali-mallur-238031374' },
  { year: 1, name: 'Suprem Timsina', image: '/PHOTOS/suprem.jpg', instagram: 'https://www.instagram.com/supremm___', linkedin: 'https://www.linkedin.com/in/suprem-timsina-387086392' },
  { year: 1, name: 'Saarth Singh', image: '/PHOTOS/saarth.jpg', instagram: 'https://www.instagram.com/saarth_singh24', linkedin: 'https://www.linkedin.com/in/saarth-singh-713201229' },
  { year: 1, name: 'Geet Roy', image: '/PHOTOS/geet.jpg', instagram: 'https://www.instagram.com/geetroy_07', linkedin: 'https://www.linkedin.com/in/geet-roy-17a618373' },
  { year: 1, name: 'Snehil Pandey', image: '/PHOTOS/snehil.jpg', instagram: null, linkedin: 'https://www.linkedin.com/in/snehil-pandey-b884a4381' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  DATA TRANSFORM  →  team-section.jsx prop shape
//   { name, role, image, year, position?, instagram, linkedin }
//
//  position : CSS object-position string (default "50% 15%" in component)
//             Override per member to avoid face cropping, e.g. "50% 20%"
// ─────────────────────────────────────────────────────────────────────────────
const TRANSFORMED_MEMBERS = ALL_MEMBERS.map((m) => ({
  name: m.name,
  role: 'Core Member',      // ← update per member if they have specific titles
  image: m.image,
  year: m.year,
  position: m.position ?? null, // forwards to img style.objectPosition
  instagram: m.instagram,
  linkedin: m.linkedin,
}));

// ─────────────────────────────────────────────────────────────────────────────
//  ANIMATED HEADING  (word-by-word spring entrance)
// ─────────────────────────────────────────────────────────────────────────────
const wordContainer = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
};
const wordItem = {
  hidden: { opacity: 0, y: 28, scale: 0.88, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { type: 'spring', damping: 14, stiffness: 110 }
  },
};

const AnimatedTitle = ({ text, className, delay = 0 }) => (
  <motion.div
    custom={delay}
    variants={wordContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
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
//  TEAM SECTION  (page-level section wrapper)
// ─────────────────────────────────────────────────────────────────────────────
const Team = forwardRef((props, ref) => (
  <section
    ref={ref}
    id="team"
    className="relative w-full min-h-screen overflow-hidden
      bg-[#020617]
      py-24 md:py-40"
  >
    {/* ── Animated background grid ── */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    />

    {/* ── Ambient colour blobs ── */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Side blobs */}
      <div className="absolute top-[20%] left-[8%]   w-[560px] h-[560px] bg-indigo-700/12 rounded-full blur-[130px]" />
      <div className="absolute top-[30%] right-[8%]  w-[480px] h-[480px] bg-cyan-700/12  rounded-full blur-[110px]" />
      <div className="absolute bottom-[8%] left-1/2  w-[660px] h-[380px] bg-blue-800/10  rounded-full blur-[120px] -translate-x-1/2" />
      {/* Center radial glow — premium depth layer */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[900px] h-[600px]
        bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_65%)]
        pointer-events-none" />
    </div>

    {/* ── Content ── */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8">

      {/* Section header */}
      <div className="text-center mb-16 md:mb-20 flex flex-col items-center gap-3">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/70" />
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.75em]">
            Team Avalanche
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/70" />
        </motion.div>

        {/* Main heading */}
        <AnimatedTitle
          text="Meet The Team"
          className="text-[clamp(3rem,8vw,5.5rem)] font-black tracking-tighter
            text-white leading-[0.9] mt-1"
        />
        <AnimatedTitle
          text="Team."
          delay={0.15}
          className="text-[clamp(3rem,8vw,5.5rem)] font-black tracking-tighter
            leading-[0.9] italic text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
        />

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[10px] text-white/25 font-bold tracking-[0.4em]
            uppercase mt-4 flex items-center gap-2"
        >
          <span>{ALL_MEMBERS.length} members</span>
          <span className="w-1 h-1 rounded-full bg-white/20 inline-block" />
          <span>SIT Tumakuru</span>
        </motion.p>
      </div>

      {/* ── Team grid + filters ── */}
      <TeamSection members={TRANSFORMED_MEMBERS} />
    </div>
  </section>
));

Team.displayName = 'Team';
export default Team;