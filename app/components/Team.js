'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ALL_MEMBERS = [
  { name: 'Anmol Sharan', image: '/team/anmol.jpg', instagram: '#', linkedin: '#' },
  { name: 'Chinmayee Bhatt', image: '/team/chinmayee.jpg', instagram: '#', linkedin: '#' },
  { name: 'Rishabh Ojha', image: '/team/rishabh.jpg', instagram: '#', linkedin: '#' },
  { name: 'Satyam Verma', image: '/team/satyam.jpg', instagram: '#', linkedin: '#' },
  { name: 'Shruti Shreya', image: '/team/shruti.jpg', instagram: '#', linkedin: '#' },
  { name: 'Advait Amrit', image: '/team/advait.jpg', instagram: '#', linkedin: '#' },
  { name: 'Harsh', image: '/team/harsh.jpg', instagram: '#', linkedin: '#' },
  { name: 'Jhanvi', image: '/team/jhanvi.jpg', instagram: '#', linkedin: '#' },
  { name: 'Manan Agarwal', image: '/team/manan.jpg', instagram: '#', linkedin: '#' },
  { name: 'Mrinalini', image: '/team/mrinalini.jpg', instagram: '#', linkedin: '#' },
  { name: 'Mohammed Affan', image: '/team/affan.jpg', instagram: '#', linkedin: '#' },
  { name: 'Nuhaa Fathima', image: '/team/nuhaa.jpg', instagram: '#', linkedin: '#' },
  { name: 'Purvi Raj', image: '/team/purvi.jpg', instagram: '#', linkedin: '#' },
  { name: 'Vansh Jha', image: '/team/vansh.jpg', instagram: '#', linkedin: '#' },
  { name: 'Ankit', image: '/team/ankit.jpg', instagram: '#', linkedin: '#' },
  { name: 'Abhinav Raj', image: '/team/abhigav.jpg', instagram: '#', linkedin: '#' },
  { name: 'Babul Kumar', image: '/photo/babul.jpeg', instagram: 'https://www.instagram.com/babulkr328', linkedin: 'https://www.linkedin.com/in/babul-kumar-a0a45a27b' },
  { name: 'Deeksha', image: '/photo/deeksha.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Deepankar Raj', image: '/photo/deepankar.jpeg', instagram: 'https://www.instagram.com/deepankaraj', linkedin: 'https://www.linkedin.com/in/deepankaraj' },
  { name: 'Dhruthi M', image: '/photo/dhruthi.jpeg', instagram: 'https://www.instagram.com/dhruthi__m', linkedin: 'https://www.linkedin.com/in/dhruthi-m-940bb6385' },
  { name: 'Keerthi Pai', image: '/photo/keerthi.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Nanditha LM', image: '/photo/nanditha.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Saket Sinha', image: '/photo/saket.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Soham Khade', image: '/photo/soham.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Samarth Gupta', image: '/photo/samarth.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Vishal Tiwary', image: '/photo/vishal.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Sayan', image: '/photo/sayan.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Lasya Shetty', image: '/photo/lasya.jpeg', instagram: '#', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3' },
  { name: 'lisha GI', image: '/photo/lisha.jpeg', instagram: '#', linkedin: 'https://www.linkedin.com/in/lisha-g-l-377656372' },
  { name: 'Avnish', image: '/photo/avnish.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Aryan Schandillia', image: '/photo/aryan.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Anjali Mallur', image: '/photo/anjali.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Abjijeet Satyam', image: '/photo/abhijit.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Ayush Ranjan', image: '/photo/ayush.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Agamya sinha', image: '/photo/agamya.jpeg', instagram: '#', linkedin: '#' },
  { name: 'K bhuvana', image: '/photo/khuvana.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Md Ayman Akhtar', image: '/photo/ayman.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Madhurya R', image: '/photo/madhurya.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Shubham Kanshi', image: '/photo/shubham.jpeg', instagram: '#', linkedin: '#' },
  { name: 'siddharth soni', image: '/photo/siddharth.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Snehil Pandey', image: '/photo/snehil.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Suprem Timsina', image: '/photo/suprem.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Simran', image: '/photo/simran.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Saarth singh', image: '/photo/saarth.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Sharadhi', image: '/photo/sharadhi.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Preetham C G', image: '/photo/preetham.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Nitin Desai', image: '/photo/nitin.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Geet Roy', image: '/photo/geet.jpeg', instagram: '#', linkedin: '#' },
  { name: 'Om karr', image: '/photo/om.jpeg', instagram: '#', linkedin: '#' },
];

