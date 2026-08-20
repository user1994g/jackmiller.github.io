import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const FILM_STREAM =
  'https://clip-kingdom-play.lovable.app/api/public/stream/878b4496-ab7a-47fe-8e0f-0b489311241c';
const FILM_POSTER = `${process.env.PUBLIC_URL}/new-home/img/44.jpg`;

const lessonStats = [
  ['18+', 'Age rating'],
  ['100%', 'Independently made'],
  ['01', 'Creator · Jack Miller'],
];

const FinalLessonPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'The Final Lesson (Short Film) | Jack Miller',
    description:
      'The Final Lesson is an independently produced 18+ student short film by Jack Miller. Watch the film and explore its production story.',
    url: 'https://jackmillermedia.com/the-final-lesson/',
    robots: 'noindex, follow',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-lesson-intro]', {
        opacity: 0,
        y: 32,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.utils.toArray('[data-lesson-reveal]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 84%', once: true },
        });
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main
        ref={pageRef}
        id="main-content"
        className="studio-page studio-page--ink lesson-page"
        role="main"
      >
        <header className="lesson-hero">
          <img className="lesson-hero__image" src={FILM_POSTER} alt="Still from The Final Lesson" />
          <div className="lesson-hero__shade" aria-hidden="true" />
          <div className="studio-wrap lesson-hero__content">
            <span className="lesson-label" data-lesson-intro>
              Student short film · 2024
            </span>
            <h1 data-lesson-intro>
              <span>The Final</span>
              {' '}
              <span>Lesson</span>
            </h1>
            <div className="film-meta" data-lesson-intro>
              <span>18+ rated</span>
              <span>By Jack Miller</span>
              <span>Independent film</span>
            </div>
            <p data-lesson-intro>
              An independently created student short film centred around a brutal fight for survival.
            </p>
            <a className="studio-link-button studio-button--paper" href="#watch" data-lesson-intro>
              Watch the film <span aria-hidden="true">↓</span>
            </a>
          </div>
        </header>

        <section className="slate-strip lesson-stats" aria-label="Film facts">
          <div className="studio-wrap slate-strip__grid">
            {lessonStats.map(([value, label], index) => (
              <article className="slate-stat" key={label}>
                <span className="frame-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="lesson-about" aria-labelledby="lesson-about-title" data-lesson-reveal>
          <div className="studio-wrap lesson-about__grid">
            <figure className="lesson-about__still">
              <img src={FILM_POSTER} alt="Production still from The Final Lesson" loading="lazy" decoding="async" />
              <figcaption>Written, directed &amp; produced by Jack Miller</figcaption>
            </figure>
            <div>
              <span className="lesson-label">About the film</span>
              <h2 id="lesson-about-title">A brutal fight for survival.</h2>
              <p>
                This project is an <strong>18+ student short film</strong> centred around a brutal
                fight for survival. The entire film was independently created and produced by{' '}
                <strong>Jack Miller</strong> — with complete creative control from concept to final cut.
              </p>
            </div>
          </div>
        </section>

        <section id="watch" className="lesson-watch" aria-labelledby="lesson-watch-title" data-lesson-reveal>
          <div className="studio-wrap">
            <div className="lesson-watch__head">
              <div>
                <span className="lesson-label">Full feature · 18+</span>
                <h2 id="lesson-watch-title">Watch The Final Lesson</h2>
              </div>
              <p>Press play for the complete film. Viewer discretion is advised.</p>
            </div>
            <div className="lesson-player">
              <video
                src={FILM_STREAM}
                poster={FILM_POSTER}
                controls
                playsInline
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(event) => event.preventDefault()}
                aria-label="Play The Final Lesson"
              />
            </div>
          </div>
        </section>

        <section className="lesson-backstory" aria-labelledby="lesson-backstory-title" data-lesson-reveal>
          <div className="studio-wrap lesson-backstory__grid">
            <span className="frame-number">02</span>
            <div>
              <span className="lesson-label">Behind the scenes</span>
              <h2 id="lesson-backstory-title">From concept to final cut.</h2>
              <p>
                The project was written, directed, and produced independently by Jack Miller, keeping
                the creative decisions—from the first concept through the final edit—under one vision.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FinalLessonPage;
