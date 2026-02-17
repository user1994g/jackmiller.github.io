import { motion } from 'framer-motion';
import React from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled from 'styled-components';

import StarIcon from '../assets/Svgs/star_white_48dp.svg';

const Section = styled.section`
  width: min(1200px, 92vw);
  margin: var(--section-gap) auto 2.5rem;
  padding: clamp(1.4rem, 3vw, 2rem);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(12, 13, 18, 0.75);
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    width: clamp(1.6rem, 2vw, 2rem);
  }

  h3 {
    font-family: 'Kaushan Script';
    font-size: clamp(1.4rem, 2.6vw, 2rem);
    font-weight: 300;
  }
`;

const Nav = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.55rem;

  @media (max-width: 48em) {
    justify-content: flex-start;
  }
`;

const NavButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.92);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.74rem;
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

const Bottom = styled(motion.div)`
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;

  span,
  a {
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.82rem;
    letter-spacing: 0.04em;
  }

  a:hover {
    color: #fff;
  }
`;

const links = [
  { label: 'home', target: '#home' },
  { label: 'about', target: '.about' },
  { label: 'gallery', target: '#shop' },
  { label: 'highlights', target: '.new-arrival' },
];

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    const elem = document.querySelector(id);
    if (!elem) return;

    if (scroll) {
      scroll.scrollTo(elem, {
        offset: -100,
        duration: 1200,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section id="contact">
      <Top>
        <Brand>
          <img width="96" height="96" src={StarIcon} alt="Star icon" />
          <h3>Jack Miller Portfolio</h3>
        </Brand>

        <Nav>
          {links.map((link) => (
            <li key={link.target}>
              <NavButton type="button" onClick={() => handleScroll(link.target)}>
                {link.label}
              </NavButton>
            </li>
          ))}
        </Nav>
      </Top>

      <Bottom initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <span>&copy; 2026 Jack Miller. All Rights Reserved.</span>
        <a href="mailto:jazzg869@gmail.com">jazzg869@gmail.com</a>
      </Bottom>
    </Section>
  );
};

export default Footer;