/**
 * THREE concentric elliptical rings — NO overlap guaranteed by arc-spacing math.
 *
 * Ring radii (% of section width/height).
 * At 1400×900px viewport these arcs are:
 *   Ring 1: ~1 600px circumference ÷ 10 = 160px per member > w-28 (112px) ✓
 *   Ring 2: ~2 550px circumference ÷ 18 = 142px per member > w-24 ( 96px) ✓
 *   Ring 3: ~3 220px circumference ÷ 22 = 146px per member > w-20 ( 80px) ✓
 *
 * -translate-x-1/2 -translate-y-1/2 keeps the image centered on its (left,top) point.
 */
const RINGS = [
  // inner — 10 members, biggest bubbles
  { n: 10, rx: 24, ry: 19, startDeg: 0, size: 'w-28 h-28', floatAmp: 10 },
  // middle — 18 members
  { n: 18, rx: 38, ry: 29, startDeg: 10, size: 'w-24 h-24', floatAmp: 8 },
  // outer — 22 members, covers all 4 corners & edges
  { n: 22, rx: 46, ry: 43, startDeg: 5, size: 'w-20 h-20', floatAmp: 6 },
];

// Pre-compute once at module load — always identical, no render randomness
const MEMBER_STYLES = (() => {
  const styles = [];
  RINGS.forEach(({ n, rx, ry, startDeg, size, floatAmp }, ringIdx) => {
    for (let j = 0; j < n && styles.length < ALL_MEMBERS.length; j++) {
      const i = styles.length;
      const angleDeg = startDeg + j * (360 / n);
      const rad = (angleDeg * Math.PI) / 180;
      styles.push({
        left: `${50 + rx * Math.cos(rad)}%`,
        top: `${50 + ry * Math.sin(rad)}%`,
        size,
        // Stagger float durations so bubbles don't move in sync
        duration: 4 + (i * 0.31) % 3,
        floatAmp: -floatAmp - (i % 3) * 3,
        delay: (i * 0.17) % 2.5,
        entryDelay: i * 0.04,
      });
    }
  });
  return styles;
})();

