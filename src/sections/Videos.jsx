import { motion } from 'framer-motion';
import React, { useMemo, useRef, useState } from 'react';
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
import MainVideo from '../assets/Walking Girl.mp4';

const Section = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 12%, rgba(89, 116, 190, 0.22), transparent 40%),
    radial-gradient(circle at 84% 24%, rgba(182, 124, 93, 0.2), transparent 34%),
    linear-gradient(180deg, #06070b 0%, #05060a 55%, #030408 100%);
  padding: clamp(4.8rem, 8vw, 6.8rem) 0 clamp(3.2rem, 8vw, 5rem);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      repeating-linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.02) 0,
        rgba(255, 255, 255, 0.02) 1px,
        transparent 1px,
        transparent 3px
      );
    mix-blend-mode: soft-light;
    opacity: 0.38;
  }
`;

const Canvas = styled.div`
  position: relative;
  z-index: 1;
  width: min(1500px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(1.5rem, 2.8vw, 2.6rem);
`;

const Intro = styled.header`
  display: grid;
  gap: 0.8rem;
  width: min(78ch, 100%);
`;

const IntroTag = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: clamp(0.64rem, 0.9vw, 0.82rem);
  color: rgba(236, 215, 177, 0.9);
`;

const IntroTitle = styled.h1`
  font-family: 'Sirin Stencil', 'Trebuchet MS', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.94;
  font-size: clamp(2rem, 6.2vw, 4.8rem);
  color: rgba(249, 249, 249, 0.98);
  margin: 0;
`;

const IntroBody = styled.p`
  margin: 0;
  color: rgba(230, 233, 240, 0.82);
  width: min(68ch, 100%);
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  line-height: 1.6;
`;

const Featured = styled(motion.article)`
  position: sticky;
  top: clamp(4.8rem, 7vw, 6.2rem);
  z-index: 4;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: clamp(1rem, 2vw, 1.6rem);
  padding: clamp(0.7rem, 1.1vw, 0.9rem);
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, rgba(8, 10, 16, 0.84), rgba(6, 8, 13, 0.92));
  backdrop-filter: blur(12px);

  @media (max-width: 70em) {
    position: static;
    grid-template-columns: 1fr;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    backdrop-filter: none;
  }
`;

const StageMedia = styled.div`
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1.2rem;
  overflow: hidden;
  background: #0a0b11;
  min-height: clamp(260px, 46vw, 560px);
`;

const StageVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background: #07090f;
`;

const StageOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 72% 30%, rgba(255, 202, 152, 0.24), transparent 46%),
    linear-gradient(180deg, rgba(7, 8, 12, 0.18) 8%, rgba(7, 8, 12, 0.86) 92%);
`;

const StageBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  pointer-events: none;
  border: 1px solid rgba(240, 216, 173, 0.66);
  border-radius: 999px;
  background: rgba(8, 10, 15, 0.7);
  color: rgba(247, 229, 195, 0.96);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.63rem;
  padding: 0.34rem 0.58rem;
`;

const StageCaption = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  pointer-events: none;
`;

const StageCaptionText = styled.span`
  color: rgba(241, 244, 249, 0.92);
  font-size: clamp(0.74rem, 1vw, 0.88rem);
  letter-spacing: 0.06em;
`;

const PlayDot = styled.span`
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  background: rgba(9, 11, 16, 0.72);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.75rem;
`;

const StagePanel = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.2rem;
  background: linear-gradient(180deg, rgba(12, 14, 20, 0.86), rgba(6, 8, 13, 0.94));
  padding: clamp(1rem, 2vw, 1.5rem);
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const CollectionPill = styled.span`
  display: inline-flex;
  width: fit-content;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(229, 233, 241, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.62rem;
  padding: 0.34rem 0.6rem;
`;

const StageTitle = styled.h2`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.94;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: rgba(250, 250, 251, 0.98);
`;

const StageLogline = styled.p`
  margin: 0;
  color: rgba(229, 233, 242, 0.85);
  font-size: clamp(0.88rem, 1.15vw, 1rem);
  line-height: 1.62;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 0.46rem;
  flex-wrap: wrap;
`;

const MetaChip = styled.span`
  border-radius: 0.52rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(233, 237, 245, 0.92);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.28rem 0.48rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 0.62rem;
  padding: 0.66rem 0.98rem;
  background: rgba(243, 222, 189, 0.96);
  color: #0c0d12;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(245, 226, 197, 1);
    outline: none;
  }
`;

const GhostButton = styled.button`
  border-radius: 0.62rem;
  border: 1px solid rgba(255, 255, 255, 0.26);
  padding: 0.64rem 0.96rem;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(238, 242, 248, 0.95);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }
`;

const CollectionStack = styled.div`
  display: grid;
  gap: clamp(1.2rem, 2.2vw, 1.8rem);
`;

const Collection = styled(motion.section)`
  display: grid;
  gap: 0.7rem;
`;

const CollectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CollectionTitle = styled.h3`
  margin: 0;
  color: rgba(248, 248, 249, 0.98);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: clamp(0.82rem, 1.18vw, 0.94rem);
`;

const CollectionNote = styled.p`
  margin: 0;
  color: rgba(214, 220, 230, 0.72);
  font-size: clamp(0.76rem, 0.92vw, 0.88rem);
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(clamp(180px, 22vw, 280px), 1fr);
  gap: 0.82rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
  scrollbar-color: rgba(240, 216, 173, 0.6) rgba(255, 255, 255, 0.1);

  &::-webkit-scrollbar {
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(240, 216, 173, 0.56);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
  }

  @media (max-width: 48em) {
    grid-auto-columns: minmax(170px, 78vw);
  }
`;

const ProjectCard = styled(motion.button)`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.8)' : 'rgba(255, 255, 255, 0.14)')};
  border-radius: 0.9rem;
  background: linear-gradient(180deg, rgba(11, 13, 18, 0.94), rgba(8, 10, 15, 0.92));
  overflow: hidden;
  padding: 0;
  text-align: left;
  cursor: pointer;
  scroll-snap-align: start;

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.92);
    outline-offset: 2px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: var(--aspect, 16 / 10);
  object-fit: cover;
  display: block;
`;

const ProjectInfo = styled.div`
  padding: 0.62rem 0.62rem 0.74rem;
  display: grid;
  gap: 0.32rem;
`;

const ProjectName = styled.h4`
  margin: 0;
  color: rgba(248, 248, 249, 0.98);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: clamp(0.8rem, 0.95vw, 0.9rem);
`;

const ProjectMeta = styled.p`
  margin: 0;
  color: rgba(214, 220, 230, 0.72);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const collections = [
  {
    title: 'Narrative Shorts',
    note: 'Character-led scenes with mood-driven pacing.',
    items: [
      {
        image: img11,
        title: 'Shadowline',
        category: 'Drama short',
        duration: '04:12',
        year: '2026',
        tools: 'Premiere + Lumetri',
        logline: 'A night editor follows visual glitches through one city block and uncovers a hidden story trail.',
        aspect: '16 / 10',
      },
      {
        image: img4,
        title: 'Signal Field',
        category: 'Cinematic study',
        duration: '03:31',
        year: '2026',
        tools: 'Sony A7 + DaVinci',
        logline: 'An experiment in contrast, rhythm, and urban texture captured during blue hour.',
        aspect: '4 / 3',
      },
      {
        image: img6,
        title: 'Cold Frame',
        category: 'Visual poem',
        duration: '02:58',
        year: '2025',
        tools: 'FX3 + Resolve',
        logline: 'Still architecture and moving shadows become a single visual sentence.',
        aspect: '5 / 4',
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
        aspect: '3 / 2',
      },
      {
        image: img13,
        title: 'Glass Division',
        category: 'Interview piece',
        duration: '05:22',
        year: '2025',
        tools: 'Resolve Fairlight',
        logline: 'Reflections and off-axis framing turn a simple interview into visual narrative.',
        aspect: '4 / 3',
      },
      {
        image: img14,
        title: 'Zero Ground',
        category: 'Location study',
        duration: '03:55',
        year: '2024',
        tools: 'Gimbal + ND filters',
        logline: 'A texture-first exploration of concrete, rain, and negative space.',
        aspect: '16 / 10',
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
        aspect: '5 / 4',
      },
      {
        image: img12,
        title: 'Red Corridor',
        category: 'Atmosphere piece',
        duration: '04:02',
        year: '2025',
        tools: 'Color isolation',
        logline: 'A single red-lit location becomes a sequence of tension-driven compositions.',
        aspect: '4 / 3',
      },
      {
        image: img6,
        title: 'Blue Sector',
        category: 'Studio test',
        duration: '02:44',
        year: '2024',
        tools: 'LED practicals',
        logline: 'Controlled lighting and practical effects push a minimalist sci-fi look.',
        aspect: '16 / 10',
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
  const playerRef = useRef(null);

  const playFeatured = (restart = false) => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    if (restart) {
      player.currentTime = 0;
    }

    const playAttempt = player.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {});
    }
  };

  const pauseFeatured = () => {
    playerRef.current?.pause();
  };

  const selectFeatured = (item, collection, autoplay = false) => {
    setFeatured({
      ...item,
      collectionTitle: collection.title,
      collectionNote: collection.note,
    });

    if (autoplay) {
      playFeatured(true);
    }
  };

  return (
    <Section id="videos">
      <Canvas>
        <Intro>
          <IntroTag>Student Film Showcase</IntroTag>
          <IntroTitle>Jack Miller Moving Image Projects</IntroTitle>
          <IntroBody>
            A curated reel of student-led films, documentary fragments, and experimental edits in a premium streaming-style showcase focused on craft and visual identity.
          </IntroBody>
        </Intro>

        <Featured
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <StageMedia aria-label={`Featured project ${featured.title}`}>
            <StageVideo
              ref={playerRef}
              src={MainVideo}
              poster={featured.image}
              controls
              playsInline
              preload="metadata"
            />
            <StageOverlay />
            <StageBadge>{featured.category}</StageBadge>
            <StageCaption>
              <StageCaptionText>{featured.year} showcase cut</StageCaptionText>
              <PlayDot aria-hidden="true">▶</PlayDot>
            </StageCaption>
          </StageMedia>

          <StagePanel>
            <CollectionPill>{featured.collectionTitle}</CollectionPill>
            <StageTitle>{featured.title}</StageTitle>
            <StageLogline>{featured.logline}</StageLogline>
            <MetaRow>
              <MetaChip>{featured.duration}</MetaChip>
              <MetaChip>{featured.year}</MetaChip>
              <MetaChip>{featured.tools}</MetaChip>
            </MetaRow>
            <ActionRow>
              <PrimaryButton type="button" onClick={() => playFeatured(true)}>Play Project</PrimaryButton>
              <GhostButton type="button" onClick={pauseFeatured}>Pause</GhostButton>
            </ActionRow>
          </StagePanel>
        </Featured>

        <CollectionStack>
          {collections.map((collection, collectionIndex) => (
            <Collection
              key={collection.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.36, delay: collectionIndex * 0.05 }}
            >
              <CollectionHead>
                <CollectionTitle>{collection.title}</CollectionTitle>
                <CollectionNote>{collection.note}</CollectionNote>
              </CollectionHead>
              <ProjectGrid>
                {collection.items.map((item) => {
                  const active = featured.title === item.title;
                  return (
                    <ProjectCard
                      key={`${collection.title}-${item.title}`}
                      type="button"
                      $active={active}
                      style={{ '--aspect': item.aspect }}
                      onClick={() => selectFeatured(item, collection, true)}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      aria-label={`Play ${item.title}`}
                    >
                      <ProjectImage
                        src={getThumbnail(item.image)}
                        alt={item.title}
                        width="1280"
                        height="720"
                        loading="lazy"
                        decoding="async"
                      />
                      <ProjectInfo>
                        <ProjectName>{item.title}</ProjectName>
                        <ProjectMeta>
                          {item.category} · {item.duration}
                        </ProjectMeta>
                      </ProjectInfo>
                    </ProjectCard>
                  );
                })}
              </ProjectGrid>
            </Collection>
          ))}
        </CollectionStack>
      </Canvas>
    </Section>
  );
};

export default Videos;
