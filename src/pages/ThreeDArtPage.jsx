import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import usePageSeo from '../hooks/usePageSeo';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const SKETCHFAB_EMBED_URL = 'https://sketchfab.com/models/54860c132db84955a9bb2a3e7a15882a/embed?autostart=1&autospin=0.35&preload=1&ui_controls=0&ui_infos=0&ui_help=0&ui_inspector=0&ui_settings=0&ui_vr=0&ui_annotations=0&ui_stop=0&ui_hint=0&ui_watermark=0&ui_watermark_link=0';

const PageShell = styled.main`
  background: #000;
`;

const IntroSection = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #020202;
`;

const IntroInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: clamp(6rem, 12vw, 9rem) clamp(1rem, 3vw, 2rem) 3rem;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  inset: -12%;
  background:
    radial-gradient(circle at 50% 52%, rgba(255, 255, 255, 0.08), transparent 12%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 34%),
    radial-gradient(circle at 50% 50%, rgba(135, 149, 190, 0.08), transparent 52%);
  pointer-events: none;
`;

const WhitePortal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(9rem, 18vw, 16rem);
  aspect-ratio: 1;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.96) 38%, rgba(255, 255, 255, 0) 74%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.16);
  filter: blur(10px);
  pointer-events: none;
  will-change: transform, opacity;
`;

const WhiteWash = styled.div`
  position: absolute;
  inset: 0;
  background: #fff;
  opacity: 0;
  pointer-events: none;
`;

const TitleBlock = styled.div`
  position: relative;
  display: grid;
  gap: clamp(0.25rem, 0.8vw, 0.8rem);
  justify-items: center;
  text-align: center;
  will-change: transform, opacity, filter;
`;

const Line = styled.div`
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  line-height: 0.88;
  font-size: clamp(2.6rem, 11vw, 9.8rem);
  font-weight: 800;
  -webkit-text-stroke: 1.6px rgba(255, 255, 255, 0.94);
  text-shadow: 0 0 32px rgba(255, 255, 255, 0.08);

  @media (max-width: 48em) {
    font-size: clamp(2.15rem, 13vw, 5rem);
    letter-spacing: 0.08em;
    -webkit-text-stroke: 1.1px rgba(255, 255, 255, 0.94);
  }
`;

const TargetLetter = styled.span`
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.8px rgba(255, 255, 255, 1);
  text-shadow: 0 0 42px rgba(255, 255, 255, 0.16);
`;

const ScrollHint = styled.p`
  position: absolute;
  left: 50%;
  bottom: clamp(1.2rem, 3vw, 2rem);
  transform: translateX(-50%);
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.68rem;

  @media (max-width: 48em) {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
  }
`;

const WhiteSection = styled.section`
  min-height: clamp(6rem, 15vh, 10rem);
  background: linear-gradient(180deg, #ffffff 0%, #f0f4fa 22%, rgba(120, 133, 157, 0.22) 58%, #0c1018 100%);
`;


const ModelShell = styled.div`
  width: 100%;
  display: grid;
  gap: clamp(1rem, 2.4vw, 1.6rem);
`;

const ModelHeader = styled.div`
  display: grid;
  gap: 0.65rem;
  align-content: start;
`;

const ModelEyebrow = styled.p`
  margin: 0;
  color: rgba(238, 242, 248, 0.64);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
`;

const ModelGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const ModelCardButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.05)')};
  color: rgba(245, 247, 250, 0.96);
  border-radius: 999px;
  padding: 0.9rem 1.15rem;
  min-width: min(100%, 17rem);
  display: grid;
  gap: 0.25rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.24);
    transform: translateY(-1px);
  }
`;

const ModelCardTitle = styled.span`
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ModelCardMeta = styled.span`
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(238, 242, 248, 0.62);
`;

const ClosedState = styled.div`
  min-height: calc(100dvh - clamp(2rem, 5.6vw, 4rem));
  border-radius: clamp(1.1rem, 2vw, 1.8rem);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 20%),
    linear-gradient(180deg, rgba(7, 9, 13, 0.96) 0%, rgba(3, 4, 6, 0.98) 100%);
  display: grid;
  place-items: center;
  text-align: center;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  color: rgba(245, 247, 250, 0.84);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: clamp(0.78rem, 1vw, 0.95rem);
