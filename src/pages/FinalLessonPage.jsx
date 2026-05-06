import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';

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
