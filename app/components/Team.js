'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SpaceStars } from '../../components/ui/meteors';
const TEAM_MEMBERS = [
  { name: 'Anmol Sharan', linkedin: '#', instagram: '#', image: '/team/anmol.jpg' },
  { name: 'Chinmayee Bhatt', linkedin: '#', instagram: '#', image: '/team/chinmayee.jpg' },
  { name: 'Rishabh Ojha', linkedin: '#', instagram: '#', image: '/team/rishabh.jpg' },
  { name: 'Satyam Verma', linkedin: '#', instagram: '#', image: '/team/satyam.jpg' },
  { name: 'Shruti Shreya', linkedin: '#', instagram: '#', image: '/team/shruti.jpg' },
  { name: 'Advait Amrit', linkedin: '#', instagram: '#', image: '/team/advait.jpg' },
  { name: 'Harsh', linkedin: '#', instagram: '#', image: '/team/harsh.jpg' },
  { name: 'Jhanvi', linkedin: '#', instagram: '#', image: '/team/jhanvi.jpg' },
  { name: 'Manan Agarwal', linkedin: '#', instagram: '#', image: '/team/manan.jpg' },
  { name: 'Mrinalini', linkedin: '#', instagram: '#', image: '/team/mrinalini.jpg' },
  { name: 'Mohammed Affan', linkedin: '#', instagram: '#', image: '/team/affan.jpg' },
  { name: 'Nuhaa Fathima', linkedin: '#', instagram: '#', image: '/team/nuhaa.jpg' },
  { name: 'Purvi Raj', linkedin: '#', instagram: '#', image: '/team/purvi.jpg' },
  { name: 'Vansh Jha', linkedin: '#', instagram: '#', image: '/team/vansh.jpg' },
  { name: 'Ankit', linkedin: '#', instagram: '#', image: '/team/ankit.jpg' },
  { name: 'Abhinav Raj', linkedin: '#', instagram: '#', image: '/team/abhigav.jpg' },
  { name: 'Babul Kumar', linkedin: 'https://www.linkedin.com/in/babul-kumar-a0a45a27b', instagram: 'https://www.instagram.com/babulkr328', image: '/photo/babul.jpeg' },
  { name: 'Deeksha', linkedin: '#', instagram: '#', image: '/photo/deeksha.jpeg' },
  { name: 'Deepankar Raj', linkedin: 'https://www.linkedin.com/in/deepankaraj', instagram: 'https://www.instagram.com/deepankaraj', image: '/photo/deepankar.jpeg' },
  { name: 'Dhruthi M', linkedin: 'https://www.linkedin.com/in/dhruthi-m-940bb6385', instagram: 'https://www.instagram.com/dhruthi_dru', image: '/photo/dhruthi.jpeg' },
  { name: 'Keerthi Pai', linkedin: '#', instagram: '#', image: '/photo/keerthi.jpeg' },
  { name: 'Nanditha LM', linkedin: '#', instagram: '#', image: '/photo/nanditha.jpeg' },
  { name: 'Saket Sinha', linkedin: '#', instagram: '#', image: '/photo/saket.jpeg' },
  { name: 'Soham Khade', linkedin: '#', instagram: '#', image: '/photo/soham.jpeg' },
  { name: 'Samarth Gupta', linkedin: '#', instagram: '#', image: '/photo/samarth.jpeg' },
  { name: 'Vishal Tiwary', linkedin: '#', instagram: '#', image: '/photo/vishal.jpeg' },
  { name: 'Sayan', linkedin: '#', instagram: '#', image: '/photo/sayan.jpeg' },
  { name: 'Lasya Shetty', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3', instagram: '#', image: '/photo/lasya.jpeg' },
  { name: 'lisha GI', linkedin: 'https://www.linkedin.com/in/lisha-g-l-377656372', instagram: '#', image: '/photo/lisha.jpeg' },
  { name: 'Avnish', linkedin: '#', instagram: '#', image: '/photo/avnish.jpeg' },
  { name: 'Aryan Schandillia', linkedin: '#', instagram: '#', image: '/photo/aryan.jpeg' },
  { name: 'Anjali Mallur', linkedin: '#', instagram: '#', image: '/photo/anjali.jpeg' },
  { name: 'Abjijeet Satyam', linkedin: '#', instagram: '#', image: '/photo/abhijit.jpeg' },
  { name: 'Ayush Ranjan', linkedin: '#', instagram: '#', image: '/photo/ayush.jpeg' },
  { name: 'Agamya sinha', linkedin: '#', instagram: '#', image: '/photo/agamya.jpeg' },
  { name: 'K bhuvana', linkedin: '#', instagram: '#', image: '/photo/khuvana.jpeg' },
  { name: 'Md Ayman Akhtar', linkedin: '#', instagram: '#', image: '/photo/ayman.jpeg' },
  { name: 'Madhurya R', linkedin: '#', instagram: '#', image: '/photo/madhurya.jpeg' },
  { name: 'Shubham Kanshi', linkedin: '#', instagram: '#', image: '/photo/shubham.jpeg' },
  { name: 'siddharth soni', linkedin: '#', instagram: '#', image: '/photo/siddharth.jpeg' },
  { name: 'Snehil Pandey', linkedin: '#', instagram: '#', image: '/photo/snehil.jpeg' },
  { name: 'Suprem Timsina', linkedin: '#', instagram: '#', image: '/photo/suprem.jpeg' },
  { name: 'Simran', linkedin: '#', instagram: '#', image: '/photo/simran.jpeg' },
  { name: 'Saarth singh', linkedin: '#', instagram: '#', image: '/photo/saarth.jpeg' },
  { name: 'Sharadhi', linkedin: '#', instagram: '#', image: '/photo/sharadhi.jpeg' },
  { name: 'Preetham C G', linkedin: '#', instagram: '#', image: '/photo/preetham.jpeg' },
  { name: 'Nitin Desai', linkedin: '#', instagram: '#', image: '/photo/nitin.jpeg' },
  { name: 'Geet Roy', linkedin: '#', instagram: '#', image: '/photo/geet.jpeg' },
  { name: 'Om karr', linkedin: '#', instagram: '#', image: '/photo/om.jpeg' },
];

const TeamCard = ({ member }) => {
  return (
    <div className="relative flex-shrink-0 w-[190px] md:w-[280px] group select-none transform-gpu">
      <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md md:backdrop-blur-xl border border-white/10 rounded-[1.8rem] md:rounded-[2rem] p-5 md:p-8 transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.06] hover:-translate-y-2 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500 scale-75 group-hover:scale-110" />
            
            {/* Image Border */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-[2px] transform transition-transform duration-700 group-hover:rotate-6">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-2 border-[#020617]">
                {member.image ? (
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 transform-gpu" />
                ) : (
                  <span className="text-lg md:text-2xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Social Icons: Persistent on Mobile, Animated on Desktop */}
            <div className="absolute -inset-1.5 md:-inset-2 flex justify-between items-end pointer-events-none">
              <a 
                href={member.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="pointer-events-auto w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-20 hover:scale-110 active:scale-90 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-3 lg:translate-y-3 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0"
              >
                <FaInstagram size={12} className="md:w-[14px]" />
              </a>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="pointer-events-auto w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-20 hover:scale-110 active:scale-90 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-3 lg:translate-y-3 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0"
              >
                <FaLinkedinIn size={12} className="md:w-[14px]" />
              </a>
            </div>
          </div>
          
          {/* Team Name + Animated Indicator */}
          <div className="text-center mt-2 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 group/name">
              <h3 className="text-sm md:text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1 leading-tight">
                {member.name}
              </h3>
              <motion.span 
                className="text-cyan-500 text-xs md:text-sm font-bold" 
                animate={{ x: [0, 4, 0] }} 
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </div>
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-cyan-500/50 transition-colors">
              Core Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = forwardRef((props, ref) => {
  const [isPaused, setIsPaused] = useState(false);
  const [boost, setBoost] = useState(false);
  const scrollList = useMemo(() => [...TEAM_MEMBERS, ...TEAM_MEMBERS], []);

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden bg-[#020617] text-white" id="team">
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none opacity-40" />
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none transform-gpu">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 flex flex-col items-center text-center">
        <motion.h2 className="text-[clamp(2.5rem,8vw,4.5rem)] md:text-7xl font-black tracking-tighter leading-none">
          Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Avalanche</span>
        </motion.h2>
      </div>

      <div className="relative w-full group/container overflow-hidden py-6">
        
        {/* TURBO BOOST BUTTONS - Visible on Mobile + Laptop */}
        <button 
          onMouseEnter={() => setBoost(true)} onMouseLeave={() => setBoost(false)}
          onTouchStart={() => setBoost(true)} onTouchEnd={() => setBoost(false)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-cyan-500 transition-all duration-500 hover:bg-cyan-500 hover:text-black hover:scale-110 active:scale-90 shadow-2xl"
        >
          <span className="text-lg md:text-2xl font-bold">«</span>
        </button>

        <button 
          onMouseEnter={() => setBoost(true)} onMouseLeave={() => setBoost(false)}
          onTouchStart={() => setBoost(true)} onTouchEnd={() => setBoost(false)}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-cyan-500 transition-all duration-500 hover:bg-cyan-500 hover:text-black hover:scale-110 active:scale-90 shadow-2xl"
        >
          <span className="text-lg md:text-2xl font-bold">»</span>
        </button>

        {/* Dynamic Edge Masks */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-64 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-64 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-4 md:gap-8 will-change-transform"
          initial={{ x: 0 }}
          animate={{ x: isPaused ? undefined : "-50%" }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: boost ? 35 : 180, // High-performance duration logic
              ease: "linear",
            },
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ width: "max-content", display: "flex", transform: 'translateZ(0)' }}
        >
          {scrollList.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center opacity-30 select-none">
        <p className="text-[10px] uppercase tracking-[0.5em] font-medium italic">AVALANCHE CLUB • SIT TUMAKURU</p>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;