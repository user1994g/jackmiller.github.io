import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';

import ImageLightbox from '../components/ImageLightbox';
import Navbar from '../components/Navbar';
import photos from '../content/gallery';
import usePageSeo from '../hooks/usePageSeo';

gsap.registerPlugin(ScrollTrigger);

const PhotosPage = () => {
  const [activeImage, setActiveImage] = useState(null);
  const pageRef = useRef(null);

  usePageSeo({
    title: 'Photography Portfolio | Jack Miller Media Photos',
    description:
      "Browse Jack Miller's original countryside photography, including woodland paths, quiet water, railway lines, wildlife, and spring location studies.",
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
              <span className="tape-label">Photography · Selected work</span>
              <h1>
                Photo <em>Portfolio</em>
              </h1>
            </div>
            <div data-photo-intro>
              <p className="page-hero__intro">
                Explore an original location study photographed by Jack Miller: woodland paths,
                quiet water, railway lines, wildlife, and the soft greens of the English
                countryside in spring.
              </p>
              <ul className="photos-page__list">
                <li>Original photographs from Jack&apos;s archive</li>
                <li>Landscape, wildlife, and location storytelling</li>
                <li>A carefully paced ten-frame countryside sequence</li>
              </ul>
            </div>
          </div>
        </header>

        <section className="contact-sheet" aria-labelledby="photo-grid-title">
          <div className="studio-wrap">
            <div className="contact-sheet__header">
              <h2 id="photo-grid-title">Selected frames</h2>
              <p className="studio-copy">
                A paced contact sheet of real location and detail studies. Open any frame for a closer look.
              </p>
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
