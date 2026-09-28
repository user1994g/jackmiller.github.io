import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const makeBackgroundInert = (overlay) => {
  if (!overlay) return () => {};

  const changedElements = Array.from(document.body.children)
    .filter((element) => element !== overlay && element instanceof HTMLElement)
    .map((element) => ({
      element,
      hadInert: element.hasAttribute('inert'),
      ariaHidden: element.getAttribute('aria-hidden'),
    }));

  changedElements.forEach(({ element }) => {
    element.setAttribute('inert', '');
    element.setAttribute('aria-hidden', 'true');
  });

  return () => {
    changedElements.forEach(({ element, hadInert, ariaHidden }) => {
      if (!element.isConnected) return;

      if (!hadInert) element.removeAttribute('inert');
      if (ariaHidden === null) {
        element.removeAttribute('aria-hidden');
      } else {
        element.setAttribute('aria-hidden', ariaHidden);
      }
    });
  };
};

const ImageLightbox = ({ image, images, initialIndex = 0, onClose }) => {
  const dialogRef = useRef(null);
  const touchStartRef = useRef(null);
  const gallery = useMemo(() => {
    if (Array.isArray(images) && images.length) return images;
    return image ? [image] : [];
  }, [image, images]);
  const [currentIndex, setCurrentIndex] = useState(() => (
    Math.min(Math.max(initialIndex, 0), Math.max(gallery.length - 1, 0))
  ));
  const hasMultipleImages = gallery.length > 1;
  const currentImage = gallery[currentIndex];

  const showPrevious = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    const opener = document.activeElement;
    const scrollY = window.scrollY;
    const previous = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.classList.add('dialog-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const restoreBackground = makeBackgroundInert(dialog?.closest('.image-lightbox'));
    dialog?.querySelector('button')?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (hasMultipleImages && event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (hasMultipleImages && event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
        return;
      }

      if (hasMultipleImages && event.key === 'Home') {
        event.preventDefault();
        setCurrentIndex(0);
        return;
      }

      if (hasMultipleImages && event.key === 'End') {
        event.preventDefault();
        setCurrentIndex(gallery.length - 1);
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreBackground();
      document.body.classList.remove('dialog-open');
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      document.body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [gallery.length, hasMultipleImages, onClose, showNext, showPrevious]);

  const handleTouchStart = (event) => {
    if (!hasMultipleImages || event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || !hasMultipleImages || !event.changedTouches.length) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX < 0) showNext();
    else showPrevious();
  };

  if (!currentImage || typeof document === 'undefined') return null;

  return createPortal(
    <div className="image-lightbox" role="presentation" onMouseDown={onClose}>
      <div
        className="image-lightbox__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Expanded view: ${currentImage.alt}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="image-lightbox__bar">
          <span>
            Contact print / {String(currentIndex + 1).padStart(2, '0')} of {String(gallery.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={onClose}>Close <span aria-hidden="true">×</span></button>
        </div>
        <div
          className="image-lightbox__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {hasMultipleImages ? (
            <button
              className="image-lightbox__nav image-lightbox__nav--previous"
              type="button"
              aria-label="Previous photo"
              onClick={showPrevious}
            >
              <span aria-hidden="true">←</span>
            </button>
          ) : null}
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt}
            loading="eager"
            decoding="async"
          />
          {hasMultipleImages ? (
            <button
              className="image-lightbox__nav image-lightbox__nav--next"
              type="button"
              aria-label="Next photo"
              onClick={showNext}
            >
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>
        <div className="image-lightbox__caption" aria-live="polite">
          <strong>{currentImage.title || currentImage.alt}</strong>
          <span>{currentImage.note || (hasMultipleImages ? 'Swipe or use arrow keys' : 'Enlarged view')}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ImageLightbox;
