import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
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
  width: min(1320px, 94vw);
  margin: var(--section-gap) auto;
`;

const Surface = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 26px;
  background:
    radial-gradient(circle at 88% 12%, rgba(240, 216, 173, 0.1), transparent 34%),
    linear-gradient(175deg, rgba(10, 12, 16, 0.96), rgba(8, 10, 14, 0.96));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.46);
  overflow: hidden;
`;

const Header = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: clamp(1.2rem, 2.8vw, 2.2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h1 {
    font-family: 'Kaushan Script';
    font-size: clamp(2.6rem, 6.6vw, 5rem);
    font-weight: 300;
    color: #ffffff;
  }

  p {
    width: min(64ch, 100%);
    font-size: clamp(0.84rem, 1.12vw, 1rem);
    line-height: 1.7;
    color: rgba(243, 243, 243, 0.8);
  }
`;

const MenuRow = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  padding: 0 clamp(1.2rem, 2.8vw, 2.2rem) clamp(1.2rem, 2.2vw, 1.8rem);
`;

const MenuChip = styled.button`
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.72)' : 'rgba(255, 255, 255, 0.22)')};
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.18)' : 'rgba(255, 255, 255, 0.04)')};
  color: ${({ $active }) => ($active ? 'rgba(255, 248, 232, 0.98)' : 'rgba(243, 243, 243, 0.86)')};
  border-radius: 999px;
  padding: 0.5rem 0.88rem;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(240, 216, 173, 0.78);
    background: rgba(240, 216, 173, 0.16);
    color: rgba(255, 248, 232, 0.98);
    outline: none;
  }
`;

const Featured = styled.article`
  position: relative;
  min-height: clamp(280px, 48vw, 470px);
  margin: 0 clamp(1.2rem, 2.8vw, 2.2rem);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
`;

const FeaturedPoster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.02);
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(95deg, rgba(5, 6, 8, 0.9) 20%, rgba(5, 6, 8, 0.44) 58%, rgba(5, 6, 8, 0.78) 100%),
    linear-gradient(180deg, rgba(5, 6, 8, 0.2) 0%, rgba(5, 6, 8, 0.86) 100%);
`;

const FeaturedContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.72rem;
  padding: clamp(1.15rem, 3vw, 2.1rem);

  span {
    width: fit-content;
    border-radius: 999px;
    background: rgba(240, 216, 173, 0.18);
    border: 1px solid rgba(240, 216, 173, 0.42);
    padding: 0.26rem 0.68rem;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 244, 216, 0.96);
  }

  h2 {
    width: min(20ch, 100%);
    font-size: clamp(1.5rem, 3.6vw, 3.05rem);
    line-height: 1.05;
    color: rgba(255, 255, 255, 0.98);
  }

  p {
    width: min(58ch, 100%);
    font-size: clamp(0.8rem, 1.06vw, 0.96rem);
    line-height: 1.65;
    color: rgba(242, 242, 242, 0.86);
  }
`;

const PosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.62rem, 1.2vw, 0.9rem);
  padding: clamp(1.2rem, 2.8vw, 2.2rem);

  @media (max-width: 80em) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 64em) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 48em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 32em) {
    grid-template-columns: 1fr;
  }
`;

const PosterCard = styled(motion.button)`
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.62)' : 'rgba(255, 255, 255, 0.14)')};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? 'rgba(240, 216, 173, 0.1)' : 'rgba(255, 255, 255, 0.02)')};
  text-align: left;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }

  &:focus-visible {
    outline: 2px solid rgba(240, 216, 173, 0.9);
    outline-offset: -2px;
  }
`;

const PosterMeta = styled.div`
  padding: 0.7rem 0.72rem 0.8rem;

  h3 {
    font-size: clamp(0.77rem, 1vw, 0.9rem);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(252, 252, 252, 0.92);
  }

  p {
    margin-top: 0.26rem;
    color: rgba(233, 233, 233, 0.68);
    font-size: 0.73rem;
    letter-spacing: 0.03em;
  }
