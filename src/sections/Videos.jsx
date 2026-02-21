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

const Section = styled.section`
  width: 100%;
`;

const Shell = styled.div`
  width: min(1500px, 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(1.1rem, 1.8vw, 1.8rem);
`;

const Hero = styled.article`
  position: relative;
  min-height: clamp(520px, 80vh, 840px);
  border-radius: 0;
  overflow: hidden;
`;

const HeroBackground = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.03);
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(4, 5, 8, 0.86) 12%, rgba(4, 5, 8, 0.46) 46%, rgba(4, 5, 8, 0.88) 100%),
    linear-gradient(180deg, rgba(4, 5, 8, 0.1) 0%, rgba(4, 5, 8, 0.75) 100%);
`;

const SideRail = styled.nav`
  position: absolute;
  top: 50%;
  left: clamp(0.7rem, 2vw, 1.35rem);
  transform: translateY(-50%);
  z-index: 4;
  display: grid;
  gap: 0.62rem;

  @media (max-width: 66em) {
    display: none;
  }
`;

const RailButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.68)' : 'rgba(255, 255, 255, 0.23)')};
  border-radius: 0.75rem;
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.24)' : 'rgba(4, 5, 8, 0.52)')};
  color: ${({ $active }) => ($active ? 'rgba(255, 247, 228, 0.98)' : 'rgba(255, 255, 255, 0.82)')};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.75);
    background: rgba(240, 216, 173, 0.2);
    color: rgba(255, 247, 228, 0.98);
    outline: none;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: clamp(0.85rem, 1.8vw, 1.15rem);
  padding: clamp(5.8rem, 9vw, 8rem) clamp(1.2rem, 4.6vw, 5rem) clamp(1.8rem, 3vw, 2.6rem)
    clamp(1.3rem, 9vw, 8.6rem);

  @media (max-width: 66em) {
    padding-left: clamp(1.2rem, 4vw, 3rem);
  }

  @media (max-width: 48em) {
    padding-top: clamp(6rem, 14vw, 7rem);
  }
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.72rem;

  b {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 0.35rem;
    background: rgba(240, 216, 173, 0.2);
    border: 1px solid rgba(240, 216, 173, 0.55);
    color: rgba(255, 246, 223, 0.98);
    font-size: 0.9rem;
  }

  span {
    font-size: clamp(0.75rem, 1vw, 0.92rem);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: rgba(243, 243, 243, 0.86);
  }
`;

const HeroTitle = styled.h1`
  width: min(12ch, 100%);
  font-size: clamp(2.35rem, 9vw, 6.8rem);
  line-height: 0.9;
  letter-spacing: 0.015em;
  color: rgba(255, 255, 255, 0.98);
  text-transform: uppercase;
`;

const HeroMeta = styled.h2`
  font-size: clamp(1.02rem, 2vw, 1.65rem);
  color: rgba(255, 255, 255, 0.94);
  font-weight: 700;
`;

const HeroDescription = styled.p`
  width: min(60ch, 100%);
  font-size: clamp(0.92rem, 1.55vw, 1.12rem);
  line-height: 1.6;
  color: rgba(240, 240, 240, 0.9);
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 0.6rem;
  background: #ffffff;
  color: #0c0d12;
  padding: 0.72rem 1.3rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.82);
    outline: none;
  }
`;

const SecondaryButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 0.6rem;
  background: rgba(55, 56, 62, 0.72);
  color: #f7f7f7;
  padding: 0.72rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(80, 82, 89, 0.88);
    outline: none;
  }
`;

const Rating = styled.div`
  position: absolute;
  right: clamp(0.9rem, 2.2vw, 1.8rem);
  bottom: clamp(1.1rem, 2.4vw, 1.9rem);
  z-index: 3;
  border-left: 3px solid rgba(255, 255, 255, 0.86);
  background: rgba(3, 4, 6, 0.68);
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(1rem, 1.7vw, 1.4rem);
  letter-spacing: 0.06em;
  padding: 0.58rem 1.1rem;
