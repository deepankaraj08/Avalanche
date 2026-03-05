'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
 * THREE concentric elliptical rings
 */
const RINGS = [
  { n: 10, rx: 24, ry: 19, startDeg: 0, size: 'w-28 h-28', floatAmp: 10 },
  { n: 18, rx: 38, ry: 29, startDeg: 10, size: 'w-24 h-24', floatAmp: 8 },
  { n: 22, rx: 46, ry: 43, startDeg: 5, size: 'w-20 h-20', floatAmp: 6 },
];

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
        duration: 4 + (i * 0.31) % 3,
        floatAmp: -floatAmp - (i % 3) * 3,
        delay: (i * 0.17) % 2.5,
        entryDelay: i * 0.03, // Slightly faster entry
      });
    }
  });
  return styles;
})();

// Letter animation component
const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", damping: 14, stiffness: 100 } },
    hidden: { opacity: 0, y: 30, scale: 0.9, filter: "blur(5px)" },
  };

  return (
    <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const FloatingMember = ({ member, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-5%' }}
    transition={{ duration: 0.8, delay: style.entryDelay, type: "spring", damping: 20 }}
    style={{ top: style.top, left: style.left }}
    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 hover:z-50 group cursor-pointer"
  >
    {/* Float wrapper */}
    <motion.div
      animate={{ y: [0, style.floatAmp, 0] }}
      transition={{ duration: style.duration, repeat: Infinity, ease: 'easeInOut', delay: style.delay }}
      className="relative"
    >
      {/* Gradient ring */}
      <div
        className={`
          ${style.size} rounded-full p-[3px]
          bg-gradient-to-tr from-cyan-400/80 via-blue-500/80 to-purple-600/80
          group-hover:from-rose-400 group-hover:via-pink-500 group-hover:to-orange-400
          transition-all duration-500
          shadow-lg group-hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]
          group-hover:scale-[1.75] z-30 relative
        `}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#020617] bg-slate-900">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </div>
      </div>

      {/* Social icons */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-2 transition-all duration-500 delay-100 pointer-events-none group-hover:pointer-events-auto z-50">
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => member.instagram === '#' && e.preventDefault()}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          aria-label={`${member.name} Instagram`}
        >
          <FaInstagram size={14} />
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => member.linkedin === '#' && e.preventDefault()}
          className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
          aria-label={`${member.name} LinkedIn`}
        >
          <FaLinkedinIn size={14} />
        </a>
      </div>

      {/* Name badge */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150 z-[60] pointer-events-none">
        <div className="bg-slate-900 dark:bg-black/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black shadow-2xl whitespace-nowrap border border-white/20 tracking-[0.2em] uppercase">
          {member.name}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Team = forwardRef((props, ref) => {
  const [activeIdx, setActiveIdx] = useState(null);
  const activeMember = activeIdx !== null ? ALL_MEMBERS[activeIdx] : null;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className={`${isMobile ? 'mt-[-10px]' : 'mt-[-2px]'} relative w-full bg-slate-50 dark:bg-[#020617] overflow-hidden min-h-[110vh]`}
      id="team"
    >
      {/* 1. LAYERED BACKGROUND EFFECTS */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block overflow-hidden"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        {/* Deep ambient background glows */}
        <motion.div
          animate={isMobile ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 -translate-x-1/2"
        />
        <motion.div
          animate={isMobile ? {} : { x: [0, -50, 0], y: [0, -60, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 translate-x-1/2"
        />

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      {/* Light Mode Specific Ambient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none block dark:hidden overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>


      {/* ── DESKTOP: Three-ring layout ── */}
      <div className="hidden lg:flex relative min-h-[110vh] items-center justify-center">

        {/* Floating Bubble Grid Map */}
        <div className="absolute inset-0">
          {ALL_MEMBERS.map((member, idx) => (
            <FloatingMember key={idx} member={member} style={MEMBER_STYLES[idx]} />
          ))}
        </div>

        {/* Center heading */}
        <div className="relative z-30 text-center max-w-lg pointer-events-none select-none flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-[10px] md:text-xs font-black text-cyan-500 tracking-[0.6em] md:tracking-[0.8em] uppercase">Avalanche Club</p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <AnimatedTitle
            text="Our"
            className="text-[clamp(6rem,12vw,9rem)] font-black tracking-tighter leading-none text-slate-900 dark:text-white"
          />
          <AnimatedTitle
            text="Team."
            delay={0.2}
            className="text-[clamp(6rem,12vw,9rem)] font-black tracking-tighter leading-none italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)] pb-4 -mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 text-[10px] font-bold text-slate-500 dark:text-white/40 tracking-[0.3em] uppercase"
          >
            {ALL_MEMBERS.length} members · SIT Tumakuru
          </motion.p>
        </div>
      </div>

      {/* ── MOBILE: responsive card grid + tap popup ── */}
      <div className="lg:hidden py-32 px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-cyan-500 tracking-[0.5em] uppercase mb-4">Avalanche Club</p>
          <AnimatedTitle
            text="Our Team."
            className="text-[clamp(3.5rem,10vw,5rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
          />
          <p className="text-[10px] text-slate-500 dark:text-white/40 font-bold tracking-widest uppercase mt-4">
            {ALL_MEMBERS.length} members · SIT Tumakuru
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
          {ALL_MEMBERS.map((member, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: (idx % 10) * 0.05, type: "spring", damping: 20 }}
              onClick={() => setActiveIdx(idx)}
              className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
            >
              <div className="w-full aspect-square rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-md group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-shadow duration-500">
                <div className="w-full h-full rounded-full overflow-hidden border border-white dark:border-[#020617] bg-slate-900">
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500" />
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-white/60 uppercase tracking-widest line-clamp-1 text-center w-full">
                {member.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Bottom-sheet popup ── */}
        <AnimatePresence>
          {activeMember && (
            <>
              {/* Premium Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md z-40"
                onClick={() => setActiveIdx(null)}
              />

              {/* Glassy Bottom Sheet */}
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '120%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#060b18]/80 backdrop-blur-3xl border-t border-white/60 dark:border-white/10 rounded-t-[3rem] px-6 pt-8 pb-12 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]"
              >
                {/* Drag handle */}
                <div className="w-12 h-1.5 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-8" />

                <div className="flex flex-col items-center gap-5">
                  <div className="relative">
                    {/* Pulsing ring behind photo */}
                    <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

                    <div className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-2xl z-10">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#020617] bg-slate-900">
                        <img src={activeMember.image} alt={activeMember.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{activeMember.name}</h3>
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mt-2">Core Member · Avalanche</p>
                  </div>

                  {/* Social buttons */}
                  <div className="flex w-full gap-4 mt-4 max-w-sm">
                    <a
                      href={activeMember.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => activeMember.instagram === '#' && e.preventDefault()}
                      className="flex-1 flex items-center justify-center gap-3 px-5 py-4 rounded-[1.2rem] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white text-xs font-black shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      <FaInstagram size={18} /> Instagram
                    </a>
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => activeMember.linkedin === '#' && e.preventDefault()}
                      className="flex-1 flex items-center justify-center gap-3 px-5 py-4 rounded-[1.2rem] bg-[#0077b5] text-white text-xs font-black shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      <FaLinkedinIn size={16} /> LinkedIn
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveIdx(null)}
                    className="mt-6 text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Close Profile
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;