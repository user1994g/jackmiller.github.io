import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  left: max(1rem, env(safe-area-inset-left));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 90;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--ink-2);
  color: var(--acid);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  transform: translateY(${({ $show }) => ($show ? '0' : '10px')});
  transition: opacity 0.25s ease, transform 0.25s ease;

  &:focus-visible {
    outline: 2px solid var(--acid);
    outline-offset: 3px;
  }
`;

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Button
      type="button"
      $show={show}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      UP
    </Button>
  );
};

export default BackToTop;
