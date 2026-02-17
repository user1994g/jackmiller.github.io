import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  margin: var(--section-gap) 0;
  padding: 0.5rem 0;
`;

const Container = styled.div`
  width: min(1400px, 96vw);
  margin: 0 auto;
  display: grid;
  gap: 0.65rem;
`;

const Banner = styled.h2`
  width: fit-content;
  max-width: 100%;
  font-family: 'Kaushan Script';
  font-size: clamp(1.6rem, 5vw, 4.6rem);
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);

  span {
    display: inline-block;
    padding: 0.55rem clamp(1rem, 2vw, 1.4rem);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    white-space: nowrap;
  }
`;

const Marquee = () => {
  return (
    <Section>
      <Container id="direction">
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="7"
            data-scroll-target="#direction"
          >
            Built for dramatic visual impact.
          </span>
        </Banner>
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-5"
            data-scroll-target="#direction"
          >
            Designed to read cleanly on wide monitors.
          </span>
        </Banner>
        <Banner>
          <span
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
            data-scroll-target="#direction"
          >
            Optimized spacing, rhythm, and mobile flow.
          </span>
        </Banner>
      </Container>
    </Section>
  );
};

export default Marquee;
