import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import NewHome from '../sections/NewHome';

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
        <NewHome />
      </main>
    </>
  );
};

export default HomePage;
