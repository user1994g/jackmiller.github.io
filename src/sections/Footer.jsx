import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: min(1200px, 92vw);
  margin: var(--section-gap) auto 2.5rem;
  padding: clamp(1rem, 2.4vw, 1.4rem);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(12, 13, 18, 0.7);
`;

const Bottom = styled(motion.div)`
  display: grid;
  gap: 0.7rem;
  justify-items: center;
  text-align: center;

  span {
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.82rem;
    letter-spacing: 0.04em;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 255, 255, 0.84);
    padding: 0.2rem 0.35rem;
    border-radius: 6px;
  }

  a:hover,
  a:focus-visible {
    color: rgba(255, 255, 255, 0.98);
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }
`;

const Footer = () => {
  return (
    <Section id="contact">
      <Bottom initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <NavLinks aria-label="Footer navigation">
          <a href="/#">Home</a>
          <a href="/#about">About</a>
          <a href="/#shop">Photos</a>
          <a href="/#contact">Contact</a>
          <a href="/#/videos">Videos</a>
        </NavLinks>
        <span>&copy; 2026 Jack Miller. All Rights Reserved.</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
