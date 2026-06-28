import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const subtleDrift = keyframes`
  0%,
  100% {
    opacity: 0.42;
  }

  50% {
    opacity: 0.62;
  }
`;

const NavRoot = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  justify-content: center;
  padding: calc(clamp(0.7rem, 1.8vw, 1rem) + max(0px, env(safe-area-inset-top, 0px))) var(--gutter);

  @media (max-width: 56em) {
    padding: calc(0.65rem + max(0px, env(safe-area-inset-top, 0px))) 0.75rem;
  }
`;

const NavFrame = styled.div`
  position: relative;
  width: min(var(--content-max), 100%);
  overflow: visible;
  pointer-events: none;
`;

const NavBar = styled(motion.div)`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.72rem;
  width: 100%;
  min-height: 3.6rem;
  padding: 0.55rem 0.7rem 0.55rem 1rem;
  position: relative;
  overflow: visible;

  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(180deg, rgba(11, 12, 15, 0.86) 0%, rgba(8, 9, 12, 0.88) 100%),
    radial-gradient(circle at 50% -40%, rgba(255, 255, 255, 0.08), transparent 52%);
  backdrop-filter: blur(10px) saturate(1.05);
  box-shadow:
    0 20px 44px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -24px 32px rgba(0, 0, 0, 0.28);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% -38%, rgba(255, 255, 255, 0.12), transparent 46%),
      linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.06) 48%, transparent 72%);
    animation: ${subtleDrift} 7s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  @media (max-width: 56em) {
    min-height: 3.25rem;
    padding: 0.48rem 0.55rem 0.48rem 0.75rem;
    border-radius: 12px;
  }
`;

const BrandButton = styled.button`
  border: none;
  background: transparent;
  color: rgba(252, 252, 252, 0.95);
  cursor: pointer;
  font-size: clamp(0.75rem, 1vw, 0.9rem);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.56rem;
  border-radius: 999px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease;

  &::before {
    content: '';
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: rgba(240, 216, 173, 0.88);
    box-shadow:
      0 0 0 5px rgba(240, 216, 173, 0.12),
      0 0 14px rgba(240, 216, 173, 0.2);
  }

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    transform: translateY(-1px);
    outline: none;
  }

  @media (max-width: 23rem) {
    max-width: 10.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 0.1em;
  }
`;

const DesktopMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.28rem;

  @media (max-width: 56em) {
    display: none;
  }
`;

const DesktopMenuItem = styled.li`
  position: relative;
  list-style: none;
  padding-bottom: 0.45rem;
  margin-bottom: -0.45rem;
`;

const MenuButton = styled.button`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.28)' : 'transparent')};
  border-radius: 999px;
  padding: 0.45rem 0.92rem;
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.015)')};
  color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.98)' : 'rgba(229, 231, 235, 0.86)')};
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 0.73rem;
  cursor: pointer;
  transform: translateY(0);
  transition: all 0.22s ease;

  &::after {
    content: '';
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: 0.18rem;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(240, 216, 173, 0.88) 50%, transparent 100%);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.24s ease;
  }

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
    transform: translateY(-1px);
    outline: none;

    &::after {
      transform: scaleX(1);
    }
  }
`;

const DropdownToggle = styled(MenuButton)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
`;

const DropdownCaret = styled.span`
  display: inline-block;
  width: 0.45rem;
  height: 0.45rem;
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  transform: rotate(${({ $open }) => ($open ? '-135deg' : '45deg')}) translateY(${({ $open }) => ($open ? '1px' : '-1px')});
  transition: transform 0.2s ease;
`;

const DropdownPanel = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.14rem);
  left: 50%;
  z-index: 110;
  min-width: 13rem;
  padding: 0.5rem;
  display: grid;
  gap: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background:
    linear-gradient(180deg, rgba(8, 9, 12, 0.97) 0%, rgba(6, 7, 10, 0.985) 100%),
    radial-gradient(circle at 50% -45%, rgba(255, 255, 255, 0.08), transparent 56%);
  box-shadow:
    0 22px 52px rgba(0, 0, 0, 0.58),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  transform: translateX(-50%);
`;

