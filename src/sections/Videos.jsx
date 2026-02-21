import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import img4 from '../assets/Images/4.webp';
import img5 from '../assets/Images/5.webp';
import img6 from '../assets/Images/6.webp';
import img7 from '../assets/Images/7.webp';
import img8 from '../assets/Images/8.webp';
import img9 from '../assets/Images/9.webp';
import img10 from '../assets/Images/10.webp';
import img11 from '../assets/Images/11.webp';
import img12 from '../assets/Images/12.webp';
import img13 from '../assets/Images/13.webp';
import img14 from '../assets/Images/14.webp';

import thumb4 from '../assets/VideoThumbs/4-thumb.jpg';
import thumb5 from '../assets/VideoThumbs/5-thumb.jpg';
import thumb6 from '../assets/VideoThumbs/6-thumb.jpg';
import thumb7 from '../assets/VideoThumbs/7-thumb.jpg';
import thumb8 from '../assets/VideoThumbs/8-thumb.jpg';
import thumb9 from '../assets/VideoThumbs/9-thumb.jpg';
import thumb10 from '../assets/VideoThumbs/10-thumb.jpg';
import thumb11 from '../assets/VideoThumbs/11-thumb.jpg';
import thumb12 from '../assets/VideoThumbs/12-thumb.jpg';
import thumb13 from '../assets/VideoThumbs/13-thumb.jpg';
import thumb14 from '../assets/VideoThumbs/14-thumb.jpg';

const Section = styled.section`
  width: 100%;
  background: #07080b;
`;

const Canvas = styled.div`
  position: relative;
  width: min(1600px, 100%);
  margin: 0 auto;
`;

const Hero = styled.article`
  position: relative;
  min-height: clamp(520px, 92vh, 940px);
  overflow: hidden;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(140% 90% at 76% 45%, rgba(255, 121, 54, 0.28), transparent 56%),
    linear-gradient(90deg, rgba(6, 7, 10, 0.9) 14%, rgba(6, 7, 10, 0.52) 48%, rgba(6, 7, 10, 0.92) 100%),
    linear-gradient(180deg, rgba(6, 7, 10, 0.1) 0%, rgba(6, 7, 10, 0.84) 100%);
`;

const LeftDock = styled.nav`
  position: absolute;
  left: clamp(0.55rem, 1.8vw, 1.1rem);
  top: 50%;
  transform: translateY(-50%);
  z-index: 6;
  display: grid;
  gap: 0.56rem;

  @media (max-width: 70em) {
    display: none;
  }
`;

const DockButton = styled.button`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 0.64rem;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.82)' : 'rgba(255, 255, 255, 0.24)')};
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.2)' : 'rgba(10, 11, 15, 0.58)')};
  color: ${({ $active }) => ($active ? 'rgba(255, 244, 216, 0.98)' : 'rgba(255, 255, 255, 0.84)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.88);
    background: rgba(240, 216, 173, 0.2);
    color: rgba(255, 244, 216, 0.98);
    outline: none;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 5;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: clamp(0.78rem, 1.7vw, 1.15rem);
  padding: clamp(6rem, 10vw, 8.4rem) clamp(1.2rem, 5vw, 4.8rem) clamp(6.1rem, 9vw, 8rem)
    clamp(1.2rem, 9vw, 8.4rem);

  @media (max-width: 70em) {
    padding-left: clamp(1.2rem, 4vw, 3rem);
  }

  @media (max-width: 48em) {
    padding-bottom: clamp(5rem, 12vw, 6.2rem);
  }
`;

const SeriesMark = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.62rem;

  b {
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 0.32rem;
    border: 1px solid rgba(240, 216, 173, 0.64);
    background: rgba(240, 216, 173, 0.2);
    color: rgba(255, 245, 220, 0.98);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.96rem;
    font-weight: 700;
  }

  span {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: clamp(0.72rem, 1vw, 0.9rem);
    color: rgba(242, 242, 242, 0.88);
  }
`;

const BigTitle = styled.h1`
  width: min(12ch, 100%);
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: clamp(2.3rem, 8.8vw, 6.4rem);
  line-height: 0.86;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.98);
  text-transform: uppercase;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
`;

const RankRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.52rem;

  b {
    border-radius: 0.28rem;
    background: rgba(210, 36, 36, 0.9);
    color: rgba(255, 255, 255, 0.98);
    padding: 0.2rem 0.36rem;
    font-size: 0.7rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  span {
    font-size: clamp(0.98rem, 1.8vw, 1.45rem);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.96);
  }
`;

const Description = styled.p`
  width: min(62ch, 100%);
  color: rgba(243, 243, 243, 0.92);
  font-size: clamp(0.92rem, 1.5vw, 1.16rem);
  line-height: 1.58;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
`;

