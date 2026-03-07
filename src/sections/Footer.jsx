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
  gap: 0.72rem;
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
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: rgba(255, 255, 255, 0.86);
    padding: 0.24rem 0.4rem;
    border-radius: 6px;
  }

  a:hover,
  a:focus-visible {
    color: rgba(255, 255, 255, 0.98);
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }
`;

const SocialLinks = styled.nav`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-size: 0.73rem;
    letter-spacing: 0.06em;
    color: rgba(240, 216, 173, 0.9);
    padding: 0.2rem 0.36rem;
    border: 1px solid rgba(240, 216, 173, 0.34);
    border-radius: 999px;
  }

  a:hover,
  a:focus-visible {
    color: rgba(252, 240, 216, 0.98);
    border-color: rgba(240, 216, 173, 0.82);
    background: rgba(240, 216, 173, 0.11);
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
          <a href="/#/videos">Videos</a>
          <a href="/#contact">Contact</a>
          <a href="/site-links.html">Site Map</a>
          <a href="/sitemap.xml">XML Sitemap</a>
        </NavLinks>

        <SocialLinks aria-label="Social profiles">
          <a href="https://github.com/user1994g" target="_blank" rel="noopener noreferrer me">GitHub</a>
          <a href="https://www.instagram.com/jackmillermedia/" target="_blank" rel="noopener noreferrer me">Instagram</a>
          <a href="https://www.youtube.com/@jackmillermedia" target="_blank" rel="noopener noreferrer me">YouTube</a>
        </SocialLinks>

        <span>&copy; 2026 Jack Miller. All Rights Reserved.</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
