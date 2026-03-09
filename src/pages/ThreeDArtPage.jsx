import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_STREAM_URL = `${process.env.PUBLIC_URL || ''}/media/s_69ae4368a8108191ac0e24a134cc4a30.mp4`;

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

const VideoSection = styled.section`
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(circle at 72% 42%, rgba(255, 255, 255, 0.08), transparent 18%),
    linear-gradient(180deg, #0c1018 0%, #040507 100%);
`;

const VideoStage = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #000;
  display: grid;
  place-items: center;
`;

const VideoFrame = styled.div`
  position: relative;
  width: min(92vw, 88dvh);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #000;
  border-radius: clamp(1rem, 2vw, 1.8rem);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.36);
  will-change: transform, opacity;

  @media (max-width: 48em) {
    width: min(94vw, 72dvh);
    border-radius: 1rem;
  }
`;

const VideoCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
  opacity: ${({ $ready }) => ($ready ? 1 : 0)};
  transition: opacity 0.28s ease;
`;

const PreviewVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.28s ease;
`;

const HiddenVideo = styled.video`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const VideoShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.06) 24%, rgba(0, 0, 0, 0.06) 76%, rgba(0, 0, 0, 0.44) 100%),
    radial-gradient(circle at 50% 50%, transparent 52%, rgba(0, 0, 0, 0.12) 100%);
`;

const VideoCue = styled.div`
  position: absolute;
  left: 50%;
  bottom: clamp(1.25rem, 3vw, 2rem);
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(245, 247, 250, 0.78);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  pointer-events: none;

  @media (max-width: 48em) {
    font-size: 0.64rem;
    letter-spacing: 0.14em;
  }