const PlayButton = styled.button`
  border: none;
  border-radius: 0.56rem;
  padding: 0.74rem 1.3rem;
  background: #ffffff;
  color: #06070b;
  font-size: 1.02rem;
  font-weight: 700;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.86);
    outline: none;
  }
`;

const InfoButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 0.56rem;
  padding: 0.74rem 1.24rem;
  background: rgba(58, 60, 66, 0.72);
  color: rgba(255, 255, 255, 0.96);
  font-size: 1.02rem;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(77, 79, 87, 0.86);
    outline: none;
  }
`;

const Maturity = styled.div`
  position: absolute;
  right: clamp(0.72rem, 2vw, 1.4rem);
  bottom: clamp(1.3rem, 2.6vw, 2.1rem);
  z-index: 5;
  border-left: 3px solid rgba(255, 255, 255, 0.86);
  background: rgba(6, 7, 9, 0.62);
  color: rgba(255, 255, 255, 0.96);
  letter-spacing: 0.06em;
  font-size: clamp(0.94rem, 1.6vw, 1.38rem);
  padding: 0.56rem 1.04rem;
`;

const Rows = styled.div`
  width: min(1540px, 98vw);
  margin: clamp(-5.6rem, -6vw, -4rem) auto 0;
  position: relative;
  z-index: 7;
  padding-bottom: clamp(1.2rem, 2.8vw, 2.4rem);
  display: grid;
  gap: 1.05rem;

  @media (max-width: 56em) {
    margin-top: -2.2rem;
  }
`;

const Row = styled.section`
  display: grid;
  gap: 0.58rem;
`;

const RowTitle = styled.h3`
  padding-left: clamp(0.65rem, 1.4vw, 1rem);
  font-size: clamp(0.98rem, 1.24vw, 1.16rem);
  color: rgba(250, 250, 250, 0.96);
  font-weight: 700;
`;

const Shelf = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(92px, 8.2vw, 128px);
  gap: clamp(0.22rem, 0.48vw, 0.36rem);
  overflow-x: auto;
  padding: 0 0.6rem 0.2rem;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.28) transparent;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.28);
  }
`;

const Card = styled(motion.button)`
  position: relative;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.8)' : 'rgba(255, 255, 255, 0.15)')};
  border-radius: 0.42rem;
  background: rgba(8, 9, 13, 0.9);
  overflow: hidden;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: clamp(58px, 5.4vw, 84px);
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.95);
    outline-offset: -2px;
  }
`;

const CardMark = styled.span`
  position: absolute;
  top: 0.32rem;
  left: 0.32rem;
  border-radius: 0.2rem;
  background: rgba(215, 39, 39, 0.92);
  color: rgba(255, 255, 255, 0.98);
  font-size: 0.54rem;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.16rem 0.22rem;
`;

const dockIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="16.6" y2="16.6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.8L12 4l9 7.8" />
      <path d="M6.5 10.7v8.8h11v-8.8" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 6.2H6.2v11.6h11.6z" />
      <path d="M9 3.8h6" />
      <path d="M9 20.2h6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19l14-14" />
      <path d="M12 5h7v7" />
      <path d="M5 12v7h7" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.8" y="5.5" width="16.4" height="12.2" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 18.2h15" />
      <path d="M6.8 8.2h10.4v7.8H6.8z" />
      <path d="M10.2 5.8h3.6" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
];

