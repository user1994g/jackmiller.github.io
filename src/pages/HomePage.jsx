import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import About from '../sections/About';
import HeroButtons from '../sections/HeroButtons';
import Home from '../sections/Home';
import Marquee from '../sections/Marquee';
import NewHome from '../sections/NewHome';
import Shop from '../sections/Shop';

const HomePage = () => {
  const [useNewHome, setUseNewHome] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const updateLayout = () => setUseNewHome(mediaQuery.matches);

    updateLayout();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateLayout);
      return () => mediaQuery.removeEventListener('change', updateLayout);
    }

    mediaQuery.addListener(updateLayout);
    return () => mediaQuery.removeListener(updateLayout);
  }, []);

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="App"
        role="main"
        data-scroll-container={useNewHome ? undefined : ''}
      >
        {useNewHome ? (
          <NewHome />
        ) : (
          <>
            <Home />
            <HeroButtons />
            <About />
            <Shop />
            <Marquee />
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
