import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import leafyPath from '../assets/ArchivePhotos/leafy-path.jpg';
import swanReflection from '../assets/ArchivePhotos/swan-reflection.jpg';
import { PumpkinMark } from '../art/HalloweenArt';
import { HollyMark } from '../art/ChristmasArt';
import { BirthdaySun } from '../art/BirthdayArt';
import { PreferenceTriggers } from './VisitorPreferences';
import { focusableSelector, makeOutsideContentInert } from '../utils/dialogAccessibility';

const primaryLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: '3D Art', to: '/3d-art' },
  { label: 'Write Ups', to: '/write-ups' },
];

const photoLinks = [
  {
    label: 'Countryside',
    note: 'Field notes · 10 frames',
    to: '/photos/countryside',
    number: '01',
    tone: 'acid',
    image: leafyPath,
  },
  {
    label: 'Sports',
    note: 'Motion studies · In the edit',
    to: '/photos/sports',
    number: '02',
    tone: 'poppy',
  },
  {
    label: 'Movies',
    note: 'Film moods · Blank for now',
    to: '/photos/movies',
    number: '03',
    tone: 'violet',
  },
  {
    label: 'Animals',
    note: 'Wildlife encounters · 4 frames',
    to: '/photos/animals',
    number: '04',
    tone: 'sky',
    image: swanReflection,
  },
];

const PhotoMenuArtwork = ({ item }) => (
  <span className="photo-menu-art" aria-hidden="true">
    {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : null}
    {item.tone === 'poppy' ? (
      <span className="photo-menu-art__sport">
        <i />
        <b>00</b>
      </span>
    ) : null}
    <span className="photo-menu-art__crosshair">+</span>
  </span>
);

const fmpLinks = [
  { label: 'Level 2', note: 'The Dark Echoes of 1939', to: '/fmp-level-2' },
  {
    label: 'Final Lesson',
    note: 'Level 3 · Year 1',
    to: '/the-final-lesson',
  },
];

const activeLinkClass = ({ isActive }) =>
  `cut-nav__link${isActive ? ' cut-nav__link--active' : ''}`;