`;

function drawCover(ctx, source, targetWidth, targetHeight) {
  const sourceWidth = source.naturalWidth || source.videoWidth || source.width;
  const sourceHeight = source.naturalHeight || source.videoHeight || source.height;

  if (!sourceWidth || !sourceHeight || !targetWidth || !targetHeight) {
    return;
  }

  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = targetWidth / targetHeight;

  let drawWidth = targetWidth;
  let drawHeight = targetHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (sourceRatio > targetRatio) {
    drawHeight = targetHeight;
    drawWidth = drawHeight * sourceRatio;
    offsetX = (targetWidth - drawWidth) / 2;
  } else {
    drawWidth = targetWidth;
    drawHeight = drawWidth / sourceRatio;
    offsetY = (targetHeight - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
}

const ThreeDArtPage = () => {
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const targetRef = useRef(null);
  const portalRef = useRef(null);
  const washRef = useRef(null);
  const glowRef = useRef(null);
  const videoRef = useRef(null);
  const previewVideoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const frameImagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(-1);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    const previewVideo = previewVideoRef.current;
    if (!previewVideo) {
      return undefined;
    }

    const freezePreview = () => {
      previewVideo.pause();
      try {
        if (previewVideo.currentTime !== 0) {
          previewVideo.currentTime = 0;
        }
      } catch (error) {
      }
    };

    if (previewVideo.readyState >= 2) {
      freezePreview();
    }

    previewVideo.addEventListener('loadeddata', freezePreview);
    previewVideo.addEventListener('seeked', freezePreview);

    return () => {
      previewVideo.removeEventListener('loadeddata', freezePreview);
      previewVideo.removeEventListener('seeked', freezePreview);
    };
  }, []);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    let cancelled = false;

    const extractFrames = async () => {
      const waitForFrame = () => new Promise((resolve, reject) => {
        if (video.readyState >= 2) {
          resolve();
          return;
        }
        const handleLoaded = () => {
          cleanup();
          resolve();
        };
        const handleError = () => {
          cleanup();
          reject(new Error('video-load-failed'));
        };
        const cleanup = () => {
          video.removeEventListener('loadeddata', handleLoaded);
          video.removeEventListener('error', handleError);
        };
        video.addEventListener('loadeddata', handleLoaded);
        video.addEventListener('error', handleError);
      });

      const seekTo = (time) => new Promise((resolve, reject) => {
        const handleSeeked = () => {
          cleanup();
          resolve();
        };
        const handleError = () => {
          cleanup();
          reject(new Error('video-seek-failed'));
        };
        const cleanup = () => {
          video.removeEventListener('seeked', handleSeeked);
          video.removeEventListener('error', handleError);
        };
        video.addEventListener('seeked', handleSeeked);
        video.addEventListener('error', handleError);
        video.currentTime = time;
      });

      try {
        if (video.readyState < 2) {
          await waitForFrame();
        }

        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
        const mobile = window.matchMedia('(max-width: 48em)').matches;
        const frameCount = mobile ? 48 : 72;
        const maxWidth = mobile ? 720 : 960;
        const captureWidth = Math.min(video.videoWidth || 1280, maxWidth);
        const captureHeight = Math.round(captureWidth * ((video.videoHeight || 704) / (video.videoWidth || 1280)));
        const scratch = document.createElement('canvas');
        scratch.width = captureWidth;
        scratch.height = captureHeight;
        const scratchCtx = scratch.getContext('2d', { alpha: false });

        if (!scratchCtx) {
          throw new Error('canvas-context-failed');
        }

        const frames = [];
        video.pause();
        video.currentTime = 0;
        await waitForFrame();

        for (let index = 0; index < frameCount; index += 1) {
          if (cancelled) {
            return;
          }

          const time = index === 0 ? 0 : Math.min((index / (frameCount - 1)) * duration, Math.max(duration - 0.04, 0));
          if (index > 0) {
            await seekTo(time);
          }

          scratchCtx.drawImage(video, 0, 0, captureWidth, captureHeight);
          const image = new Image();
          const loaded = new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
          });
          image.src = scratch.toDataURL('image/jpeg', 0.86);
          await loaded;
          frames.push(image);
        }

        frameImagesRef.current = frames;
        setFramesReady(true);
      } catch (error) {
        setFramesReady(false);
      }
    };

    extractFrames();

    return () => {
      cancelled = true;
    };
  }, []);


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

  useLayoutEffect(() => {
    if (!framesReady) {
      return undefined;
    }

    const section = videoSectionRef.current;
    const frame = videoFrameRef.current;
    const canvas = canvasRef.current;
    const frames = frameImagesRef.current;

    if (!section || !frame || !canvas || !frames.length) {
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) {
      return undefined;
    }

    lastDrawnFrameRef.current = -1;

    const renderProgress = (progress) => {
      const nextIndex = Math.max(0, Math.min(frames.length - 1, Math.round(progress * (frames.length - 1))));
      if (nextIndex !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = nextIndex;
        drawCover(context, frames[nextIndex], canvas.width, canvas.height);
      }
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      renderProgress(lastDrawnFrameRef.current <= 0 ? 0 : lastDrawnFrameRef.current / Math.max(frames.length - 1, 1));
    };

    gsap.set(frame, {
      scale: 0.95,
      opacity: 0.86,
      yPercent: 4,
      force3D: true,
    });

    resizeCanvas();
    renderProgress(0);
    window.addEventListener('resize', resizeCanvas);

    const frameTween = gsap.to(frame, {
      scale: 1,
      opacity: 1,
      yPercent: 0,
      ease: 'none',
      paused: true,
    });

    const scrollTrigger = ScrollTrigger.create({
      id: 'three-d-video-scrub',
      trigger: section,
      start: 'top top',
      end: '+=720%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: frameTween,
      onUpdate: (self) => {
        renderProgress(self.progress);
      },
      onRefresh: (self) => {
        resizeCanvas();
        renderProgress(self.progress);
      },
    });

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refreshId);
      window.removeEventListener('resize', resizeCanvas);
      scrollTrigger.kill();
      frameTween.kill();
      ScrollTrigger.getById('three-d-video-scrub')?.kill();
    };
  }, [framesReady]);

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

        <VideoSection ref={videoSectionRef}>
          <VideoStage>
            <VideoFrame ref={videoFrameRef}>
              <PreviewVideo ref={previewVideoRef} src={VIDEO_STREAM_URL} muted playsInline preload="auto" $hidden={framesReady} />
              <VideoCanvas ref={canvasRef} $ready={framesReady} />
              <VideoShade />
            </VideoFrame>
            <VideoCue>Scroll to drive the 3D film</VideoCue>
            <HiddenVideo ref={videoRef} src={VIDEO_STREAM_URL} muted playsInline preload="auto" />
          </VideoStage>
        </VideoSection>
      </PageShell>
    </>
  );
};

export default ThreeDArtPage;
