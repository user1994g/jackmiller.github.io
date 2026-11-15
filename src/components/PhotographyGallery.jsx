import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { photoCategories, photoCollections } from '../content/photoCollections';
import usePageSeo from '../hooks/usePageSeo';
import ImageLightbox from './ImageLightbox';
import Navbar from './Navbar';
import '../styles/Photos.css';

const entriesFor = (key) => photoCollections[key].photos.map((photo) => ({ ...photo, collection: key }));
const allPhotographs = photoCategories.flatMap(({ slug }) => entriesFor(slug));
const number = (value) => String(value).padStart(2, '0');

const PhotographyGallery = ({ collectionKey = null }) => {
  const collection = photoCollections[collectionKey];
  const images = useMemo(() => collectionKey ? entriesFor(collectionKey) : allPhotographs, [collectionKey]);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('gallery');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const imageRef = useRef(null);
  const stripRef = useRef(null);
  const touchRef = useRef(null);
  const swipedRef = useRef(false);
  const current = images[index];
  const label = collection?.label || 'Photographs';

  usePageSeo({ url: `https://jackmillermedia.com/photos/${collectionKey ? `${collectionKey}/` : ''}` });

  useLayoutEffect(() => {
    if (!imageRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.from(imageRef.current, { opacity: 0, y: 6, duration: 0.28, ease: 'power2.out' });
    }, imageRef);
    return () => context.revert();
  }, [index, mode]);

  useEffect(() => {
    const strip = stripRef.current;
    const thumbnail = strip?.children[index];
    if (!thumbnail) return;
    const left = thumbnail.offsetLeft;
    if (left < strip.scrollLeft || left + thumbnail.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo?.({ left: Math.max(0, left - strip.clientWidth / 2 + thumbnail.offsetWidth / 2), behavior: 'auto' });
    }
  }, [index, mode]);

  const move = (direction) => setIndex((value) => (value + direction + images.length) % images.length);
  const stageKeyDown = (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  };
  const endSwipe = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    if (Math.abs(x) > 48 && Math.abs(x) > Math.abs(y)) {
      event.preventDefault();
      swipedRef.current = true;
      move(x < 0 ? 1 : -1);
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="photo-room" role="main">
        <section className="photo-room__gallery" aria-labelledby="photography-title">
          <div className="studio-wrap">
            <header className="photo-room__header">
              <div>
                <span className="photo-room__eyebrow"><span aria-hidden="true">●</span> Jack Miller / Photography</span>
                <h1 id="photography-title">{label}<span>.</span></h1>
              </div>
              <div className="photo-room__header-note">
                <span>{number(images.length)} photographs</span>
                <p>{collection ? (images.length ? 'The complete collection.' : 'Nothing added yet.') : 'Countryside & wildlife. All photographed by me.'}</p>
              </div>
            </header>

            <div className="photo-room__layout">
              <aside className="photo-room__rail">
                <span className="photo-room__rail-label">Browse the archive</span>
                <Link className={`photo-room__all${!collectionKey ? ' is-current' : ''}`} to="/photos" aria-current={!collectionKey ? 'page' : undefined}>
                  All photographs <span>{number(allPhotographs.length)}</span>
                </Link>
                <nav className="photo-room__collections" aria-label="Photo collections">
                  {photoCategories.map((category, categoryIndex) => {
                    const count = photoCollections[category.slug].photos.length;
                    return (
                      <Link key={category.slug} to={`/photos/${category.slug}`} aria-current={collectionKey === category.slug ? 'page' : undefined}>
                        <span className="photo-room__collection-number">{number(categoryIndex + 1)}</span>
                        <span><strong>{category.label}</strong><small>{count ? `${count} photographs` : 'Coming later'}</small></span>
                        <span className="photo-room__collection-arrow" aria-hidden="true">↗</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="photo-room__rail-bottom"><span className="photo-room__asterisk" aria-hidden="true">✳</span><p>Have a look around.<br />Open any photo to see it in full.</p></div>
              </aside>

              <div className="photo-room__workspace">
                {images.length ? (
                  <>
                    <div className="photo-room__toolbar">
                      <span className="photo-room__edition">JM / PHOTO ARCHIVE</span>
                      <div className="photo-room__views" role="group" aria-label="Photograph layout">
                        <button type="button" aria-label="Gallery view" aria-pressed={mode === 'gallery'} onClick={() => setMode('gallery')}><span aria-hidden="true">▣</span> Gallery</button>
                        <button type="button" aria-label="Grid view" aria-pressed={mode === 'grid'} onClick={() => setMode('grid')}><span aria-hidden="true">▦</span> Grid</button>
                      </div>
                    </div>
                    {mode === 'gallery' ? (
                      <div className="photo-room__viewer" role="group" aria-label="Photograph viewer" onKeyDown={stageKeyDown}>
                        <figure className="photo-room__featured">
                          <div className="photo-room__stage-frame">
                            <button className="photo-room__stage" type="button" aria-label={`Enlarge ${current.title}`} onClick={(event) => { if (event.detail !== 0 && swipedRef.current) { swipedRef.current = false; return; } setExpandedIndex(index); }}
                            onTouchStart={(event) => { swipedRef.current = false; const touch = event.touches[0]; touchRef.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null; }}
                            onTouchEnd={endSwipe} onTouchCancel={() => { touchRef.current = null; }}>
                            <img ref={imageRef} key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} loading="eager" decoding="async" fetchpriority={index === 0 ? 'high' : undefined} />
                            <span className="photo-room__expand" aria-hidden="true">Full screen ↗</span>
                            </button>
                            <div className="photo-room__arrows">
                              <button type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button>
                              <button type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button>
                            </div>
                          </div>
                          <figcaption className="photo-room__caption">
                            <div className="photo-room__caption-copy" aria-live="polite" aria-atomic="true">
                              <span className="photo-room__counter">{number(index + 1)}<span> / {number(images.length)}</span></span>
                              <div><strong>{current.title}</strong><span>{photoCollections[current.collection].label} / {current.note}</span></div>
                            </div>
                          </figcaption>
                        </figure>
                        <div className="photo-room__filmstrip" ref={stripRef} role="group" aria-label="Choose a photograph">
                          {images.map((photo, photoIndex) => (
                            <button type="button" key={photo.src} aria-label={`Show ${photo.title}`} aria-pressed={index === photoIndex} onClick={() => setIndex(photoIndex)}>
                              <img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                              <span aria-hidden="true">{number(photoIndex + 1)}</span>
                            </button>
                          ))}
                        </div>
                        <p className="photo-room__help">Choose a thumbnail, use the arrows, or swipe the photo.</p>
                      </div>
                    ) : (
                      <div className="photo-room__grid" aria-label="All photographs in this collection">
                        {images.map((photo, photoIndex) => (
                          <button className="photo-room__grid-photo" type="button" key={photo.src} aria-label={`Open ${photo.title}`} onClick={() => setExpandedIndex(photoIndex)}>
                            <span className="photo-room__grid-image"><img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" /><span aria-hidden="true">↗</span></span>
                            <span className="photo-room__grid-label"><span>{number(photoIndex + 1)}</span><strong>{photo.title}</strong></span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <section className="photo-room__empty" aria-labelledby="empty-collection-title">
                    <span className="photo-room__empty-number" aria-hidden="true">00</span>
                    <span className="tape-label">Collection not added</span>
                    <h2 id="empty-collection-title">{collectionKey === 'movies' ? 'No movie photographs selected.' : 'No sports photographs added yet.'}</h2>
                    <p>{collectionKey === 'movies' ? 'This collection is intentionally blank for now.' : 'This space is waiting for my first sports photographs.'}</p>
                    <Link to="/photos">View the photographs <span aria-hidden="true">↗</span></Link>
                  </section>
                )}
              </div>
            </div>
            <div className="photo-room__bottom"><span>Original photographs / Jack Miller</span><span>{images.length ? 'Gallery / Grid / Full screen' : 'Work in progress'}</span></div>
          </div>
        </section>
        <section className="photo-room__notes studio-wrap" aria-labelledby="photo-notes-title">
          <div><span className="tape-label">Behind the camera</span><h2 id="photo-notes-title">A bit about<br /><em>these photos.</em></h2></div>
          <div><p>{collectionKey === 'countryside' ? 'Ten photographs from woodland paths, fields, railway crossings and quiet water.' : collectionKey === 'animals' ? 'Four photographs following one swan through reeds and reflections on the water.' : images.length ? 'The countryside set has ten photographs. The wildlife set follows one swan over four photographs. Sports and movie photographs will be added later.' : 'There are countryside and wildlife photographs to see in the other collections.'}</p><Link to="/about">About Jack <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>
      {expandedIndex !== null ? <ImageLightbox images={images} initialIndex={expandedIndex} onClose={() => setExpandedIndex(null)} /> : null}
    </>
  );
};

export default PhotographyGallery;
