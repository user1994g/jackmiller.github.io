import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavRoot = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  padding: clamp(0.7rem, 1.8vw, 1rem) var(--gutter);
`;

const NavFrame = styled.div`
  position: relative;
  width: min(var(--content-max), 100%);
  pointer-events: none;
`;

const NavBar = styled(motion.div)`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: 3.6rem;
  padding: 0.55rem 0.7rem 0.55rem 1rem;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(8, 10, 14, 0.78);
  backdrop-filter: blur(12px);
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.38);
`;

const BrandButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.96);
  cursor: pointer;
  font-size: clamp(0.75rem, 1vw, 0.9rem);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 0.5rem;
  border-radius: 999px;
  transition: background 0.2s ease;

  &::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 6px rgba(240, 216, 173, 0.14);
  }

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const DesktopMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  @media (max-width: 56em) {
    display: none;
  }
`;

const MenuButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.18)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'rgba(255, 249, 235, 0.98)' : 'rgba(255, 255, 255, 0.86)')};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.73rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
    outline: none;
  }
`;

const MobileToggle = styled.button`
  display: none;

  @media (max-width: 56em) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 0.45rem 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.85);
      outline-offset: 2px;
    }
  }
`;

const MobilePanel = styled(motion.ul)`
  pointer-events: auto;
  position: absolute;
  top: calc(100% + 0.55rem);
  right: 0;
  list-style: none;
  width: min(21rem, 100%);
  margin: 0;
  padding: 0.6rem;
  display: grid;
  gap: 0.35rem;

  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  background: rgba(8, 10, 14, 0.94);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.45);

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const MobileItem = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  text-align: left;
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.18)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'rgba(255, 249, 235, 0.98)' : 'rgba(255, 255, 255, 0.92)')};
  padding: 0.72rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.14);
    outline: none;
  }
`;

const Backdrop = styled(motion.button)`
  position: fixed;
  inset: 0;
  z-index: 50;
  border: none;
  background: rgba(3, 4, 7, 0.36);

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const menuItems = [
  { label: 'Home', type: 'scroll', target: '#home' },
  { label: 'About', type: 'scroll', target: '#about' },
  { label: 'Videos', type: 'route', path: '/videos' },
  { label: 'Gallery', type: 'scroll', target: '#shop' },
  { label: 'Contact', type: 'scroll', target: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scroll } = useLocomotiveScroll();
  const location = useLocation();
  const navigate = useNavigate();

  const panelId = useMemo(() => 'mobile-navigation-panel', []);

  const scrollToTarget = useCallback((target) => {
    const element = document.querySelector(target);
    if (!element) return;

    if (scroll) {
      scroll.scrollTo(element, {
        offset: -88,
        duration: 1100,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scroll]);

  const handleMenuSelect = (item) => {
    if (item.type === 'route') {
      if (location.pathname !== item.path) {
        navigate(item.path);
      }
      setOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTarget: item.target } });
      setOpen(false);
      return;
    }

    scrollToTarget(item.target);
    setOpen(false);
  };

  const handleBrandClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setOpen(false);
      return;
    }

    scrollToTarget('#home');
    setOpen(false);
  };

  const isActiveItem = (item) => {
    if (item.type === 'route') {
      return item.path === location.pathname;
    }

    return item.label === 'Home' && location.pathname === '/';
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.scrollTarget) {
      return;
    }

    const target = location.state.scrollTarget;
    let frameId = null;
    let tries = 0;

    const runScrollWhenReady = () => {
      const element = document.querySelector(target);

      if (!element && tries < 10) {
        tries += 1;
        frameId = window.requestAnimationFrame(runScrollWhenReady);
        return;
      }

      scrollToTarget(target);
      navigate('/', { replace: true, state: null });
    };

    frameId = window.requestAnimationFrame(runScrollWhenReady);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [location.pathname, location.state, navigate, scrollToTarget]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 56em)');

    const handleMediaChange = (event) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    mediaQuery.addListener(handleMediaChange);
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <NavRoot aria-label="Primary">
        <NavFrame>
          <NavBar
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <BrandButton type="button" onClick={handleBrandClick}>
              Jack Miller
            </BrandButton>

            <DesktopMenu>
              {menuItems.map((item) => (
                <li key={item.label}>
                  <MenuButton
                    type="button"
                    onClick={() => handleMenuSelect(item)}
                    $active={isActiveItem(item)}
                  >
                    {item.label}
                  </MenuButton>
                </li>
              ))}
            </DesktopMenu>

            <MobileToggle
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-controls={panelId}
              aria-expanded={open}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {open ? 'Close' : 'Menu'}
            </MobileToggle>
          </NavBar>

          <AnimatePresence>
            {open && (
              <MobilePanel
                id={panelId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
              >
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <MobileItem
                      type="button"
                      onClick={() => handleMenuSelect(item)}
                      $active={isActiveItem(item)}
                    >
                      {item.label}
                    </MobileItem>
                  </li>
                ))}
              </MobilePanel>
            )}
          </AnimatePresence>
        </NavFrame>
      </NavRoot>

      <AnimatePresence>
        {open && (
          <Backdrop
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
