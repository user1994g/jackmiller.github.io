import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import heroMain from '../assets/ArchivePhotos/fenced-trail.jpg';
import heroMini from '../assets/ArchivePhotos/swan-reflection.jpg';
import { CutArrow } from '../art/Marks';
import useStudioMotion from '../hooks/useStudioMotion';

const Home = () => {
  const sectionRef = useRef(null);
  useStudioMotion(sectionRef, { hero: true });

  return (
    <section className="cut-hero" id="home" ref={sectionRef} aria-labelledby="home-title">
      <div className="studio-wrap cut-hero__layout">
        <div className="cut-hero__copy">
          <div className="cut-hero__eyebrow" data-hero>
            <span className="tape-label">Creative reel · 2026</span>
            <p>Film / Stills / 3D</p>
          </div>
          <div aria-hidden="true" style={{ overflow: 'hidden' }}>
            <p className="cut-hero__title" data-hero>
              <span>Jack</span>
              <span>Miller</span>
              <span>Media</span>
            </p>
          </div>
          <h1 className="cut-hero__tagline" id="home-title" data-hero>
            Stories that <strong>stick</strong> to the frame.
          </h1>
          <p className="cut-hero__intro" data-hero>
            Perspective-driven visual stories. Film, photography, and 3D — made to feel, not just look finished.
          </p>
          <div className="cut-hero__actions" data-hero>
            <Link className="studio-link-button" to="/fmp-level-2">Watch a film <span aria-hidden="true">↗</span></Link>
            <Link className="studio-link-button studio-button--ghost" to="/photos">Skip to stills <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <div className="cut-hero__art" data-hero aria-label="Selected portfolio frames">
          <figure className="cut-hero__photo cut-hero__photo--main">
            <img
              src={heroMain}
              alt="Grass trail crossing a bright meadow beneath a tall tree"
              width="900"
              height="1600"
              decoding="async"
              fetchpriority="high"
            />
          </figure>
          <figure className="cut-hero__photo cut-hero__photo--mini">
            <img
              src={heroMini}
              alt="White swan gliding past waterside branches and reflected reeds"
              width="1600"
              height="900"
              decoding="async"
            />
          </figure>
          <CutArrow className="cut-hero__arrow" />
          <span className="cut-hero__timecode" aria-hidden="true">TC 00:26:14:08</span>
        </div>
      </div>
      <span className="cut-hero__scroll" aria-hidden="true">Keep rolling</span>
    </section>
  );
};

export default Home;
