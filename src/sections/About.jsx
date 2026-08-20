import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import pfp from '../assets/Images/pfp.webp';
import { Scribble } from '../art/Marks';
import ImageLightbox from '../components/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: min(var(--content-max), 100%);
  margin: 0 auto var(--section-gap);
  padding: 0 var(--gutter);
  display: grid;
  gap: clamp(1.4rem, 4vw, 2.5rem);

  @media (min-width: 64em) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
`;

const Title = styled.h2`
  font-size: clamp(2.6rem, 9vw, 5.6rem);
  color: var(--paper);
`;

const Intro = styled.p`
  max-width: 44rem;
  margin-top: 0.85rem;
  font-size: clamp(0.98rem, 1.6vw, 1.12rem);
  line-height: 1.7;
`;

const Mark = styled.div`
  width: min(12rem, 50%);
  margin-top: 0.4rem;
  color: var(--signal);

  svg {
    width: 100%;
    height: auto;
  }
`;

const Copy = styled.div`
  padding: clamp(1.2rem, 3vw, 1.8rem);
  border: 1px dashed rgba(243, 235, 221, 0.28);
  border-radius: 1.6rem;
  background: rgba(18, 16, 23, 0.7);

  p {
    font-size: clamp(0.92rem, 1.3vw, 1.05rem);
    line-height: 1.78;
  }

  p + p {
    margin-top: 1rem;
  }
`;

const PortraitButton = styled.button`
  width: 100%;
  overflow: hidden;
  border-radius: 1.6rem 0.4rem 1.8rem 0.7rem;
  border: 1px solid var(--line);
  cursor: zoom-in;
  padding: 0;
  background: #111;

  img {
    width: 100%;
    height: clamp(340px, 58vh, 620px);
    object-fit: cover;
    filter: contrast(1.05) saturate(0.92);
  }

  &:focus-visible {
    outline: 2px solid var(--acid);
    outline-offset: 3px;
  }
`;

const aboutPhoto = {
  src: pfp,
  alt: 'Portrait of Jack Miller',
};

const About = () => {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(root.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="about" className="about" ref={sectionRef}>
      <Header>
        <Title>about me</Title>
        <Mark>
          <Scribble />
        </Mark>
        <Intro>
          Build visual stories through film and photography, with mood, tension, and cinematic
          composition leading the frame.
        </Intro>
      </Header>

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
          This creative portfolio reflects my development as a creative media student and my goal to
          produce distinctive visuals that stay memorable across screens of every size.
        </p>
      </Copy>

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

      <AnimatePresence>
        {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
      </AnimatePresence>
    </Section>
  );
};

export default About;
