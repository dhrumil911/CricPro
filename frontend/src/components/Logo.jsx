import React from "react";

function Logo({ className = "h-8 w-auto", showText = true, textClass = "" }) {
  return (
    <div className="flex items-center gap-2.5 select-none text-left">
      {/* Premium Minimal Cricket SaaS Icon */}
      <svg
        className={`${className} transition-colors duration-250`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--logo-blue)" />
            <stop offset="100%" stopColor="var(--logo-blue)" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--logo-gold)" />
            <stop offset="100%" stopColor="var(--logo-gold)" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular motion orbit representing spin and progress */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#blueGrad)"
          strokeWidth="3.5"
          strokeDasharray="180 50"
          className="opacity-90"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeDasharray="80 120"
          className="opacity-75"
          transform="rotate(120 50 50)"
        />

        {/* Cricket Stumps & Bails (gold) */}
        <g stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round">
          {/* Stumps */}
          <line x1="43" y1="36" x2="43" y2="64" />
          <line x1="50" y1="33" x2="50" y2="67" />
          <line x1="57" y1="36" x2="57" y2="64" />
          {/* Bails */}
          <line x1="41" y1="35" x2="49" y2="35" />
          <line x1="51" y1="35" x2="59" y2="35" />
        </g>

        {/* Cricket Bat (Gold & Blue) */}
        <path
          d="M32 68 L24 76 C22.5 77.5 20 77.5 18.5 76 C17 74.5 17 72 18.5 70.5 L26.5 62.5 Z"
          fill="url(#blueGrad)"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
        />

        {/* Cricket Ball with seam detail (white and gold seam, with glow) */}
        <g filter="url(#glowEffect)">
          <circle cx="68" cy="62" r="9" fill="var(--logo-white)" stroke="var(--glass-border)" strokeWidth="1" />
          {/* Seam line */}
          <path
            d="M60 60 C64 57 72 67 76 64"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Mini Gold Trophy overlay */}
        <path
          d="M47 62 H53 M50 62 V59 M46 54 H54 V59 C54 61.2 52.2 62 50 62 C47.8 62 46 61.2 46 59 Z"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Product Wordmark */}
      {showText && (
        <span className={`font-display font-extrabold text-xl tracking-wider transition-colors duration-250 ${textClass || "text-[var(--logo-text-color)]"}`}>
          Cric<span className="text-[var(--logo-gold)]">Pro</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
