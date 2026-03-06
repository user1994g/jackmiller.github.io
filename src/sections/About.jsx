import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

import img1 from '../assets/Images/1.webp';
import ImageLightbox from '../components/ImageLightbox';

const Section = styled.section`
  width: min(var(--content-max), 92vw);
  margin: var(--section-gap) auto;
  padding-top: clamp(2rem, 4vw, 4rem);
  position: relative;

  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1.5rem, 4vw, 3.25rem);

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    width: min(680px, 92vw);
  }
`;

const Title = styled.h2`
  position: absolute;
  top: -0.7rem;
  left: 0;
  z-index: 4;

  font-family: 'Kaushan Script';
  font-size: clamp(2.6rem, 7vw, 5.5rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.93);

  @media (max-width: 64em) {
    position: relative;
    top: 0;
    margin-bottom: 0.5rem;
  }
`;

const Copy = styled.div`
  margin-top: clamp(4rem, 8vw, 6rem);
  padding: clamp(1.25rem, 2.6vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  background: rgba(18, 20, 26, 0.72);
  backdrop-filter: blur(8px);

  p {
    font-size: clamp(0.88rem, 1.25vw, 1.08rem);
    line-height: 1.75;
    color: rgba(240, 242, 245, 0.85);
  }

  p + p {
    margin-top: 1rem;
  }

  @media (max-width: 64em) {
    margin-top: 0;
  }
`;

const GalleryWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: clamp(2.5rem, 6vw, 4.25rem);

  @media (max-width: 64em) {
    margin-top: 0;
  }
`;

const PortraitButton = styled.button`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.03);
  padding: 0;

  img {
    width: 100%;
    height: clamp(340px, 58vh, 620px);
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
`;

const aboutPhoto = { src: img1, alt: 'Portrait of Jack Miller' };

const About = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <Section id="about" className="about">
      <Title>about me</Title>

      <Copy>
        <p>
          I build visual stories through film and photography, focusing on mood, tension, and
          cinematic composition. My process starts with atmosphere: controlled light, shadow, and
          framing that guide emotion before dialogue begins.
        </p>
        <p>
          Every project in this portfolio, from concept to final edit, has been produced by me. I
          blend camera technique, colour grading, and sound-led pacing to create work that feels
          immersive and intentional on both still and moving formats.
        </p>
        <p>
          This collection reflects my development as a creative media student and my goal to produce
          distinctive visuals that stay memorable across screens of every size.
        </p>
      </Copy>

      <GalleryWrap>
        <PortraitButton
          type="button"
          aria-label={`Open ${aboutPhoto.alt}`}
          onClick={() => setActiveImage({ src: aboutPhoto.src, alt: aboutPhoto.alt })}
        >
          <img
            src={aboutPhoto.src}
            alt={aboutPhoto.alt}
            loading="lazy"
            decoding="async"
            width="1200"
            height="900"
            sizes="(max-width: 64em) 92vw, 45vw"
          />
        </PortraitButton>
      </GalleryWrap>

      <AnimatePresence>
        {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
      </AnimatePresence>
    </Section>
  );
};

export default About;
