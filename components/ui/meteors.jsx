"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils";

export function SpaceStars({ className, starCount = 180 }) {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const timeoutsRef = useRef(new Set());
  const spawnTimeoutRef = useRef(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    // On mobile, use fewer static stars to reduce DOM node count
    const count = mobile ? Math.floor(starCount / 2) : starCount;
    const generatedStars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: 0.4 + Math.random() * 0.6,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 5,
    }));
    setStars(generatedStars);
  }, [starCount]);

  /* ==============================
     2️⃣ Shooting Stars — desktop only
  ============================== */
  useEffect(() => {
    // Skip on mobile — the recursive setTimeout loop is too expensive
    if (isMobile) return;

    const spawnStar = () => {
      const id = Date.now();
      const duration = 1000 + Math.random() * 800; // random speed
      const isTopEdge = Math.random() > 0.5;

      const colors = [
        "from-white via-blue-400/90",
        "from-white via-purple-400/90",
        "from-white via-pink-400/90",
      ];

      const newStar = {
        id,
        duration,
        color: colors[Math.floor(Math.random() * colors.length)],
        top: isTopEdge ? -10 : Math.random() * 100,
        left: isTopEdge ? Math.random() * 100 : -10,
        angle: 45 + (Math.random() * 10 - 5),
      };

      setShootingStars((prev) => [...prev, newStar]);

      const removalTimeout = setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
        timeoutsRef.current.delete(removalTimeout);
      }, duration);

      timeoutsRef.current.add(removalTimeout);

      // 🚀 Increased meteor frequency
      const nextSpawnDelay = 300 + Math.random() * 400;
      spawnTimeoutRef.current = setTimeout(spawnStar, nextSpawnDelay);
    };

    spawnTimeoutRef.current = setTimeout(spawnStar, 800);

    return () => {
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current.clear();
    };
  }, []);

  if (stars.length === 0) {
    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes shoot {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(1100px) scale(0.3); opacity: 0; }
        }
      `}</style>

      {/* ⭐ Static Stars */}
      {/* ⭐ Static Stars (Your Original Style Restored) */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-slate-400"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: "0 0 4px rgba(148,163,184,0.6)", // subtle glow only
          }}
        />
      ))}

      {/* 🌠 Shooting Stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          <div
            className={`relative h-[4px] w-[180px] bg-gradient-to-r ${star.color} to-transparent`}
            style={{
              animation: `shoot ${star.duration}ms ease-out forwards`,
              boxShadow:
                "0 0 15px rgba(255,255,255,0.9), 0 0 35px rgba(96,165,250,0.9), 0 0 60px rgba(147,51,234,0.6)",
            }}
          >
            {/* 💥 Bright Head */}
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white animate-pulse"
              style={{
                boxShadow:
                  "0 0 15px #fff, 0 0 25px #60a5fa, 0 0 45px #9333ea",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}