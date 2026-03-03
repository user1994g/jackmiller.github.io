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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  text-align: center;

  span {
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.82rem;
    letter-spacing: 0.04em;
  }
`;

const Footer = () => {
  return (
    <Section id="contact">
      <Bottom initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <span>&copy; 2026 Jack Miller. All Rights Reserved.</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
