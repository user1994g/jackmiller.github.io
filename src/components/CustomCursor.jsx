import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 250;

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const Dot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 50%;
  background: var(--acid);
  will-change: transform;
`;

const RingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
`;

const Ring = styled.div`
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border-radius: 50%;
  border: 1.5px solid var(--signal);
  transform: scale(${({ $hot }) => ($hot ? 1.45 : 1)});
  transition: transform 0.18s ease;
`;

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const sync = () => setEnabled(hover.matches && motion.matches);
    sync();
    hover.addEventListener('change', sync);
    motion.addEventListener('change', sync);
    return () => {
      hover.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');
    let frame;

    const move = (event) => {
      pos.current = { x: event.clientX, y: event.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const tick = () => {
      if (ring.current) {
        const x = Number.parseFloat(ring.current.dataset.x || '0');
        const y = Number.parseFloat(ring.current.dataset.y || '0');
        const nx = x + (pos.current.x - x) * 0.22;
        const ny = y + (pos.current.y - y) * 0.22;
        ring.current.dataset.x = String(nx);
        ring.current.dataset.y = String(ny);
        ring.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const onOver = (event) => {
      const node = event.target.closest('a, button, input, [role="button"]');
      setHot(Boolean(node));
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', onOver);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Layer aria-hidden="true">
      <RingWrap ref={ring}>
        <Ring $hot={hot} />
      </RingWrap>
      <Dot ref={dot} />
    </Layer>
  );
};

export default CustomCursor;
