import React, { useEffect, useRef, useState } from 'react';

const addMediaListener = (query, handler) => {
  if (query.addEventListener) {
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }

  query.addListener(handler);
  return () => query.removeListener(handler);
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const sync = () => setEnabled(pointerQuery.matches && motionQuery.matches);
    const removePointerListener = addMediaListener(pointerQuery, sync);
    const removeMotionListener = addMediaListener(motionQuery, sync);

    sync();
    return () => {
      removePointerListener();
      removeMotionListener();
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    const position = { x: 0, y: 0, ringX: 0, ringY: 0 };
    let frame = null;
    let pointerActive = false;

    const tick = () => {
      frame = null;
      if (!pointerActive || document.hidden) return;

      position.ringX += (position.x - position.ringX) * 0.2;
      position.ringY += (position.y - position.ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${position.ringX}px, ${position.ringY}px, 0)`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (frame === null && !document.hidden) frame = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event) => {
      position.x = event.clientX;
      position.y = event.clientY;

      if (!pointerActive) {
        pointerActive = true;
        position.ringX = event.clientX;
        position.ringY = event.clientY;
        layerRef.current?.classList.add('cut-cursor--visible');
        document.body.classList.add('has-custom-cursor');
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      startLoop();
    };

    const handlePointerOver = (event) => {
      const interactive = event.target.closest('a, button, input, textarea, select, [role="button"]');
      const cursorLabel = interactive?.getAttribute('data-cursor-label') || '';

      layerRef.current?.classList.toggle('cut-cursor--hot', Boolean(interactive));
      layerRef.current?.classList.toggle('cut-cursor--labelled', Boolean(cursorLabel));
      if (labelRef.current) labelRef.current.textContent = cursorLabel;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      layerRef.current?.classList.remove('cut-cursor--visible', 'cut-cursor--hot', 'cut-cursor--labelled');
      document.body.classList.remove('has-custom-cursor');
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden && frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      } else if (pointerActive) {
        startLoop();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.body.classList.remove('has-custom-cursor');
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="cut-cursor" aria-hidden="true">
      <span ref={ringRef} className="cut-cursor__ring">
        <span ref={labelRef} className="cut-cursor__label" />
      </span>
      <span ref={dotRef} className="cut-cursor__dot" />
    </div>
  );
};

export default CustomCursor;
