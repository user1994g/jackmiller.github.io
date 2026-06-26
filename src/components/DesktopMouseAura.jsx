import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 115;

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const SmokeCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.78;
  filter: saturate(1.08);
`;

const MAX_PARTICLES = 280;

const createParticle = (x, y, dx, dy) => {
  const speedScale = 0.016;
  const spread = 0.85;

  return {
    x,
    y,
    vx: dx * speedScale + (Math.random() - 0.5) * spread,
    vy: dy * speedScale + (Math.random() - 0.5) * spread - Math.random() * 0.3,
    ttl: 42 + Math.random() * 56,
    life: 0,
    size: 26 + Math.random() * 54,
    drift: (Math.random() - 0.5) * 0.09,
    alpha: 0.2 + Math.random() * 0.18,
  };
};

const DesktopMouseAura = () => {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

    const syncEnabled = () => {
      setEnabled(hoverQuery.matches && motionQuery.matches);
    };

    syncEnabled();

    const add = (mq, cb) => {
      if (mq.addEventListener) {
        mq.addEventListener('change', cb);
        return () => mq.removeEventListener('change', cb);
      }

      mq.addListener(cb);
      return () => mq.removeListener(cb);
    };

    const removeHover = add(hoverQuery, syncEnabled);
    const removeMotion = add(motionQuery, syncEnabled);

    return () => {
      removeHover();
      removeMotion();
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      return undefined;
    }

    const particles = [];
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      px: window.innerWidth * 0.5,
      py: window.innerHeight * 0.5,
      active: false,
    };

    let frameId = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const pushParticle = (x, y, dx, dy) => {
      particles.push(createParticle(x, y, dx, dy));
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const spawnFromMovement = (x, y) => {
      const dx = x - pointer.px;
      const dy = y - pointer.py;
      const speed = Math.hypot(dx, dy);
      const count = Math.min(16, Math.max(3, Math.round(speed / 4)));

      for (let i = 0; i < count; i += 1) {
        pushParticle(x, y, dx, dy);
      }

      pointer.px = x;
      pointer.py = y;
    };

    const drawParticle = (particle) => {
      const progress = particle.life / particle.ttl;
      const fade = Math.pow(1 - progress, 1.5);
      const radius = particle.size * (0.65 + progress * 0.95);
      const alpha = particle.alpha * fade;

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        radius * 0.08,
        particle.x,
        particle.y,
        radius,
      );

      gradient.addColorStop(0, `rgba(187, 178, 208, ${alpha * 0.36})`);
      gradient.addColorStop(0.36, `rgba(86, 82, 108, ${alpha * 0.25})`);
      gradient.addColorStop(0.7, `rgba(35, 33, 50, ${alpha * 0.18})`);
      gradient.addColorStop(1, 'rgba(8, 8, 12, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPointerMist = () => {
      if (!pointer.active) {
        return;
      }

      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 2, pointer.x, pointer.y, 120);
      glow.addColorStop(0, 'rgba(206, 191, 156, 0.16)');
      glow.addColorStop(0.55, 'rgba(92, 86, 122, 0.1)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.ttl) {
          particles.splice(i, 1);
          continue;
        }

        p.vx += p.drift * 0.015;
        p.vy -= 0.004;
        p.vx *= 0.985;
        p.vy *= 0.986;

        p.x += p.vx;
        p.y += p.vy;

        drawParticle(p);
      }

      drawPointerMist();

      frameId = window.requestAnimationFrame(tick);
    };

    const handleMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      spawnFromMovement(event.clientX, event.clientY);
    };

    const handleLeave = () => {
      pointer.active = false;
    };

    const handleEnter = () => {
      pointer.active = true;
    };

    const handleDown = () => {
      for (let i = 0; i < 18; i += 1) {
        pushParticle(pointer.x, pointer.y, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25);
      }
    };

    const handleBlur = () => {
      pointer.active = false;
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseenter', handleEnter, { passive: true });
    window.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('blur', handleBlur);

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('blur', handleBlur);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <Layer aria-hidden="true">
      <SmokeCanvas ref={canvasRef} />
    </Layer>
  );
};

export default DesktopMouseAura;
