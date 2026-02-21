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

const HomePage = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.sessionStorage.getItem('home-loader-seen') === '1';
  });

  useEffect(() => {
    if (loaded) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setLoaded(true);
      window.sessionStorage.setItem('home-loader-seen', '1');
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
      <AnimatePresence mode="wait">{!loaded && <Loader key="loader" />}</AnimatePresence>

      {loaded && <Navbar />}

      <main className="App" data-scroll-container ref={containerRef}>
        <ScrollTriggerProxy />
        <Home />
        <About />
        <Shop />
        <Marquee />
        <Footer />
      </main>
    </LocomotiveScrollProvider>
  );
};

export default HomePage;
