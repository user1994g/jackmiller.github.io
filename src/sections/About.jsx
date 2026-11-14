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
          <p className="about-scene__lead">I&apos;m a creative media student working in film and photography.</p>
          <div className="about-scene__body">
            <p>This site brings together my short films, photographs and notes on how I made them.</p>
            <p>There are finished projects here, as well as things I&apos;m still working on. The write ups cover the choices I made along the way.</p>
          </div>
          <Link className="studio-link-button studio-button--paper" to="/about">Read the full story <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      {activeImage ? <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} /> : null}
    </section>
  );
};

export default About;
