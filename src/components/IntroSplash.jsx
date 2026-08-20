import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 400;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: var(--paper);
  pointer-events: ${({ $gone }) => ($gone ? 'none' : 'auto')};
  opacity: ${({ $gone }) => ($gone ? 0 : 1)};
  transition: opacity 0.55s ease;
`;

const Stage = styled.div`
  display: grid;
  justify-items: center;
  gap: 1.1rem;
  text-align: center;
  padding: 1.5rem;
`;

const Count = styled.p`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, 18vw, 10rem);
  font-weight: 800;
  letter-spacing: -0.08em;
  line-height: 0.8;
  color: var(--signal);
`;

const Label = styled.p`
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--acid);
`;

const IntroSplash = () => {
  const [count, setCount] = useState(3);
  const [gone, setGone] = useState(false);
  const [mounted, setMounted] = useState(true);
  const shown = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMounted(false);
      return undefined;
    }
    if (sessionStorage.getItem('jm-intro') === '1') {
      setMounted(false);
      return undefined;
    }
    if (shown.current) return undefined;
    shown.current = true;

    const ticks = [3, 2, 1];
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      if (i >= ticks.length) {
        window.clearInterval(timer);
        setGone(true);
        sessionStorage.setItem('jm-intro', '1');
        window.setTimeout(() => setMounted(false), 600);
        return;
      }
      setCount(ticks[i]);
    }, 420);

    return () => window.clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <Overlay $gone={gone} aria-hidden="true">
      <Stage>
        <Count>{count}</Count>
        <Label>Picture start</Label>
      </Stage>
    </Overlay>
  );
};

export default IntroSplash;
