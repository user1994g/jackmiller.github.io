import anime from 'animejs/lib/anime.es.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import MainVideo from '../assets/Walking Girl.mp4';

gsap.registerPlugin(ScrollTrigger);

/* ── shimmer keyframe for CTA buttons ── */
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 18px rgba(240, 216, 173, 0.12), inset 0 0 0 1px rgba(240, 216, 173, 0.22); }
  50% { box-shadow: 0 0 28px rgba(240, 216, 173, 0.22), inset 0 0 0 1px rgba(240, 216, 173, 0.36); }
`;

const VideoContainer = styled.section.attrs({ className: 'container' })`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

/* Parallax background that reveals behind shrinking video */
const ParallaxBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 50% 30%, rgba(240, 216, 173, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse at 20% 80%, rgba(100, 120, 180, 0.05) 0%, transparent 50%),
    linear-gradient(180deg, #0a0b0e 0%, #141620 50%, #0c0d10 100%);
  opacity: 0;
  will-change: opacity;
`;

const ScaleFrame = styled.div`
  width: 120vw;
  height: 120vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (max-width: 48em) {
    width: 128vw;
    height: 116vh;
  }
`;

const ScaleMotionLayer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
  transform-origin: 50% 50%;
  will-change: transform, border-radius, box-shadow;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }

  @media (max-width: 48em) {
    video {
      object-position: center 42%;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(180deg, rgba(8, 8, 10, 0.20) 0%, rgba(8, 8, 10, 0.88) 100%),
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.14), transparent 40%);
`;

const Title = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: clamp(5rem, 10vw, 9rem) clamp(1.1rem, 4vw, 4rem);
  color: ${(props) => props.theme.text};
`;

const TitleContent = styled.div`
  transform-origin: 0% 100%;
  will-change: transform;

  .hero-kicker,
  .hero-name,
  .hero-subtitle,
  .hero-body,
  .hero-cta-row {
    opacity: 0;
    transform: translateY(32px);
  }

  .hero-kicker {
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: clamp(0.7rem, 0.9vw, 0.9rem);
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 0.85rem;
  }

  .hero-name {
    font-size: clamp(3.2rem, 8vw, 7rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .hero-subtitle {
    margin-top: 0.65rem;
    font-size: clamp(0.95rem, 1.9vw, 1.6rem);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .hero-body {
    margin-top: 1rem;
    width: min(52ch, 92%);
    color: rgba(255, 255, 255, 0.84);
    font-size: clamp(0.82rem, 1.25vw, 1.05rem);
  }
`;

const CtaRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.8rem;
  flex-wrap: wrap;

  @media (max-width: 30em) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const CtaButton = styled.button`
  position: relative;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  font-size: clamp(0.78rem, 1vw, 0.92rem);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);

  ${({ $primary }) =>
    $primary
      ? css`
    border: 1px solid rgba(240, 216, 173, 0.5);
    background: linear-gradient(135deg, rgba(240, 216, 173, 0.15) 0%, rgba(240, 216, 173, 0.04) 100%);
    color: rgba(255, 248, 230, 0.98);
    animation: ${glowPulse} 3s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(240, 216, 173, 0.18) 50%,
        transparent 100%
      );
      background-size: 200% auto;
      animation: ${shimmer} 3.5s linear infinite;
      pointer-events: none;
    }
  `
      : css`
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(6px);
  `}

  &:hover {
    transform: translateY(-3px) scale(1.04);
    border-color: rgba(240, 216, 173, 0.7);
    box-shadow: 0 12px 36px rgba(240, 216, 173, 0.18), 0 0 0 1px rgba(240, 216, 173, 0.3);
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.8);
    outline-offset: 3px;
  }
`;

const CoverVideo = () => {
  const containerRef = useRef(null);
  const scaleLayerRef = useRef(null);
  const titleContentRef = useRef(null);
  const videoRef = useRef(null);
  const parallaxBgRef = useRef(null);

  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;
  const navigate = useNavigate();

  const scrollToTarget = useCallback(
    (target) => {
      const element = document.querySelector(target);
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
    },
    [scroll],
  );

  /* ── text entrance animation ── */
  useEffect(() => {
    const titleElement = titleContentRef.current;

    if (!titleElement) {
      return undefined;
    }

    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = titleElement.querySelectorAll(
      '.hero-kicker, .hero-name, .hero-subtitle, .hero-body, .hero-cta-row',
    );

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' });
      return undefined;
    }

    anime.set(targets, { opacity: 0, translateY: 32 });

    const introTimeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 920,
    });

    introTimeline.add({
      targets,
      opacity: [0, 1],
      translateY: [32, 0],
      delay: anime.stagger(120),
    });

    const nameFloat = anime({
      targets: titleElement.querySelector('.hero-name'),
      translateY: [0, -4],
      easing: 'easeInOutSine',
      duration: 3200,
      direction: 'alternate',
      loop: true,
      autoplay: true,
    });

    return () => {
      introTimeline.pause();
      nameFloat.pause();
      anime.remove(targets);
    };
  }, []);

  /* ── scroll-triggered shrink + parallax ── */
  useLayoutEffect(() => {
    const containerElement = containerRef.current;
    const scaleElement = scaleLayerRef.current;
    const titleElement = titleContentRef.current;
    const bgElement = parallaxBgRef.current;

    if (!containerElement || !scaleElement || !titleElement) {
      return undefined;
    }

    const scrollerElement = scroll?.el || null;

    ScrollTrigger.getById('hero-video-scale')?.kill();

    gsap.set(scaleElement, {
      scale: 1,
      borderRadius: 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      force3D: true,
      transformOrigin: '50% 50%',
    });

    gsap.set(titleElement, {
      scale: 1,
      y: 0,
      opacity: 1,
      force3D: true,
      transformOrigin: '0% 100%',
    });

    if (bgElement) {
      gsap.set(bgElement, { opacity: 0 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: 'hero-video-scale',
        trigger: containerElement,
        pin: containerElement,
        scrub: true,
        start: 'top top',
        end: '+=200%',
        anticipatePin: 1,
        invalidateOnRefresh: true,
        ...(scrollerElement ? { scroller: scrollerElement } : {}),
      },
    });

    /* video shrinks with rounded corners & deep shadow */
    timeline.to(
      scaleElement,
      {
        scale: 0.55,
        borderRadius: 32,
        boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        ease: 'none',
      },
      0,
    );

    /* title fades out and slides down */
    timeline.to(
      titleElement,
      {
        scale: 0.75,
        y: 80,
        opacity: 0,
        ease: 'none',
      },
      0,
    );

    /* parallax background fades in behind the shrinking video */
    if (bgElement) {
      timeline.to(
        bgElement,
        {
          opacity: 1,
          ease: 'none',
        },
        0.15,
      );
    }

    const refreshTrigger = () => ScrollTrigger.refresh();
    const videoElement = videoRef.current;

    videoElement?.addEventListener('loadedmetadata', refreshTrigger);

    const rafId = window.requestAnimationFrame(refreshTrigger);
    const timeoutId = window.setTimeout(refreshTrigger, 320);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      videoElement?.removeEventListener('loadedmetadata', refreshTrigger);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      ScrollTrigger.getById('hero-video-scale')?.kill();
    };
  }, [scroll]);

  return (
    <VideoContainer ref={containerRef}>

      <ParallaxBg ref={parallaxBgRef} />

      <DarkOverlay />

      <Title>
        <TitleContent ref={titleContentRef}>
          <span className="hero-kicker">Creative Media Portfolio</span>
          <h1 className="hero-name">Jack Miller</h1>
          <h2 className="hero-subtitle">Film, Photography, and Visual Storytelling</h2>
          <p className="hero-body">
            A creative portfolio exploring atmosphere, shadow, and narrative composition across
            film, photography, and videography.
          </p>
          <CtaRow className="hero-cta-row">
            <CtaButton
              $primary
              type="button"
              onClick={() => scrollToTarget('#shop')}
            >
              View My Work
            </CtaButton>
            <CtaButton
              type="button"
              onClick={() => navigate('/videos')}
            >
              Watch Showreel
            </CtaButton>
          </CtaRow>
        </TitleContent>
      </Title>

      <ScaleFrame>
        <ScaleMotionLayer ref={scaleLayerRef}>
          <video ref={videoRef} src={MainVideo} type="video/mp4" autoPlay muted loop playsInline preload="metadata" />
        </ScaleMotionLayer>
      </ScaleFrame>
    </VideoContainer>
  );
};

export default CoverVideo;
