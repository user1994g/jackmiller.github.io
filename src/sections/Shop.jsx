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

const GalleryShell = styled.div`
  position: relative;
  margin-top: clamp(2rem, 4vw, 3.5rem);
`;

const GalleryViewport = styled.div`
  position: relative;
  height: min(78vh, 720px);
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 0;
  border: 1px solid transparent;
  background: transparent;
  perspective: 1400px;

  @media (max-width: 64em) {
    height: auto;
    min-height: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding: 1.2rem;
    border-radius: 0;
    border: none;
    background: transparent;
  }
`;

const GalleryTrack = styled.div`
  display: flex;
  gap: clamp(1rem, 2vw, 2.2rem);
  padding: 0 clamp(1.2rem, 4vw, 3rem);
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  will-change: transform;
  position: relative;
  height: 100%;

  @media (max-width: 64em) {
    height: auto;
    padding: 1.2rem;
  }
`;

const Card = styled(motion.article)`
  flex: 0 0 clamp(220px, 24vw, 320px);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);

  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  scroll-snap-align: center;

  ${Section}.is-3d & {
    position: absolute;
    top: 50%;
    left: 50%;
    width: clamp(90px, 8vw, 130px);
    height: clamp(90px, 8vw, 130px);
    border-radius: 12px;
    background: transparent;
    border: none;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.45);
    transform: translate(-50%, -50%);
    opacity: 0;
    transform-style: preserve-3d;
    will-change: transform, opacity;
  }

  &:hover {
    border-color: rgba(240, 216, 173, 0.35);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
  }
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

  ${Section}.is-3d & {
    cursor: pointer;

    figure {
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
    }

    img {
      border-radius: 12px;
    }
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

  ${Section}.is-3d & {
    display: none;
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
  const shellRef = useRef(null);
  const trackRef = useRef(null);
  const stripItems = Array.from({ length: 72 }, (_, index) => photos[index % photos.length]);
  
  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const shellElement = shellRef.current;
    const trackElement = trackRef.current;
    const tiles = trackElement ? gsap.utils.toArray('.photo-item', trackElement) : [];
    const scrollerElement = scroll?.el || null;

    const ctx = gsap.context(() => {
      if (!sectionElement || !shellElement || !trackElement || !tiles.length) {
        return;
      }

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

      const isDesktop = window.matchMedia('(min-width: 900px)').matches;
      if (!isDesktop) {
        sectionElement.classList.remove('is-3d');
        ScrollTrigger.getById('shop-helix')?.kill();
        gsap.set(trackElement, { clearProps: 'all' });
        gsap.set(tiles, { clearProps: 'all' });
        return;
      }

      sectionElement.classList.add('is-3d');

      const radius = 200;
      const ySpacing = 20;
      const angleStep = 36;
      const turns = Math.max(1, Math.round(tiles.length / 12));

      tiles.forEach((tile, index) => {
        const y = (index - (tiles.length - 1) / 2) * ySpacing;
        const angle = index * angleStep;
        gsap.set(tile, {
          y,
          rotationY: angle,
          rotationZ: 2,
          opacity: 0.15,
          transformOrigin: `50% 50% -${radius}px`,
        });
      });

      const updateOpacity = (rotation) => {
        tiles.forEach((tile, index) => {
          const angle = index * angleStep + rotation;
          const normalized = ((angle % 360) + 360) % 360;
          const fade = Math.max(0.12, Math.abs(180 - normalized) / 180);
          gsap.set(tile, { opacity: fade });
        });
      };

      let scrollTween;
      const setupStrip = () => {
        ScrollTrigger.getById('shop-helix')?.kill();
        if (scrollTween) {
          scrollTween.kill();
          scrollTween = null;
        }

        const scrollDistance = tiles.length * 120;
        scrollTween = gsap.to(trackElement, {
          rotationY: -360 * turns,
          ease: 'none',
          scrollTrigger: {
            id: 'shop-helix',
            trigger: shellElement,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            ...(scrollerElement && { scroller: scrollerElement }),
            onUpdate: (self) => {
              const rotation = -360 * turns * self.progress;
              updateOpacity(rotation);
            },
          },
        });
      };

      setupStrip();
      updateOpacity(0);
      ScrollTrigger.addEventListener('refreshInit', setupStrip);
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', setupStrip);
      };
    }, sectionRef);

    return () => {
      sectionElement?.classList.remove('is-3d');
      ctx.revert();
    };
  }, [scroll?.el, stripItems.length]);

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

      <GalleryShell ref={shellRef}>
        <GalleryViewport>
          <GalleryTrack ref={trackRef} className="photo-track">
            {stripItems.map((photo, index) => (
              <Card key={`${photo.title}-${index}`} className="photo-item">
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
          </GalleryTrack>
        </GalleryViewport>
      </GalleryShell>

      <AnimatePresence>
        {activeImage && <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />}
      </AnimatePresence>
    </Section>
  );
};

export default Shop;
