import React, { useId } from "react";

function Logo({ className = "h-8 w-auto", showText = true, textClass = "" }) {
  const id = useId();
  const blueGradId = `blueGrad-${id}`;
  const goldGradId = `goldGrad-${id}`;

  return (
    <div className="flex items-center gap-1.5 select-none text-left shrink-0">
      {/* Refined Premium SaaS Cricket Logo */}
      <svg
        className={`${className} transition-colors duration-250`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--logo-blue)" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--logo-gold)" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Circular blue swoosh (Primary Swoosh, Thicker & 15% Larger) */}
        <path 
          d="M 28,87 A 41,41 0 1,1 87,43" 
          stroke={`url(#${blueGradId})`} 
          strokeWidth="9" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Minimal motion effect (Secondary Swoosh, Thicker & 15% Larger) */}
        <path 
          d="M 39,78 A 31,31 0 1,1 79,48" 
          stroke={`url(#${blueGradId})`} 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.4" 
        />
        
        {/* Rotated Gold Cricket Bat + Ball Group */}
        <g transform="rotate(45 50 50)">
          {/* Bat blade (Scales Up) */}
          <rect 
            x="43.5" 
            y="36" 
            width="13" 
            height="38" 
            rx="3.5" 
            fill={`url(#${goldGradId})`} 
            stroke="var(--bg-color)" 
            strokeWidth="3" 
          />
          {/* Bat handle (Scales Up) */}
          <rect 
            x="48" 
            y="10" 
            width="4" 
            height="27" 
            rx="2" 
            fill={`url(#${goldGradId})`} 
            stroke="var(--bg-color)" 
            strokeWidth="2" 
          />
          
          {/* Handle details */}
          <line x1="48.5" y1="16" x2="51.5" y2="16" stroke="var(--bg-color)" strokeWidth="1.2" />
          <line x1="48.5" y1="21" x2="51.5" y2="21" stroke="var(--bg-color)" strokeWidth="1.2" />

          {/* Cricket Ball with Seam (Larger for visibility) */}
          <circle 
            cx="65.5" 
            cy="54" 
            r="8" 
            fill="var(--logo-white)" 
            stroke="var(--bg-color)" 
            strokeWidth="2.5" 
          />
          <path 
            d="M 60,58 A 8,8 0 0,1 71,47" 
            stroke={`url(#${goldGradId})`} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </g>
      </svg>

      {/* Product Wordmark using Sora Font */}
      {showText && (
        <span 
          className={`font-extrabold text-xl tracking-wide transition-colors duration-250 ${textClass || "text-[var(--logo-text-color)]"}`}
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Cric<span className="text-[var(--logo-gold)]">Pro</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
