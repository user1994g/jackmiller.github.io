import React, { useRef } from 'react';

import { ReelGlyph } from '../art/Marks';
import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';
import useStudioMotion from '../hooks/useStudioMotion';
import Videos from '../sections/Videos';

const VideosPage = () => {
  const pageRef = useRef(null);

  usePageSeo({
    title: 'The Cut Room | Films by Jack Miller Media',
    description:
      'Explore The Cut Room, Jack Miller Media’s film-festival programme of narrative shorts, documentary fragments, and experimental visual work.',
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
                Film programme · 12 selections
              </span>
              <h1 data-hero>The Cut Room</h1>
            </div>
            <p className="page-hero__intro" data-hero>
              Narrative shorts, documentary fragments, and visual experiments — programmed like a
              tiny film festival and presented one cut at a time.
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
