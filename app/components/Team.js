'use client';

import React, { forwardRef, useMemo, useState } from 'react'; // Added useState
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
  { name: 'Abhinav Raj', linkedin: '#', instagram: '#', image: '/team/abhinav.jpg' },
  { name: 'Babul Kumar', linkedin: 'https://www.linkedin.com/in/babul-kumar-a0a45a27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: 'https://www.instagram.com/babulkr328?igsh=MTZwYmMyczNpZHg2eA==', image: '/photo/babul.jpeg' },
  { name: 'Deeksha', linkedin: '#', instagram: '#', image: '/photo/deeksha.jpeg' },
  { name: 'Deepankar Raj', linkedin: 'https://www.linkedin.com/in/deepankaraj', instagram: 'https://www.instagram.com/deepankaraj?igsh=cjRxbnpveHVtMml3', image: '/photo/deepankar.jpeg' },
  { name: 'Dhruthi M', linkedin: 'https://www.linkedin.com/in/dhruthi-m-940bb6385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: 'https://www.instagram.com/dhruthi_dru?igsh=OWpobmc1NmVoOWV1', image: '/photo/dhruthi.jpeg' },
  { name: 'Keerthi Pai', linkedin: '#', instagram: '#', image: '/photo/keerthi.jpeg' },
  { name: 'Nanditha LM', linkedin: '#', instagram: '#', image: '/photo/nanditha.jpeg' },
  { name: 'Saket Sinha', linkedin: '#', instagram: '#', image: '/photo/saket.jpeg' },
  { name: 'Soham Khade', linkedin: '#', instagram: '#', image: '/photo/soham.jpeg' },
  { name: 'Samarth Gupta', linkedin: '#', instagram: '#', image: '/photo/samarth.jpeg' },
  { name: 'Vishal Tiwary', linkedin: '#', instagram: '#', image: '/photo/vishal.jpeg' },
  { name: 'Sayan', linkedin: '#', instagram: '#', image: '/photo/sayan.jpeg' },
  { name: 'Lasya Shetty', linkedin: 'https://www.linkedin.com/in/nagalasya-t-v-3118613b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: '#', image: '/photo/lasya.jpeg' },
  { name: 'lisha GI', linkedin: 'https://www.linkedin.com/in/lisha-g-l-377656372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: '#', image: '/photo/lisha.jpeg' },
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
    <div className="relative flex-shrink-0 w-[220px] md:w-[280px] group select-none">
      <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.06] hover:-translate-y-2 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-all duration-500 scale-75 group-hover:scale-110" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-[2px] transform transition-transform duration-700 group-hover:rotate-6">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-2 border-[#020617]">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                ) : (
                  <span className="text-xl md:text-2xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute -inset-2 flex justify-between items-end pointer-events-none">
              <a 
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <FaInstagram size={14} />
              </a>
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
          <div className="text-center mt-2">
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
  const [isPaused, setIsPaused] = useState(false); // State to control play/pause
  const scrollList = useMemo(() => [...TEAM_MEMBERS, ...TEAM_MEMBERS], []);

  return (
    <section 
      ref={ref} 
      className="py-20 md:py-32 relative overflow-hidden bg-[#020617] text-white"
    >
      <SpaceStars starCount={80} className="absolute inset-0 pointer-events-none opacity-40" />
      
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

      <div 
        className="relative w-full overflow-hidden flex items-center"
        onMouseEnter={() => setIsPaused(true)} // Pause on enter
        onMouseLeave={() => setIsPaused(false)} // Resume on leave
      >
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-4 md:gap-8 will-change-transform"
          initial={{ x: 0 }}
          animate={{ x: isPaused ? undefined : "-50%" }} // Conditional animation
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 180, // Slower speed (increased from 95 to 180)
              ease: "linear",
            },
          }}
          style={{ width: "max-content", display: "flex" }}
        >
          {scrollList.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center opacity-30 select-none">
        <p className="text-xs uppercase tracking-[0.4em] font-medium italic">Continuous Innovation</p>
      </div>
    </section>
  );
});

Team.displayName = 'Team';
export default Team;