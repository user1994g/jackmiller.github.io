import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';

import portraitImage from '../assets/Images/1-about-refresh.webp';
import memoryImage from '../assets/Images/9.webp';
import objectImage from '../assets/Images/5.webp';
import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const facts = [
  ['Project', 'FMP Level 2'],
  ['Format', 'Short film'],
  ['Setting', '1939'],
  ['Status', 'Available to watch'],
];

const memories = [
  {
    src: portraitImage,
    alt: 'A portrait in soft, reflective light',
    caption: 'Remembering',
    width: 1920,
    height: 2880,
  },
  {
    src: memoryImage,
    alt: 'A close detail suggesting a treasured memory',
    caption: 'Memory',
    width: 1280,
    height: 1920,
  },
  {
    src: objectImage,
    alt: 'A personal object held in a quiet moment',
    caption: 'What remains',
    width: 1920,
    height: 2880,
  },
];

const PressedFlower = () => (
  <svg viewBox="0 0 160 250" fill="none" aria-hidden="true">
    <path d="M82 238c-8-61 4-111-1-168" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M82 132c-22-17-39-17-52-8 11 17 28 24 51 20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M82 164c22-16 40-14 51-4-12 17-29 22-51 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M81 72c-15-13-18-30-6-42 15 8 21 22 16 41" stroke="currentColor" strokeWidth="2" />
    <path d="M81 72c10-18 25-25 41-17-2 17-14 27-33 29" stroke="currentColor" strokeWidth="2" />
    <path d="M81 72c-20 2-34-6-37-23 14-10 29-5 43 10" stroke="currentColor" strokeWidth="2" />
    <circle cx="82" cy="73" r="8" fill="currentColor" />
  </svg>
);

const FmpLevelTwoPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'The Dark Echoes of 1939 | Jack Miller',
    description: 'The Dark Echoes of 1939, an FMP Level 2 film project by Jack Miller.',
    url: 'https://jackmillermedia.com/fmp-level-2/',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-archive-intro]', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.12,
        ease: 'power2.out',
      });

      gsap.utils.toArray('[data-archive-reveal]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 32,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 84%', once: true },
        });
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="archive-page" role="main">
        <div className="studio-wrap">
          <header className="archive-header">
            <div data-archive-intro>
              <span className="archive-label">FMP Level 2 · Short Film</span>
              <h1>The Dark Echoes of 1939</h1>
            </div>
            <p className="archive-header__summary" data-archive-intro>
              A study of memory, atmosphere, and the shadows history leaves behind.
            </p>
          </header>

          <section className="archive-player" aria-label="Watch The Dark Echoes of 1939" data-archive-intro>
            <iframe
              title="The Dark Echoes of 1939"
              src="https://clip-kingdom-play.lovable.app/embed/21230af6-5a84-4072-befc-276e5f349145"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          </section>

          <section className="archive-details" aria-label="Film details" data-archive-reveal>
            <p>
              The Dark Echoes of 1939 explores a time marked by uncertainty, using image, sound,
              and mood to create a film shaped by what is remembered and what remains unseen.
            </p>
            <dl className="archive-facts">
              {facts.map(([label, value]) => (
                <div className="archive-fact" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="archive-story" aria-labelledby="archive-story-title" data-archive-reveal>
            <div className="archive-story__copy">
              <span className="archive-label">A story about loss</span>
              <h2 id="archive-story-title">Some absences never leave.</h2>
              <p>
                At its heart, this short film is about the loss of a mother: the quiet spaces she
                leaves behind, the objects that keep her memory alive, and the grief that changes
                shape over time.
              </p>
              <div className="archive-story__flower">
                <PressedFlower />
              </div>
            </div>

            <div className="archive-prints" aria-label="Film mood stills">
              {memories.map((memory, index) => (
                <figure className="archive-print" key={memory.caption}>
                  <img
                    src={memory.src}
                    alt={memory.alt}
                    loading="lazy"
                    decoding="async"
                    width={memory.width}
                    height={memory.height}
                  />
                  <figcaption>
                    <span>{memory.caption}</span>
                    <span>Frame {String(index + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default FmpLevelTwoPage;
