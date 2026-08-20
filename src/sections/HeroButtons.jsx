import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CameraGlyph, CubeGlyph, PersonGlyph, ReelGlyph } from '../art/Marks';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: min(var(--content-max), 100%);
  margin: 0 auto;
  padding: 0 var(--gutter) var(--section-gap);
`;

const Head = styled.div`
  display: grid;
  gap: 0.8rem;
  margin-bottom: clamp(1.6rem, 4vw, 2.6rem);
`;

const Title = styled.h2`
  font-size: clamp(2.4rem, 8vw, 5.2rem);
  color: var(--paper);
`;

const Subtitle = styled.p`
  max-width: 42ch;
  font-size: clamp(0.95rem, 1.6vw, 1.08rem);
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;

  @media (min-width: 40em) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 70em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.button`
  position: relative;
  overflow: hidden;
  min-height: 14.5rem;
  padding: 1.3rem 1.2rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: 1.5rem;
  background: linear-gradient(165deg, rgba(243, 235, 221, 0.06), rgba(8, 7, 10, 0.2));
  text-align: left;
  cursor: pointer;
  color: inherit;

  &:nth-child(2) {
    background: var(--signal);
  }

  &:nth-child(2) h3,
  &:nth-child(2) p,
  &:nth-child(2) svg {
    color: var(--paper);
  }

  &:nth-child(3) {
    background: var(--acid);
  }

  &:nth-child(3) h3,
  &:nth-child(3) p,
  &:nth-child(3) svg {
    color: var(--ink);
  }

  &:hover {
    transform: translateY(-4px) rotate(-0.4deg);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

const Icon = styled.span`
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  margin-bottom: 2.2rem;
  color: var(--acid);

  svg {
    width: 1.7rem;
    height: 1.7rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  margin-bottom: 0.45rem;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.55;
  color: inherit;
  opacity: 0.78;
`;

const cards = [
  {
    icon: ReelGlyph,
    title: 'Films & Videos',
    description: 'Cinematic projects, short films, and visual storytelling sequences.',
    action: { type: 'route', path: '/videos' },
  },
  {
    icon: CameraGlyph,
    title: 'Photo Gallery',
    description: 'Curated photography exploring light, shadow, and mood.',
    action: { type: 'scroll', target: '#shop' },
  },
  {
    icon: CubeGlyph,
    title: '3D Art',
    description: 'Digital sculpts and renders blending realism with creative vision.',
    action: { type: 'route', path: '/3d-art' },
  },
  {
    icon: PersonGlyph,
    title: 'About Me',
    description: 'Background, creative philosophy, and the story behind the portfolio.',
    action: { type: 'scroll', target: '#about' },
  },
];

const HeroButtons = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const handleCardClick = (action) => {
    if (action.type === 'route') {
      navigate(action.path);
      return;
    }
    document.querySelector(action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.explore-card', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 82%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="explore">
      <Head>
        <Title>Explore the work</Title>
        <Subtitle>
          Dive into films, photography, 3D art, and more. Each section showcases a different facet of
          my creative process.
        </Subtitle>
      </Head>
      <Grid>
        {cards.map((card) => {
          const IconMark = card.icon;
          return (
            <Card
              key={card.title}
              className="explore-card"
              type="button"
              onClick={() => handleCardClick(card.action)}
              aria-label={`Go to ${card.title}`}
            >
              <Icon>
                <IconMark />
              </Icon>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};

export default HeroButtons;
