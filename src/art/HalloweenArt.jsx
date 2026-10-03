import React from 'react';

export const PumpkinMark = ({ className }) => (
  <svg className={className} viewBox="0 0 160 140" aria-hidden="true" focusable="false">
    <path d="M79 29c-5-13 2-21 15-24" fill="none" stroke="#99b66b" strokeWidth="9" strokeLinecap="round" />
    <path d="M79 31C44 13 8 40 8 82c0 35 26 52 71 50 44 2 73-15 73-50 0-42-37-69-73-51Z" fill="#ff7b24" stroke="#291522" strokeWidth="3" />
    <path d="M61 33c-22 25-24 71-8 92M97 33c22 25 24 71 8 92M79 35v91" fill="none" stroke="#b84818" strokeWidth="3" opacity=".65" />
    <path d="m36 65 22-12 3 25Zm65-12 23 12-27 13ZM49 91l14 8 6-8 14 9 11-10 7 7 12-6c-6 27-56 32-64 0Z" fill="#241320" />
  </svg>
);

const Bat = ({ className }) => (
  <svg className={className} viewBox="0 0 140 70" aria-hidden="true" focusable="false">
    <path d="M70 24 61 11l-3 17C44 19 30 10 5 5c7 18 9 31 8 45 13-10 23-10 28 0 12-10 20-8 29 12 9-20 17-22 29-12 5-10 15-10 28 0-1-14 1-27 8-45-25 5-39 14-53 23l-3-17Z" fill="currentColor" />
  </svg>
);

const HalloweenArt = () => (
  <div className="halloween-scene" aria-hidden="true">
    <span className="halloween-moon" />
    <Bat className="halloween-bat halloween-bat--one" />
    <Bat className="halloween-bat halloween-bat--two" />
    <Bat className="halloween-bat halloween-bat--three" />
    <svg className="halloween-web" viewBox="0 0 200 200" fill="none" focusable="false">
      <path d="M0 0v195M0 0h195M0 0l138 138M0 0l75 181M0 0l181 75M0 45Q22 29 32 32Q38 17 45 0M0 90Q20 61 35 83Q42 56 64 64Q67 33 83 35Q74 14 90 0M0 135Q30 91 52 125Q63 82 95 95Q98 51 125 52Q111 21 135 0M0 180Q40 121 69 166Q84 109 127 127Q131 68 166 69Q148 28 180 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    <span className="halloween-edition">Halloween edition <span>October / 26</span></span>
  </div>
);

export default HalloweenArt;
