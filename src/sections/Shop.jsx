import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ImageLightbox from '../components/ImageLightbox';
import galleryPhotos from '../content/gallery';
import useStudioMotion from '../hooks/useStudioMotion';

const Shop = ({ fullPage = false }) => {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);
  useStudioMotion(sectionRef);

  return (
    <section className="contact-sheet" id="photos" ref={sectionRef} aria-labelledby={fullPage ? 'photos-gallery-title' : 'gallery-title'}>
      <div className="studio-wrap">
        <header className="contact-sheet__header" data-reveal>
          <div>
            <span className="tape-label">Contact sheet · 01—10</span>
            <h2 id={fullPage ? 'photos-gallery-title' : 'gallery-title'}>{fullPage ? 'The full contact sheet' : 'Visual Narratives'}</h2>
          </div>
          <div>
            <p className="studio-copy">An original countryside sequence built around paths, quiet water, spring light, and the moment just before something changes.</p>
            {!fullPage ? <Link className="studio-link-button studio-button--ghost" to="/photos">Open full gallery <span aria-hidden="true">↗</span></Link> : null}
          </div>
        </header>

        <div className="contact-sheet__grid" data-stagger>
          {galleryPhotos.map((photo, index) => (
            <article
              className="photo-print"
              key={photo.title}
              style={{ '--tilt': photo.tilt }}
            >
              <button type="button" aria-label={`Open ${photo.title}`} onClick={() => setActiveImage({ src: photo.src, alt: photo.alt })}>
                <figure>
                  <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                  <figcaption><span>{String(index + 1).padStart(2, '0')} · {photo.title}</span><span>{photo.note}</span></figcaption>
                </figure>
              </button>
            </article>
          ))}
        </div>
      </div>
      {activeImage ? <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} /> : null}
    </section>
  );
};

export default Shop;
