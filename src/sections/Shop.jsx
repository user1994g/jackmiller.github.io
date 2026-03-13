import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

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

const Section = styled(motion.section)`
  width: min(1320px, 94vw);
  margin: var(--section-gap) auto;
  padding: clamp(1.4rem, 3vw, 2.4rem);

  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015)),
    rgba(10, 11, 15, 0.6);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: clamp(1.2rem, 2vw, 2rem);

  @media (max-width: 64em) {
    flex-direction: column;
    align-items: flex-start;
  }

  /* Split text words for animation */
  .title-word, .intro-line {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px) rotateX(-20deg);
    transform-origin: 0% 100%;
  }
`;

const Title = styled.h2`
  font-family: 'Kaushan Script';
  font-size: clamp(2.6rem, 7vw, 5.8rem);
  font-weight: 300;
  color: ${(props) => props.theme.text};
`;

const Intro = styled.p`
  width: min(56ch, 100%);
  font-size: clamp(0.88rem, 1.2vw, 1.03rem);
  line-height: 1.7;
  color: rgba(241, 241, 241, 0.82);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.2vw, 1rem);
  perspective: 1200px; /* enables 3D space for child cards */

  @media (max-width: 80em) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 64em) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 48em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  
  /* Initial state for 3D animation */
  opacity: 0;
  transform: translateY(120px) translateZ(-150px) rotateX(-25deg) rotateY(10deg) scale(0.85);
  transform-style: preserve-3d;
  will-change: transform, opacity;
`;

const ImageButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: zoom-in;

  figure {
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: -2px;
  }
`;

const Meta = styled.div`
  padding: 0.8rem 0.8rem 0.9rem;

  h2 {
    font-size: clamp(0.8rem, 1vw, 0.92rem);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.9);
  }

  p {
    margin-top: 0.3rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.62);
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
  
  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;

  useEffect(() => {
    const scrollerElement = scroll?.el || null;

    const ctx = gsap.context(() => {
      /* Title Animation */
      gsap.to('.title-word', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.shop-header',
          ...(scrollerElement && { scroller: scrollerElement }),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* Intro Text Animation */
      gsap.to('.intro-line', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.shop-header',
          ...(scrollerElement && { scroller: scrollerElement }),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* 3D Cards Stagger */
      gsap.to('.photo-item', {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.photo-grid',
          ...(scrollerElement && { scroller: scrollerElement }),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scroll]);

  return (
    <Section id="shop" ref={sectionRef}>
      <Header className="shop-header">
        <Title data-scroll data-scroll-speed="-1">
          {'Visual Narratives'.split(' ').map((word, i) => (
            <span className="title-word" key={i}>
              {word}&nbsp;
            </span>
          ))}
        </Title>
        <Intro>
          <span className="intro-line">A selection from my latest portfolio development cycle. </span>
          <span className="intro-line">Each frame is designed for impact on large displays </span>
          <span className="intro-line">while preserving detail and rhythm on smaller screens.</span>
        </Intro>
      </Header>

      <Grid className="photo-grid">
        {photos.map((photo) => (
          <Card key={photo.title} className="photo-item" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <ImageButton
              type="button"
              aria-label={`Open ${photo.title}`}
              onClick={() => setActiveImage({ src: photo.img, alt: photo.title })}
            >
              <figure>
                <img
                  width="800"
                  height="1000"
                  src={photo.img}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <Meta>
                <h2>{photo.title}</h2>
                <p>{photo.note}</p>
              </Meta>
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
