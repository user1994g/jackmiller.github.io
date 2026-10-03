import React from 'react';

export const HollyMark = ({ className }) => (
  <svg className={className} viewBox="0 0 100 88" aria-hidden="true" focusable="false">
    <path d="M48 53C20 60 8 41 5 13l15 7 9-14 9 18 15-4-7 17 13 9Z" fill="#4c9972" stroke="#123b2d" strokeWidth="2" />
    <path d="M52 53c26 8 39-11 44-34l-16 4-9-12-8 16-14-3 5 17-13 6Z" fill="#397f59" stroke="#123b2d" strokeWidth="2" />
    <path d="m22 27 29 29 24-22" fill="none" stroke="#d8e9c5" strokeWidth="2" />
    <g fill="#e64b51" stroke="#7f2531" strokeWidth="2">
      <circle cx="43" cy="59" r="10" /><circle cx="62" cy="59" r="10" /><circle cx="52" cy="72" r="10" />
    </g>
  </svg>
);

export const ChristmasTree = ({ className }) => (
  <svg className={className} viewBox="0 0 180 230" aria-hidden="true" focusable="false">
    <path d="M79 186h22v34H79Z" fill="#bd885a" />
    <path d="m90 23 39 61-19-4 39 57-24-5 45 66H10l45-66-24 5 39-57-19 4Z" fill="#347552" stroke="#0f3327" strokeWidth="3" strokeLinejoin="round" />
    <path d="m50 92 66 24M34 149l99 26" stroke="#e5c67e" strokeWidth="5" strokeLinecap="round" />
    <g fill="#dc4550"><circle cx="77" cy="72" r="6" /><circle cx="102" cy="142" r="7" /><circle cx="55" cy="175" r="7" /><circle cx="132" cy="188" r="6" /></g>
    <path d="m90 1 6 15 17 1-13 11 4 16-14-9-14 9 4-16-13-11 17-1Z" fill="#f2cd83" stroke="#8e662e" strokeWidth="2" />
    <path d="M116 194h52v32h-52Z" fill="#bf3544" stroke="#67212e" strokeWidth="2" />
    <path d="M140 194v32M116 206h52" stroke="#f2cd83" strokeWidth="5" />
    <path d="M142 195c-28-17-14-31 0-9 12-22 28-8 0 9Z" fill="none" stroke="#f2cd83" strokeWidth="4" />
  </svg>
);

const Snowflake = ({ className }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M40 5v70M10 22l60 36M10 58l60-36M31 13l9 9 9-9M31 67l9-9 9 9M13 33l12-3-3-12M58 62l-3-12 12-3M13 47l12 3-3 12M58 18l-3 12 12 3" />
    </g>
  </svg>
);

const ChristmasArt = () => (
  <div className="christmas-scene" aria-hidden="true">
    <div className="christmas-lights">
      {Array.from({ length: 14 }, (_, index) => <span key={index} />)}
    </div>
    <span className="christmas-glow" />
    <Snowflake className="christmas-snowflake christmas-snowflake--one" />
    <Snowflake className="christmas-snowflake christmas-snowflake--two" />
    <Snowflake className="christmas-snowflake christmas-snowflake--three" />
    <span className="christmas-edition">The Christmas cut <span>20—31 December</span></span>
  </div>
);

export default ChristmasArt;
