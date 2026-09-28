import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import ImageLightbox from '../components/ImageLightbox';
import Navbar from '../components/Navbar';
import { photoCategories, photoCollections } from '../content/photoCollections';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const PhotoCollectionPage = ({ collectionKey }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const pageRef = useRef(null);
  const collection = photoCollections[collectionKey];

  usePageSeo({
    url: `https://jackmillermedia.com/photos/${collectionKey}/`,
  });

  useLayoutEffect(() => {
    if (!collection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      gsap.from('[data-collection-intro]', {
        opacity: 0,
        y: 28,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
      });

      if (collection.photos.length) {
        gsap.from('.photo-collection-page .photo-print', {
          opacity: 0,
          y: 32,
          duration: 0.68,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.photo-collection-grid', start: 'top 84%', once: true },
        });
      }
    }, pageRef);

    return () => context?.revert?.();
  }, [collection]);

  if (!collection) return <Navigate to="/photos" replace />;

  return (
    <>
      <Navbar />
      <main
        ref={pageRef}
        id="main-content"
        className={`studio-page photo-collection-page photo-collection-page--${collection.accent}`}
        role="main"
      >
        <header className="photo-collection-hero">
          <div className="studio-wrap photo-collection-hero__grid">
            <div data-collection-intro>
              <Link className="photo-collection-back" to="/photos">
                <span aria-hidden="true">←</span> All photo collections
              </Link>
              <span className="tape-label">{collection.eyebrow}</span>
              <h1>{collection.label}</h1>
            </div>

            <div className="photo-collection-hero__copy" data-collection-intro>
              <p className="photo-collection-hero__statement">{collection.title}</p>
              <p>{collection.intro}</p>
              <small>{collection.detail}</small>
            </div>
          </div>
        </header>

        <nav className="photo-collection-switcher" aria-label="Photo collections">
          <div className="studio-wrap photo-collection-switcher__track">
            {photoCategories.map((category, index) => (
              <Link
                key={category.slug}
                className={category.slug === collection.slug ? 'is-current' : ''}
                to={`/photos/${category.slug}`}
                aria-current={category.slug === collection.slug ? 'page' : undefined}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{category.label}</strong>
              </Link>
            ))}
          </div>
        </nav>

        {collection.emptyState === 'sports' ? (
          <section className="photo-collection-empty" aria-labelledby="sports-edit-title">
            <div className="studio-wrap photo-collection-empty__board">
              <div className="photo-collection-empty__court" aria-hidden="true">
                <span>SPORT</span>
                <b>00</b>
                <i />
              </div>
              <div className="photo-collection-empty__copy">
                <span className="frame-number">NEXT SET</span>
                <h2 id="sports-edit-title">First set in the edit.</h2>
                <p>
                  The page is built and waiting for Jack&apos;s first sports sequence. When the right
                  frames land, they will live here as a fast, focused contact sheet.
                </p>
                <Link className="studio-link-button" to="/contact">
                  Talk about a shoot <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>
        ) : collection.emptyState === 'blank' ? (
          <section className="photo-collection-blank" aria-labelledby="movies-empty-title">
            <div className="studio-wrap photo-collection-blank__frame">
              <span className="frame-number">ROLL 03 / EMPTY</span>
              <h2 id="movies-empty-title">No movie photographs selected.</h2>
              <p>This collection is intentionally blank for now.</p>
            </div>
          </section>
        ) : (
          <section className="contact-sheet photo-collection-sheet" aria-labelledby="collection-grid-title">
            <div className="studio-wrap">
              <div className="contact-sheet__header">
                <h2 id="collection-grid-title">The contact sheet</h2>
                <p className="studio-copy">
                  {collection.photos.length} original {collection.photos.length === 1 ? 'frame' : 'frames'}.
                  Open any photograph for a closer look.
                </p>
              </div>

              <div className="contact-sheet__grid photo-collection-grid">
                {collection.photos.map((photo, index) => (
                  <article className="photo-print" key={photo.title} style={{ '--tilt': photo.tilt }}>
                    <button
                      type="button"
                      aria-label={`Open ${photo.title}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <figure>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          width={photo.width}
                          height={photo.height}
                          sizes="(max-width: 42rem) 100vw, (max-width: 70rem) 50vw, 25vw"
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
        )}
      </main>

      {activeIndex !== null ? (
        <ImageLightbox
          images={collection.photos}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </>
  );
};

export default PhotoCollectionPage;