const rows = [
  {
    title: 'Trending Now',
    items: [
      {
        image: img11,
        title: 'Shadowline',
        rank: '#1 in TV Shows Today',
        description:
          'When a young editor vanishes, a small city unravels into covert experiments and volatile signals.',
      },
      {
        image: img4,
        title: 'Signal Field',
        rank: 'Top 10 in Drama',
        description: 'A frequency map buried in old tapes points to a hidden district underneath the station.',
      },
      {
        image: img5,
        title: 'Liminal Room',
        rank: 'Trending #3',
        description: 'A controlled studio set begins changing each night before cameras roll.',
      },
      {
        image: img6,
        title: 'Cold Frame',
        rank: 'Trending #4',
        description: 'Each overexposed negative contains coordinates to a place that should not exist.',
      },
      {
        image: img7,
        title: 'No Sleep City',
        rank: 'Trending #5',
        description: 'Night interviews reveal one witness appearing in every unsolved file.',
      },
      {
        image: img12,
        title: 'Red Corridor',
        rank: 'Trending #6',
        description: 'A corridor lit in emergency red opens to a locked archive floor.',
      },
    ],
  },
  {
    title: 'Continue Watching',
    items: [
      {
        image: img8,
        title: 'Echo Transfer',
        rank: 'Continue at 19:24',
        description: 'A missing voice returns in reversed audio from a decommissioned relay.',
      },
      {
        image: img9,
        title: 'Night Junction',
        rank: 'Continue at 36:02',
        description: 'Three disappearances converge through one old rail control feed.',
      },
      {
        image: img10,
        title: 'Final Composition',
        rank: 'Continue at 48:01',
        description: 'A final cut keeps revealing frames no editor added.',
      },
      {
        image: img13,
        title: 'Glass Division',
        rank: 'Continue at 14:10',
        description: 'Mirror reflections show an extra person never present on set.',
      },
      {
        image: img14,
        title: 'Zero Ground',
        rank: 'Continue at 31:56',
        description: 'Drone footage captures movement below sealed concrete.',
      },
      {
        image: img4,
        title: 'Mirror Exit',
        rank: 'Continue at 21:08',
        description: 'Parallel edits sync perfectly until the final 7 seconds.',
      },
    ],
  },
  {
    title: 'New Releases',
    items: [
      {
        image: img6,
        title: 'Blue Sector',
        rank: 'New this week',
        description: 'A frozen control room reactivates after years of silence.',
      },
      {
        image: img7,
        title: 'Rain Archive',
        rank: 'New this week',
        description: 'Recovered storm tapes reopen a closed investigation.',
      },
      {
        image: img11,
        title: 'Static Breach',
        rank: 'New this week',
        description: 'White-noise patterns align with unseen surveillance routes.',
      },
      {
        image: img12,
        title: 'Terminal North',
        rank: 'New this week',
        description: 'One traveler appears at three checkpoints in one minute.',
      },
      {
        image: img10,
        title: 'After Voltage',
        rank: 'New this week',
        description: 'Restored power reveals untouched recordings from closed sets.',
      },
      {
        image: img8,
        title: 'Concrete Sky',
        rank: 'New this week',
        description: 'A rooftop feed tracks a silhouette before each blackout.',
      },
    ],
  },
];

const thumbnailByImage = new Map([
  [img4, thumb4],
  [img5, thumb5],
  [img6, thumb6],
  [img7, thumb7],
  [img8, thumb8],
  [img9, thumb9],
  [img10, thumb10],
  [img11, thumb11],
  [img12, thumb12],
  [img13, thumb13],
  [img14, thumb14],
]);

const getThumbnail = (source) => thumbnailByImage.get(source) || source;

const Videos = () => {
  const [activeDock, setActiveDock] = useState(1);
  const [featured, setFeatured] = useState(rows[0].items[0]);

  const titleLines = useMemo(() => {
    const words = featured.title.split(' ');
    if (words.length <= 1) {
      return featured.title;
    }
    const split = Math.ceil(words.length / 2);
    return `${words.slice(0, split).join(' ')}\n${words.slice(split).join(' ')}`;
  }, [featured.title]);

  return (
    <Section id="videos">
      <Canvas>
        <Hero>
          <HeroImage src={featured.image} alt="" aria-hidden="true" />
          <HeroGlow />

          <LeftDock aria-label="Videos quick navigation">
            {dockIcons.map((icon, index) => (
              <DockButton
                key={`dock-${index + 1}`}
                type="button"
                $active={activeDock === index}
                onClick={() => setActiveDock(index)}
                aria-label={`Quick icon ${index + 1}`}
              >
                {icon}
              </DockButton>
            ))}
          </LeftDock>

          <HeroContent
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <SeriesMark>
              <b>J</b>
              <span>Series</span>
            </SeriesMark>

            <BigTitle>{titleLines}</BigTitle>

            <RankRow>
              <b>Top</b>
              <span>{featured.rank}</span>
            </RankRow>

            <Description>{featured.description}</Description>

            <ButtonRow>
              <PlayButton type="button">Play</PlayButton>
              <InfoButton type="button">More info</InfoButton>
            </ButtonRow>
          </HeroContent>

          <Maturity>TV-14</Maturity>
        </Hero>

        <Rows>
          {rows.map((row) => (
            <Row key={row.title}>
              <RowTitle>{row.title}</RowTitle>
              <Shelf>
                {row.items.map((item) => {
                  const isActive = item.title === featured.title;
                  return (
                    <Card
                      key={`${row.title}-${item.title}`}
                      type="button"
                      $active={isActive}
                      onClick={() => setFeatured(item)}
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{ duration: 0.2 }}
                      aria-label={`Feature ${item.title}`}
                    >
                      <CardMark>J</CardMark>
                      <img
                        src={getThumbnail(item.image)}
                        alt={item.title}
                        width="1280"
                        height="720"
                        loading="lazy"
                        decoding="async"
                      />
                    </Card>
                  );
                })}
              </Shelf>
            </Row>
          ))}
        </Rows>
      </Canvas>
    </Section>
  );
};

export default Videos;