const mobileLinkClass = ({ isActive }) =>
  `cut-menu__link${isActive ? ' cut-menu__link--active' : ''}`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobilePhotosOpen, setMobilePhotosOpen] = useState(false);
  const [desktopPhotosOpen, setDesktopPhotosOpen] = useState(false);
  const [desktopFmpOpen, setDesktopFmpOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const menuCloseRef = useRef(null);
  const previousFocusRef = useRef(null);
  const desktopPhotosRef = useRef(null);
  const desktopPhotosButtonRef = useRef(null);
  const desktopPhotosFirstLinkRef = useRef(null);
  const desktopFmpRef = useRef(null);
  const desktopFmpButtonRef = useRef(null);
  const desktopFmpFirstLinkRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
    setMobilePhotosOpen(false);
    setDesktopPhotosOpen(false);
    setDesktopFmpOpen(false);
  }, [closeMenu, location.pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 68rem)');
    const handleBreakpointChange = (event) => {
      if (event.matches) {
        closeMenu();
      } else {
        setDesktopPhotosOpen(false);
        setDesktopFmpOpen(false);
      }
    };

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleBreakpointChange);
      return () => desktopQuery.removeEventListener('change', handleBreakpointChange);
    }

    desktopQuery.addListener(handleBreakpointChange);
    return () => desktopQuery.removeListener(handleBreakpointChange);
  }, [closeMenu]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const savedScrollY = window.scrollY;
    const openedPathname = window.location.pathname;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyOverflow = document.body.style.overflow;

    document.body.classList.add('menu-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    menuCloseRef.current?.focus({ preventScroll: true });
    const restoreOutsideContent = makeOutsideContentInert(menuRef.current);

    const focusFrame = window.requestAnimationFrame(() => {
      if (!menuRef.current?.contains(document.activeElement)) {
        menuCloseRef.current?.focus({ preventScroll: true });
      }
    });

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusable = Array.from(menuRef.current.querySelectorAll(focusableSelector)).filter(
        (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
      );

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!menuRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeydown);
      restoreOutsideContent();
      document.body.classList.remove('menu-open');
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      const routeChanged = window.location.pathname !== openedPathname;
      window.scrollTo(0, routeChanged ? 0 : savedScrollY);

      if (!routeChanged && previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => {
    if (!desktopPhotosOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!desktopPhotosRef.current?.contains(event.target)) {
        setDesktopPhotosOpen(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setDesktopPhotosOpen(false);
        desktopPhotosButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [desktopPhotosOpen]);

  useEffect(() => {
    if (!desktopFmpOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!desktopFmpRef.current?.contains(event.target)) {
        setDesktopFmpOpen(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setDesktopFmpOpen(false);
        desktopFmpButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [desktopFmpOpen]);

  const fmpActive = fmpLinks.some(({ to }) => location.pathname === to);
  const photosActive = location.pathname === '/photos' || location.pathname.startsWith('/photos/');

  return (
    <header className="cut-nav" data-menu-open={menuOpen ? 'true' : 'false'}>
      <nav className="cut-nav__bar studio-wrap" aria-label="Primary navigation">
        <Link className="cut-nav__brand" to="/" aria-label="Jack Miller Media home">
          <span className="cut-nav__brand-mark" aria-hidden="true">
            <span>JM</span>
          </span>
          <span className="cut-nav__brand-copy">
            <strong>Jack Miller</strong>
            <small>Film · Photo · Visuals</small>
          </span>
          <PumpkinMark className="halloween-nav-pumpkin" />
          <HollyMark className="christmas-nav-holly" />
          <BirthdaySun className="birthday-nav-sun" />
        </Link>

        <div className="cut-nav__desktop">
          <div className="cut-nav__links">
            {primaryLinks.slice(0, 1).map((item) => (
              <NavLink key={item.to} className={activeLinkClass} end={item.end} to={item.to}>
                {item.label}
              </NavLink>
            ))}

            <div
              className="cut-nav__photos"
              ref={desktopPhotosRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setDesktopPhotosOpen(false);
                }
              }}
            >
              <button
                ref={desktopPhotosButtonRef}
                className={`cut-nav__link cut-nav__photos-toggle${photosActive ? ' cut-nav__link--active' : ''}`}
                type="button"
                aria-expanded={desktopPhotosOpen}
                aria-controls="desktop-photos-menu"
                onClick={() => {
                  setDesktopFmpOpen(false);
                  setDesktopPhotosOpen((current) => !current);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setDesktopPhotosOpen(true);
                    window.requestAnimationFrame(() => desktopPhotosFirstLinkRef.current?.focus());
                  }
                }}
              >
                Photos
                <span aria-hidden="true">{desktopPhotosOpen ? '−' : '+'}</span>
              </button>

              {desktopPhotosOpen ? (
                <div
                  id="desktop-photos-menu"
                  className="cut-nav__photo-menu"
                  role="region"
                  aria-label="Photo collection selector"
                >
                  <div className="cut-nav__photo-menu-head">
                    <span>
                      <b>Photo selector</b>
                      <small>Pull a strip / choose a world</small>
                    </span>
                    <Link to="/photos" onClick={() => setDesktopPhotosOpen(false)}>View all 04 ↗</Link>
                  </div>
                  <div className="cut-nav__photo-menu-grid">
                    {photoLinks.map((item, index) => (
                      <NavLink
                        key={item.to}
                        ref={index === 0 ? desktopPhotosFirstLinkRef : undefined}
                        className={({ isActive }) =>
                          `cut-nav__photo-item cut-nav__photo-item--${item.tone}${isActive ? ' is-active' : ''}`
                        }
                        to={item.to}
                        onClick={() => setDesktopPhotosOpen(false)}
                      >
                        <PhotoMenuArtwork item={item} />
                        <span className="cut-nav__photo-item-copy">
                          <span className="cut-nav__photo-number">{item.number}</span>
                          <strong>{item.label}</strong>
                          <small>{item.note}</small>
                        </span>
                        <span className="cut-nav__photo-arrow" aria-hidden="true">↗</span>
                      </NavLink>
                    ))}
                  </div>
                  <p className="cut-nav__photo-menu-foot">
                    <span>Jack Miller archive</span>
                    <span>Still / moving / wild</span>
                  </p>
                </div>
              ) : null}
            </div>

            {primaryLinks.slice(1).map((item) => (
              <NavLink key={item.to} className={activeLinkClass} end={item.end} to={item.to}>
                {item.label}
              </NavLink>
            ))}

            <div className="cut-nav__fmp" ref={desktopFmpRef}>
              <button
                ref={desktopFmpButtonRef}
                className={`cut-nav__link cut-nav__fmp-toggle${fmpActive ? ' cut-nav__link--active' : ''}`}
                type="button"
                aria-expanded={desktopFmpOpen}
                aria-controls="desktop-fmp-menu"
                aria-haspopup="menu"
                onClick={() => {
                  setDesktopPhotosOpen(false);
                  setDesktopFmpOpen((current) => !current);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setDesktopFmpOpen(true);
                    window.requestAnimationFrame(() => desktopFmpFirstLinkRef.current?.focus());
                  }
                }}
              >
                FMP
                <span aria-hidden="true">{desktopFmpOpen ? '−' : '+'}</span>
              </button>

              {desktopFmpOpen ? (
                <div id="desktop-fmp-menu" className="cut-nav__fmp-menu" role="menu" aria-label="FMP projects">
                  {fmpLinks.map((item, index) => (
                    <NavLink
                      key={item.to}
                      ref={index === 0 ? desktopFmpFirstLinkRef : undefined}
                      className="cut-nav__fmp-item"
                      role="menuitem"
                      to={item.to}
                      state={item.state}
                      onClick={() => setDesktopFmpOpen(false)}
                    >
                      <span>{item.label}</span>
                      <small>{item.note}</small>
                    </NavLink>
                  ))}
                  <span className="cut-nav__fmp-item cut-nav__fmp-item--disabled" aria-disabled="true">
                    <span>Level 3 · Year 2</span>
                    <small>In development</small>
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <PreferenceTriggers beforeOpen={() => { setDesktopPhotosOpen(false); setDesktopFmpOpen(false); }} />
          <NavLink className="cut-nav__contact" to="/contact">
            Start a project <span aria-hidden="true">↗</span>
          </NavLink>
        </div>

        <button
          className="cut-nav__menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="cut-room-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="cut-nav__menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>

      {menuOpen ? (
        <div
          id="cut-room-menu"
          ref={menuRef}
          className="cut-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cut-menu-title"
        >
          <div className="cut-menu__top studio-wrap">
            <p id="cut-menu-title">The Cut Room / Site Index</p>
            <button ref={menuCloseRef} className="cut-menu__close" type="button" onClick={closeMenu}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="cut-menu__body studio-wrap">
            <PreferenceTriggers className="visitor-preference-triggers--mobile" beforeOpen={closeMenu} />
            <nav className="cut-menu__primary" aria-label="Mobile navigation">
              {primaryLinks.slice(0, 1).map((item) => (
                <NavLink
                  key={item.to}
                  className={mobileLinkClass}
                  end={item.end}
                  to={item.to}
                  onClick={closeMenu}
                >
                  <span className="cut-menu__number" aria-hidden="true">
                    01
                  </span>
                  <span>{item.label}</span>
                  <span className="cut-menu__arrow" aria-hidden="true">↗</span>
                </NavLink>
              ))}

              <button
                className={`cut-menu__link cut-menu__photo-toggle${photosActive ? ' cut-menu__link--active' : ''}`}
                type="button"
                aria-expanded={mobilePhotosOpen}
                aria-controls="mobile-photo-choices"
                onClick={() => setMobilePhotosOpen((current) => !current)}
              >
                <span className="cut-menu__number" aria-hidden="true">02</span>
                <span>Photos</span>
                <span className="cut-menu__arrow" aria-hidden="true">{mobilePhotosOpen ? '−' : '+'}</span>
              </button>

              {mobilePhotosOpen ? (
                <div id="mobile-photo-choices" className="cut-menu__photo-panel">
                  <Link className="cut-menu__photo-home" to="/photos" onClick={closeMenu}>
                    Photo home <span aria-hidden="true">→</span>
                  </Link>
                  {photoLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      className={({ isActive }) =>
                        `cut-menu__photo-choice cut-menu__photo-choice--${item.tone}${isActive ? ' is-active' : ''}`
                      }
                      to={item.to}
                      onClick={closeMenu}
                    >
                      <PhotoMenuArtwork item={item} />
                      <span className="cut-menu__photo-choice-copy">
                        <span>{item.number}</span>
                        <strong>{item.label}</strong>
                        <small>{item.note}</small>
                      </span>
                      <span className="cut-menu__photo-choice-arrow" aria-hidden="true">↗</span>
                    </NavLink>
                  ))}
                </div>
              ) : null}

              {primaryLinks.slice(1).map((item, index) => (
                <NavLink
                  key={item.to}
                  className={mobileLinkClass}
                  end={item.end}
                  to={item.to}
                  onClick={closeMenu}
                >
                  <span className="cut-menu__number" aria-hidden="true">
                    {String(index + 3).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                  <span className="cut-menu__arrow" aria-hidden="true">↗</span>
                </NavLink>
              ))}
            </nav>

            <section className="cut-menu__fmp" aria-labelledby="mobile-fmp-title">
              <div className="cut-menu__section-head">
                <p id="mobile-fmp-title">Final Major Projects</p>
                <span>Archive 02</span>
              </div>
              {fmpLinks.map((item) => (
                <NavLink
                  key={item.to}
                  className="cut-menu__project"
                  to={item.to}
                  state={item.state}
                  onClick={closeMenu}
                >
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </NavLink>
              ))}
              <span className="cut-menu__project cut-menu__project--disabled" aria-disabled="true">
                <strong>Level 3 · Year 2</strong>
                <span>Page under development</span>
              </span>
            </section>
          </div>

          <div className="cut-menu__foot studio-wrap">
            <span>Creative media portfolio · 2026</span>
            <Link to="/contact" onClick={closeMenu}>Contact Jack <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
