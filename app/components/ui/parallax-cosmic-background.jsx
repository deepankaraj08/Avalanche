'use client';

import React, { useEffect, useState } from 'react';

/**
 * A cosmic parallax star-field background.
 * Stars are generated via random box-shadow values on mount.
 * Uses CSS keyframe `animStar` (defined in globals.css) for the scroll animation.
 *
 * Props:
 *  - loop {boolean}   - whether the star animation loops (default: true)
 *  - className {string} - extra classes for the container
 *  - showText {boolean} - render built-in head/text overlay (default: false)
 *  - head {string}    - heading text (only used when showText=true)
 *  - text {string}    - comma-separated subtitle parts (only used when showText=true)
 */
const CosmicParallaxBg = ({
  head = '',
  text = '',
  loop = true,
  className = '',
  showText = false,
}) => {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');

  const textParts = text ? text.split(',').map((p) => p.trim()).filter(Boolean) : [];

  /** Generate `count` random white pixel box-shadows spread over a 2000×2000 canvas */
  const generateStars = (count) => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStars(700));
    setMediumStars(generateStars(200));
    setBigStars(generateStars(100));

    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1',
    );
  }, [loop]);

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* ── Star layers ── */}
      <div
        id="stars"
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      />
      <div
        id="stars2"
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      />
      <div
        id="stars3"
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      />

      {/* ── Planet horizon glow ── */}
      <div id="cosmic-horizon">
        <div className="cosmic-glow" />
      </div>
      <div id="cosmic-earth" />

      {/* ── Optional built-in text overlay ── */}
      {showText && head && (
        <div id="cosmic-title">{head.toUpperCase()}</div>
      )}
      {showText && textParts.length > 0 && (
        <div id="cosmic-subtitle">
          {textParts.map((part, i) => (
            <React.Fragment key={i}>
              <span className={`subtitle-part-${i + 1}`}>{part.toUpperCase()}</span>
              {i < textParts.length - 1 && ' '}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export { CosmicParallaxBg };
