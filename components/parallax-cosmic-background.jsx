'use client';

import React, { useEffect, useState } from 'react';

/**
 * A cosmic parallax background component with animated stars and text
 */
const CosmicParallaxBg = ({
  head,
  text,
  countdownTo,
  loop = true,
  className = '',
}) => {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Split the text by commas and trim whitespace
  const textParts = text.split(',').map(part => part.trim());
  
  // Generate random star positions
  const generateStarBoxShadow = count => {
    let shadows = [];
    
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    
    return shadows.join(', ');
  };
  
  useEffect(() => {
    // Generate star shadows when component mounts
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
    
    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty('--animation-iteration', loop ? 'infinite' : '1');
  }, [loop]);

  useEffect(() => {
    if (!countdownTo) return;
    
    // Timer calculation logic
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(countdownTo).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
      return true;
    };

    calculateTimeLeft(); // Initial call
    const timerId = setInterval(() => {
      const shouldContinue = calculateTimeLeft();
      if (!shouldContinue) clearInterval(timerId);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [countdownTo]);
  
  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* Stars layers */}
      <div id="stars" style={{ boxShadow: smallStars }} className="cosmic-stars"></div>
      <div
        id="stars2"
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"></div>
      <div
        id="stars3"
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"></div>
      {/* Horizon and Earth */}
      <div id="horizon">
        <div className="glow"></div>
      </div>
      <div id="earth"></div>
      {/* Title and subtitle */}
      <div id="title">{head.toUpperCase()}</div>
      
      {countdownTo ? (
        <div id="subtitle" style={{ opacity: 1, pointerEvents: 'auto' }}>
          <div className="flex flex-col gap-2.5 md:gap-3 items-center bg-cyan-950/40 border border-cyan-500/30 px-6 py-4 md:px-5 md:py-3.5 rounded-[1.5rem] md:rounded-[1.25rem] backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] select-none group border-t-cyan-400/20">
            {/* Countdown Title Header */}
            <div className="animate-pulse" style={{ color: '#22d3ee', letterSpacing: '0.4em', fontSize: '8px', md: '8.5px', fontWeight: '900', textShadow: '0 0 12px rgba(34,211,238,0.8)' }}>
              {text.toUpperCase()}
            </div>
            
            {/* Clock Digits Row */}
            <div className="flex gap-3 md:gap-4 justify-center items-center">
              <div className="flex flex-col items-center gap-0.5 min-w-[35px] md:min-w-[40px]">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter tabular-nums leading-none group-hover:text-cyan-400 transition-colors duration-500">{timeLeft.days}</span>
                <span className="text-[7px] md:text-[7.5px] text-cyan-400/60 font-black uppercase tracking-[0.3em]">Days</span>
              </div>
              <span className="text-cyan-500/30 text-xl md:text-xl font-light pb-3 md:pb-3">:</span>
              <div className="flex flex-col items-center gap-0.5 min-w-[35px] md:min-w-[40px]">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter tabular-nums leading-none group-hover:text-cyan-400 transition-colors duration-500">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[7px] md:text-[7.5px] text-cyan-400/60 font-black uppercase tracking-[0.3em]">Hrs</span>
              </div>
              <span className="text-cyan-500/30 text-xl md:text-xl font-light pb-3 md:pb-3">:</span>
              <div className="flex flex-col items-center gap-0.5 min-w-[35px] md:min-w-[40px]">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter tabular-nums leading-none group-hover:text-cyan-400 transition-colors duration-500">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[7px] md:text-[7.5px] text-cyan-400/60 font-black uppercase tracking-[0.3em]">Min</span>
              </div>
              <span className="text-cyan-500/30 text-xl md:text-xl font-light pb-3 md:pb-3">:</span>
              <div className="flex flex-col items-center gap-0.5 min-w-[35px] md:min-w-[40px]">
                <span className="text-2xl md:text-3xl font-black text-cyan-100 tracking-tighter tabular-nums leading-none group-hover:text-white transition-colors duration-500" style={{ textShadow: '0 0 15px rgba(34,211,238,0.5)' }}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[7px] md:text-[7.5px] text-cyan-400 font-black uppercase tracking-[0.3em]">Sec</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="subtitle">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${(index % 4) + 1}`}>{part.toUpperCase()}</span>
              {index < textParts.length - 1 && ' '}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export {CosmicParallaxBg}