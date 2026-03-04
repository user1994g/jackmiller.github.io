import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
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

const HomePage = () => {
  const [loaded, setLoaded] = useState(() => readLoaderSeen());

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
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{!loaded && <Loader key="loader" />}</AnimatePresence>

      <Navbar />

      <main className="App">
        <Home />
        <About />
        <Shop />
        <Marquee />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
