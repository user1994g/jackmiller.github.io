import React, { useEffect, useRef } from 'react';
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

const ImageLightbox = ({ image, onClose }) => {
  const dialogRef = useRef(null);

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
  }, [onClose]);

  if (!image || typeof document === 'undefined') return null;

  return createPortal(
    <div className="image-lightbox" role="presentation" onMouseDown={onClose}>
      <div
        className="image-lightbox__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Expanded view: ${image.alt}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="image-lightbox__bar">
          <span>Contact print / enlarged</span>
          <button type="button" onClick={onClose}>Close <span aria-hidden="true">×</span></button>
        </div>
        <img src={image.src} alt={image.alt} loading="eager" decoding="async" />
      </div>
    </div>,
    document.body,
  );
};

export default ImageLightbox;
