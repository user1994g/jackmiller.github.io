import { motion } from 'framer-motion';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

const PageMain = styled.main`
  min-height: 100vh;
  padding: calc(5.6rem + var(--gutter)) var(--gutter) var(--section-gap);
`;

const Wrap = styled.div`
  width: min(var(--content-max), 100%);
  margin: 0 auto;
`;

const Card = styled(motion.section)`
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background:
    radial-gradient(circle at 18% 22%, rgba(240, 216, 173, 0.12), transparent 52%),
    radial-gradient(circle at 82% 8%, rgba(255, 255, 255, 0.08), transparent 46%),
    rgba(10, 11, 15, 0.62);
  padding: clamp(1.5rem, 4vw, 2.6rem);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.48);
`;

const Kicker = styled.p`
  margin: 0 0 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.74rem;
  color: rgba(240, 216, 173, 0.88);
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Kaushan Script';
  font-weight: 300;
  font-size: clamp(2.8rem, 7vw, 5.6rem);
  color: rgba(252, 252, 252, 0.98);
`;

const Text = styled.p`
  width: min(62ch, 100%);
  margin-top: 0.95rem;
  line-height: 1.7;
  font-size: clamp(0.9rem, 1.1vw, 1.02rem);
  color: rgba(235, 238, 244, 0.78);
`;

const Hint = styled.p`
  margin-top: 1.35rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`;

const WriteUpsPage = () => {
  const location = useLocation();
  const allowWriteUps = Boolean(location.state?.unlisted === 'write-ups' && location.state?.allowUnlisted === true);

  // Keep the page unlisted: direct URL navigation redirects to Home.
  if (!allowWriteUps) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <PageMain id="main-content" className="App" role="main" aria-label="Unlisted page">
        <Wrap>
          <Card
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          >
            <Kicker>Unlisted</Kicker>
            <Title>Write Ups</Title>
            <Text>
              Short write-ups, notes, and behind-the-scenes details. This page is intentionally not
              linked in the navigation.
            </Text>
            <Hint>Tip: Search for “write ups” or ask “open write ups”.</Hint>
          </Card>
        </Wrap>
      </PageMain>
    </>
  );
};

export default WriteUpsPage;
