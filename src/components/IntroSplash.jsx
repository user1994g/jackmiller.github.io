import React, { useEffect, useState } from 'react';

const introStorageKey = 'jm-cut-room-intro-v1';

const shouldShowIntro = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  try {
    return window.sessionStorage.getItem(introStorageKey) !== '1';
  } catch {
    return true;
  }
};

const IntroSplash = () => {
  const [mounted, setMounted] = useState(shouldShowIntro);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!mounted) return undefined;

    document.body.classList.add('intro-open');

    try {
      window.sessionStorage.setItem(introStorageKey, '1');
    } catch {
      // The intro still works when storage is unavailable.
    }

    const closeTimer = window.setTimeout(() => setClosing(true), 480);
    const removeTimer = window.setTimeout(() => setMounted(false), 700);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove('intro-open');
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={`cut-intro${closing ? ' cut-intro--closing' : ''}`} aria-hidden="true">
      <div className="cut-intro__frame">
        <span className="cut-intro__corner cut-intro__corner--one" />
        <span className="cut-intro__corner cut-intro__corner--two" />
        <div className="cut-intro__slate">
          <span className="cut-intro__take">JMM / TAKE 01</span>
          <strong>Picture up.</strong>
          <span className="cut-intro__timecode">00:00:01:00</span>
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
