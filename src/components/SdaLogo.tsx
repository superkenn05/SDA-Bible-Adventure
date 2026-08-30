import React from 'react';

interface SdaLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'emblem' | 'full' | 'gold' | 'white' | 'color';
}

/**
 * Official Seventh-day Adventist Church Emblem & Logo
 * - Open Bible foundation
 * - Central Cross of Christ
 * - Triple Flame (Holy Spirit & 3 Angels' Messages)
 */
export const SdaLogo: React.FC<SdaLogoProps> = ({ 
  className = '', 
  size = 36,
  variant = 'gold' 
}) => {
  const numericSize = typeof size === 'number' ? size : 36;

  // Render official vector paths
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={numericSize} 
      height={numericSize} 
      fill="currentColor"
      className={`inline-block select-none ${className}`}
      aria-label="Seventh-day Adventist Church Logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sdaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="sdaFlameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <filter id="sdaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>

      <g filter="url(#sdaGlow)">
        {/* LEFT FLAME - Sweeping ascending flame on the left */}
        <path
          d="M 46.5 48 
             C 41 42, 28 44, 25 56 
             C 21.5 70, 31 81, 44 83 
             C 32 79, 29 68, 33 58 
             C 36 50, 42 47, 46.5 48 Z"
          fill={variant === 'white' ? '#FFFFFF' : 'url(#sdaFlameGrad)'}
        />

        {/* CENTER FLAME - Main upper ascending flame */}
        <path
          d="M 50 14 
             C 50 14, 57 28, 56 42 
             C 55.5 50, 52 56, 50 62 
             C 48 56, 44.5 50, 44 42 
             C 43 28, 50 14, 50 14 Z"
          fill={variant === 'white' ? '#FFFFFF' : 'url(#sdaGoldGrad)'}
        />

        {/* RIGHT FLAME - Sweeping ascending flame on the right */}
        <path
          d="M 53.5 48 
             C 59 42, 72 44, 75 56 
             C 78.5 70, 69 81, 56 83 
             C 68 79, 71 68, 67 58 
             C 64 50, 58 47, 53.5 48 Z"
          fill={variant === 'white' ? '#FFFFFF' : 'url(#sdaFlameGrad)'}
        />

        {/* INNER UPPER DYNAMIC FLAME LINES */}
        <path
          d="M 50 20 
             C 54 30, 63 36, 61 52 
             C 59 40, 53 34, 50 20 Z"
          fill={variant === 'white' ? '#F1F5F9' : 'url(#sdaGoldGrad)'}
          opacity="0.9"
        />
        <path
          d="M 50 20 
             C 46 30, 37 36, 39 52 
             C 41 40, 47 34, 50 20 Z"
          fill={variant === 'white' ? '#F1F5F9' : 'url(#sdaGoldGrad)'}
          opacity="0.9"
        />

        {/* CENTRAL CROSS */}
        {/* Vertical beam */}
        <path
          d="M 48.2 38 L 51.8 38 L 51.8 84 L 48.2 84 Z"
          fill={variant === 'white' ? '#FFFFFF' : '#FEF9C3'}
        />
        {/* Horizontal crossbar */}
        <path
          d="M 37.5 49 L 62.5 49 L 62.5 52.6 L 37.5 52.6 Z"
          fill={variant === 'white' ? '#FFFFFF' : '#FEF9C3'}
        />

        {/* OPEN BIBLE BASE (FOUNDATION) */}
        {/* Left Page */}
        <path
          d="M 50 86 
             C 40 82, 26 84, 18 89 
             C 28 85, 41 84, 49 89.5 Z"
          fill={variant === 'white' ? '#FFFFFF' : 'url(#sdaGoldGrad)'}
        />
        <path
          d="M 50 88.5 
             C 40 84.5, 26 86.5, 18 91.5 
             C 28 87.5, 41 86.5, 49 92 Z"
          fill={variant === 'white' ? '#E2E8F0' : 'url(#sdaFlameGrad)'}
        />

        {/* Right Page */}
        <path
          d="M 50 86 
             C 60 82, 74 84, 82 89 
             C 72 85, 59 84, 51 89.5 Z"
          fill={variant === 'white' ? '#FFFFFF' : 'url(#sdaGoldGrad)'}
        />
        <path
          d="M 50 88.5 
             C 60 84.5, 74 86.5, 82 91.5 
             C 72 87.5, 59 86.5, 51 92 Z"
          fill={variant === 'white' ? '#E2E8F0' : 'url(#sdaFlameGrad)'}
        />
      </g>
    </svg>
  );
};