const DropdownItem = styled.button`
  width: 100%;
  border: 1px solid ${({ $disabled }) => ($disabled ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  border-radius: 10px;
  padding: 0.72rem 0.8rem;
  background: ${({ $disabled }) => ($disabled ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.03)')};
  color: ${({ $disabled }) => ($disabled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(245, 247, 250, 0.94)')};
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 0.72rem;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    ${({ $disabled }) => ($disabled ? '' : `
      border-color: rgba(255, 255, 255, 0.26);
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
      outline: none;
    `)}
  }
`;

const DesktopSearchForm = styled.form`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  background: rgba(7, 8, 11, 0.84);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 8px 22px rgba(0, 0, 0, 0.32);
  padding: 0.27rem 0.27rem 0.27rem 0.62rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: rgba(240, 216, 173, 0.56);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 10px 26px rgba(0, 0, 0, 0.36),
      0 0 0 1px rgba(240, 216, 173, 0.2);
  }

  @media (max-width: 56em) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: clamp(7rem, 12vw, 9.5rem);
  border: none;
  background: transparent;
  color: rgba(242, 244, 247, 0.96);
  font-size: 0.76rem;
  letter-spacing: 0.03em;

  @media (max-width: 56em) {
    width: min(36vw, 7rem);
    font-size: 0.78rem;
  }

  &::placeholder {
    color: rgba(204, 210, 218, 0.58);
  }

  &:focus {
    outline: none;
  }
`;

const SearchSubmit = styled.button`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(34, 35, 40, 0.92), rgba(18, 19, 24, 0.96));
  color: rgba(251, 252, 253, 0.98);
  padding: 0.34rem 0.65rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  cursor: pointer;
  transition: border-color 0.22s ease, transform 0.22s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -140%;
    width: 60%;
    background: linear-gradient(100deg, transparent 0%, rgba(240, 216, 173, 0.45) 50%, transparent 100%);
    transform: skewX(-20deg);
    transition: left 0.55s ease;
  }

  @media (max-width: 56em) {
    padding: 0.32rem 0.56rem;
  }

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.6);
    transform: translateY(-1px);
    outline: none;

    &::before {
      left: 145%;
    }
  }
`;

const RightControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const MobileToggle = styled.button`
  display: none;

  @media (max-width: 56em) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    background: rgba(10, 11, 14, 0.9);
    color: rgba(244, 246, 250, 0.96);
    padding: 0.45rem 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    font-size: 0.72rem;
    cursor: pointer;
    transition: all 0.22s ease;

    @media (max-width: 23rem) {
      padding: 0.42rem 0.65rem;
      letter-spacing: 0.06em;
    }

    &:hover,
    &:focus-visible {
      border-color: rgba(240, 216, 173, 0.58);
      background: rgba(15, 17, 21, 0.96);
      outline: none;
      transform: translateY(-1px);
    }
  }
`;

const MobilePanel = styled(motion.ul)`
  pointer-events: auto;
  position: fixed;
  top: calc(4.55rem + max(0px, env(safe-area-inset-top, 0px)));
  left: 0.75rem;
  right: 0.75rem;
  max-height: calc(100dvh - 5.25rem - max(0px, env(safe-area-inset-top, 0px)));
  list-style: none;
  margin: 0;
  padding: 0.7rem;
  display: grid;
  gap: 0.36rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(8, 9, 12, 0.97) 0%, rgba(6, 7, 10, 0.98) 100%),
    radial-gradient(circle at 48% -35%, rgba(255, 255, 255, 0.07), transparent 55%);
  box-shadow:
    0 22px 52px rgba(0, 0, 0, 0.56),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const MobileListItem = styled(motion.li)`
  list-style: none;
`;

const MobileSearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
  padding: 0.45rem 0.55rem;
  min-height: 3rem;

  &:focus-within {
    border-color: rgba(240, 216, 173, 0.52);
  }
`;

const MobileSearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: rgba(242, 244, 247, 0.95);
  font-size: 16px;
  line-height: 1.2;

  &::placeholder {
    color: rgba(204, 210, 218, 0.58);
  }

  &:focus {
    outline: none;
  }
`;

const MobileItem = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.28)' : 'transparent')};
  border-radius: 10px;
  text-align: left;
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)')};
  color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.99)' : 'rgba(233, 236, 241, 0.92)')};
  padding: 0.72rem;
  min-height: 3rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  cursor: pointer;
  transition: all 0.22s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0.72rem;
    right: 0.72rem;
    bottom: 0.34rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(240, 216, 173, 0.84), transparent);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.24s ease;
  }

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.32);
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
    outline: none;

    &::after {
      transform: scaleX(1);
    }
  }
`;

