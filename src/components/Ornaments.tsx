import React from 'react';

// Elegant gold gradient definition to be reused
export const GoldGradient: React.FC = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFBA81" />
        <stop offset="30%" stopColor="#F5E3B3" />
        <stop offset="70%" stopColor="#C5A074" />
        <stop offset="100%" stopColor="#9E7C4F" />
      </linearGradient>
    </defs>
  </svg>
);

// Symmetrical top-left corner ornament (can be flipped using transform/tailwind classes for other corners)
export const KazakhOrnamentCorner: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className}`} 
      fill="none" 
      stroke="url(#gold-grad)" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Intricate Kazakh spiral ornament corner structure */}
      <path d="M 5,5 Q 40,5 40,25" />
      <path d="M 5,5 Q 5,40 25,40" />
      <path d="M 40,25 Q 40,35 30,35 Q 20,35 25,40" />
      <path d="M 12,12 Q 25,12 25,25 Q 25,30 20,30 Q 15,30 15,25 Q 15,15 35,15" />
      <path d="M 12,12 Q 12,25 25,25" />
      <path d="M 50,5 Q 35,12 35,22 Q 35,28 40,28 Q 45,28 45,22 Q 45,10 65,10 L 80,10" />
      <path d="M 5,50 Q 12,35 22,35 Q 28,35 28,40 Q 28,45 22,45 Q 10,45 10,65 L 10,80" />
      <circle cx="8" cy="8" r="1.5" fill="url(#gold-grad)" />
    </svg>
  );
};

// Luxury circular central medallion used as section divider
export const KazakhOrnamentDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 200 100" 
      className={`w-40 h-20 ${className}`} 
      fill="none" 
      stroke="url(#gold-grad)" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Symmetric divider from center out */}
      {/* Center circle */}
      <circle cx="100" cy="50" r="12" strokeWidth="1" />
      <circle cx="100" cy="50" r="4" fill="url(#gold-grad)" />
      
      {/* Left scroll motifs */}
      <path d="M 88,50 C 70,50 65,30 50,30 C 35,30 30,45 40,45 C 50,45 52,38 48,35" />
      <path d="M 88,50 C 70,50 65,70 50,70 C 35,70 30,55 40,55 C 50,55 52,62 48,65" />
      <path d="M 35,50 Q 20,50 20,40 Q 20,30 30,30" strokeWidth="1" />
      <path d="M 35,50 Q 20,50 20,60 Q 20,70 30,70" strokeWidth="1" />
      <line x1="10" y1="50" x2="25" y2="50" strokeWidth="1" />
      
      {/* Right scroll motifs (mirrored) */}
      <path d="M 112,50 C 130,50 135,30 150,30 C 165,30 170,45 160,45 C 150,45 148,38 152,35" />
      <path d="M 112,50 C 130,50 135,70 150,70 C 165,70 170,55 160,55 C 150,55 148,62 152,65" />
      <path d="M 165,50 Q 180,50 180,40 Q 180,30 170,30" strokeWidth="1" />
      <path d="M 165,50 Q 180,50 180,60 Q 180,70 170,70" strokeWidth="1" />
      <line x1="190" y1="50" x2="175" y2="50" strokeWidth="1" />
      
      {/* Small dots */}
      <circle cx="65" cy="50" r="2" fill="url(#gold-grad)" />
      <circle cx="135" cy="50" r="2" fill="url(#gold-grad)" />
    </svg>
  );
};

// Intricate decorative circular badge (behind play buttons or as background layers)
export const KazakhOrnamentCircle: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className}`} 
      fill="none" 
      stroke="url(#gold-grad)" 
      strokeWidth="1.2"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" strokeDasharray="2, 2" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="44" strokeWidth="1" />
      {/* Inner design of repeating star/scroll pattern */}
      <circle cx="50" cy="50" r="28" strokeWidth="1" />
      
      {/* 4 axes of Kazakh ornament scrolls */}
      {/* Top */}
      <path d="M 50,44 C 50,30 42,26 42,20 C 42,14 50,14 50,22 Q 50,25 47,24" />
      <path d="M 50,44 C 50,30 58,26 58,20 C 58,14 50,14 50,22" />
      
      {/* Bottom */}
      <path d="M 50,56 C 50,70 42,74 42,80 C 42,86 50,86 50,78 Q 50,75 53,76" />
      <path d="M 50,56 C 50,70 58,74 58,80 C 58,86 50,86 50,78" />
      
      {/* Left */}
      <path d="M 44,50 C 30,50 26,42 20,42 C 14,42 14,50 22,50" />
      <path d="M 44,50 C 30,50 26,58 20,58 C 14,58 14,50 22,50" />
      
      {/* Right */}
      <path d="M 56,50 C 70,50 74,42 80,42 C 86,42 86,50 78,50" />
      <path d="M 56,50 C 70,50 74,58 80,58 C 86,58 86,50 78,50" />

      {/* Decorative dots */}
      <circle cx="50" cy="50" r="3" fill="url(#gold-grad)" />
    </svg>
  );
};
