import 'locomotive-scroll/dist/locomotive-scroll.css';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import ScrollTriggerProxy from '../components/ScrollTriggerProxy';
import About from '../sections/About';
import Footer from '../sections/Footer';
import Home from '../sections/Home';
import Marquee from '../sections/Marquee';
import Shop from '../sections/Shop';

const readLoaderSeen = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.sessionStorage.getItem('home-loader-seen') === '1';
  } catch {
    return false;
  }
};

const persistLoaderSeen = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem('home-loader-seen', '1');
  } catch {
    // Ignore storage failures on strict mobile privacy settings.
  }
};

const isTouchOrSmallViewport = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport = window.matchMedia('(max-width: 64em)').matches;

  return coarsePointer || narrowViewport;
};

const HomePage = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(() => readLoaderSeen());

  const [useNativeMobileScroll, setUseNativeMobileScroll] = useState(() =>
    isTouchOrSmallViewport()
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    const narrowViewportQuery = window.matchMedia('(max-width: 64em)');

    const updateScrollMode = () => {
      setUseNativeMobileScroll(coarsePointerQuery.matches || narrowViewportQuery.matches);
    };

    updateScrollMode();

    if (coarsePointerQuery.addEventListener) {
      coarsePointerQuery.addEventListener('change', updateScrollMode);
      narrowViewportQuery.addEventListener('change', updateScrollMode);

      return () => {
        coarsePointerQuery.removeEventListener('change', updateScrollMode);
        narrowViewportQuery.removeEventListener('change', updateScrollMode);
      };
    }

    coarsePointerQuery.addListener(updateScrollMode);
    narrowViewportQuery.addListener(updateScrollMode);

    return () => {
      coarsePointerQuery.removeListener(updateScrollMode);
      narrowViewportQuery.removeListener(updateScrollMode);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (loaded) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setLoaded(true);
      persistLoaderSeen();
    }, 1800);

    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefetchVideosPage = () => {
      import('./VideosPage');
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(prefetchVideosPage, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const fallbackTimer = setTimeout(prefetchVideosPage, 900);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const pageContent = (
    <>
      <AnimatePresence mode="wait">{!loaded && <Loader key="loader" />}</AnimatePresence>

      <Navbar />

      <main className="App" data-scroll-container={!useNativeMobileScroll ? true : undefined} ref={containerRef}>
        {!useNativeMobileScroll && <ScrollTriggerProxy />}
        <Home />
        <About />
        <Shop />
        <Marquee />
        <Footer />
      </main>
    </>
  );

  if (useNativeMobileScroll) {
    return pageContent;
  }

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        multiplier: 0.9,
        getDirection: true,
        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: false,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      {pageContent}
    </LocomotiveScrollProvider>
  );
};

export default HomePage;
