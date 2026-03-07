import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import About from '../sections/About';
import Home from '../sections/Home';
import Marquee from '../sections/Marquee';
import Shop from '../sections/Shop';

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

      <main id="main-content" className="App" role="main">
        <Home />
        <About />
        <Shop />
        <Marquee />      </main>
    </>
  );
};

export default HomePage;
