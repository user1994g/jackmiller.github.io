import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import Videos from '../sections/Videos';

const PageMain = styled.main`
  min-height: 100vh;
`;

const VideosPage = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefetchHomePage = () => {
      import('./HomePage');
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(prefetchHomePage, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const fallbackTimer = setTimeout(prefetchHomePage, 900);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      <Navbar />
      <PageMain className="App">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
        >
          <Videos />
        </motion.div>
        <Footer />
      </PageMain>
    </>
  );
};

export default VideosPage;
