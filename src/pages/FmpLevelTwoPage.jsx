import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';
import portraitImage from '../assets/Images/1-about-refresh.webp';
import memoryImage from '../assets/Images/9.webp';
import objectImage from '../assets/Images/5.webp';

const PageShell = styled.main`
  min-height: 100vh;
  padding: clamp(6.75rem, 11vw, 9.5rem) var(--gutter) clamp(3.5rem, 8vw, 7rem);
  overflow: hidden;
`;

const Content = styled.div`
  width: min(1160px, 100%);
  margin: 0 auto;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 23rem);
  gap: clamp(2rem, 7vw, 8rem);
  align-items: end;
  padding-bottom: clamp(2.25rem, 5vw, 4rem);

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Kicker = styled.p`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  color: var(--acid);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::before {
    width: 2.6rem;
    height: 1px;
    background: currentColor;
    content: '';
  }
`;

const Title = styled.h1`
  max-width: 9ch;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8.2vw, 7.8rem);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 0.87;
`;

const Summary = styled.p`
  padding-bottom: 0.35rem;
  color: rgba(226, 227, 231, 0.72);
  font-family: system-ui, sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  line-height: 1.7;
`;

const FilmCard = styled.section`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  background: #050506;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.5);
`;

const Player = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Details = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(17rem, 23rem);
  gap: clamp(2rem, 8vw, 9rem);
  margin-top: clamp(2.8rem, 6vw, 5.5rem);
  padding-top: clamp(2rem, 4vw, 3.5rem);
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const Description = styled.p`
  max-width: 52ch;
  color: rgba(229, 230, 234, 0.78);
  font-family: system-ui, sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.8;
`;

const Facts = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.1rem 1.5rem;
  margin: 0;
`;

const Fact = styled.div`
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  dt {
    color: rgba(188, 191, 199, 0.62);
    font-family: system-ui, sans-serif;
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  dd {
    margin: 0.34rem 0 0;
    color: rgba(247, 242, 233, 0.95);
    font-size: 0.93rem;
  }
`;

const Story = styled.section`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(1.5rem, 5vw, 4.5rem);
  align-items: center;
  margin-top: clamp(4rem, 10vw, 9rem);

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const StoryCopy = styled.div`
  h2 {
    max-width: 10ch;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.3rem, 5vw, 4.8rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 0.94;
  }

  p {
    max-width: 42ch;
    margin-top: 1.4rem;
    color: rgba(229, 230, 234, 0.68);
    font-family: system-ui, sans-serif;
    line-height: 1.8;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  grid-template-rows: 10rem 10rem;
  gap: 0.75rem;

  @media (max-width: 30em) {
    grid-template-rows: 8rem 8rem;
  }
`;

const StoryPhoto = styled.figure`
  position: relative;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  border-radius: 10px;
  background: #17171a;

  &:first-child {
    grid-row: 1 / span 2;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.8) contrast(1.08) brightness(0.72);
    transition: transform 0.6s ease, filter 0.6s ease;
  }

  &:hover img {
    transform: scale(1.04);
    filter: grayscale(0.35) contrast(1.08) brightness(0.84);
  }

  figcaption {
    position: absolute;
    right: 0.8rem;
    bottom: 0.7rem;
    color: rgba(255, 250, 239, 0.85);
    font-family: system-ui, sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`;

const facts = [
  ['Project', 'FMP Level 2'],
  ['Format', 'Short film'],
  ['Setting', '1939'],
  ['Status', 'Available to watch'],
];

const FmpLevelTwoPage = () => {
  usePageSeo({
    title: 'The Dark Echoes of 1939 | Jack Miller',
    description: 'The Dark Echoes of 1939, an FMP Level 2 film project by Jack Miller.',
    url: 'https://jackmillermedia.com/fmp-level-2/',
  });

  return (
    <>
      <Navbar />
      <PageShell id="main-content" role="main">
        <Content>
          <Header>
            <div>
              <Kicker>FMP Level 2 · Short Film</Kicker>
              <Title>The Dark Echoes of 1939</Title>
            </div>
            <Summary>
              A study of memory, atmosphere, and the shadows history leaves behind.
            </Summary>
          </Header>

          <FilmCard>
            <Player>
              <iframe
                title="The Dark Echoes of 1939"
                src="https://clip-kingdom-play.lovable.app/embed/21230af6-5a84-4072-befc-276e5f349145"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            </Player>
          </FilmCard>

          <Details>
            <Description>
              The Dark Echoes of 1939 explores a time marked by uncertainty, using image, sound,
              and mood to create a film shaped by what is remembered and what remains unseen.
            </Description>
            <Facts>
              {facts.map(([label, value]) => (
                <Fact key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </Fact>
              ))}
            </Facts>
          </Details>

          <Story>
            <StoryCopy>
              <Kicker>A story about loss</Kicker>
              <h2>Some absences never leave.</h2>
              <p>
                At its heart, this short film is about the loss of a mother: the quiet spaces she
                leaves behind, the objects that keep her memory alive, and the grief that changes
                shape over time.
              </p>
            </StoryCopy>
            <PhotoGrid aria-label="Film mood stills">
              <StoryPhoto>
                <img src={portraitImage} alt="A portrait in soft, reflective light" />
                <figcaption>Remembering</figcaption>
              </StoryPhoto>
              <StoryPhoto>
                <img src={memoryImage} alt="A close detail suggesting a treasured memory" />
                <figcaption>Memory</figcaption>
              </StoryPhoto>
              <StoryPhoto>
                <img src={objectImage} alt="A personal object held in a quiet moment" />
                <figcaption>What remains</figcaption>
              </StoryPhoto>
            </PhotoGrid>
          </Story>
        </Content>
      </PageShell>
    </>
  );
};

export default FmpLevelTwoPage;
