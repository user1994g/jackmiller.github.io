import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const articles = [
  {
    label: 'Production Notes',
    title: 'How I Build A Short Film From A Small Idea',
    text:
      'Most of my video work starts with a feeling rather than a finished script. I collect references, sounds, lighting ideas, and locations first, then reduce them into one clear visual promise: what the viewer should feel in the first ten seconds. From there I plan only the shots that actually support that promise, because a smaller film with a strong point of view is usually better than a large one with no centre.',
    detail:
      'That approach keeps the edit honest. If a shot is pretty but does not move the project forward, it gets cut. The finished portfolio pieces on this site are shaped around that process: simple premises, direct visual rhythm, and careful attention to the way sound, colour, and pacing change the mood of a scene.',
  },
  {
    label: 'Editing',
    title: 'What Makes A Portfolio Video Feel Finished',
    text:
      'A finished edit is not just a timeline with all the gaps removed. I look for a beginning that gives the viewer a reason to stay, a middle that changes the visual energy, and an ending that feels intentional rather than simply stopping. Music and ambient sound are treated as structure, not decoration, because they decide where a cut feels natural.',
    detail:
      'When I review my own work, I check whether the strongest frame arrives early enough, whether repeated angles are earning their place, and whether the title, thumbnail, and description all tell the same story. Those details help each project stand on its own instead of feeling like a loose upload.',
  },
  {
    label: 'Photography',
    title: 'Choosing Images That Say More Than They Show',
    text:
      'For photography, I am interested in images that hold a bit of tension: a subject half turned away, a texture that makes the scene feel physical, or a colour contrast that gives the frame a point of view. A gallery should not be a dump of every successful shot. It should feel like a sequence with rhythm.',
    detail:
      'That is why the photo work is grouped around mood, motion, and atmosphere instead of only subject matter. The goal is to make the page useful for someone trying to understand the style quickly, while still giving enough variety to show how the work changes between locations and projects.',
  },
  {
    label: '3D And CGI',
    title: 'Why I Treat 3D Work Like Camera Work',
    text:
      'The 3D page is built around the same questions I ask on a shoot: where is the viewer looking, what is the light doing, and what does the movement reveal? Modelling and rendering can become technical very quickly, but the final image still has to read like a composed shot.',
    detail:
      'I use 3D experiments to practise staging, material choices, atmosphere, and controlled motion. Even when a model is simple, the presentation matters: scale, shadow, camera distance, and pacing all decide whether it feels like a study or a finished visual idea.',
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
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.72fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: end;
  padding: clamp(1.4rem, 4vw, 2.8rem);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.015)),
    rgba(8, 10, 15, 0.8);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42);

  @media (max-width: 58rem) {
    grid-template-columns: 1fr;
  }
`;

const Kicker = styled.p`
  margin: 0;
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(240, 216, 173, 0.9);
`;

const Headline = styled.h1`
  margin: 0.7rem 0 0;
  font-family: 'Kaushan Script', cursive;
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.96;
  color: rgba(252, 252, 252, 0.98);
`;

const Dek = styled.p`
  max-width: 66ch;
  margin-top: 1rem;
  line-height: 1.78;
  font-size: clamp(1rem, 1.3vw, 1.08rem);
  color: rgba(232, 236, 244, 0.82);
`;

const SummaryPanel = styled.aside`
  display: grid;
  gap: 0.8rem;
  padding: clamp(1.1rem, 3vw, 1.5rem);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 13, 18, 0.78);
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  color: rgba(255, 255, 255, 0.95);
`;

const SummaryText = styled.p`
  line-height: 1.7;
  color: rgba(228, 231, 236, 0.76);
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.35rem);
  margin-top: clamp(1rem, 2.2vw, 1.6rem);

  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`;

const Article = styled(motion.article)`
  display: grid;
  gap: 0.95rem;
  padding: clamp(1.25rem, 3vw, 1.8rem);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 34%),
    rgba(12, 14, 18, 0.76);
`;

const ArticleLabel = styled.p`
  margin: 0;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(240, 216, 173, 0.88);
`;

const ArticleTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  line-height: 1.18;
  color: rgba(250, 250, 251, 0.95);
`;

const ArticleText = styled.p`
  line-height: 1.76;
  color: rgba(226, 229, 235, 0.76);
`;

const Closing = styled(motion.section)`
  margin-top: clamp(1rem, 2.2vw, 1.6rem);
  padding: clamp(1.35rem, 3vw, 2rem);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(9, 10, 14, 0.78);
`;

const ClosingTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 2.3vw, 1.95rem);
  color: rgba(255, 255, 255, 0.95);
`;

const ClosingText = styled.p`
  max-width: 76ch;
  margin-top: 0.9rem;
  line-height: 1.72;
  color: rgba(228, 231, 236, 0.76);
`;

const WriteUpsPage = () => {
  usePageSeo({
    title: 'Write Ups | Jack Miller Media Production Notes',
    description:
      'Original production notes and creative media write ups from Jack Miller covering film, editing, photography, 3D art, and visual storytelling decisions.',
    url: 'https://jackmillermedia.com/write-ups/',
  });

  return (
    <>
      <Navbar />
      <PageMain id="main-content" className="App" role="main" aria-label="Write ups page">
        <Wrap>
          <Hero
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div>
              <Kicker>Jack Miller Media Notes</Kicker>
              <Headline>Write Ups</Headline>
              <Dek>
                Original notes from the work behind this portfolio: how I plan short films, choose
                images, shape edits, and use 3D experiments to practise visual storytelling. This page
                is here to add context to the finished pieces, not to repeat captions from the gallery.
              </Dek>
            </div>

            <SummaryPanel>
              <SummaryTitle>Why this page exists</SummaryTitle>
              <SummaryText>
                AdSense reviewers and real visitors should be able to see what the site is about
                without guessing. These write ups explain the decisions behind the videos, photos, and
                digital art so the portfolio has useful text as well as visuals.
              </SummaryText>
            </SummaryPanel>
          </Hero>

          <ArticleGrid>
            {articles.map((article, index) => (
              <Article
                key={article.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.1 + index * 0.06, ease: 'easeOut' }}
              >
                <ArticleLabel>{article.label}</ArticleLabel>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleText>{article.text}</ArticleText>
                <ArticleText>{article.detail}</ArticleText>
              </Article>
            ))}
          </ArticleGrid>

          <Closing
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.3, ease: 'easeOut' }}
          >
            <ClosingTitle>Editorial approach</ClosingTitle>
            <ClosingText>
              I keep the writing connected to work I have made or am developing. When a project is
              updated, the note should explain something specific: a production choice, a technical
              problem, a visual reference, or what I would change next time. That gives the site
              original context and makes it more useful than a thin portfolio page with images alone.
            </ClosingText>
          </Closing>
        </Wrap>
      </PageMain>
    </>
  );
};

export default WriteUpsPage;
