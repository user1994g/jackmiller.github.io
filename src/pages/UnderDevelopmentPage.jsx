import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';
import { Stamp } from '../art/Marks';

const PageShell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 8rem var(--gutter) 5rem;
`;

const Notice = styled.section`
  width: min(640px, 100%);
  padding: clamp(2rem, 6vw, 4rem);
  border: 1px dashed rgba(198, 240, 77, 0.4);
  border-radius: 1.8rem;
  background: rgba(18, 16, 23, 0.8);
  text-align: center;
`;

const Eyebrow = styled.p`
  color: var(--acid);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin-top: 1rem;
  color: var(--paper);
  font-size: clamp(2.5rem, 7vw, 4.8rem);
  font-weight: 800;
  letter-spacing: -0.06em;
`;

const Message = styled.p`
  max-width: 38ch;
  margin: 1.25rem auto 0;
  line-height: 1.7;
`;

const Mark = styled.div`
  width: 5.5rem;
  margin: 1.4rem auto 0;
  color: var(--signal);

  svg {
    width: 100%;
    height: auto;
  }
`;

const UnderDevelopmentPage = () => {
  usePageSeo({
    title: '3D Art | Under Development | Jack Miller',
    description: 'The 3D Art section of Jack Miller Media is currently under development.',
    url: 'https://jackmillermedia.com/3d-art/',
    robots: 'noindex, follow',
  });

  return (
    <>
      <Navbar />
      <PageShell id="main-content" role="main">
        <Notice>
          <Eyebrow>3D Art</Eyebrow>
          <Title>Page under development</Title>
          <Message>
            This space is being prepared for the 3D work. Check back soon for the finished gallery.
          </Message>
          <Mark>
            <Stamp label="WIP" />
          </Mark>
        </Notice>
      </PageShell>
    </>
  );
};

export default UnderDevelopmentPage;
