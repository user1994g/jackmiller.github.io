import React, { Suspense } from 'react';
import styled from 'styled-components';

const CoverVideo = React.lazy(() => import('../components/CoverVideo'));
const Logo = React.lazy(() => import('../components/Logo'));

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  return (
    <Section id="home">
      <Suspense fallback={<></>}>
        <Logo />
        <CoverVideo />
      </Suspense>
    </Section>
  );
};

export default Home;
