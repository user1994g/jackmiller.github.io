import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

const newsroomLanes = [
  {
    label: 'Lead Story',
    status: 'No write ups live yet',
    text:
      'Your newest project breakdown can sit here once you start publishing notes about a shoot, edit, or final piece.',
  },
  {
    label: 'Field Notes',
    status: 'Waiting for first entry',
    text:
      'This area can hold smaller observations, behind-the-scenes thoughts, and quick reflections from ongoing work.',
  },
  {
    label: 'Archive',
    status: 'Empty for now',
    text:
      'Older write ups can stack here over time so the page starts to feel like a real creative record of the work.',
  },
];

const PageMain = styled.main`
  position: relative;
  min-height: 100vh;
  padding: calc(5.8rem + var(--gutter)) var(--gutter) var(--section-gap);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 10%, rgba(240, 216, 173, 0.12), transparent 26%),
      radial-gradient(circle at 82% 18%, rgba(136, 150, 196, 0.12), transparent 24%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 24%);
    pointer-events: none;
  }
`;

const Wrap = styled.div`
  position: relative;
  z-index: 1;
  width: min(var(--content-max), 100%);
  margin: 0 auto;
`;

const Hero = styled(motion.section)`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015)),
    rgba(8, 10, 15, 0.8);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(12px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(transparent 95%, rgba(255, 255, 255, 0.05) 96%, transparent 97%),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03), transparent 16%);
    background-size: 100% 2.9rem, 100% 100%;
    opacity: 0.24;
    pointer-events: none;
  }
`;

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.7fr);
  gap: clamp(1rem, 2vw, 1.6rem);
  padding: clamp(1.4rem, 4vw, 2.8rem);

  @media (max-width: 60rem) {
    grid-template-columns: 1fr;
  }
`;

const Masthead = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const Kicker = styled.p`
  margin: 0;
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(240, 216, 173, 0.9);
`;

const Headline = styled.h1`
  margin: 0;
  font-family: 'Kaushan Script', cursive;
  font-size: clamp(3.2rem, 7vw, 6.1rem);
  line-height: 0.96;
  color: rgba(252, 252, 252, 0.98);
`;

const Dek = styled.p`
  max-width: 56ch;
  line-height: 1.78;
  font-size: clamp(1rem, 1.3vw, 1.08rem);
  color: rgba(232, 236, 244, 0.8);
`;

const Ticker = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

const TickerItem = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2.1rem;
  padding: 0.52rem 0.82rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(247, 248, 250, 0.88);
`;

const HeroNote = styled.div`
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NoteTitle = styled.p`
  margin: 0;
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.95);
`;

const NoteText = styled.p`
  margin-top: 0.8rem;
  max-width: 46ch;
  line-height: 1.72;
  color: rgba(228, 231, 236, 0.74);
`;

const DeskPanel = styled.div`
  display: grid;
  gap: 0.9rem;
  align-content: start;
  padding: clamp(1.2rem, 3vw, 1.6rem);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    radial-gradient(circle at top right, rgba(240, 216, 173, 0.14), transparent 34%),
    rgba(12, 13, 18, 0.78);
`;

const DeskLabel = styled.p`
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`;

const DeskTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.3rem, 1.9vw, 1.78rem);
  line-height: 1.1;
  color: rgba(255, 255, 255, 0.96);
`;

const DeskText = styled.p`
  line-height: 1.72;
  color: rgba(228, 231, 236, 0.75);
`;

const DeskMeta = styled.div`
  display: grid;
  gap: 0.7rem;
  margin-top: 0.25rem;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.7rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.8rem;

  span:first-child {
    color: rgba(255, 255, 255, 0.58);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  span:last-child {
    color: rgba(250, 250, 251, 0.92);
    text-align: right;
  }
`;

const SectionStack = styled.div`
  display: grid;
  gap: clamp(1rem, 2vw, 1.4rem);
  margin-top: clamp(1rem, 2.2vw, 1.6rem);
`;

const Bulletin = styled(motion.section)`
  display: grid;
  gap: 1rem;
  padding: clamp(1.35rem, 3vw, 2rem);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012)),
    rgba(9, 10, 14, 0.78);
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
`;

const BulletinBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.85rem;
  align-items: center;
`;

const BulletinLabel = styled.p`
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 216, 173, 0.88);
`;

const BulletinStamp = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.78rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

const BulletinTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 2.6vw, 2.4rem);
  color: rgba(255, 255, 255, 0.96);
`;

const BulletinText = styled.p`
  max-width: 60ch;
  line-height: 1.74;
  color: rgba(230, 234, 240, 0.76);
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.3rem);

  @media (max-width: 68rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 44rem) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled(motion.article)`
  display: grid;
  gap: 0.95rem;
  min-height: 100%;
  padding: 1.35rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 34%),
    rgba(12, 14, 18, 0.76);

  &:nth-child(2) {
    transform: translateY(1rem);

    @media (max-width: 44rem) {
      transform: none;
    }
  }
