import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  height: 3px;
  width: ${({ $p }) => `${$p * 100}%`};
  background: linear-gradient(90deg, var(--signal), var(--acid));
  pointer-events: none;
  transform-origin: 0 50%;
`;

const ScrollProgress = () => {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <Bar $p={p} role="presentation" />;
};

export default ScrollProgress;
