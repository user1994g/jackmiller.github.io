import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  width: min(var(--content-max), 100%);
  margin: 0 auto var(--section-gap);
  padding: 0 var(--gutter);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;

  @media (min-width: 52em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.article`
  padding: 1.15rem 1rem 1.05rem;
  border-radius: 1.2rem;
  border: 1px solid var(--line);
  background: rgba(243, 235, 221, 0.04);

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.06em;
    color: var(--acid);
    line-height: 0.9;
  }

  span {
    display: block;
    margin-top: 0.55rem;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(243, 235, 221, 0.62);
  }
`;

const stats = [
  { value: 12, label: 'Selected titles' },
  { value: 10, label: 'Still studies' },
  { value: 4, label: 'Write ups' },
  { value: 2026, label: 'Current reel' },
];

const Stats = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      root.querySelectorAll('[data-count]').forEach((node) => {
        const end = Number(node.dataset.count);
        const obj = { val: reduced ? end : 0 };
        gsap.to(obj, {
          val: end,
          duration: reduced ? 0.01 : 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: node, start: 'top 88%' },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} aria-label="Portfolio snapshot">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <strong data-count={stat.value}>0</strong>
          <span>{stat.label}</span>
        </Card>
      ))}
    </Section>
  );
};

export default Stats;
