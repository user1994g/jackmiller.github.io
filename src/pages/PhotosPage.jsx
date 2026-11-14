import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ImageLightbox from '../components/ImageLightbox';
import Navbar from '../components/Navbar';
import { photoCategories, photoCollections } from '../content/photoCollections';
import usePageSeo from '../hooks/usePageSeo';
import '../styles/Photos.css';

gsap.registerPlugin(ScrollTrigger);

const selectedPhotos = [
  { collection: 'countryside', index: 2 },
  { collection: 'countryside', index: 3 },
  { collection: 'animals', index: 2 },
  { collection: 'countryside', index: 6 },
  { collection: 'countryside', index: 8 },
  { collection: 'animals', index: 3 },
];

const PhotoPrint = ({ collectionKey, index, onOpen, className = '', priority = false }) => {
  const collection = photoCollections[collectionKey];
  const photo = collection.photos[index];
  return (
    <figure className={`exhibit-print ${className}`}>
      <button type="button" aria-label={`Open ${photo.title}`} onClick={() => onOpen(collectionKey, index)}>
        <span className="exhibit-print__image">
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
            loading={priority ? 'eager' : 'lazy'} decoding="async" fetchpriority={priority ? 'high' : undefined} />
          <span className="exhibit-print__expand" aria-hidden="true">↗</span>
        </span>
      </button>
      <figcaption>
        <span className="exhibit-print__number">{String(index + 1).padStart(2, '0')}</span>
        <span><strong>{photo.title}</strong><small>{collection.label} / {photo.note}</small></span>
      </figcaption>
    </figure>
  );
};

const PhotosPage = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const pageRef = useRef(null);
  usePageSeo({ url: 'https://jackmillermedia.com/photos/' });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.from('[data-photo-intro]', { opacity: 0, y: 18, duration: 0.65, stagger: 0.08, ease: 'power3.out' });
      pageRef.current.querySelectorAll('[data-photo-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0, y: 24, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
    }, pageRef);
    return () => context?.revert?.();
  }, []);

  const openPhoto = (collection, index) => setActiveGallery({ collection, index });

  return (
    <>
      <Navbar />
      <main ref={pageRef} id="main-content" className="studio-page photos-page photos-exhibit" role="main">
        <header className="photos-opening studio-wrap">
          <div className="photos-opening__eyebrow" data-photo-intro>
            <span className="tape-label">Photography / Jack Miller</span>
            <span>Selected work · 01—14</span>
          </div>
          <div className="photos-opening__heading" data-photo-intro>
            <h1>Photographs<span>.</span></h1>
            <p>A selection of my countryside and wildlife photographs. Open an image to see it in full.</p>
          </div>
          <div className="photos-opening__spread" data-photo-intro>
            <PhotoPrint collectionKey="countryside" index={0} onOpen={openPhoto} priority className="photos-opening__landscape" />
            <PhotoPrint collectionKey="countryside" index={1} onOpen={openPhoto} className="photos-opening__portrait" />
          </div>
          <div className="photos-opening__foot">
            <span>All photographs by Jack Miller</span>
            <a href="#selected-photographs">More photographs <span aria-hidden="true">↓</span></a>
          </div>
        </header>

        <nav className="exhibit-index" aria-label="Photo collections">
          <div className="studio-wrap exhibit-index__track">
            {photoCategories.map((category, index) => (
              <Link key={category.slug} to={`/photos/${category.slug}`}>
                <span className="exhibit-index__number">{String(index + 1).padStart(2, '0')}</span>
                <span><strong>{category.label}</strong><small>{category.count}</small></span>
                <span className="exhibit-index__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </nav>

        <section id="selected-photographs" className="exhibit-selection" aria-labelledby="selected-photo-title">
          <div className="studio-wrap">
            <div className="exhibit-selection__heading" data-photo-reveal>
              <div><span className="studio-kicker">From the archive</span><h2 id="selected-photo-title">A closer <em>look.</em></h2></div>
              <p>Paths, railway lines, reflections and reeds. A few photographs from the two collections.</p>
            </div>
            <div className="exhibit-selection__grid">
              {selectedPhotos.map(({ collection, index }) => (
                <div key={`${collection}-${index}`} className="exhibit-selection__item" data-photo-reveal>
                  <PhotoPrint collectionKey={collection} index={index} onOpen={openPhoto} />
                </div>
              ))}
            </div>
            <p className="exhibit-selection__hint">Click any photograph. Swipe or use the arrows to see the rest of its collection.</p>
          </div>
        </section>

        <section className="exhibit-collections studio-wrap" aria-labelledby="exhibit-collections-title">
          <div className="exhibit-collections__heading" data-photo-reveal>
            <span className="tape-label">The full sets</span>
            <h2 id="exhibit-collections-title">Two collections.<br /><em>Take your time.</em></h2>
          </div>
          <div className="exhibit-collections__links">
            <Link to="/photos/countryside" className="exhibit-collection-link" data-photo-reveal>
              <span className="exhibit-collection-link__number">01 / 10 photographs</span>
              <div><h3>Countryside</h3><p>Woodland paths, open fields and the way home.</p></div>
              <span className="exhibit-collection-link__arrow" aria-hidden="true">↗</span>
            </Link>
            <Link to="/photos/animals" className="exhibit-collection-link" data-photo-reveal>
              <span className="exhibit-collection-link__number">04 / 4 photographs</span>
              <div><h3>Animals</h3><p>Four photographs of one swan on the water.</p></div>
              <span className="exhibit-collection-link__arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="exhibit-in-progress" data-photo-reveal>
            <p>Still to come</p>
            <Link to="/photos/sports"><strong>Sports</strong><span>In progress <span aria-hidden="true">↗</span></span></Link>
            <Link to="/photos/movies"><strong>Movies</strong><span>No photos added yet <span aria-hidden="true">↗</span></span></Link>
          </div>
        </section>
      </main>
      {activeGallery ? (
        <ImageLightbox images={photoCollections[activeGallery.collection].photos} initialIndex={activeGallery.index} onClose={() => setActiveGallery(null)} />
      ) : null}
    </>
  );
};

export default PhotosPage;
