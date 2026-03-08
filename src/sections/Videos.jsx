import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import img4 from '../assets/VideoHeroes/4-hero.jpg';
import img5 from '../assets/VideoHeroes/5-hero.jpg';
import img6 from '../assets/VideoHeroes/6-hero.jpg';
import img7 from '../assets/VideoHeroes/7-hero.jpg';
import img8 from '../assets/VideoHeroes/8-hero.jpg';
import img9 from '../assets/VideoHeroes/9-hero.jpg';
import img10 from '../assets/VideoHeroes/10-hero.jpg';
import img11 from '../assets/VideoHeroes/11-hero.jpg';
import img12 from '../assets/VideoHeroes/12-hero.jpg';
import img13 from '../assets/VideoHeroes/13-hero.jpg';
import img14 from '../assets/VideoHeroes/14-hero.jpg';

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
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #050507;
  padding: clamp(4.6rem, 7vw, 6.4rem) 0 clamp(2.6rem, 6vw, 4.4rem);
`;

const Wrap = styled.div`
  width: min(1640px, 96vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(1rem, 2.1vw, 1.6rem);
`;

const Billboard = styled(motion.section)`
  position: relative;
  min-height: clamp(360px, 54vw, 700px);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #0a0b0f;
`;

const BillboardPoster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BillboardShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(5, 5, 7, 0.86) 0%, rgba(5, 5, 7, 0.62) 32%, rgba(5, 5, 7, 0.15) 68%),
    linear-gradient(180deg, rgba(5, 5, 7, 0.2) 0%, rgba(5, 5, 7, 0.84) 100%);
`;

const BillboardInner = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(1rem, 3vw, 2.4rem);
  display: grid;
  align-content: end;
  width: min(760px, 100%);
  gap: 0.75rem;
`;

const Kicker = styled.span`
  color: rgba(255, 255, 255, 0.74);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: clamp(0.62rem, 0.85vw, 0.8rem);
`;

const Title = styled.h1`
  margin: 0;
  color: rgba(249, 250, 252, 0.98);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 0.95;
  font-size: clamp(1.7rem, 5vw, 4.4rem);
`;

const Meta = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const MetaChip = styled.span`
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(243, 245, 248, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.66rem;
  padding: 0.27rem 0.44rem;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(230, 233, 239, 0.84);
  font-size: clamp(0.86rem, 1.05vw, 1rem);
  line-height: 1.6;
  width: min(60ch, 100%);
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Primary = styled.button`
  border: none;
  border-radius: 0.55rem;
  padding: 0.64rem 1rem;
  background: rgba(245, 245, 246, 0.96);
  color: #090a0d;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
`;

const Secondary = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 0.55rem;
  padding: 0.62rem 0.98rem;
  background: rgba(22, 24, 28, 0.8);
  color: rgba(243, 245, 248, 0.95);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
`;

const Rows = styled.div`
  display: grid;
  gap: clamp(0.9rem, 1.8vw, 1.3rem);
`;

const Row = styled(motion.section)`
  display: grid;
  gap: 0.5rem;
`;

const RowHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const RowTitle = styled.h2`
  margin: 0;
  color: rgba(245, 246, 249, 0.98);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: clamp(0.76rem, 1.02vw, 0.88rem);
`;

const RowNote = styled.p`
  margin: 0;
  color: rgba(202, 210, 223, 0.7);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
`;

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(190px, 1fr);
  gap: 0.62rem;
  overflow-x: auto;
  padding: 0.15rem 0.05rem 0.55rem;
  scroll-snap-type: x proximity;

  &::-webkit-scrollbar {
    height: 0.46rem;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.24);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
  }

  @media (max-width: 52em) {
    grid-auto-columns: minmax(175px, 70vw);
  }
`;

const Card = styled(motion.button)`
  position: relative;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.56)' : 'rgba(255, 255, 255, 0.14)')};
  border-radius: 0.68rem;
  overflow: hidden;
  padding: 0;
  background: #0b0c10;
  cursor: pointer;
  text-align: left;
  scroll-snap-align: start;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: var(--aspect, 16 / 9);
  object-fit: cover;
  display: block;
`;

const CardOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.55rem;
  background: linear-gradient(180deg, rgba(8, 9, 12, 0) 0%, rgba(8, 9, 12, 0.86) 100%);
  display: grid;
  gap: 0.18rem;
`;

const CardTitle = styled.strong`
  color: rgba(248, 249, 252, 0.96);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardMeta = styled.span`
  color: rgba(212, 220, 232, 0.74);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const SheetBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.86);
  backdrop-filter: blur(7px);
  display: grid;
  place-items: center;
  padding: clamp(0.8rem, 2.5vw, 1.2rem);
`;

const SheetPanel = styled(motion.div)`
  width: min(1080px, 100%);
  border-radius: 0.9rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #06070b;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.58);
`;

const SheetTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.82rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  strong {
    color: rgba(248, 250, 252, 0.96);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.82rem;
  }
`;

const SheetClose = styled.button`
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  padding: 0.42rem 0.6rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(246, 248, 251, 0.95);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const SheetBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
  gap: 0;

  @media (max-width: 62em) {
    grid-template-columns: 1fr;
  }
`;

const SheetVisual = styled.div`
  position: relative;
  min-height: clamp(280px, 48vw, 620px);
  background: #05060a;
`;

const SheetPoster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SheetShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(5, 6, 10, 0.12) 0%, rgba(5, 6, 10, 0.84) 100%),
    radial-gradient(circle at 72% 28%, rgba(255, 206, 148, 0.22), transparent 48%);
`;

const SheetInfo = styled.div`
  padding: clamp(1rem, 2.2vw, 1.4rem);
  display: grid;
  align-content: start;
  gap: 0.85rem;
  background: linear-gradient(180deg, rgba(9, 10, 14, 0.96), rgba(6, 7, 10, 0.98));
`;

const SheetEyebrow = styled.span`
  color: rgba(240, 216, 173, 0.88);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.62rem;
`;

const SheetTitle = styled.h2`
  margin: 0;
  color: rgba(249, 250, 252, 0.98);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.96;
  font-size: clamp(1.3rem, 2.4vw, 2rem);
`;

const SheetText = styled.p`
  margin: 0;
  color: rgba(226, 231, 239, 0.82);
  font-size: 0.92rem;
  line-height: 1.62;
`;

const SheetNotice = styled.div`
  border-radius: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.78rem 0.82rem;
  color: rgba(244, 246, 249, 0.88);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  line-height: 1.55;
`;


const SheetActions = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const SheetPlayButton = styled.button`
  border: none;
  border-radius: 0.6rem;
  padding: 0.68rem 1rem;
  background: rgba(245, 245, 246, 0.96);
  color: #090a0d;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
`;

const SheetGhostButton = styled.button`
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  padding: 0.66rem 0.96rem;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(245, 247, 250, 0.94);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
`;

const collections = [
  {
    title: 'Narrative Shorts',
    note: 'Character-led scenes with mood-driven pacing.',
    items: [
      {
        image: img11,
        title: "The dark echo's of 1939",
        category: 'Drama short',
        duration: '04:12',
        year: '2026',
        tools: 'Premiere + Lumetri',
        logline: 'A night editor follows visual glitches through one city block and uncovers a hidden story trail.',
        aspect: '16 / 9',
      },
      {
        image: img4,
        title: 'Signal Field',
        category: 'Cinematic study',
        duration: '03:31',
        year: '2026',
        tools: 'Sony A7 + DaVinci',
        logline: 'An experiment in contrast, rhythm, and urban texture captured during blue hour.',
        aspect: '16 / 9',
      },
      {
        image: img6,
        title: 'Cold Frame',
        category: 'Visual poem',
        duration: '02:58',
        year: '2025',
        tools: 'FX3 + Resolve',
        logline: 'Still architecture and moving shadows become a single visual sentence.',
        aspect: '16 / 9',
      },
      {
        image: img10,
        title: 'Final Composition',
        category: 'Edit exercise',
        duration: '05:06',
        year: '2025',
        tools: 'Premiere + After Effects',
        logline: 'A montage project exploring continuity cuts and emotional transitions.',
        aspect: '16 / 9',
      },
    ],
  },
  {
    title: 'Documentary Fragments',
    note: 'Observed moments, natural light, and grounded sound design.',
    items: [
      {
        image: img8,
        title: 'Echo Transfer',
        category: 'Doc fragment',
        duration: '06:14',
        year: '2026',
        tools: 'Zoom H6 + FX30',
        logline: 'A quiet portrait of late-night transit workers and the spaces between shifts.',
        aspect: '16 / 9',
      },
      {
        image: img9,
        title: 'Night Junction',
        category: 'Field study',
        duration: '04:47',
        year: '2025',
        tools: 'Handheld + 35mm',
        logline: 'One rail route, three viewpoints, and a layered soundscape built from station ambience.',
        aspect: '16 / 9',
      },
      {
        image: img13,
        title: 'Glass Division',
        category: 'Interview piece',
        duration: '05:22',
        year: '2025',
        tools: 'Resolve Fairlight',
        logline: 'Reflections and off-axis framing turn a simple interview into visual narrative.',
        aspect: '16 / 9',
      },
      {
        image: img14,
        title: 'Zero Ground',
        category: 'Location study',
        duration: '03:55',
        year: '2024',
        tools: 'Gimbal + ND filters',
        logline: 'A texture-first exploration of concrete, rain, and negative space.',
        aspect: '16 / 9',
      },
    ],
  },
  {
    title: 'Experimental Visuals',
    note: 'Motion design tests, color language, and concept edits.',
    items: [
      {
        image: img5,
        title: 'Liminal Room',
        category: 'Concept loop',
        duration: '02:09',
        year: '2026',
        tools: 'After Effects + Grain',
        logline: 'Set design and looping edits create a shifting, dreamlike room sequence.',
        aspect: '16 / 9',
      },
      {
        image: img7,
        title: 'No Sleep City',
        category: 'Night study',
        duration: '03:18',
        year: '2025',
        tools: 'Long exposure + AE',
        logline: 'Neon motion and shutter drag are blended into an abstract city sketch.',
        aspect: '16 / 9',
      },
      {
        image: img12,
        title: 'Red Corridor',
        category: 'Atmosphere piece',
        duration: '04:02',
        year: '2025',
        tools: 'Color isolation',
        logline: 'A single red-lit location becomes a sequence of tension-driven compositions.',
        aspect: '16 / 9',
      },
      {
        image: img6,
        title: 'Blue Sector',
        category: 'Studio test',
        duration: '02:44',
        year: '2024',
        tools: 'LED practicals',
        logline: 'Controlled lighting and practical effects push a minimalist sci-fi look.',
        aspect: '16 / 9',
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
  const rowsRef = useRef(null);

  const allItems = useMemo(
    () =>
      collections.flatMap((collection) =>
        collection.items.map((item) => ({
          ...item,
          collectionTitle: collection.title,
          collectionNote: collection.note,
        })),
      ),
    [],
  );

  const [featured, setFeatured] = useState(allItems[0]);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!sheetOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setSheetOpen(false);
      }
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEsc);
    };
  }, [sheetOpen]);

  const openItem = (item, collection) => {
    setFeatured({
      ...item,
      collectionTitle: collection.title,
      collectionNote: collection.note,
    });
    setSheetOpen(true);
  };

  return (
    <Section id="videos">
      <Wrap>
        <Billboard
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BillboardPoster src={featured.image} alt={featured.title} />
          <BillboardShade />
          <BillboardInner>
            <Kicker>Jack Miller Film Library</Kicker>
            <Title>{featured.title}</Title>
            <Meta>
              <MetaChip>{featured.year}</MetaChip>
              <MetaChip>{featured.duration}</MetaChip>
              <MetaChip>{featured.category}</MetaChip>
            </Meta>
            <Description>{featured.logline}</Description>
            <Actions>
              <Primary type="button" onClick={() => setSheetOpen(true)}>View Project</Primary>
              <Secondary
                type="button"
                onClick={() => rowsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                Browse Titles
              </Secondary>
            </Actions>
          </BillboardInner>
        </Billboard>

        <Rows ref={rowsRef}>
          {collections.map((collection, rowIndex) => (
            <Row
              key={collection.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: rowIndex * 0.04 }}
            >
              <RowHead>
                <RowTitle>{collection.title}</RowTitle>
                <RowNote>{collection.note}</RowNote>
              </RowHead>
              <Rail>
                {collection.items.map((item) => {
                  const active = featured.title === item.title;

                  return (
                    <Card
                      key={`${collection.title}-${item.title}`}
                      type="button"
                      $active={active}
                      style={{ '--aspect': item.aspect }}
                      onClick={() => openItem(item, collection)}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.18 }}
                      aria-label={`Open ${item.title}`}
                    >
                      <CardImage src={getThumbnail(item.image)} alt={item.title} loading="lazy" decoding="async" />
                      <CardOverlay>
                        <CardTitle>{item.title}</CardTitle>
                        <CardMeta>
                          {item.category} · {item.duration}
                        </CardMeta>
                      </CardOverlay>
                    </Card>
                  );
                })}
              </Rail>
            </Row>
          ))}
        </Rows>
      </Wrap>

      <AnimatePresence>
        {sheetOpen ? (
          <SheetBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(false)}
          >
            <SheetPanel
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <SheetTop>
                <strong>{featured.title}</strong>
                <SheetClose type="button" onClick={() => setSheetOpen(false)}>Close</SheetClose>
              </SheetTop>
              <SheetBody>
                <SheetVisual>
                  <SheetPoster src={featured.image} alt={featured.title} />
                  <SheetShade />
                </SheetVisual>
                <SheetInfo>
                  <SheetEyebrow>Jack Miller Media</SheetEyebrow>
                  <SheetTitle>{featured.title}</SheetTitle>
                  <Meta>
                    <MetaChip>{featured.year}</MetaChip>
                    <MetaChip>{featured.duration}</MetaChip>
                    <MetaChip>{featured.category}</MetaChip>
                  </Meta>
                  <SheetText>{featured.logline}</SheetText>
                  <SheetText>{featured.collectionNote}</SheetText>
                  <Meta>
                    <MetaChip>{featured.tools}</MetaChip>
                    <MetaChip>{featured.collectionTitle}</MetaChip>
                  </Meta>
                  <SheetActions>
                    <SheetPlayButton type="button">Play</SheetPlayButton>
                    <SheetGhostButton type="button" onClick={() => setSheetOpen(false)}>
                      Back to Library
                    </SheetGhostButton>
                  </SheetActions>
                  <SheetNotice>
                    Playback is off for now. This page is currently a poster-based showcase while the final video
                    library is being prepared.
                  </SheetNotice>
                </SheetInfo>
              </SheetBody>
            </SheetPanel>
          </SheetBackdrop>
        ) : null}
      </AnimatePresence>
    </Section>
  );
};

export default Videos;
