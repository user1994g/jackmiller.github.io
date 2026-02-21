import { motion } from 'framer-motion';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import Videos from '../sections/Videos';

const PageMain = styled.main`
  min-height: 100vh;
  padding-top: clamp(4.8rem, 8vw, 6.2rem);
`;

const VideosPage = () => {
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
