import { motion } from 'framer-motion';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Videos from '../sections/Videos';

const PageMain = styled.main`
  min-height: 100vh;
`;

const VideosPage = () => {
  return (
    <>
      <Navbar />
      <PageMain id="main-content" className="App" role="main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
        >
          <Videos />
        </motion.div>      </PageMain>
    </>
  );
};

export default VideosPage;
