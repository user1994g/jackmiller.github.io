import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled from 'styled-components';

import MainVideo from '../assets/Walking Girl.mp4';

gsap.registerPlugin(ScrollTrigger);

const VideoContainer = styled.section.attrs({ className: 'container' })`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ScaleDownLayer = styled.div.attrs({ className: 'scaleDown' })`
  width: 120vw;
  height: 120vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) scale(1);
  will-change: transform;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }

  @media (max-width: 48em) {
    width: 128vw;
    height: 116vh;

    video {
      object-position: center 42%;
    }
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(8, 8, 10, 0.25) 0%, rgba(8, 8, 10, 0.85) 100%),
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.14), transparent 40%);
`;

const Title = styled(motion.div)`
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

  span {
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: clamp(0.7rem, 0.9vw, 0.9rem);
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 0.85rem;
  }

  h1 {
    font-family: 'Kaushan Script';
    font-size: clamp(3.2rem, 10vw, 9rem);
    text-shadow: 1px 1px 1px ${(props) => props.theme.body};
    line-height: 0.95;
    max-width: 10ch;
  }

  h2 {
    margin-top: 0.65rem;
    font-size: clamp(0.95rem, 1.9vw, 1.6rem);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  p {
    margin-top: 1rem;
    width: min(52ch, 92%);
    color: rgba(255, 255, 255, 0.84);
    font-size: clamp(0.82rem, 1.25vw, 1.05rem);
  }
`;

const CoverVideo = () => {
  const containerRef = useRef(null);
  const scaleLayerRef = useRef(null);
  const titleContentRef = useRef(null);
  const videoRef = useRef(null);
  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;

  useLayoutEffect(() => {
    const containerElement = containerRef.current;
    const scaleElement = scaleLayerRef.current;
    const titleElement = titleContentRef.current;

    if (!containerElement || !scaleElement || !titleElement) {
      return undefined;
    }

    const scrollerFallback = document.querySelector('[data-scroll-container]');
    const scrollerElement = scroll?.el || scrollerFallback;

    ScrollTrigger.getById('hero-video-scale')?.kill();

    gsap.set(scaleElement, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      force3D: true,
    });

    gsap.set(titleElement, {
      scale: 1,
      force3D: true,
      transformOrigin: '0% 100%',
    });

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

    timeline.to(scaleElement, { scale: 0.6667, ease: 'none' }, 0);
    timeline.to(titleElement, { scale: 0.6667, ease: 'none' }, 0);

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
      <DarkOverlay />

      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      >
        <TitleContent ref={titleContentRef}>
          <span>Creative Media Portfolio</span>
          <h1>Jack Miller</h1>
          <h2>Film, Photography, and Visual Storytelling</h2>
          <p>
            A dark cinematic body of work exploring atmosphere, shadow, and narrative composition
            through motion and still imagery.
          </p>
        </TitleContent>
      </Title>

      <ScaleDownLayer ref={scaleLayerRef}>
        <video ref={videoRef} src={MainVideo} type="video/mp4" autoPlay muted loop playsInline preload="metadata" />
      </ScaleDownLayer>
    </VideoContainer>
  );
};

export default CoverVideo;
