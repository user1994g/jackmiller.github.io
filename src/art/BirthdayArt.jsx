import React from 'react';

export const BirthdaySun = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <g stroke="#aa7242" strokeWidth="3" strokeLinecap="round">
      <path d="M50 3v9M50 88v9M3 50h9M88 50h9M17 17l7 7M76 76l7 7M17 83l7-7M76 24l7-7" />
      <circle cx="50" cy="50" r="31" fill="#f5d88c" />
      <path d="M36 44v5M64 44v5M40 58q10 13 20 0" fill="none" stroke="#514137" />
    </g>
    <g fill="#e0a482"><ellipse cx="30" cy="55" rx="6" ry="3" /><ellipse cx="70" cy="55" rx="6" ry="3" /></g>
  </svg>
);

export const BirthdayCake = ({ className }) => (
  <svg className={className} viewBox="0 0 180 190" aria-hidden="true" focusable="false">
    <ellipse cx="90" cy="170" rx="82" ry="12" fill="#d8c6df" />
    <path d="M30 105h120v54q-60 23-120 0Z" fill="#c4b3dc" stroke="#675483" strokeWidth="3" />
    <path d="M30 111c0-32 120-32 120 0v15c-8 13-13-5-21 2-15 15-14-6-29 1-17 15-16-6-32 1-16 13-15-8-27-1-9 5-11-4-11-10Z" fill="#fff7ea" stroke="#675483" strokeWidth="3" />
    <path d="M52 130v9M108 133v10M131 142v7" stroke="#ac5b49" strokeWidth="4" strokeLinecap="round" />
    <path d="M78 91V47h24v44" fill="#b9cfb5" stroke="#567759" strokeWidth="3" />
    <path d="m79 61 22-9m-22 24 22-9" stroke="#fff7ea" strokeWidth="4" />
    <path d="M90 45c-24-8-5-25 1-37 14 18 20 30-1 37Z" fill="#f5d88c" stroke="#aa7242" strokeWidth="2" />
    <path d="M74 144v4M106 144v4M81 154q9 8 18 0" fill="none" stroke="#514137" strokeWidth="3" strokeLinecap="round" />
    <path d="m11 62 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" fill="#f5d88c" transform="translate(8 -4)" />
    <path d="m151 39 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" fill="#c4b3dc" />
  </svg>
);

const BirthdayArt = () => (
  <div className="birthday-scene" aria-hidden="true">
    <div className="birthday-bunting">
      {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
    </div>
    <span className="birthday-paper-halo" />
    <BirthdaySun className="birthday-sun" />
    <svg className="birthday-doodles" viewBox="0 0 260 200" fill="none" focusable="false">
      <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m40 15 7 19 21 1-16 14 5 20-17-12-17 12 5-20-16-14 21-1Z" stroke="#8b70ad" fill="#ddd0e9" />
        <path d="M175 89c-21-31-41 1-20 18l20 18 20-18c21-17 1-49-20-18Z" stroke="#b57c61" fill="#f0cdb5" />
        <path d="M101 116q-18 8-9 20t-10 20M204 23l10 11M226 55l15-4M43 148l-7 13M126 38l8-10" stroke="#729174" />
        <path d="M224 154v24m-12-12h24M110 72v16m-8-8h16" stroke="#aa7242" />
      </g>
    </svg>
    <span className="birthday-edition">A little birthday magic <span>04 / March</span></span>
  </div>
);

export default BirthdayArt;