`;

const ModelSection = styled.section`
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(circle at 65% 30%, rgba(255, 255, 255, 0.09), transparent 18%),
    linear-gradient(180deg, #0c1018 0%, #050608 100%);
`;

const ModelStage = styled.div`
  min-height: 100dvh;
  display: grid;
  align-items: center;
  padding: clamp(1rem, 2.8vw, 2rem);
`;

const EmbedShell = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - clamp(2rem, 5.6vw, 4rem));
  overflow: hidden;
  border-radius: clamp(1.1rem, 2vw, 1.8rem);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.42);
  background: #030406;

  @media (max-width: 48em) {
    height: calc(100dvh - clamp(1.5rem, 6vw, 2.5rem));
    border-radius: 1rem;
  }
`;

const SketchfabFrame = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #030406;
  pointer-events: none;
`;

const EmbedOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 14%, rgba(0, 0, 0, 0) 78%, rgba(0, 0, 0, 0.34) 100%),
    radial-gradient(circle at 50% 50%, transparent 62%, rgba(0, 0, 0, 0.1) 100%);
`;

const ThreeDArtPage = () => {
  usePageSeo({
    title: '3D Art and CGI Work | Jack Miller Media',
    description:
      'Explore 3D art, CGI experiments, and digital visual work from Jack Miller Media, including rendered imagery and motion-led creative studies.',
    url: 'https://jackmillermedia.com/3d-art/',
  });

  const introRef = useRef(null);
  const modelContentRef = useRef(null);
  const [modelOpen, setModelOpen] = useState(false);
  const titleRef = useRef(null);
  const targetRef = useRef(null);
  const portalRef = useRef(null);
  const washRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const introElement = introRef.current;
    const titleElement = titleRef.current;
    const targetElement = targetRef.current;
    const portalElement = portalRef.current;
    const washElement = washRef.current;
    const glowElement = glowRef.current;

    if (!introElement || !titleElement || !targetElement || !portalElement || !washElement || !glowElement) {
      return undefined;
    }

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setup = () => {
      const titleRect = titleElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const originX = ((targetRect.left + targetRect.width / 2 - titleRect.left) / titleRect.width) * 100;
      const originY = ((targetRect.top + targetRect.height / 2 - titleRect.top) / titleRect.height) * 100;
      const mobile = window.matchMedia('(max-width: 48em)').matches;
      const zoomScale = mobile ? 15 : 24;
      const portalScale = mobile ? 20 : 30;
      const scrollDistance = mobile ? '+=190%' : '+=240%';

      gsap.set(titleElement, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        transformOrigin: `${originX}% ${originY}%`,
        force3D: true,
      });

      gsap.set(portalElement, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.16,
        opacity: 0,
        force3D: true,
      });

      gsap.set(washElement, { opacity: 0 });
      gsap.set(glowElement, { opacity: 1 });

      if (reduceMotion) {
        return null;
      }

      return gsap.timeline({
        scrollTrigger: {
          id: 'three-d-world-intro',
          trigger: introElement,
          pin: introElement,
          scrub: 2.8,
          start: 'top top',
          end: scrollDistance,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(titleElement, { scale: zoomScale, ease: 'none' }, 0)
        .to(glowElement, { opacity: 0.35, ease: 'none' }, 0.12)
        .to(portalElement, { opacity: 1, scale: portalScale, ease: 'none' }, 0.18)
        .to(titleElement, { opacity: 0, filter: 'blur(3px)', ease: 'none' }, 0.58)
        .to(washElement, { opacity: 1, ease: 'none' }, 0.7);
    };

    const timeline = setup();
    const rafId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const timeoutId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      ScrollTrigger.getById('three-d-world-intro')?.kill();
    };
  }, []);

  return (
    <>
      <Navbar />

      <PageShell id="main-content">
        <IntroSection ref={introRef}>
          <BackgroundGlow ref={glowRef} />
          <WhitePortal ref={portalRef} />
          <WhiteWash ref={washRef} />
          <IntroInner>
            <TitleBlock ref={titleRef}>
              <Line>Welcome</Line>
              <Line>
                <TargetLetter ref={targetRef}>T</TargetLetter>o
              </Line>
              <Line>My 3D World</Line>
            </TitleBlock>
          </IntroInner>
          <ScrollHint>Scroll into the T</ScrollHint>
        </IntroSection>

        <WhiteSection />

        <ModelSection>
          <ModelStage>
            <ModelShell>
              <ModelHeader>
                <ModelEyebrow>Car 3D Models</ModelEyebrow>
                <ModelGrid>
                  <ModelCardButton
                    type="button"
                    $active={modelOpen}
                    onClick={() => {
                      setModelOpen(true);
                      window.requestAnimationFrame(() => modelContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                    }}
                  >
                    <ModelCardTitle>McLaren P1</ModelCardTitle>
                    <ModelCardMeta>Press to open this model</ModelCardMeta>
                  </ModelCardButton>
                </ModelGrid>
              </ModelHeader>

              {modelOpen ? (
                <EmbedShell ref={modelContentRef}>
                  <SketchfabFrame
                    title="mclaren_p1__www_vecarz_com"
                    src={SKETCHFAB_EMBED_URL}
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                  <EmbedOverlay />
                </EmbedShell>
              ) : (
                <ClosedState ref={modelContentRef}>Press McLaren P1 to open the car model</ClosedState>
              )}
            </ModelShell>
          </ModelStage>
        </ModelSection>
      </PageShell>
    </>
  );
};

export default ThreeDArtPage;
