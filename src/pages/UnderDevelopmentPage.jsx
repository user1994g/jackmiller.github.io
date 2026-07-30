import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const PageShell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 8rem var(--gutter) 5rem;
  background:
    radial-gradient(circle at 50% 20%, rgba(240, 216, 173, 0.08), transparent 28rem),
    linear-gradient(180deg, #0b0c0f 0%, #111319 100%);
`;

const Notice = styled.section`
  width: min(600px, 100%);
  padding: clamp(2rem, 6vw, 4.5rem);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  background: rgba(9, 10, 13, 0.74);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const Eyebrow = styled.p`
  color: rgba(240, 216, 173, 0.9);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin-top: 1rem;
  color: rgba(248, 246, 240, 0.96);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.95;
`;

const Message = styled.p`
  max-width: 38ch;
  margin: 1.25rem auto 0;
  color: rgba(217, 220, 227, 0.72);
  font-family: system-ui, sans-serif;
  line-height: 1.7;
`;

const UnderDevelopmentPage = () => {
  usePageSeo({
    title: '3D Art | Under Development | Jack Miller',
    description: 'The 3D Art section of Jack Miller Media is currently under development.',
    url: 'https://jackmillermedia.com/3d-art/',
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
        </Notice>
      </PageShell>
    </>
  );
};

export default UnderDevelopmentPage;
