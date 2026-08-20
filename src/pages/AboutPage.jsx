import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import portrait from '../assets/Images/pfp-display.jpg';
import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    title: 'Film',
    text: 'Short films, narrative work, and visual direction.',
  },
  {
    title: 'Photography',
    text: 'Selected stills, portrait work, and visual sequences.',
  },
  {
    title: 'Videography',
    text: 'Creative media pieces shaped for impact and pace.',
  },
  {
    title: 'Portfolio',
    text: 'A central place to explore Jack Miller creative media work.',
  },
];

const AboutPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'About Jack Miller Media | Film, Photography and Videography',
    description:
      'Learn about Jack Miller Media, a creative portfolio focused on film production, photography, videography, and cinematic visual storytelling.',
    url: 'https://jackmillermedia.com/about/',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-profile-intro]', {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });
      gsap.from('[data-profile-reveal]', {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-profile-reveal]', start: 'top 82%', once: true },
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="studio-page profile-page" role="main">
        <header className="page-hero">
          <div className="studio-wrap page-hero__grid">
            <div data-profile-intro>
              <span className="tape-label">About · Jack Miller</span>
              <h1>
                Made with <em>intent.</em>
              </h1>
            </div>
            <p className="page-hero__intro" data-profile-intro>
              Jack Miller Media is a creative portfolio built around film production, photography,
              videography, and cinematic visual storytelling. The work across this site focuses on
              bold framing, atmosphere, motion, and image-making that can live across both still and
              moving media.
            </p>
          </div>
        </header>

        <section className="studio-wrap profile-grid" aria-labelledby="profile-story-title" data-profile-reveal>
          <figure className="profile-grid__image">
            <img
              src={portrait}
              alt="Portrait of Jack Miller"
              width="1600"
              height="1064"
              decoding="async"
            />
            <figcaption>Jack Miller · Creative media</figcaption>
          </figure>

          <div className="profile-grid__copy">
            <span className="studio-kicker">The story behind the frame</span>
            <h2 id="profile-story-title">Mood, tension, and cinematic composition lead the work.</h2>
            <p>
              I build visual stories through film and photography, focusing on mood, tension, and
              cinematic composition. My process starts with atmosphere: controlled light, shadow, and
              framing that guide emotion before dialogue begins.
            </p>
            <p>
              Every project in this portfolio, from concept to final edit, has been produced by me. I
              blend camera technique, colour grading, and sound-led pacing to create work that feels
              immersive and intentional on both still and moving formats.
            </p>
            <p>
              This creative portfolio reflects my development as a creative media student and my goal
              to produce distinctive visuals that stay memorable across screens of every size.
            </p>

            <div className="profile-skills" aria-label="Creative disciplines">
              {disciplines.map((discipline, index) => (
                <article className="profile-skill" key={discipline.title}>
                  <span className="frame-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{discipline.title}</strong>
                  <p>{discipline.text}</p>
                </article>
              ))}
            </div>

            <div className="profile-actions">
              <Link className="studio-link-button" to="/videos">
                View videos <span aria-hidden="true">↗</span>
              </Link>
              <Link className="studio-link-button studio-button--ghost" to="/photos">
                Browse photos <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
