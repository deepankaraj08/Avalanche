'use client';

import React, { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { SpaceStars } from '../../components/ui/meteors';

const TEAM_MEMBERS = [
  { name: 'Anmol Sharan', linkedin: '#' },
  { name: 'Chinmayee Bhatt', linkedin: '#' },
  { name: 'Rishabh Ojha', linkedin: '#' },
  { name: 'Satyam Verma', linkedin: '#' },
  { name: 'Shruti Shreya', linkedin: '#' },
  { name: 'Advait Amrit', linkedin: '#' },
  { name: 'Harsh', linkedin: '#' },
  { name: 'Jhanvi', linkedin: '#' },
  { name: 'Manan Agarwal', linkedin: '#' },
  { name: 'Mrinalini', linkedin: '#' },
  { name: 'Mohammed Affan', linkedin: '#' },
  { name: 'Nuhaa Fathima', linkedin: '#' },
  { name: 'Purvi Raj', linkedin: '#' },
  { name: 'Vansh Jha', linkedin: '#' },
  { name: 'Ankit', linkedin: '#' },
  { name: 'Abhinav Raj', linkedin: '#' },
  { name: 'Babul Kumar', linkedin: '#' },
  { name: 'Deeksha', linkedin: '#' },
  { name: 'Deepankar Raj', linkedin: '#' },
  { name: 'Dhruthi M', linkedin: '#' },
  { name: 'Keerthi Pai', linkedin: '#' },
  { name: 'Nanditha LM', linkedin: '#' },
  { name: 'Saket Sinha', linkedin: '#' },
  { name: 'Soham Khade', linkedin: '#' },
  { name: 'Samarth Gupta', linkedin: '#' },
  { name: 'Vishal Tiwary', linkedin: '#' },
  { name: 'Sayan', linkedin: '#' },
  { name: 'Lasya Shetty', linkedin: '#' },
  { name: 'Avnish', linkedin: '#' },
  { name: 'Aryan Schandillia', linkedin: '#' },
  { name: 'Anjali Mallur', linkedin: '#' },
  { name: 'Abjijeet Satyam', linkedin: '#' },
  { name: 'Ayush Ranjan', linkedin: '#' },
  { name: 'Agamya sinha', linkedin: '#' },
  { name: 'K bhuvana', linkedin: '#' },
  { name: 'Md Ayman Akhtar', linkedin: '#' },
  { name: 'Madhurya R', linkedin: '#' },
  { name: 'Shubham Kanshi', linkedin: '#' },
  { name: 'siddharth soni', linkedin: '#' },
  { name: 'Snehil Pandey', linkedin: '#' },
  { name: 'Suprem Timsina', linkedin: '#' },
  { name: 'Simran', linkedin: '#' },
  { name: 'Saarth singh', linkedin: '#' },
  { name: 'Sharadhi', linkedin: '#' },
  { name: 'Preetham C G', linkedin: '#' },
  { name: 'Nitin Desai', linkedin: '#' },
  { name: 'Geet Roy', linkedin: '#' },
  { name: 'Om karr', linkedin: '#' },
];

const TeamCard = ({ member }) => {
  return (
    <div className="relative flex-shrink-0 w-[220px] md:w-[280px] group select-none">
      <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.06] hover:-translate-y-2 shadow-2xl">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar Area */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-all duration-500 scale-75 group-hover:scale-110" />
            
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-[2px] transform transition-transform duration-700 group-hover:rotate-12">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-2 border-[#020617]">
                <span className="text-xl md:text-2xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            
            {/* LinkedIn Floating Button */}
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -right-1 -bottom-1 w-9 h-9 md:w-11 md:h-11 rounded-full bg-cyan-500 text-[#020617] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-base md:text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
              {member.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = forwardRef((props, ref) => {
  // UseMemo to prevent re-calculating the doubled list on every render
  const scrollList = useMemo(() => [...TEAM_MEMBERS, ...TEAM_MEMBERS], []);

  return (
    <section 
      ref={ref} 
      className="py-20 md:py-32 relative overflow-hidden bg-[#020617] text-white"
    >
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none opacity-40" />
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 md:mb-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6"
          >
            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              The Collective
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black tracking-tighter"
          >
            Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Avalanche</span>
          </motion.h2>
        </div>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Premium Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-4 md:gap-8 will-change-transform hover:[animation-play-state:paused]"
          animate={{ x: [0, -2500] }} 
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45, // Adjust for speed
              ease: "linear",
            },
          }}
          style={{ width: "max-content" }}
        >
          {scrollList.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center opacity-30 select-none">
        <p className="text-xs uppercase tracking-[0.4em] font-medium">Scroll to explore the team</p>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;