const FloatingMember = ({ member, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-5%' }}
    transition={{ duration: 0.5, delay: style.entryDelay, ease: [0.23, 1, 0.32, 1] }}
    style={{ top: style.top, left: style.left }}
    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
  >
    {/* Float wrapper */}
    <motion.div
      animate={{ y: [0, style.floatAmp, 0] }}
      transition={{ duration: style.duration, repeat: Infinity, ease: 'easeInOut', delay: style.delay }}
      className="relative"
    >
      {/* Gradient ring — scales up on hover */}
      <div
        className={`
          ${style.size} rounded-full p-[2.5px]
          bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600
          group-hover:from-rose-400 group-hover:via-pink-400 group-hover:to-orange-400
          transition-all duration-400
          shadow-md group-hover:shadow-2xl group-hover:shadow-pink-400/40
          group-hover:scale-[1.7]
        `}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#050505]">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
          />
        </div>
      </div>

      {/* Social icons — slide up on hover */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75 pointer-events-none group-hover:pointer-events-auto">
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => member.instagram === '#' && e.preventDefault()}
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-transform"
          aria-label={`${member.name} Instagram`}
        >
          <FaInstagram size={13} />
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => member.linkedin === '#' && e.preventDefault()}
          className="w-7 h-7 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-transform"
          aria-label={`${member.name} LinkedIn`}
        >
          <FaLinkedinIn size={12} />
        </a>
      </div>

      {/* Name badge — slides below social icons */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-100">
        <span className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white px-3 py-1 rounded-full text-[8px] font-black shadow-xl whitespace-nowrap border border-slate-100 dark:border-white/10 tracking-widest uppercase">
          {member.name}
        </span>
      </div>
    </motion.div>
  </motion.div>
);

const Team = forwardRef((props, ref) => {
  const [activeIdx, setActiveIdx] = useState(null);
  const activeMember = activeIdx !== null ? ALL_MEMBERS[activeIdx] : null;

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#fdfcf9] dark:bg-[#050505] overflow-hidden"
      id="team"
    >
      {/* ── DESKTOP: Three-ring layout ── */}
      <div className="hidden lg:flex relative min-h-[110vh] items-center justify-center">

        {/* Bubbles */}
        <div className="absolute inset-0">
          {ALL_MEMBERS.map((member, idx) => (
            <FloatingMember key={idx} member={member} style={MEMBER_STYLES[idx]} />
          ))}
        </div>

        {/* Center heading — locked in the safe zone between ring 1 & ring 2 */}
        <div className="relative z-30 text-center max-w-xs pointer-events-none select-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[8px] font-black text-cyan-500 tracking-[0.7em] uppercase mb-4"
          >
            Avalanche Club
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl xl:text-9xl font-black tracking-tighter leading-none text-slate-900 dark:text-white"
          >
            Our<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
              Team
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-[9px] font-bold text-slate-400 dark:text-white/30 tracking-[0.3em] uppercase"
          >
            {ALL_MEMBERS.length} members · SIT Tumakuru
          </motion.p>
        </div>
      </div>

      {/* ── MOBILE: responsive card grid + tap popup ── */}
      <div className="lg:hidden py-16 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[9px] font-black text-cyan-500 tracking-[0.5em] uppercase mb-2">Avalanche Club</p>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">Team</span>
          </h2>
          <p className="text-[9px] text-slate-400 dark:text-white/30 font-bold tracking-widest uppercase mt-1">
            {ALL_MEMBERS.length} members · SIT Tumakuru
          </p>
        </div>

        {/* 3-column grid — bigger on sm */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {ALL_MEMBERS.map((member, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setActiveIdx(idx)}
              className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
            >
              {/* Gradient ring photo */}
              <div className="w-full aspect-square rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#050505]">
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* First name */}
              <span className="text-[8px] sm:text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-wide line-clamp-1 text-center w-full">
                {member.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Bottom-sheet popup ── */}
        {activeMember && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setActiveIdx(null)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[2.5rem] px-6 pt-6 pb-10 shadow-2xl"
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-slate-200 dark:bg-white/10 rounded-full mx-auto mb-6" />

              <div className="flex flex-col items-center gap-4">
                {/* Large photo */}
                <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900">
                    <img src={activeMember.image} alt={activeMember.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{activeMember.name}</h3>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mt-1">Core Member · Avalanche</p>
                </div>

                {/* Social buttons */}
                <div className="flex gap-4 mt-2">
                  <a
                    href={activeMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => activeMember.instagram === '#' && e.preventDefault()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white text-xs font-black shadow-lg active:scale-95 transition-transform"
                  >
                    <FaInstagram size={14} /> Instagram
                  </a>
                  <a
                    href={activeMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => activeMember.linkedin === '#' && e.preventDefault()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0077b5] text-white text-xs font-black shadow-lg active:scale-95 transition-transform"
                  >
                    <FaLinkedinIn size={13} /> LinkedIn
                  </a>
                </div>

                {/* Close */}
                <button
                  onClick={() => setActiveIdx(null)}
                  className="mt-2 text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;