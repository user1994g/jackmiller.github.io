import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { Blob, Scribble, Sprocket, Stamp, Viewfinder } from '../art/Marks';

gsap.registerPlugin(ScrollTrigger);

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-8deg); }
  50% { transform: translate3d(12px, -18px, 0) rotate(-2deg); }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: grid;
  align-items: end;
  padding: clamp(6.5rem, 14vw, 9rem) var(--gutter) clamp(2.5rem, 6vw, 4rem);
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  width: min(70vw, 520px);
  height: min(70vw, 520px);
  top: 8%;
  right: -8%;
  color: var(--signal);
  opacity: 0.22;
  animation: ${drift} 14s ease-in-out infinite;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const SprocketRail = styled.div`
  position: absolute;
  left: 0.2rem;
  top: 18%;
  height: 58%;
  color: rgba(243, 235, 221, 0.18);
  pointer-events: none;

  svg {
    height: 100%;
    width: auto;
  }

  @media (max-width: 40em) {
    display: none;
  }
`;

const Frame = styled.div`
  position: relative;
  z-index: 1;
  width: min(var(--content-max), 100%);
  margin: 0 auto;
`;

const Kicker = styled.p`
  margin: 0 0 1rem;
  color: var(--acid);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 14ch;
  font-size: clamp(3.1rem, 12vw, 8.2rem);
  font-weight: 800;
  letter-spacing: -0.07em;
  color: var(--paper);

  strong {
    display: block;
    margin-top: 0.2em;
    font-size: 0.52em;
    max-width: 16ch;
  }

  em {
    font-style: normal;
    color: var(--signal);
  }
`;

const Underline = styled.div`
  width: min(16rem, 70%);
  margin: 0.4rem 0 1.4rem;
  color: var(--acid);

  svg {
    width: 100%;
    height: auto;
  }
`;

const Dek = styled.p`
  max-width: 34ch;
  font-size: clamp(1.02rem, 2.4vw, 1.28rem);
  line-height: 1.55;
  color: rgba(243, 235, 221, 0.74);
  font-family: var(--font-serif);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.8rem;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  background: var(--acid);
  color: var(--ink);
  font-weight: 800;
  font-size: 0.88rem;
`;

const Ghost = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--paper);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
`;

const StampMark = styled.div`
  position: absolute;
  right: 4%;
  bottom: 12%;
  width: clamp(5.5rem, 12vw, 8rem);
  color: var(--acid);
  opacity: 0.85;
  transform: rotate(12deg);
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }

  @media (max-width: 40em) {
    display: none;
  }
`;

const Finder = styled.div`
  position: absolute;
  right: 8%;
  top: 22%;
  width: min(34vw, 280px);
  color: rgba(243, 235, 221, 0.22);
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }

  @media (max-width: 40em) {
    width: 42vw;
    top: 14%;
    opacity: 0.7;
  }
`;

const Home = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      gsap.from('.hero-copy > *', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="home" ref={sectionRef}>
      <Glow>
        <Blob />
      </Glow>
      <SprocketRail>
        <Sprocket />
      </SprocketRail>
      <Finder>
        <Viewfinder />
      </Finder>
      <StampMark>
        <Stamp />
      </StampMark>
      <Frame className="hero-copy">
        <Kicker>Creative reel · 2026</Kicker>
        <Title>
          Jack Miller Media
          <strong>
            Stories that <em>stick</em> to the frame.
          </strong>
        </Title>
        <Underline>
          <Scribble />
        </Underline>
        <Dek>Perspective-driven visual stories. Film, photography, and 3D — made to feel, not just look finished.</Dek>
        <Actions>
          <Primary to="/videos">Watch the work</Primary>
          <Ghost
            type="button"
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Skip to stills
          </Ghost>
        </Actions>
      </Frame>
    </Section>
  );
};

export default Home;
