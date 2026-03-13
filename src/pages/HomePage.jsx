import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import About from '../sections/About';
import HeroButtons from '../sections/HeroButtons';
import Home from '../sections/Home';
import Marquee from '../sections/Marquee';
import Shop from '../sections/Shop';
import useLocoScroll from '../components/useLocoScroll';

const HomePage = () => {

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Navbar />

      <main id="main-content" className="App" role="main" data-scroll-container>
        <Home />
        <HeroButtons />
        <About />
        <Shop />
        <Marquee />
      </main>
    </>
  );
};

export default HomePage;
