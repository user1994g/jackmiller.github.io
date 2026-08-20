import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';

import Navbar from '../components/Navbar';
import { Scribble } from '../art/Marks';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    label: 'Production Notes',
    title: 'How I Build A Short Film From A Small Idea',
    text:
      'Most of my video work starts with a feeling rather than a finished script. I collect references, sounds, lighting ideas, and locations first, then reduce them into one clear visual promise: what the viewer should feel in the first ten seconds. From there I plan only the shots that actually support that promise, because a smaller film with a strong point of view is usually better than a large one with no centre.',
    detail:
      'That approach keeps the edit honest. If a shot is pretty but does not move the project forward, it gets cut. The finished portfolio pieces on this site are shaped around that process: simple premises, direct visual rhythm, and careful attention to the way sound, colour, and pacing change the mood of a scene.',
  },
  {
    label: 'Editing',
    title: 'What Makes A Portfolio Video Feel Finished',
    text:
      'A finished edit is not just a timeline with all the gaps removed. I look for a beginning that gives the viewer a reason to stay, a middle that changes the visual energy, and an ending that feels intentional rather than simply stopping. Music and ambient sound are treated as structure, not decoration, because they decide where a cut feels natural.',
    detail:
      'When I review my own work, I check whether the strongest frame arrives early enough, whether repeated angles are earning their place, and whether the title, thumbnail, and description all tell the same story. Those details help each project stand on its own instead of feeling like a loose upload.',
  },
  {
    label: 'Photography',
    title: 'Choosing Images That Say More Than They Show',
    text:
      'For photography, I am interested in images that hold a bit of tension: a subject half turned away, a texture that makes the scene feel physical, or a colour contrast that gives the frame a point of view. A gallery should not be a dump of every successful shot. It should feel like a sequence with rhythm.',
    detail:
      'That is why the photo work is grouped around mood, motion, and atmosphere instead of only subject matter. The goal is to make the page useful for someone trying to understand the style quickly, while still giving enough variety to show how the work changes between locations and projects.',
  },
  {
    label: '3D And CGI',
    title: 'Why I Treat 3D Work Like Camera Work',
    text:
      'The 3D page is built around the same questions I ask on a shoot: where is the viewer looking, what is the light doing, and what does the movement reveal? Modelling and rendering can become technical very quickly, but the final image still has to read like a composed shot.',
    detail:
      'I use 3D experiments to practise staging, material choices, atmosphere, and controlled motion. Even when a model is simple, the presentation matters: scale, shadow, camera distance, and pacing all decide whether it feels like a study or a finished visual idea.',
  },
];

const WriteUpsPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'Write Ups | Jack Miller Media Production Notes',
    description:
      'Original production notes and creative media write ups from Jack Miller covering film, editing, photography, 3D art, and visual storytelling decisions.',
    url: 'https://jackmillermedia.com/write-ups/',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-page-reveal]', {
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.utils.toArray('[data-note-reveal]').forEach((article) => {
        gsap.from(article, {
          opacity: 0,
          y: 36,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: article, start: 'top 84%', once: true },
        });
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="studio-page notes-page" role="main">
        <header className="page-hero">
          <div className="studio-wrap page-hero__grid">
            <div data-page-reveal>
              <span className="tape-label">Jack Miller Media Notes</span>
              <h1>
                Write <em>Ups</em>
              </h1>
            </div>
            <div data-page-reveal>
              <p className="page-hero__intro">
                Original notes from the work behind this portfolio: how I plan short films, choose
                images, shape edits, and use 3D experiments to practise visual storytelling. This page
                is here to add context to the finished pieces, not to repeat captions from the gallery.
              </p>
              <div className="notes-hero-mark" aria-hidden="true">
                <Scribble />
              </div>
            </div>
          </div>
        </header>

        <div className="studio-wrap notes-layout">
          <aside className="notes-index" aria-label="Write up index" data-page-reveal>
            <h2>On this page</h2>
            <nav>
              {articles.map((article, index) => (
                <a key={article.title} href={`#note-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{article.title}</span>
                </a>
              ))}
            </nav>
            <p className="notes-purpose">
              <strong>Why this page exists</strong>
              Visitors should be able to understand the site without guessing from images alone.
              These write ups explain the decisions behind the videos, photos, and digital art so
              the portfolio has useful text as well as visuals.
            </p>
          </aside>

          <div>
            <div className="notes-articles">
              {articles.map((article, index) => (
                <article
                  key={article.title}
                  id={`note-${index + 1}`}
                  className="note-article"
                  data-note-reveal
                >
                  <div className="note-article__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="note-article__copy">
                    <span className="studio-kicker">{article.label}</span>
                    <h2>{article.title}</h2>
                    <p>{article.text}</p>
                    <p>{article.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <section className="notes-closing" data-note-reveal aria-labelledby="editorial-approach-title">
              <span className="studio-kicker">The working rule</span>
              <h2 id="editorial-approach-title">Editorial approach</h2>
              <p>
                I keep the writing connected to work I have made or am developing. When a project is
                updated, the note should explain something specific: a production choice, a technical
                problem, a visual reference, or what I would change next time. That gives the site
                original context and makes it more useful than a thin portfolio page with images alone.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default WriteUpsPage;