`;

const videoMenus = [
  {
    id: 'cinematic',
    label: 'Cinematic Cuts',
    tagline: 'Original visual pieces graded for atmosphere, contrast, and dramatic pacing.',
    items: [
      { poster: img11, title: 'After Midnight', info: 'Short Film • 03:24' },
      { poster: img4, title: 'Last Train North', info: 'Visual Edit • 02:41' },
      { poster: img5, title: 'Signal Fade', info: 'Mood Sequence • 04:02' },
      { poster: img12, title: 'Blue Corridor', info: 'Cinematic Piece • 03:38' },
      { poster: img6, title: 'Light Shift', info: 'Studio Film • 02:17' },
      { poster: img7, title: 'Ashen City', info: 'Urban Story • 03:12' },
      { poster: img13, title: 'Low Exposure', info: 'Test Reel • 01:59' },
      { poster: img8, title: 'Golden Exit', info: 'Sequence • 02:09' },
      { poster: img9, title: 'Tunnel Echo', info: 'Film Study • 03:01' },
      { poster: img10, title: 'Night Voice', info: 'Director Cut • 04:15' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio Stories',
    tagline: 'Project highlights built from concept framing to final grade and delivery.',
    items: [
      { poster: img10, title: 'Portfolio Highlight', info: 'Feature Reel • 04:15' },
      { poster: img14, title: 'Wide Format', info: 'Screen Test • 02:46' },
      { poster: img4, title: 'Aerial Motion', info: 'Visual Story • 03:08' },
      { poster: img12, title: 'Monochrome Arc', info: 'Style Study • 02:52' },
      { poster: img7, title: 'Studio Return', info: 'Narrative Clip • 03:37' },
      { poster: img9, title: 'Pulse', info: 'Cutdown • 01:44' },
      { poster: img11, title: 'Second Exposure', info: 'Director Pass • 03:03' },
      { poster: img8, title: 'Late Horizon', info: 'Shot Series • 02:34' },
      { poster: img5, title: 'Nightline', info: 'Film Block • 02:58' },
      { poster: img6, title: 'Field Entry', info: 'Sequence • 03:19' },
    ],
  },
  {
    id: 'behind-scenes',
    label: 'Behind The Frames',
    tagline: 'Process edits, lighting tests, and on-set clips from recent projects.',
    items: [
      { poster: img12, title: 'Setup Tape 01', info: 'BTS • 01:40' },
      { poster: img13, title: 'Grade Session', info: 'BTS • 02:11' },
      { poster: img11, title: 'Lens Check', info: 'BTS • 01:57' },
      { poster: img6, title: 'Location Walkthrough', info: 'BTS • 02:35' },
      { poster: img14, title: 'Blocking Pass', info: 'BTS • 02:06' },
      { poster: img9, title: 'Audio Layering', info: 'BTS • 01:48' },
      { poster: img5, title: 'Lighting Notes', info: 'BTS • 02:04' },
      { poster: img4, title: 'Frame Match', info: 'BTS • 01:53' },
      { poster: img7, title: 'Set Reset', info: 'BTS • 01:44' },
      { poster: img8, title: 'Texture Pass', info: 'BTS • 01:58' },
    ],
  },
];

const Videos = () => {
  const [activeMenu, setActiveMenu] = useState(videoMenus[0].id);
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  const currentMenu = useMemo(
    () => videoMenus.find((menu) => menu.id === activeMenu) || videoMenus[0],
    [activeMenu],
  );

  useEffect(() => {
    setActiveClipIndex(0);
  }, [activeMenu]);

  const featuredClip = currentMenu.items[activeClipIndex] || currentMenu.items[0];

  return (
    <Section id="videos">
      <Surface>
        <Header>
          <h1>videos</h1>
          <p>
            Streaming-style video hub with quick category switching, featured spotlight, and a
            browsable grid built to match the same dark Jack Miller visual theme.
          </p>
        </Header>

        <MenuRow aria-label="Video categories">
          {videoMenus.map((menu) => (
            <MenuChip
              key={menu.id}
              type="button"
              $active={menu.id === activeMenu}
              onClick={() => setActiveMenu(menu.id)}
            >
              {menu.label}
            </MenuChip>
          ))}
        </MenuRow>

        <Featured>
          <FeaturedPoster src={featuredClip.poster} alt="" aria-hidden="true" />
          <FeaturedOverlay />
          <FeaturedContent>
            <span>{currentMenu.label}</span>
            <h2>{featuredClip.title}</h2>
            <p>{currentMenu.tagline}</p>
          </FeaturedContent>
        </Featured>

        <PosterGrid>
          {currentMenu.items.map((clip, index) => (
            <PosterCard
              key={`${clip.title}-${clip.info}`}
              type="button"
              $active={index === activeClipIndex}
              onClick={() => setActiveClipIndex(index)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              aria-label={`Feature ${clip.title}`}
            >
              <img src={clip.poster} alt={clip.title} width="640" height="853" />
              <PosterMeta>
                <h3>{clip.title}</h3>
                <p>{clip.info}</p>
              </PosterMeta>
            </PosterCard>
          ))}
        </PosterGrid>
      </Surface>
    </Section>
  );
};

export default Videos;
