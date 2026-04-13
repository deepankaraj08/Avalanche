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

const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }),
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

const INITIAL_VISIBILITY_COUNT = 24;

const Team = forwardRef((props, ref) => {
  const [activeIdx, setActiveIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const activeMember = activeIdx !== null ? ALL_MEMBERS[activeIdx] : null;

  const visibleMembers = showAll ? ALL_MEMBERS : ALL_MEMBERS.slice(0, INITIAL_VISIBILITY_COUNT);

  return (
    <section
      ref={ref}
      className={`relative w-full bg-slate-50 dark:bg-[#020617] overflow-hidden min-h-screen py-24 md:py-40 flex flex-col justify-center`}
      id="team"
    >
      {/* 1. LAYERED AMBIENT BACKGROUND */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transform-gpu hidden dark:block overflow-hidden"
        style={{
          maskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)`
        }}
      >
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen -translate-y-1/2 translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none block dark:hidden overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* ── UNIFIED SIMPLE GRID LAYOUT ── */}
      <div className="relative z-10 w-full max-w-[90vw] md:max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-6 md:w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <p className="text-[10px] md:text-xs font-black text-cyan-500 tracking-[0.5em] md:tracking-[0.8em] uppercase">Avalanche Club</p>
            <div className="h-[1px] w-6 md:w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </motion.div>

          <AnimatedTitle
            text="Our"
            className="text-[clamp(4rem,10vw,7rem)] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
          />
          <AnimatedTitle
            text="Team."
            delay={0.2}
            className="text-[clamp(4rem,10vw,7rem)] font-black tracking-tighter leading-[0.9] italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[10px] text-slate-500 dark:text-white/40 font-bold tracking-widest uppercase mt-8 md:mt-10"
          >
            {ALL_MEMBERS.length} members · SIT Tumakuru
          </motion.p>
        </div>

        {/* Unified Responsive Grid (Simple fade-in animation) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {visibleMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.5, delay: (idx % 8) * 0.05 }}
              className="flex flex-col items-center gap-3 md:gap-4 group relative"
            >
              <div 
                className="w-full aspect-square rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400/50 via-blue-500/50 to-indigo-500/50 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-indigo-500 shadow-md group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer active:scale-95"
                onClick={() => setActiveIdx(ALL_MEMBERS.indexOf(member))}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#020617] bg-slate-900 overflow-hidden relative">
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50" />
                  
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-black text-white px-2 py-1 bg-black/40 rounded-full backdrop-blur-sm shadow-md">VIEW</span>
                  </div>
                </div>
              </div>

              {/* Social Quick Links */}
              <div className="absolute top-[80%] flex gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto shadow-xl">
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => member.instagram === '#' && e.preventDefault()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-white/20 shadow-md"
                >
                  <FaInstagram size={12} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => member.linkedin === '#' && e.preventDefault()}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border border-white/20 shadow-md"
                >
                  <FaLinkedinIn size={12} />
                </a>
              </div>

              <span className="text-[10px] md:text-xs font-black text-slate-700 dark:text-white/70 uppercase tracking-wider md:tracking-widest line-clamp-1 text-center w-[120%] -ml-[10%] drop-shadow-sm transition-colors group-hover:text-cyan-500 dark:group-hover:text-cyan-400 mt-2">
                {member.name.split(' ')[0]}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Show More toggle */}
        {ALL_MEMBERS.length > INITIAL_VISIBILITY_COUNT && (
          <div className="flex justify-center mt-16 md:mt-24">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl text-[10px] md:text-xs font-black text-slate-700 dark:text-white/60 uppercase tracking-[0.2em] shadow-sm active:scale-95 transition-all hover:border-cyan-500/40 hover:text-cyan-500 dark:hover:text-cyan-400"
            >
              {showAll ? 'Show Less' : `Load Rest of Team (${ALL_MEMBERS.length - INITIAL_VISIBILITY_COUNT})`}
            </button>
          </div>
        )}

        {/* ── Active Member Modals ── */}
        <AnimatePresence>
          {activeMember && (
            <>
              {/* Premium Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-md z-40 cursor-pointer"
                onClick={() => setActiveIdx(null)}
              />

              {/* Glassy Modal Focus Card */}
              <motion.div
                initial={{ y: '20px', scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: '20px', scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm bg-white/90 dark:bg-[#060b18]/90 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[3rem] px-6 py-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col items-center gap-5">
                  <div className="relative">
                    {/* Pulsing ring behind photo */}
                    <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

                    <div className="relative w-36 h-36 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-2xl z-10">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#020617] bg-slate-900">
                        <img src={activeMember.image} alt={activeMember.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{activeMember.name}</h3>
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mt-2">Core Member</p>
                  </div>

                  {/* Social buttons */}
                  <div className="flex w-full gap-4 mt-4">
                    <a
                      href={activeMember.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => activeMember.instagram === '#' && e.preventDefault()}
                      className="flex-1 flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-3xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white text-xs font-black shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => activeMember.linkedin === '#' && e.preventDefault()}
                      className="flex-1 flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-3xl bg-[#0077b5] text-white text-xs font-black shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveIdx(null)}
                    className="mt-4 px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all"
                  >
                    Close
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