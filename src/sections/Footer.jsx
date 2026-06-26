import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: min(1200px, 92vw);
  margin: var(--section-gap) auto 2.5rem;
  padding: clamp(0.9rem, 2vw, 1.2rem);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 12, 18, 0.62);
`;

const Bottom = styled(motion.div)`
  display: grid;
  justify-items: center;
  text-align: center;

  span {
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.82rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

const Footer = () => {
  return (
    <Section id="contact">
      <Bottom initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <span>Available for selected collaborations</span>
      </Bottom>
    </Section>
  );
};

export default Footer;
