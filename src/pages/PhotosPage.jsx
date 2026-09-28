import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ImageLightbox from '../components/ImageLightbox';
import Navbar from '../components/Navbar';
import photos from '../content/gallery';
import { photoCategories } from '../content/photoCollections';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const PhotosPage = () => {
  const [activeImage, setActiveImage] = useState(null);
  const pageRef = useRef(null);

  usePageSeo({
    url: 'https://jackmillermedia.com/photos/',
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-photo-intro]', {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });
      gsap.from('.photo-category-card', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.photo-category-grid', start: 'top 86%', once: true },
      });
      gsap.from('.photo-print', {
        opacity: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-sheet__grid', start: 'top 82%', once: true },
      });
    }, pageRef);

    return () => context?.revert?.();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="studio-page photos-page" role="main">
        <header className="page-hero">
          <div className="studio-wrap page-hero__grid">
            <div data-photo-intro>
              <span className="tape-label">Photography · Pick a collection</span>
              <h1>
                Choose your <em>frame</em>
              </h1>
            </div>
            <div data-photo-intro>
              <p className="page-hero__intro">
                Four ways into Jack&apos;s photography: slow countryside walks, live motion,
                film-world details, and patient wildlife encounters. Pick a set and step inside.
              </p>
              <ul className="photos-page__list">
                <li>Original photographs from Jack&apos;s archive</li>
                <li>Collections built around mood, place, and movement</li>
                <li>Every frame opens for a full-screen view</li>
              </ul>
            </div>
          </div>
        </header>

        <section className="photo-category-picker" aria-labelledby="photo-category-title">
          <div className="studio-wrap">
            <div className="photo-category-picker__head">
              <p className="studio-kicker">Photo index / 04 collections</p>
              <h2 id="photo-category-title">What do you want to see?</h2>
            </div>

            <div className="photo-category-grid">
              {photoCategories.map((category, index) => (
                <Link
                  key={category.slug}
                  className={`photo-category-card photo-category-card--${category.slug}`}
                  to={`/photos/${category.slug}`}
                >
                  <span className="photo-category-card__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="photo-category-card__mark" aria-hidden="true">{category.mark}</span>
                  <span className="photo-category-card__copy">
                    <small>{category.kicker}</small>
                    <strong>{category.label}</strong>
                    <span>{category.count}</span>
                  </span>
                  <span className="photo-category-card__arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-sheet" aria-labelledby="photo-grid-title">
          <div className="studio-wrap">
            <div className="contact-sheet__header">
              <div>
                <span className="frame-number">PREVIEW 01</span>
                <h2 id="photo-grid-title">Countryside preview</h2>
              </div>
              <div>
                <p className="studio-copy">
                  A ten-frame walk through quiet paths, water, railway lines, and spring greens.
                </p>
                <Link className="photo-preview-link" to="/photos/countryside">
                  Open the full collection <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="contact-sheet__grid">
              {photos.map((photo, index) => (
                <article
                  className="photo-print"
                  key={photo.title}
                  style={{ '--tilt': photo.tilt }}
                >
                  <button
                    type="button"
                    aria-label={`Open ${photo.title}`}
                    onClick={() => setActiveImage({ src: photo.src, alt: photo.alt })}
                  >
                    <figure>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        width={photo.width}
                        height={photo.height}
                        sizes="(max-width: 42rem) 46vw, (max-width: 64rem) 31vw, 24vw"
                      />
                      <figcaption>
                        <span>{String(index + 1).padStart(2, '0')} · {photo.title}</span>
                        <span>{photo.note}</span>
                      </figcaption>
                    </figure>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activeImage ? <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} /> : null}
    </>
  );
};

export default PhotosPage;
