import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import usePageSeo from '../hooks/usePageSeo';

const PageShell = styled.main`
  min-height: 100vh;
  background: #000;
  padding-top: 5.6rem;
`;

const LessonFrame = styled.iframe`
  display: block;
  width: 100%;
  height: calc(100vh - 5.6rem);
  border: 0;
  background: #000;
`;

const FinalLessonPage = () => {
  const location = useLocation();
  const allowFinalLesson = Boolean(
    location.state?.unlisted === 'final-lesson' && location.state?.allowUnlisted === true,
  );

  usePageSeo({
    title: 'The Final Lesson (Short Film) | Jack Miller',
    description:
      'The Final Lesson is an independently produced short film by Jack Miller. Explore the film page and behind-the-scenes details.',
    url: 'https://jackmillermedia.com/the-final-lesson/',
  });

  if (!allowFinalLesson) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <PageShell id="main-content" className="App" role="main" aria-label="Unlisted page">
        <LessonFrame
          title="The Final Lesson"
          src={`${process.env.PUBLIC_URL}/the-final-lesson.html`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts"
        />
      </PageShell>
    </>
  );
};

export default FinalLessonPage;
