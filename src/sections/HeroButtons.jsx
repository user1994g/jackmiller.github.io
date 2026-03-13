import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled, { keyframes } from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

/* ── keyframes ── */
const borderGlow = keyframes`
  0%, 100% { border-color: rgba(240, 216, 173, 0.18); }
  50% { border-color: rgba(240, 216, 173, 0.38); }
`;

const floatIcon = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.08); }
`;

/* ── styled components ── */
const Section = styled.section`
  width: min(1280px, 92vw);
  margin: clamp(2rem, 4vw, 5rem) auto clamp(3rem, 6vw, 6rem);
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Kaushan Script';
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.93);
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  overflow: hidden;

  .title-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
  }
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 52ch;
  margin: 0 auto clamp(2rem, 4vw, 3.5rem);
  font-size: clamp(0.85rem, 1.15vw, 1.05rem);
  line-height: 1.7;
  color: rgba(200, 206, 215, 0.8);
  opacity: 0;
  transform: translateY(20px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 1.6vw, 1.5rem);

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.button`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  background:
    linear-gradient(165deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 100%),
    rgba(14, 15, 20, 0.7);
  backdrop-filter: blur(14px) saturate(1.1);
  padding: clamp(1.6rem, 2.5vw, 2.4rem);
  text-align: left;
  cursor: pointer;
  color: inherit;

  opacity: 0;
  transform: translateY(50px) scale(0.88) rotate(1.5deg);

  will-change: transform, opacity;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.35s ease;

  /* inner highlight */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle at 30% -20%, rgba(240, 216, 173, 0.08), transparent 60%);
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  /* bottom glow line */
  &::after {
    content: '';
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(240, 216, 173, 0.7), transparent);
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    border-color: rgba(240, 216, 173, 0.4);
    box-shadow:
      0 22px 56px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(240, 216, 173, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-8px) scale(1.03) rotate(0deg);
    background:
      linear-gradient(165deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(18, 19, 26, 0.8);

    &::before {
      opacity: 1;
    }

    &::after {
      transform: scaleX(1);
    }

    .card-icon {
      animation: ${floatIcon} 1.4s ease-in-out infinite;
    }

    .card-arrow {
      transform: translateX(6px);
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.7);
    outline-offset: 3px;
    animation: ${borderGlow} 1.5s ease-in-out infinite;
  }
`;

const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(240, 216, 173, 0.14) 0%, rgba(240, 216, 173, 0.04) 100%);
  border: 1px solid rgba(240, 216, 173, 0.2);
  font-size: 1.35rem;
  margin-bottom: 1.2rem;
  transition: transform 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.55rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const CardArrow = styled.span`
  font-size: 0.85rem;
  opacity: 0;
  transform: translateX(0);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  color: rgba(240, 216, 173, 0.85);
`;

const CardDescription = styled.p`
  font-size: clamp(0.78rem, 1vw, 0.88rem);
  line-height: 1.65;
  color: rgba(200, 206, 215, 0.72);
  margin: 0;
`;

/* ── card data ── */
const cards = [
  {
    icon: '🎬',
    title: 'Films & Videos',
    description: 'Cinematic projects, short films, and visual storytelling sequences.',
    action: { type: 'route', path: '/videos' },
  },
  {
    icon: '📷',
    title: 'Photo Gallery',
    description: 'Curated photography exploring light, shadow, and mood.',
    action: { type: 'scroll', target: '#shop' },
  },
  {
    icon: '🎨',
    title: '3D Art',
    description: 'Digital sculpts and renders blending realism with creative vision.',
    action: { type: 'route', path: '/3d-art' },
  },
  {
    icon: '👤',
    title: 'About Me',
    description: 'Background, creative philosophy, and the story behind the portfolio.',
    action: { type: 'scroll', target: '#about' },
  },
];

const HeroButtons = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const navigate = useNavigate();

  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;

  const handleCardClick = (action) => {
    if (action.type === 'route') {
      navigate(action.path);
      return;
    }

    const element = document.querySelector(action.target);
    if (!element) return;

    if (scroll) {
      scroll.scrollTo(element, {
        offset: -88,
        duration: 1100,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    if (!sectionElement || !titleElement) return undefined;

    const scrollerElement = scroll?.el || null;

    const ctx = gsap.context(() => {
      /* title split-word reveal */
      const words = titleElement.querySelectorAll('.title-word');
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleElement,
          ...(scrollerElement && { scroller: scrollerElement }),
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      /* subtitle fade in */
      if (subtitleElement) {
        gsap.to(subtitleElement, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleElement,
            ...(scrollerElement && { scroller: scrollerElement }),
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* cards stagger entrance */
      gsap.to('.hero-btn-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero-btn-grid',
          ...(scrollerElement && { scroller: scrollerElement }),
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionElement);

    return () => ctx.revert();
  }, [scroll?.el]);

  return (
    <Section ref={sectionRef} id="explore">
      <SectionTitle ref={titleRef}>
        {'Explore My Work'.split(' ').map((word, i) => (
          <span className="title-word" key={i}>
            {word}
            {i < 2 ? '\u00A0' : ''}
          </span>
        ))}
      </SectionTitle>

      <Subtitle ref={subtitleRef}>
        Dive into films, photography, 3D art, and more. Each section showcases a different
        facet of my creative process.
      </Subtitle>

      <Grid className="hero-btn-grid">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="hero-btn-card"
            type="button"
            onClick={() => handleCardClick(card.action)}
            aria-label={`Go to ${card.title}`}
          >
            <CardIcon className="card-icon">{card.icon}</CardIcon>
            <CardTitle>
              {card.title}
              <CardArrow className="card-arrow">→</CardArrow>
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default HeroButtons;