`;

const Rows = styled.div`
  width: min(1480px, 96vw);
  margin: 0 auto;
  padding-bottom: clamp(1.4rem, 3vw, 2.5rem);
  display: grid;
  gap: 1.15rem;
`;

const Row = styled.section`
  display: grid;
  gap: 0.62rem;
`;

const RowTitle = styled.h3`
  font-size: clamp(0.98rem, 1.3vw, 1.2rem);
  color: rgba(250, 250, 250, 0.95);
  font-weight: 700;
`;

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(112px, 11vw, 170px);
  gap: clamp(0.32rem, 0.7vw, 0.52rem);
  overflow-x: auto;
  padding-bottom: 0.25rem;

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

const Tile = styled(motion.button)`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.8)' : 'rgba(255, 255, 255, 0.16)')};
  border-radius: 0.55rem;
  background: rgba(8, 9, 12, 0.86);
  overflow: hidden;
  padding: 0;
  text-align: left;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.95);
    outline-offset: -2px;
  }
`;

const TileInfo = styled.div`
  display: none;
`;

const railButtons = ['sr', 'hm', 'mx', 'up', 'rl', 'ls', 'ad'];

const rows = [
  {
    title: 'Trending Now',
    items: [
      {
        image: img11,
        title: 'Shadowline',
        meta: 'Series',
        rank: '#1 in visuals today',
        description:
          'When a city falls dark, one signal keeps returning from inside the abandoned quarter.',
      },
      {
        image: img4,
        title: 'Signal Field',
        meta: 'Episode',
        rank: 'Most watched this week',
        description:
          'A late-night transmission opens a route through blocked streets and unresolved cases.',
      },
      {
        image: img5,
        title: 'Liminal Room',
        meta: 'Limited',
        rank: 'Editor pick',
        description:
          'A closed set becomes a maze of reflections as each take reveals a different timeline.',
      },
      {
        image: img6,
        title: 'Cold Frame',
        meta: 'Original',
        rank: 'Top 10 in drama',
        description:
          'A forensic photographer uncovers a pattern hidden between overexposed negatives.',
      },
      {
        image: img7,
        title: 'No Sleep City',
        meta: 'Series',
        rank: 'Rising title',
        description:
          'Streetlight interviews and long-lens surveillance merge into one unresolved timeline.',
      },
      {
        image: img12,
        title: 'Red Corridor',
        meta: 'Episode',
        rank: 'Recently added',
        description:
          'A corridor lit by emergency glow becomes the entry point to an unseen floor of the archive.',
      },
    ],
  },
  {
    title: 'Continue Watching',
    items: [
      {
        image: img8,
        title: 'Echo Transfer',
        meta: '41 min left',
        rank: 'Continue from 00:19:24',
        description:
          'A failed radio relay is replayed from six angles until one missing face appears in frame.',
      },
      {
        image: img9,
        title: 'Night Junction',
        meta: '24 min left',
        rank: 'Continue from 00:36:02',
        description:
          'A rail hub camera network links three disappearances that happened eight years apart.',
      },
      {
        image: img10,
        title: 'Final Composition',
        meta: '12 min left',
        rank: 'Continue from 00:48:01',
        description:
          'A last cut must be locked before sunrise while the timeline continues to rewrite itself.',
      },
      {
        image: img13,
        title: 'Glass Division',
        meta: '37 min left',
        rank: 'Continue from 00:14:10',
        description:
          'A mirrored set hides an off-camera witness visible only in grade tests.',
      },
      {
        image: img14,
        title: 'Zero Ground',
        meta: '18 min left',
        rank: 'Continue from 00:31:56',
        description:
          'A sealed excavation site reopens when drone footage reveals movement below concrete.',
      },
      {
        image: img4,
        title: 'Mirror Exit',
        meta: '33 min left',
        rank: 'Continue from 00:21:08',
        description:
          'Two synchronized edits from different cameras refuse to align at the same timestamp.',
      },
    ],
  },
  {
    title: 'New Releases',
    items: [
      {
        image: img6,
        title: 'Blue Sector',
        meta: 'New',
        rank: 'Just released',
        description:
          'A cold-toned security tape leads a team deeper into a disconnected district control room.',
      },
      {
        image: img7,
        title: 'Rain Archive',
        meta: 'New',
        rank: 'Just released',
        description:
          'Recovered tapes from storm season expose an investigation closed without explanation.',
      },
      {
        image: img11,
        title: 'Static Breach',
        meta: 'New',
        rank: 'Just released',
        description:
          'A repeating white-noise pattern maps directly to hidden camera positions across the city.',
      },
      {
        image: img12,
        title: 'Terminal North',
        meta: 'New',
        rank: 'Just released',
        description:
          'A border checkpoint camera captures the same traveler entering on three separate dates.',
      },
      {
        image: img10,
        title: 'After Voltage',
        meta: 'New',
        rank: 'Just released',
        description:
          'Power restoration reveals untouched recordings from a period when the studio was closed.',
      },
      {
        image: img8,
        title: 'Concrete Sky',
        meta: 'New',
        rank: 'Just released',
        description:
          'A rooftop surveillance arc tracks a silhouette that appears before each structural failure.',
      },
    ],
  },
];

const Videos = () => {
  const initial = rows[0].items[0];
  const [featured, setFeatured] = useState(initial);
  const [activeRail, setActiveRail] = useState(1);

  const activeTitle = useMemo(() => {
    const words = featured.title.split(' ');
    if (words.length <= 1) {
      return featured.title;
    }

    const split = Math.ceil(words.length / 2);
    return `${words.slice(0, split).join(' ')}\n${words.slice(split).join(' ')}`;
  }, [featured.title]);

  return (
    <Section id="videos">
      <Shell>
        <Hero>
          <HeroBackground src={featured.image} alt="" aria-hidden="true" />
          <HeroShade />

          <SideRail aria-label="Videos quick actions">
            {railButtons.map((button, index) => (
              <RailButton
                key={button}
                type="button"
                $active={activeRail === index}
                onClick={() => setActiveRail(index)}
                aria-label={`Quick action ${button}`}
              >
                {button}
              </RailButton>
            ))}
          </SideRail>

          <HeroContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <Eyebrow>
              <b>J</b>
              <span>Series</span>
            </Eyebrow>

            <HeroTitle>{activeTitle}</HeroTitle>
            <HeroMeta>{featured.rank}</HeroMeta>
            <HeroDescription>{featured.description}</HeroDescription>

            <ActionRow>
              <PrimaryButton type="button">Play</PrimaryButton>
              <SecondaryButton type="button">More info</SecondaryButton>
            </ActionRow>
          </HeroContent>

          <Rating>TV-14</Rating>
        </Hero>

        <Rows>
          {rows.map((row) => (
            <Row key={row.title}>
              <RowTitle>{row.title}</RowTitle>
              <Rail>
                {row.items.map((item) => {
                  const isActive = item.title === featured.title;
                  return (
                    <Tile
                      key={`${row.title}-${item.title}`}
                      type="button"
                      onClick={() => setFeatured(item)}
                      $active={isActive}
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{ duration: 0.2 }}
                      aria-label={`Feature ${item.title}`}
                    >
                      <img src={item.image} alt={item.title} width="1280" height="720" />
                      <TileInfo>
                        <h4>{item.title}</h4>
                        <p>{item.meta}</p>
                      </TileInfo>
                    </Tile>
                  );
                })}
              </Rail>
            </Row>
          ))}
        </Rows>
      </Shell>
    </Section>
  );
};

export default Videos;
