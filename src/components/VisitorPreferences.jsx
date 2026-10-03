import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import { THEME_OPTIONS, useVisitorPreferences } from '../context/VisitorPreferences';
import { buildTranslationUrl, TRANSLATION_LANGUAGES } from '../content/translationLanguages';
import { focusableSelector, makeOutsideContentInert } from '../utils/dialogAccessibility';

const PreferenceIcon = ({ language = false }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {language ? (
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 7h14M5 17h14" />
      </g>
    ) : (
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="m12 2 9 5-9 5-9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5" />
      </g>
    )}
  </svg>
);

export const PreferenceTriggers = ({ beforeOpen, className = '' }) => {
  const { openPanel } = useVisitorPreferences();
  const open = (panel) => {
    beforeOpen?.();
    // Let the mobile menu unlock the page before opening this dialog.
    window.requestAnimationFrame(() => openPanel(panel));
  };
  return (
    <div className={`visitor-preference-triggers notranslate ${className}`} translate="no">
      <button type="button" aria-label="Choose website theme" aria-haspopup="dialog" onClick={() => open('theme')}>
        <PreferenceIcon /><span>Theme</span>
      </button>
      <button type="button" aria-label="Translate this page" aria-haspopup="dialog" onClick={() => open('language')}>
        <PreferenceIcon language /><span>Translate</span>
      </button>
    </div>
  );
};

const VisitorPreferencesDialog = () => {
  const { theme, setTheme, panel, openPanel, closePanel } = useVisitorPreferences();
  const [language, setLanguage] = useState('fr');
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const location = useLocation();
  const isOpen = Boolean(panel);

  useEffect(() => { closePanel(); }, [location.pathname, closePanel]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const scrollY = window.scrollY;
    const previousStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    document.body.classList.add('dialog-open', 'preferences-open');
    Object.assign(document.body.style, { position: 'fixed', top: `-${scrollY}px`, width: '100%', overflow: 'hidden' });
    const restoreOutsideContent = makeOutsideContentInert(dialogRef.current);
    closeRef.current?.focus({ preventScroll: true });
    const keydown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closePanel(); return; }
      if (event.key !== 'Tab') return;
      const elements = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) || []);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
      restoreOutsideContent();
      document.body.classList.remove('dialog-open', 'preferences-open');
      Object.assign(document.body.style, previousStyles);
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen, closePanel]);

  if (!panel) return null;
  const themePanel = panel === 'theme';
  const translatedUrl = buildTranslationUrl(language, location.pathname);

  return createPortal(
    <div className="visitor-preferences-backdrop" onClick={(event) => { if (event.target === event.currentTarget) closePanel(); }}>
      <section ref={dialogRef} className="visitor-preferences notranslate" role="dialog" aria-modal="true" aria-labelledby="visitor-preferences-title" translate="no">
        <header className="visitor-preferences__top">
          <span className="visitor-preferences__stamp">Your visit / your vibe</span>
          <button ref={closeRef} className="visitor-preferences__close" type="button" aria-label="Close preferences" onClick={closePanel}>Close <span aria-hidden="true">×</span></button>
        </header>
        <div className="visitor-preferences__tabs" aria-label="Preference panels">
          <button type="button" aria-pressed={themePanel} onClick={() => openPanel('theme')}>Theme</button>
          <button type="button" aria-pressed={!themePanel} onClick={() => openPanel('language')}>Language</button>
        </div>
        <h2 id="visitor-preferences-title">{themePanel ? <>Pick your <em>mood.</em></> : <>A world of <em>words.</em></>}</h2>
        <p className="visitor-preferences__intro">{themePanel ? 'Try a different cut. Same work, a whole new feeling.' : 'Choose a language. Google Translate opens this page in a new tab.'}</p>
        {themePanel ? (
          <>
            <fieldset className="visitor-theme-grid">
              <legend className="sr-only">Website theme</legend>
              {THEME_OPTIONS.map((option) => (
                <label key={option.id} className={`visitor-theme-card visitor-theme-card--${option.id}${theme === option.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="visitor-theme" value={option.id} checked={theme === option.id} onChange={() => setTheme(option.id)} />
                  <span className="visitor-theme-card__swatches" aria-hidden="true">{option.colours.map((colour) => <i key={colour} style={{ background: colour }} />)}</span>
                  <span className="visitor-theme-card__name">{option.name}<span className="visitor-theme-card__tick" aria-hidden="true">{theme === option.id ? '✓' : '+'}</span></span>
                  <small>{option.note}</small>
                </label>
              ))}
            </fieldset>
            <p className="visitor-preferences__note">Just for you, remembered in this tab. Choose <strong>Automatic</strong> to follow the holiday dates again.</p>
            <button className="visitor-preferences__action" type="button" onClick={closePanel}>Enjoy this vibe <span aria-hidden="true">↗</span></button>
          </>
        ) : (
          <>
            <label className="visitor-language-label" htmlFor="visitor-language">Your language</label>
            <select id="visitor-language" className="visitor-language-select" value={language} onChange={(event) => setLanguage(event.target.value)}>
              {TRANSLATION_LANGUAGES.map((option) => <option key={option.code} value={option.code}>{option.label} · {option.english}</option>)}
            </select>
            <p className="visitor-preferences__note">Machine translation may not be exact. Google receives the public page address and has its own privacy practices. Nothing loads until you follow the link.</p>
            <a className="visitor-preferences__action" href={translatedUrl} target="_blank" rel="noopener noreferrer">Open translated page <span aria-hidden="true">↗</span></a>
            <button className="visitor-preferences__original" type="button" onClick={closePanel}>Keep the original English</button>
          </>
        )}
      </section>
    </div>, document.body,
  );
};

export default VisitorPreferencesDialog;
