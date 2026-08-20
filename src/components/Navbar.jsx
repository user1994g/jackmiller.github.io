import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavRoot = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ $menuOpen }) => ($menuOpen ? 130 : 90)};
  display: flex;
  justify-content: center;
  padding: calc(0.7rem + max(0px, env(safe-area-inset-top))) var(--gutter);
`;

const NavFrame = styled.div`
  width: min(var(--content-max), 100%);
`;

const NavBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  min-height: 3.4rem;
  padding: 0.4rem 0.45rem 0.4rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(8, 7, 10, 0.72);
  backdrop-filter: blur(16px) saturate(1.2);
`;

const BrandButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.45rem 0.4rem;

  span {
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
    background: var(--signal);
    box-shadow: 0 0 0 5px rgba(255, 61, 31, 0.16);
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DesktopMenu = styled.div`
  display: none;
  align-items: center;
  gap: 0.15rem;

  @media (min-width: 56.01em) {
    display: flex;
  }
`;

const DesktopMenuItem = styled.div`
  position: relative;
`;

const MenuButton = styled.a`
  display: inline-flex;
  padding: 0.52rem 0.7rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ $active }) => ($active ? 'var(--ink)' : 'rgba(243, 235, 221, 0.78)')};
  background: ${({ $active }) => ($active ? 'var(--acid)' : 'transparent')};

  &:hover,
  &:focus-visible {
    color: ${({ $active }) => ($active ? 'var(--ink)' : 'var(--paper)')};
    outline: none;
  }
`;

const DropdownToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.52rem 0.7rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? 'var(--ink)' : 'rgba(243, 235, 221, 0.78)')};
  background: ${({ $active }) => ($active ? 'var(--acid)' : 'transparent')};
  cursor: pointer;
`;

const DropdownCaret = styled.i`
  width: 0.4rem;
  height: 0.4rem;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(${({ $open }) => ($open ? '-135deg' : '45deg')}) translateY(-1px);
`;

const DropdownPanel = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.45rem);
  right: 0;
  min-width: 11.5rem;
  padding: 0.4rem;
  border: 1px solid var(--line);
  border-radius: 1rem;
  background: rgba(12, 11, 16, 0.96);
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.62rem 0.7rem;
  border-radius: 0.7rem;
  font-size: 0.78rem;
  color: ${({ $disabled }) => ($disabled ? 'rgba(243, 235, 221, 0.32)' : 'var(--paper)')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  text-align: left;

  &:hover {
    background: ${({ $disabled }) => ($disabled ? 'transparent' : 'rgba(198, 240, 77, 0.12)')};
  }
`;

const DesktopSearchForm = styled.form`
  display: none;
  align-items: center;
  gap: 0.25rem;
  padding: 0.18rem;
  border: 1px solid var(--line);
  border-radius: 999px;

  @media (min-width: 56.01em) {
    display: flex;
  }
`;

const SearchInput = styled.input`
  width: 7.5rem;
  border: 0;
  background: transparent;
  padding: 0.42rem 0.55rem;
  font-size: 0.74rem;
  color: var(--paper);

  &:focus {
    outline: none;
  }
`;

const SearchSubmit = styled.button`
  padding: 0.38rem 0.62rem;
  border-radius: 999px;
  background: var(--signal);
  color: var(--paper);
  font-size: 0.68rem;
  font-weight: 800;
  cursor: pointer;
`;

const MobileToggle = styled.button`
  display: inline-flex;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const MobilePanel = styled(motion.div)`
  margin-top: 0.65rem;
  padding: 0.7rem;
  border: 1px solid var(--line);
  border-radius: 1.4rem;
  background: rgba(8, 7, 10, 0.96);
  display: grid;
  gap: 0.25rem;

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const MobileListItem = styled(motion.div)``;

const MobileItem = styled.a`
  display: flex;
  width: 100%;
  padding: 0.9rem 0.85rem;
  border-radius: 1rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? 'var(--ink)' : 'var(--paper)')};
  background: ${({ $active }) => ($active ? 'var(--acid)' : 'transparent')};
  text-align: left;
  cursor: pointer;
`;

const MobileSubmenu = styled.div`
  display: grid;
  gap: 0.2rem;
  padding: 0.2rem 0 0.4rem 0.7rem;
`;

