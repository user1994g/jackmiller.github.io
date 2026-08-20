import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const socialLinks = [
  { label: 'Instagram', detail: '@jackmillermedia', href: 'https://www.instagram.com/jackmillermedia/' },
  { label: 'YouTube', detail: 'Jack Miller Media', href: 'https://www.youtube.com/@jackmillermedia' },
  { label: 'GitHub', detail: 'user1994g', href: 'https://github.com/user1994g' },
];

const ContactPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'Contact Jack Miller Media | Creative Media Portfolio',
    description:
      'Contact Jack Miller Media for film, photography, videography, and creative media collaborations.',
    url: 'https://jackmillermedia.com/contact/',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-contact-reveal]', {
        opacity: 0,
        y: 28,
        duration: 0.78,
        stagger: 0.09,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="studio-page contact-page" role="main">
        <header className="page-hero">
          <div className="studio-wrap page-hero__grid">
            <div data-contact-reveal>
              <span className="tape-label">Contact · Selected collaborations</span>
              <h1>
                Get in <em>touch.</em>
              </h1>
            </div>
            <p className="page-hero__intro" data-contact-reveal>
              Jack Miller Media is available for selected creative collaborations in film,
              photography, videography, and visual storytelling. For the latest work and updates,
              use the main portfolio or reach out through the active social channels below.
            </p>
          </div>
        </header>

        <section className="studio-wrap" aria-labelledby="contact-card-title" data-contact-reveal>
          <div className="contact-card">
            <div>
              <span className="studio-kicker">Open channel</span>
              <h2 id="contact-card-title">Make something worth replaying.</h2>
              <p>
                Share the project, the mood, and what you want the audience to feel. The active social
                channels are the best place to start a conversation.
              </p>
              <Link className="studio-link-button studio-button--paper contact-home-link" to="/">
                Main portfolio <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="contact-links" aria-label="Social channels">
              {socialLinks.map((link) => (
                <a
                  className="contact-link"
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {link.label}
                    <small>{link.detail}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
