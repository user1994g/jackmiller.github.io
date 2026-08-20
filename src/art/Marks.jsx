import React from 'react';

export const Viewfinder = ({ className }) => (
  <svg className={className} viewBox="0 0 220 160" fill="none" aria-hidden="true">
    <rect x="8" y="8" width="204" height="144" rx="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 42h18M8 118h18M194 42h18M194 118h18M70 8v14M150 8v14M70 138v14M150 138v14" stroke="currentColor" strokeWidth="2" />
    <circle cx="110" cy="80" r="22" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="110" cy="80" r="4" fill="currentColor" />
  </svg>
);

export const Sprocket = ({ className }) => (
  <svg className={className} viewBox="0 0 48 220" fill="none" aria-hidden="true">
    {Array.from({ length: 8 }).map((_, i) => (
      <rect key={i} x="14" y={10 + i * 26} width="20" height="14" rx="3" fill="currentColor" />
    ))}
  </svg>
);

export const Scribble = ({ className }) => (
  <svg className={className} viewBox="0 0 240 36" fill="none" aria-hidden="true">
    <path
      d="M4 22c28-18 48 14 76 2 22-9 34-20 58-8 26 13 42 16 72-6 12-8 22-10 26-8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const Stamp = ({ className, label = 'TAKE 26' }) => (
  <svg className={className} viewBox="0 0 140 140" aria-hidden="true">
    <circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 7" />
    <circle cx="70" cy="70" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <text
      x="70"
      y="76"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Syne, sans-serif"
      fontSize="16"
      fontWeight="800"
      letterSpacing="2"
    >
      {label}
    </text>
  </svg>
);

export const Blob = ({ className }) => (
  <svg className={className} viewBox="0 0 400 400" aria-hidden="true">
    <path
      fill="currentColor"
      d="M286 54c42 22 86 78 90 132s-28 108-78 138-118 38-176 18S18 268 22 206 70 78 130 50s114-18 156 4Z"
    />
  </svg>
);

export const CameraGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="6" y="18" width="52" height="34" rx="8" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="35" r="10" stroke="currentColor" strokeWidth="2.5" />
    <path d="M20 18l4-8h16l4 8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="48" cy="26" r="2.2" fill="currentColor" />
  </svg>
);

export const ReelGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="6" fill="currentColor" />
    <circle cx="32" cy="16" r="3" fill="currentColor" />
    <circle cx="46" cy="32" r="3" fill="currentColor" />
    <circle cx="32" cy="48" r="3" fill="currentColor" />
    <circle cx="18" cy="32" r="3" fill="currentColor" />
  </svg>
);

export const CubeGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 8l22 12v24L32 56 10 44V20L32 8Z" stroke="currentColor" strokeWidth="2.5" />
    <path d="M32 8v24m0 0L10 20m22 12l22-12" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

export const PersonGlyph = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" />
    <path d="M12 54c4-12 12-18 20-18s16 6 20 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const DividerWave = ({ className }) => (
  <svg className={className} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M0 40c120-40 240 40 360 20s240-60 360-20 240 60 360 20 240-60 360-20v40H0Z"
    />
  </svg>
);

export const CutArrow = ({ className }) => (
  <svg className={className} viewBox="0 0 180 150" fill="none" aria-hidden="true">
    <path
      d="M13 118c28-3 56-14 77-33 17-15 28-34 38-55"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="m98 35 34-13 4 36"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M18 128c20 5 39 3 58-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ClapperMark = ({ className }) => (
  <svg className={className} viewBox="0 0 180 150" fill="none" aria-hidden="true">
    <path d="M24 54h132v78H24z" stroke="currentColor" strokeWidth="5" />
    <path d="m18 25 130-9 8 34-130 9z" stroke="currentColor" strokeWidth="5" />
    <path d="m37 24 24 31m23-35 24 31m21-34 24 31" stroke="currentColor" strokeWidth="5" />
    <path d="M42 76h96M42 94h63" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const WireCube = ({ className }) => (
  <svg className={className} viewBox="0 0 320 300" fill="none" aria-hidden="true">
    <path d="m157 25 112 62-3 126-112 63-111-64 3-125 111-62Z" stroke="currentColor" strokeWidth="4" />
    <path d="m46 87 109 64 114-64M155 151l-1 125M157 25l-2 126" stroke="currentColor" strokeWidth="4" />
    <path d="m43 212 50-29 25 14 36-21 39 22 73-42" stroke="currentColor" strokeWidth="3" strokeDasharray="8 9" />
    <circle cx="155" cy="151" r="8" fill="currentColor" />
    <circle cx="43" cy="212" r="6" fill="currentColor" />
    <circle cx="269" cy="87" r="6" fill="currentColor" />
  </svg>
);

export const MemoryFlower = ({ className }) => (
  <svg className={className} viewBox="0 0 180 260" fill="none" aria-hidden="true">
    <path d="M91 241c-7-51 3-98 2-151" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M91 167c-24-1-40-14-48-35 25-1 42 10 50 29M92 190c23-5 40-20 46-43-24 2-40 15-45 37" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M91 91c-16-13-19-29-8-42 10 4 15 12 16 22 4-16 14-25 28-25 6 16-1 31-21 45 18-5 32 0 39 14-9 15-25 18-48 8-15 15-32 17-47 6 4-17 17-26 41-28Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="96" cy="94" r="9" fill="currentColor" />
  </svg>
);

export const BurstMark = ({ className }) => (
  <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <path d="m80 5 9 47 29-38-16 45 44-21-36 33 49-4-47 18 45 15-49-1 38 31-46-19 20 44-31-37-6 47-7-47-30 37 19-44-45 19 37-31-48 1 44-15L1 67l49 4-36-33 44 21-16-45 29 38 9-47Z" fill="currentColor" />
  </svg>
);
