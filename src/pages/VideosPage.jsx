import React, { useRef } from 'react';

import { ReelGlyph } from '../art/Marks';
import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';
import useStudioMotion from '../hooks/useStudioMotion';
import Videos from '../sections/Videos';

const VideosPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'Films & Videos | Jack Miller Media',
    description:
      'Explore twelve narrative, documentary, and experimental film projects by Jack Miller, including The Final Lesson.',
    url: 'https://jackmillermedia.com/videos/',
  });
  useStudioMotion(pageRef, { hero: true });

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="studio-page studio-page--ink"
        ref={pageRef}
        role="main"
      >
        <header className="page-hero">
          <div className="studio-wrap page-hero__grid">
            <div>
              <span className="tape-label" data-hero>
                The Cut Room · 12 selections
              </span>
              <h1 data-hero>Videos</h1>
            </div>
            <p className="page-hero__intro" data-hero>
              Watch the finished cuts, then browse narrative shorts, documentary fragments, and
              visual experiments from the project archive.
            </p>
          </div>
          <div className="page-hero__mark" aria-hidden="true">
            <ReelGlyph />
          </div>
        </header>

        <Videos />
      </main>
    </>
  );
};

export default VideosPage;