`;

const CardLabel = styled.p`
  margin: 0;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 216, 173, 0.88);
`;

const CardStatus = styled.h3`
  margin: 0;
  font-size: clamp(1.08rem, 1.9vw, 1.38rem);
  line-height: 1.18;
  color: rgba(250, 250, 251, 0.95);
`;

const CardText = styled.p`
  line-height: 1.72;
  color: rgba(226, 229, 235, 0.74);
`;

const PlaceholderBars = styled.div`
  display: grid;
  gap: 0.55rem;
  margin-top: auto;
`;

const Bar = styled.span`
  display: block;
  height: ${({ $small }) => ($small ? '0.54rem' : '0.72rem')};
  width: ${({ $width }) => $width};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
`;

const ClosingCard = styled(Bulletin)`
  text-align: center;
`;

const ClosingTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 2.3vw, 1.95rem);
  color: rgba(255, 255, 255, 0.95);
`;

const ClosingText = styled.p`
  width: min(52ch, 100%);
  margin: 0 auto;
  line-height: 1.72;
  color: rgba(228, 231, 236, 0.76);
`;

const WriteUpsPage = () => (
  <>
    <Navbar />
    <PageMain id="main-content" className="App" role="main" aria-label="Write ups page">
      <Wrap>
        <Hero
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <HeroInner>
            <Masthead>
              <Kicker>Jack Miller Media Desk</Kicker>
              <Headline>Write Ups</Headline>
              <Dek>
                A newsroom-style space for the thoughts behind the portfolio. No entries are live yet,
                but this page is ready to become the place where you talk about process, direction,
                editing, and the story behind the finished work.
              </Dek>
              <NoteText as="strong" style={{ color: 'rgba(255, 255, 255, 0.96)', fontWeight: 700 }}>
                This page does not have any posts yet.
              </NoteText>
              <Ticker>
                <TickerItem>Creative Journal</TickerItem>
                <TickerItem>Project Notes</TickerItem>
                <TickerItem>Behind The Scenes</TickerItem>
              </Ticker>
              <HeroNote>
                <NoteTitle>The page is empty for now, but it already feels like a publication.</NoteTitle>
                <NoteText>
                  When you are ready, each post can live here like a feature story rather than a plain
                  blog entry, so the writing matches the atmosphere of the rest of the site.
                </NoteText>
              </HeroNote>
            </Masthead>

            <DeskPanel>
              <DeskLabel>Editorial Status</DeskLabel>
              <DeskTitle>Ready for your first write up</DeskTitle>
              <DeskText>
                This layout keeps the page alive without filling it with fake articles. It reads like a
                news page now, while still waiting for real posts from your work.
              </DeskText>
              <DeskMeta>
                <MetaRow>
                  <span>Latest</span>
                  <span>No story published yet</span>
                </MetaRow>
                <MetaRow>
                  <span>Format</span>
                  <span>Creative news desk</span>
                </MetaRow>
                <MetaRow>
                  <span>Focus</span>
                  <span>Work, process, reflection</span>
                </MetaRow>
              </DeskMeta>
            </DeskPanel>
          </HeroInner>
        </Hero>

        <SectionStack>
          <Bulletin
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
          >
            <BulletinBar>
              <BulletinLabel>News Bulletin</BulletinLabel>
              <BulletinStamp>Waiting for first publication</BulletinStamp>
            </BulletinBar>
            <BulletinTitle>No posts yet, but the structure is in place</BulletinTitle>
            <BulletinText>
              As soon as you start writing about a project, the page can carry lead stories, smaller
              notes, and older entries in a way that feels organised and editorial instead of empty.
            </BulletinText>
          </Bulletin>

          <NewsGrid>
            {newsroomLanes.map((lane, index) => (
              <NewsCard
                key={lane.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.16 + index * 0.08, ease: 'easeOut' }}
              >
                <CardLabel>{lane.label}</CardLabel>
                <CardStatus>{lane.status}</CardStatus>
                <CardText>{lane.text}</CardText>
                <PlaceholderBars>
                  <Bar $width="100%" />
                  <Bar $width="88%" $small />
                  <Bar $width="64%" $small />
                </PlaceholderBars>
              </NewsCard>
            ))}
          </NewsGrid>

          <ClosingCard
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.34, ease: 'easeOut' }}
          >
            <ClosingTitle>This page now looks active without pretending it already has stories</ClosingTitle>
            <ClosingText>
              It keeps the mood of a creative publication, but leaves the actual articles for when you
              are ready to write them.
            </ClosingText>
          </ClosingCard>
        </SectionStack>
      </Wrap>
    </PageMain>
  </>
);

export default WriteUpsPage;
