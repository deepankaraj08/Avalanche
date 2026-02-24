'use client';

import { useRef, useState } from 'react'; 
import { AnimatePresence } from 'framer-motion'; 
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Events from '@/app/components/Events';
import Gallery from '@/app/components/Gallery';
import Sponsors from '@/app/components/Sponsors';
import Team from '@/app/components/Team';
import Alumni from '@/app/components/Alumni';
import Footer from '@/app/components/Footer';
import JoinModal from '@/app/components/JoinModal';
import SponsorModal from '@/app/components/SponsorModal'; // Added SponsorModal

export default function Home() {
  // 1. State Management for Modals
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  // 2. Initialize all refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const sponsorsRef = useRef(null);
  const galleryRef = useRef(null);
  const teamRef = useRef(null);
  const alumniRef = useRef(null);

  const allRefs = { 
    homeRef, 
    aboutRef, 
    eventsRef, 
    sponsorsRef, 
    galleryRef, 
    teamRef, 
    alumniRef 
  };

  // 3. Smooth Scroll Function
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = ref.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen">
      {/* Navbar opens the WhatsApp Join Modal */}
      <Navbar 
        scrollTo={scrollTo} 
        refs={allRefs} 
        openModal={() => setIsJoinModalOpen(true)} 
      />

      <main>
        <Hero 
          ref={homeRef} 
          scrollTo={scrollTo} 
          refs={allRefs} 
        />

        <About ref={aboutRef} />
        <Events ref={eventsRef} />
        <Gallery ref={galleryRef} />
        
        {/* Sponsors gets the function to open the Sponsor Inquiry Form */}
        <Sponsors 
          ref={sponsorsRef} 
          openSponsorModal={() => setIsSponsorModalOpen(true)} 
        />
        
        <Team ref={teamRef} />
        <Alumni ref={alumniRef} />
      </main>

      <Footer />

      {/* --- Modals Layer --- */}
      <AnimatePresence>
        {/* WhatsApp Join Modal */}
        {isJoinModalOpen && (
          <JoinModal onClose={() => setIsJoinModalOpen(false)} />
        )}

        {/* Sponsor Inquiry Form Modal */}
        {isSponsorModalOpen && (
          <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};