const MobileSubItem = styled.a`
  display: block;
  padding: 0.7rem 0.75rem;
  border-radius: 0.8rem;
  color: ${({ $disabled }) => ($disabled ? 'rgba(243, 235, 221, 0.32)' : 'var(--paper-soft)')};
  font-size: 0.92rem;
  text-align: left;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

const Backdrop = styled(motion.button)`
  position: fixed;
  inset: 0;
  z-index: 125;
  border: none;
  background: rgba(4, 4, 7, 0.55);

  @media (min-width: 56.01em) {
    display: none;
  }
`;

const fmpItems = [
  { label: 'Level 2', type: 'route', path: '/fmp-level-2' },
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
    action: { type: 'route', path: '/write-ups' },
  },
  {
    keywords: ['level 2', 'dark echoes', '1939'],
    action: { type: 'route', path: '/fmp-level-2' },
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
  '/fmp-level-2': '/fmp-level-2/',
};

const scrollSeoPaths = {
  '#home': '/',
  '#shop': '/photos/',
  '#contact': '/contact/',
  '#about': '/about/',
};

const mobilePanelVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, staggerChildren: 0.045 } },
  exit: { opacity: 0, y: -10, scale: 0.985, transition: { duration: 0.16 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [desktopFmpOpen, setDesktopFmpOpen] = useState(false);
  const [mobileFmpOpen, setMobileFmpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scroll = null;
  const location = useLocation();
  const navigate = useNavigate();
  const panelId = useMemo(() => 'mobile-navigation-panel', []);

  const getSeoHref = useCallback((item) => {
    if (!item) return '/';
    if (item.type === 'route') return routeSeoPaths[item.path] || '/';
    if (item.type === 'scroll') return scrollSeoPaths[item.target] || '/';
    return '/';
  }, []);

  const scrollToTarget = useCallback((target) => {
    const element = document.querySelector(target);
    if (!element) return;
    if (scroll) {
      scroll.scrollTo(element, { offset: -88, duration: 1100, easing: [0.25, 0.0, 0.35, 1.0] });
      return;
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scroll]);

  const handleMenuSelect = (item) => {
    if (!item || item.type === 'disabled' || item.type === 'dropdown') return;

    if (item.type === 'route') {
      if (item.path === '/' && location.pathname === '/') {
        scrollToTarget('#home');
        setOpen(false);
        setDesktopFmpOpen(false);
        setMobileFmpOpen(false);
        return;
      }
      if (location.pathname !== item.path) {
        if (item.state) navigate(item.path, { state: item.state });
        else navigate(item.path);
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
    if (!normalizedQuery) return;
    const match = lookupTargets.find(({ keywords }) =>
      keywords.some((keyword) => normalizedQuery.includes(keyword)),
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
    } else {
      scrollToTarget('#home');
    }
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
    if (item.type === 'dropdown') return item.items?.some((child) => isActiveItem(child));
    if (item.type === 'route') return item.path === location.pathname;
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
    if (location.pathname !== '/' || !location.state?.scrollTarget) return;
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
      if (frameId !== null) window.cancelAnimationFrame(frameId);
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
    if (!open) return undefined;
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <>
      <NavRoot aria-label="Primary" $menuOpen={open}>
        <NavFrame>
          <NavBar
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandButton as="a" href="/" onClick={handleBrandAnchor}>
              <span />
              Jack Miller
            </BrandButton>

            <RightControls>
              <DesktopMenu>
                {menuItems.map((item) => (
                  <DesktopMenuItem
                    key={item.label}
                    aria-hidden={item.utility ? 'true' : undefined}
                    style={item.utility ? { display: 'none' } : undefined}
                    onMouseEnter={() => item.type === 'dropdown' && setDesktopFmpOpen(true)}
                    onMouseLeave={() => item.type === 'dropdown' && setDesktopFmpOpen(false)}
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
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18 }}
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
              <MobilePanel id={panelId} variants={mobilePanelVariants} initial="hidden" animate="visible" exit="exit">
                {menuItems.filter((item) => !item.utility).map((item) => (
                  <MobileListItem key={item.label} variants={mobileItemVariants}>
                    {item.type === 'dropdown' ? (
                      <>
                        <MobileItem
                          as="button"
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
                              transition={{ duration: 0.2 }}
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
