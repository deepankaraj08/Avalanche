'use client';

import { useRef, useState, useEffect } from 'react'; 
import { AnimatePresence } from 'framer-motion'; 
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Events from '@/app/components/Events';
import Gallery from '@/app/components/Gallery';
import Sponsors from '@/app/components/Sponsors';
import Team from '@/app/components/Team';
import Footer from '@/app/components/Footer';
import JoinModal from '@/app/components/JoinModal';
import SponsorModal from '@/app/components/SponsorModal';

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

  const allRefs = { 
    homeRef, 
    aboutRef, 
    eventsRef, 
    sponsorsRef, 
    galleryRef, 
    teamRef,
  };

  // 3. Optimized Smooth Scroll Function
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      // Responsive offset: Smaller offset for mobile to maximize viewable area
      const offset = window.innerWidth < 768 ? 60 : 80; 
      
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

  // Prevent scroll-chaining when modals are open
  useEffect(() => {
    if (isJoinModalOpen || isSponsorModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isJoinModalOpen, isSponsorModalOpen]);

  return (
    // Optimized background and scroll container
    <div className="bg-[#020617] min-h-[100dvh] w-full selection:bg-cyan-500/30">
      
      <Navbar 
        scrollTo={scrollTo} 
        refs={allRefs} 
        openModal={() => setIsJoinModalOpen(true)} 
      />

      <main className="relative">
        <Hero 
          ref={homeRef} 
          scrollTo={scrollTo} 
          refs={allRefs} 
        />

        <About ref={aboutRef} />
        <Events ref={eventsRef} />
        <Gallery ref={galleryRef} />
        
        <Sponsors 
          ref={sponsorsRef} 
          openSponsorModal={() => setIsSponsorModalOpen(true)} 
        />
        
        <Team ref={teamRef} />
      </main>

      <Footer />

      {/* --- Modals Layer - AnimatePresence ensures smooth exit transitions --- */}
      <AnimatePresence mode="wait">
        {isJoinModalOpen && (
          <JoinModal key="join-modal" onClose={() => setIsJoinModalOpen(false)} />
        )}

        {isSponsorModalOpen && (
          <SponsorModal key="sponsor-modal" onClose={() => setIsSponsorModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}