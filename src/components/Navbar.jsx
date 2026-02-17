import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import styled from 'styled-components';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  width: min(980px, calc(100% - 2rem));
  padding: 0.65rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(10, 10, 14, 0.62);
  backdrop-filter: blur(10px);
`;

const Tag = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.76);
  padding-left: 0.6rem;

  @media (max-width: 48em) {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
  }
`;

const DesktopMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 48em) {
    display: none;
  }
`;

const MenuButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.84);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

const MobileToggle = styled.button`
  display: none;

  @media (max-width: 48em) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    padding: 0.38rem 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.7rem;
    cursor: pointer;
  }
`;

const MobilePanel = styled(motion.ul)`
  position: fixed;
  top: calc(1rem + 3.2rem);
  right: 1rem;
  z-index: 20;
  list-style: none;
  min-width: 13rem;

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 16px;
  background: rgba(10, 10, 14, 0.9);
  backdrop-filter: blur(10px);
  padding: 0.65rem;

  display: none;

  @media (max-width: 48em) {
    display: block;
  }
`;

const MobileItem = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  text-align: left;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.7rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const menuItems = [
  { label: 'home', target: '#home' },
  { label: 'about', target: '.about' },
  { label: 'gallery', target: '#shop' },
  { label: 'highlights', target: '.new-arrival' },
  { label: 'contact', target: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
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

    setOpen(false);
  };

  return (
    <>
      <NavContainer
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Tag>Navigate</Tag>

        <DesktopMenu>
          {menuItems.map((item) => (
            <li key={item.target}>
              <MenuButton type="button" onClick={() => handleScroll(item.target)}>
                {item.label}
              </MenuButton>
            </li>
          ))}
        </DesktopMenu>

        <MobileToggle type="button" onClick={() => setOpen((prev) => !prev)}>
          {open ? 'close' : 'menu'}
        </MobileToggle>
      </NavContainer>

      {open && (
        <MobilePanel
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {menuItems.map((item) => (
            <li key={item.target}>
              <MobileItem type="button" onClick={() => handleScroll(item.target)}>
                {item.label}
              </MobileItem>
            </li>
          ))}
        </MobilePanel>
      )}
    </>
  );
};

export default Navbar;
