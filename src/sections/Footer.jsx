import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.footer`
  width: min(var(--content-max), 100%);
  margin: 0 auto 2rem;
  padding: 0 var(--gutter);
`;

const Panel = styled.div`
  display: grid;
  gap: 1rem;
  padding: clamp(1.2rem, 3vw, 1.8rem);
  border-radius: 1.6rem;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 88% 0%, rgba(255, 61, 31, 0.18), transparent 28%),
    rgba(18, 16, 23, 0.86);
`;

const Line = styled.p`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--paper);
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.1rem;

  a {
    color: rgba(243, 235, 221, 0.7);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  a:hover,
  a:focus-visible {
    color: var(--acid);
    outline: none;
  }
`;

const Footer = () => {
  return (
    <Section id="contact">
      <Panel>
        <Line>Available for selected collaborations.</Line>
        <FooterLinks aria-label="Site policies">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms and Editorial Standards</Link>
        </FooterLinks>
      </Panel>
    </Section>
  );
};

export default Footer;
