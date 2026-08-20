import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const run = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Section = styled.section`
  margin: 0 0 var(--section-gap);
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--ink-2);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: 1.4rem;
  padding: 1.1rem 0;
  animation: ${run} 28s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Item = styled.span`
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4.8vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ $tone }) => ($tone === 'acid' ? 'var(--acid)' : $tone === 'signal' ? 'var(--signal)' : 'var(--paper)')};
  white-space: nowrap;
`;

const lines = [
  'Built for dramatic visual impact.',
  'Designed to read cleanly on wide monitors.',
  'Optimized spacing, rhythm, and mobile flow.',
];

const Marquee = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(root, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        scrollTrigger: { trigger: root, start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const items = [...lines, ...lines, ...lines, ...lines];

  return (
    <Section ref={sectionRef} id="direction" aria-label="Studio notes">
      <Track>
        {items.map((text, index) => (
          <Item key={`${text}-${index}`} $tone={index % 3 === 0 ? 'acid' : index % 3 === 1 ? 'signal' : 'paper'}>
            {text}
            <span aria-hidden="true"> · </span>
          </Item>
        ))}
      </Track>
    </Section>
  );
};

export default Marquee;