const MobileSubmenu = styled.div`
  display: grid;
  gap: 0.32rem;
  margin-top: 0.36rem;
  padding-left: 0;
`;

const MobileSubItem = styled(MobileItem)`
  padding: 0.64rem 0.72rem;
  font-size: 0.73rem;
  background: ${({ $disabled, $active }) => (
    $disabled
      ? 'rgba(255, 255, 255, 0.02)'
      : $active
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(255, 255, 255, 0.04)'
  )};
  color: ${({ $disabled, $active }) => (
    $disabled
      ? 'rgba(233, 236, 241, 0.42)'
      : $active
        ? 'rgba(255, 255, 255, 0.99)'
        : 'rgba(233, 236, 241, 0.88)'
  )};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};

  &:hover,
  &:focus-visible {
    ${({ $disabled }) => ($disabled ? '' : `
      border-color: rgba(255, 255, 255, 0.32);
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      outline: none;
    `)}
  }
`;

const Backdrop = styled(motion.button)`
  position: fixed;
  inset: 0;
  z-index: 50;
  border: none;
  background: linear-gradient(180deg, rgba(4, 4, 7, 0.42), rgba(4, 4, 7, 0.62));
  backdrop-filter: blur(2px);

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const fmpItems = [
  { label: 'Level 2', type: 'disabled' },
  {
    label: 'Level 3 Year 1',
    type: 'route',
    path: '/final-lesson',
    state: { allowUnlisted: true, unlisted: 'final-lesson', via: 'menu' },
  },
  { label: 'Level 3 Year 2', type: 'disabled' },
];

const menuItems = [
  { label: 'Home', type: 'route', path: '/' },
  { label: 'Videos', type: 'route', path: '/videos' },
  { label: '3D Art', type: 'route', path: '/3d-art' },
  { label: 'Gallery', type: 'scroll', target: '#shop' },
  { label: 'Write Ups', type: 'route', path: '/write-ups' },
  { label: 'Privacy', type: 'route', path: '/privacy', utility: true },
  { label: 'Terms', type: 'route', path: '/terms', utility: true },
  { label: 'FMP', type: 'dropdown', items: fmpItems },
];

const lookupTargets = [
  { keywords: ['home', 'start', 'top'], action: { type: 'route', path: '/' } },
  { keywords: ['video', 'videos', 'film', 'netflix'], action: { type: 'route', path: '/videos' } },
  { keywords: ['3d', '3dart', 'art', '3d art', 'three d', 'three d art'], action: { type: 'route', path: '/3d-art' } },
  { keywords: ['gallery', 'photo', 'photos', 'image', 'images', 'shop'], action: { type: 'scroll', target: '#shop' } },
  { keywords: ['contact', 'email'], action: { type: 'scroll', target: '#contact' } },
  {
    keywords: ['write ups', 'write up', 'write-ups', 'writeup', 'writeups', 'notes', 'blog'],
    action: {
      type: 'route',
      path: '/write-ups',
    },
  },
  {
    keywords: ['fmp 3', 'fmp3', 'final lesson', 'the final lesson'],
    action: {
      type: 'route',
      path: '/final-lesson',
      state: { allowUnlisted: true, unlisted: 'final-lesson', via: 'search' },
    },
  },
  {
    keywords: ['level 3 year 1', 'fmp level 3', 'fmp year 1'],
    action: {
      type: 'route',
      path: '/final-lesson',
      state: { allowUnlisted: true, unlisted: 'final-lesson', via: 'search' },
    },
  },
];

const routeSeoPaths = {
  '/': '/',
  '/videos': '/videos/',
  '/3d-art': '/3d-art/',
  '/write-ups': '/write-ups/',
  '/privacy': '/privacy/',
  '/terms': '/terms/',
  '/final-lesson': '/the-final-lesson/',
};

const scrollSeoPaths = {
  '#home': '/',
  '#shop': '/photos/',
  '#contact': '/contact/',
  '#about': '/about/',
};

const mobilePanelVariants = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.985,
    transition: {
      duration: 0.16,
      ease: 'easeIn',
    },
  },
};

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    x: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [desktopFmpOpen, setDesktopFmpOpen] = useState(false);
  const [mobileFmpOpen, setMobileFmpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const locoContext = useLocomotiveScroll();
  const scroll = locoContext?.scroll;
  const location = useLocation();
  const navigate = useNavigate();

  const panelId = useMemo(() => 'mobile-navigation-panel', []);

  const getSeoHref = useCallback((item) => {
    if (!item) return '/';

    if (item.type === 'route') {
      return routeSeoPaths[item.path] || '/';
    }

    if (item.type === 'scroll') {
      return scrollSeoPaths[item.target] || '/';
    }

    return '/';
  }, []);

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
    if (!item || item.type === 'disabled' || item.type === 'dropdown') {
      return;
    }

    if (item.type === 'route') {
      if (item.path === '/' && location.pathname === '/') {
        scrollToTarget('#home');
        setOpen(false);
        setDesktopFmpOpen(false);
        setMobileFmpOpen(false);
        return;
      }

      if (location.pathname !== item.path) {
        if (item.state) {
          navigate(item.path, { state: item.state });
        } else {
          navigate(item.path);
        }
      }
      setOpen(false);
      setDesktopFmpOpen(false);
      setMobileFmpOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTarget: item.target } });
      setOpen(false);
      setDesktopFmpOpen(false);
      setMobileFmpOpen(false);
      return;
    }

    scrollToTarget(item.target);
    setOpen(false);
    setDesktopFmpOpen(false);
    setMobileFmpOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return;
    }

    const match = lookupTargets.find(({ keywords }) =>
      keywords.some((keyword) => normalizedQuery.includes(keyword))
    );

    if (match) {
      handleMenuSelect(match.action);
      setSearchQuery('');
      setDesktopFmpOpen(false);
      setMobileFmpOpen(false);
    }
  };

  const handleBrandClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setOpen(false);
      setDesktopFmpOpen(false);
      setMobileFmpOpen(false);
      return;
    }

    scrollToTarget('#home');
    setOpen(false);
    setDesktopFmpOpen(false);
    setMobileFmpOpen(false);
  };

  const handleAnchorSelect = (event, item) => {
    event.preventDefault();
    handleMenuSelect(item);
  };

  const handleBrandAnchor = (event) => {
    event.preventDefault();
    handleBrandClick();
  };

  const isActiveItem = (item) => {
    if (item.type === 'dropdown') {
      return item.items?.some((child) => isActiveItem(child));
    }

    if (item.type === 'route') {
      return item.path === location.pathname;
    }

    return item.label === 'Home' && location.pathname === '/';
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setDesktopFmpOpen(false);
        setMobileFmpOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopFmpOpen(false);
    setMobileFmpOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.scrollTarget) {
      return;
    }

    const target = location.state.scrollTarget;
    let frameId = null;
    const startedAt = performance.now();
    const maxWaitMs = 2200;

    const clearNavState = () => navigate('/', { replace: true, state: null });

    const runScrollWhenReady = () => {
      const element = document.querySelector(target);

      if (element) {
        scrollToTarget(target);
        clearNavState();
        return;
      }

      if (performance.now() - startedAt < maxWaitMs) {
        frameId = window.requestAnimationFrame(runScrollWhenReady);
        return;
      }

      clearNavState();
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
        setDesktopFmpOpen(false);
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
            initial={{ opacity: 0, y: -18, scale: 0.985, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandButton as="a" href="/" onClick={handleBrandAnchor}>
              Jack Miller
            </BrandButton>

            <RightControls>
              <DesktopMenu>
                {menuItems.map((item) => (
                  <DesktopMenuItem
                    key={item.label}
                    aria-hidden={item.utility ? 'true' : undefined}
                    style={item.utility ? { display: 'none' } : undefined}
                    onMouseEnter={() => {
                      if (item.type === 'dropdown') {
                        setDesktopFmpOpen(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.type === 'dropdown') {
                        setDesktopFmpOpen(false);
                      }
                    }}
                  >
                    {item.type === 'dropdown' ? (
                      <>
                        <DropdownToggle
                          type="button"
                          onClick={() => setDesktopFmpOpen((prev) => !prev)}
                          $active={isActiveItem(item)}
                          aria-expanded={desktopFmpOpen}
                          aria-haspopup="menu"
                        >
                          {item.label}
                          <DropdownCaret $open={desktopFmpOpen} />
                        </DropdownToggle>

                        <AnimatePresence>
                          {desktopFmpOpen && (
                            <DropdownPanel
                              initial={{ opacity: 0, y: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.985 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                              role="menu"
                              aria-label="FMP pages"
                            >
                              {item.items.map((child) => (
                                <DropdownItem
                                  key={child.label}
                                  as={child.type === 'disabled' ? 'button' : 'a'}
                                  href={child.type === 'disabled' ? undefined : getSeoHref(child)}
                                  type={child.type === 'disabled' ? 'button' : undefined}
                                  onClick={child.type === 'disabled' ? undefined : (event) => handleAnchorSelect(event, child)}
                                  $disabled={child.type === 'disabled'}
                                  disabled={child.type === 'disabled'}
                                  role="menuitem"
                                  aria-current={isActiveItem(child) ? 'page' : undefined}
                                >
                                  {child.label}
                                </DropdownItem>
                              ))}
                            </DropdownPanel>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <MenuButton
                        as="a"
                        href={getSeoHref(item)}
                        onClick={(event) => handleAnchorSelect(event, item)}
                        $active={isActiveItem(item)}
                        aria-current={isActiveItem(item) ? 'page' : undefined}
                      >
                        {item.label}
                      </MenuButton>
                    )}
                  </DesktopMenuItem>
                ))}
              </DesktopMenu>

              <DesktopSearchForm onSubmit={handleSearchSubmit} role="search" aria-label="Lookup navigation">
                <SearchInput
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Lookup..."
                  aria-label="Lookup section"
                />
                <SearchSubmit type="submit">Go</SearchSubmit>
              </DesktopSearchForm>

              <MobileToggle
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-controls={panelId}
                aria-expanded={open}
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {open ? 'Close' : 'Menu'}
              </MobileToggle>
            </RightControls>
          </NavBar>

          <AnimatePresence>
            {open && (
              <MobilePanel
                id={panelId}
                variants={mobilePanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MobileListItem variants={mobileItemVariants}>
                  <MobileSearchForm onSubmit={handleSearchSubmit} role="search" aria-label="Lookup navigation">
                    <MobileSearchInput
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Lookup..."
                      aria-label="Lookup section"
                    />
                    <SearchSubmit type="submit">Go</SearchSubmit>
                  </MobileSearchForm>
                </MobileListItem>

                {menuItems.map((item) => (
                  <MobileListItem key={item.label} variants={mobileItemVariants}>
                    {item.type === 'dropdown' ? (
                      <>
                        <MobileItem
                          type="button"
                          onClick={() => setMobileFmpOpen((prev) => !prev)}
                          $active={isActiveItem(item)}
                          aria-expanded={mobileFmpOpen}
                          aria-controls="mobile-fmp-submenu"
                        >
                          {item.label}
                        </MobileItem>
                        <AnimatePresence initial={false}>
                          {mobileFmpOpen && (
                            <motion.div
                              id="mobile-fmp-submenu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                              <MobileSubmenu>
                                {item.items.map((child) => (
                                  <MobileSubItem
                                    key={child.label}
                                    as={child.type === 'disabled' ? 'button' : 'a'}
                                    href={child.type === 'disabled' ? undefined : getSeoHref(child)}
                                    type={child.type === 'disabled' ? 'button' : undefined}
                                    onClick={child.type === 'disabled' ? undefined : (event) => handleAnchorSelect(event, child)}
                                    $active={isActiveItem(child)}
                                    $disabled={child.type === 'disabled'}
                                    disabled={child.type === 'disabled'}
                                    aria-current={isActiveItem(child) ? 'page' : undefined}
                                  >
                                    {child.label}
                                  </MobileSubItem>
                                ))}
                              </MobileSubmenu>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <MobileItem
                        as="a"
                        href={getSeoHref(item)}
                        onClick={(event) => handleAnchorSelect(event, item)}
                        $active={isActiveItem(item)}
                        aria-current={isActiveItem(item) ? 'page' : undefined}
                      >
                        {item.label}
                      </MobileItem>
                    )}
                  </MobileListItem>
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
