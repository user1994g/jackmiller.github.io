import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BackToTop from './components/BackToTop';
import ClarityTracker from './components/ClarityTracker';
import GeoBlockGate from './components/GeoBlockGate';
import GrainLayer from './components/GrainLayer';
import IntroSplash from './components/IntroSplash';
import ScrollProgress from './components/ScrollProgress';
import Footer from './sections/Footer';
import HomePage from './pages/HomePage';
import WriteUpsPage from './pages/WriteUpsPage';
import PolicyPage from './pages/PolicyPage';
import VideosPage from './pages/VideosPage';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import FinalLessonPage from './pages/FinalLessonPage';
import FmpLevelTwoPage from './pages/FmpLevelTwoPage';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

const SiteHelperChat = lazy(() => import('./components/SiteHelperChat'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

function App() {
  const [deferredUiReady, setDeferredUiReady] = useState(false);
  const [enableDesktopAura, setEnableDesktopAura] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasTouchPoints = (window.navigator?.maxTouchPoints || 0) > 0;

    setEnableDesktopAura(!prefersReducedMotion && !coarsePointer && !hasTouchPoints);

    const enableDeferredUi = () => setDeferredUiReady(true);

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(enableDeferredUi, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }

    const timeout = window.setTimeout(enableDeferredUi, 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <GlobalStyles />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ThemeProvider theme={dark}>
        <GeoBlockGate>
          <GrainLayer />
          <IntroSplash />
          <ScrollProgress />
          <ClarityTracker />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/write-ups" element={<WriteUpsPage />} />
            <Route path="/privacy" element={<PolicyPage variant="privacy" />} />
            <Route path="/terms" element={<PolicyPage variant="terms" />} />
            <Route path="/final-lesson" element={<FinalLessonPage />} />
            <Route path="/fmp-level-2" element={<FmpLevelTwoPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/3d-art" element={<UnderDevelopmentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <BackToTop />

          <Suspense fallback={null}>
            {deferredUiReady ? <SiteHelperChat /> : null}
            {deferredUiReady && enableDesktopAura ? <CustomCursor /> : null}
          </Suspense>
        </GeoBlockGate>
      </ThemeProvider>
    </>
  );
}

export default App;
