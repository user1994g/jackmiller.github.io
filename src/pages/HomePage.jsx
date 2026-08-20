import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';
import About from '../sections/About';
import HeroButtons from '../sections/HeroButtons';
import Home from '../sections/Home';
import Marquee from '../sections/Marquee';
import Shop from '../sections/Shop';
import Stats from '../sections/Stats';

const HomePage = () => {
  usePageSeo({
    title: 'Jack Miller Media | Creative Media Portfolio',
    description:
      'Creative media portfolio by Jack Miller featuring film, photography, videography, 3D art, write ups, and cinematic visual storytelling.',
    url: 'https://jackmillermedia.com/',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content" className="App" role="main">
        <Home />
        <Stats />
        <HeroButtons />
        <About />
        <Shop />
        <Marquee />
      </main>
    </>
  );
};

export default HomePage;
