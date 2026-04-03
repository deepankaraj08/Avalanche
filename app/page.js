'use client';

import { useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';

// Below-fold sections: lazy-loaded so their JS is NOT in the initial bundle
const About = dynamic(() => import('@/app/components/About'), { ssr: false, loading: () => null });
const Events = dynamic(() => import('@/app/components/Events'), { ssr: false, loading: () => null });
const Gallery = dynamic(() => import('@/app/components/Gallery'), { ssr: false, loading: () => null });
const Team = dynamic(() => import('@/app/components/Team'), { ssr: false, loading: () => null });
const Footer = dynamic(() => import('@/app/components/Footer'), { ssr: false, loading: () => null });

// Modals: load only when actually opened
const JoinModal = dynamic(() => import('@/app/components/JoinModal'), { ssr: false, loading: () => null });
export default function Home() {
  // 1. State Management for Modals
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // 2. Initialize all refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const galleryRef = useRef(null);
  const sponsorsRef = useRef(null);
  const teamRef = useRef(null);

  const allRefs = {
    homeRef,
    aboutRef,
    eventsRef,
    galleryRef,
    sponsorsRef,
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

      // Highlight the sponsors box with a glowing boundary momentarily
      if (ref === sponsorsRef) {
        ref.current.classList.add('!border-cyan-400', '!shadow-[0_0_40px_rgba(34,211,238,0.4)]');
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.remove('!border-cyan-400', '!shadow-[0_0_40px_rgba(34,211,238,0.4)]');
          }
        }, 2000);
      }
    }
  };

  // Prevent scroll-chaining when modals are open
  useEffect(() => {
    if (isJoinModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isJoinModalOpen]);

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

        <Team ref={teamRef} />
      </main>

      <Footer />

      {/* --- Modals Layer - AnimatePresence ensures smooth exit transitions --- */}
      <AnimatePresence mode="wait">
        {isJoinModalOpen && (
          <JoinModal key="join-modal" onClose={() => setIsJoinModalOpen(false)} />
        )}

      </AnimatePresence>
    </div>
  );
}