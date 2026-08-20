import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(2, 3, 7, 0.92);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
`;

const Dialog = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(3.2rem, 8vw, 4rem) clamp(0.7rem, 2vw, 1.2rem) clamp(0.8rem, 2vw, 1.2rem);
  overflow: hidden;

  img {
    width: auto;
    height: auto;
    max-width: calc(100vw - 1.6rem);
    max-height: calc(100dvh - 4.6rem);
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 999px;
  background: rgba(6, 7, 10, 0.86);
  color: #ffffff;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.5rem 0.82rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    outline: none;
  }
`;

const lockKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

const isHomeHashRoute = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const hashPath = (window.location.hash || '#/').replace(/^#/, '');
  return hashPath === '/' || hashPath === '' || hashPath.startsWith('/?');
};

const ImageLightbox = ({ image, onClose }) => {
  const scroll = null;

  useEffect(() => {
    const savedScrollY = window.scrollY;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.touchAction = 'none';

    if (scroll && typeof scroll.stop === 'function') {
      scroll.stop();
    }

    const preventScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (lockKeys.has(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeydown, true);

    return () => {
      window.removeEventListener('wheel', preventScroll, true);
      window.removeEventListener('touchmove', preventScroll, true);
      window.removeEventListener('keydown', handleKeydown, true);

      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.touchAction = previousBodyTouchAction;

      if (isHomeHashRoute()) {
        window.scrollTo(0, savedScrollY);

        if (scroll && typeof scroll.start === 'function') {
          scroll.start();
        }
        if (scroll && typeof scroll.update === 'function') {
          scroll.update();
        }
      }
    };
  }, [onClose, scroll]);

  if (!image || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <Overlay
      role="presentation"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label="Expanded photo view"
        onClick={(event) => event.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <CloseButton type="button" onClick={onClose} autoFocus>
          Close
        </CloseButton>
        <img src={image.src} alt={image.alt} loading="eager" />
      </Dialog>
    </Overlay>,
    document.body,
  );
};

export default ImageLightbox;
