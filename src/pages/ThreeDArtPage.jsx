import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

const PageShell = styled.main`
  min-height: 100vh;
  background: #050507;
  display: grid;
  place-items: center;
  padding: 8rem 1.5rem 3rem;
`;

const Message = styled.p`
  margin: 0;
  color: rgba(240, 242, 246, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: clamp(0.88rem, 1.6vw, 1.1rem);
  text-align: center;
`;

const ThreeDArtPage = () => {
  return (
    <>
      <Navbar />
      <PageShell id="main-content">
        <Message>This page is under development.</Message>
      </PageShell>
    </>
  );
};

export default ThreeDArtPage;
