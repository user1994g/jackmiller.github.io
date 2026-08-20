import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import useStudioMotion from '../hooks/useStudioMotion';

const paths = [
  ['01', 'Films & Videos', 'Cinematic projects, short films, and visual storytelling sequences.', '/videos'],
  ['02', 'Photo Gallery', 'Curated photography exploring light, shadow, character, and mood.', '/photos'],
  ['03', '3D Art', 'A digital workspace for renders, objects, and new experiments.', '/3d-art'],
  ['04', 'About Me', 'Background, creative philosophy, and the story behind the portfolio.', '/about'],
];

const HeroButtons = () => {
  const sectionRef = useRef(null);
  useStudioMotion(sectionRef);

  return (
    <section className="work-index" id="explore" ref={sectionRef} aria-labelledby="explore-title">
      <div className="studio-wrap">
        <header className="work-index__head" data-reveal>
          <div>
            <span className="tape-label">Pick a scene</span>
            <h2 className="work-index__title" id="explore-title">Explore the work</h2>
          </div>
          <p className="studio-copy">Four ways into the same visual world—moving image, stills, new dimensions, and the thinking behind it.</p>
        </header>
        <nav className="work-index__list" aria-label="Explore the portfolio" data-stagger>
          {paths.map(([number, title, description, path]) => (
            <Link className="work-row" to={path} key={path}>
              <span className="work-row__number">{number}</span>
              <h3 className="work-row__title">{title}</h3>
              <p className="work-row__description">{description}</p>
              <span className="work-row__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default HeroButtons;
