import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ImageLightbox from '../components/ImageLightbox';
import img1 from '../assets/Images/1.webp';
import img2 from '../assets/Images/2.webp';
import img3 from '../assets/Images/3.webp';
import img4 from '../assets/Images/4.webp';
import img5 from '../assets/Images/5.webp';
import img6 from '../assets/Images/6.webp';
import img7 from '../assets/Images/7.webp';
import img8 from '../assets/Images/8.webp';
import img9 from '../assets/Images/9.webp';
import img10 from '../assets/Images/10.webp';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: min(var(--content-max), 100%);
  margin: 0 auto var(--section-gap);
  padding: 0 var(--gutter);
`;

const Header = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: clamp(1.4rem, 4vw, 2.4rem);
`;

const Title = styled.h2`
  font-size: clamp(2.4rem, 8vw, 5.4rem);
  color: var(--paper);
`;

const Intro = styled.p`
  max-width: 48ch;
  font-size: clamp(0.92rem, 1.4vw, 1.05rem);
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;

  @media (min-width: 52em) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 12rem;
  }
`;

const Card = styled.article`
  overflow: hidden;
  border-radius: 1.1rem;
  border: 1px solid var(--line);
  background: #111;

  &:nth-child(1),
  &:nth-child(6) {
    @media (min-width: 52em) {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  &:nth-child(3) {
    @media (min-width: 52em) {
      grid-row: span 2;
    }
  }
`;

const ImageButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: zoom-in;
  text-align: left;

  figure {
    margin: 0;
    height: 100%;
    min-height: 11rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  figcaption {
    position: absolute;
    left: 0.7rem;
    bottom: 0.65rem;
    color: var(--paper);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-shadow: 0 8px 18px rgba(0, 0, 0, 0.6);
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid var(--acid);
    outline-offset: -2px;
  }
`;

const photos = [
  { img: img1, title: 'Noir Portrait I', note: 'shadow studies' },
  { img: img2, title: 'Noir Portrait II', note: 'directional light' },
  { img: img3, title: 'Studio Drama', note: 'controlled contrast' },
  { img: img4, title: 'Editorial Frame', note: 'texture and form' },
  { img: img5, title: 'Street Silence', note: 'urban mood' },
  { img: img6, title: 'Blue Hour', note: 'cool-toned sequence' },
  { img: img7, title: 'Monochrome Cut', note: 'high depth grading' },
  { img: img8, title: 'Glass & Grain', note: 'cinematic detail' },
  { img: img9, title: 'Golden Accent', note: 'warm contrast' },
  { img: img10, title: 'Final Composition', note: 'portfolio feature' },
];

const Shop = () => {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.photo-item', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="shop" ref={sectionRef}>
      <Header>
        <Title>Visual Narratives</Title>
        <Intro>
          A selection from my latest portfolio development cycle. Each frame is designed for impact
          on large displays while preserving detail and rhythm on smaller screens.
        </Intro>
      </Header>

      <Grid>
        {photos.map((photo) => (
          <Card key={photo.title} className="photo-item">
            <ImageButton
              type="button"
              aria-label={`Open ${photo.title}`}
              onClick={() => setActiveImage({ src: photo.img, alt: photo.title })}
            >
              <figure style={{ position: 'relative' }}>
                <img
                  width="800"
                  height="1000"
                  src={photo.img}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  {photo.title} · {photo.note}
                </figcaption>
              </figure>
            </ImageButton>
          </Card>
        ))}
      </Grid>

      <AnimatePresence>
        {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
      </AnimatePresence>
    </Section>
  );
};

export default Shop;
