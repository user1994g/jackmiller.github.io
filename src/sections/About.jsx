import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import pfp from '../assets/Images/pfp-display.jpg';
import ImageLightbox from '../components/ImageLightbox';
import useStudioMotion from '../hooks/useStudioMotion';

const About = () => {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);
  useStudioMotion(sectionRef);

  return (
    <section className="about-scene" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="studio-wrap about-scene__layout">
        <figure className="about-scene__portrait" data-reveal>
          <span className="about-scene__tape" aria-hidden="true" />
          <button type="button" aria-label="Open portrait of Jack Miller" onClick={() => setActiveImage({ src: pfp, alt: 'Portrait of Jack Miller' })}>
            <img src={pfp} alt="Portrait of Jack Miller" width="1600" height="1064" loading="lazy" decoding="async" />
          </button>
          <figcaption><span>Jack Miller</span><span>Contact print 01</span></figcaption>
        </figure>
        <div className="about-scene__copy" data-reveal>
          <span className="tape-label">Behind the frame</span>
          <h2 id="about-title">Made by <em>Jack.</em></h2>
          <p className="about-scene__lead">Mood, tension, and cinematic composition lead every frame.</p>
          <div className="about-scene__body">
            <p>I build visual stories through film and photography, focusing on controlled light, shadow, and framing that guide emotion before dialogue begins.</p>
            <p>Every project here—from concept to final edit—has been produced by me. I blend camera technique, colour grading, and sound-led pacing to make each piece immersive and intentional.</p>
            <p>This portfolio reflects my development as a creative media student and my goal to make distinctive visuals that stay memorable across screens of every size.</p>
          </div>
          <Link className="studio-link-button studio-button--paper" to="/about">Read the full story <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      {activeImage ? <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} /> : null}
    </section>
  );
};

export default About;
