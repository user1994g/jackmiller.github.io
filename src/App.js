import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BackToTop from './components/BackToTop';
import ClarityTracker from './components/ClarityTracker';
import GeoBlockGate from './components/GeoBlockGate';
import GrainLayer from './components/GrainLayer';
import IntroSplash from './components/IntroSplash';
import ScrollProgress from './components/ScrollProgress';
import RouteEffects from './components/RouteEffects';
import Footer from './sections/Footer';
import HomePage from './pages/HomePage';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

const SiteHelperChat = lazy(() => import('./components/SiteHelperChat'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const WriteUpsPage = lazy(() => import('./pages/WriteUpsPage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const UnderDevelopmentPage = lazy(() => import('./pages/UnderDevelopmentPage'));
const FinalLessonPage = lazy(() => import('./pages/FinalLessonPage'));
const FmpLevelTwoPage = lazy(() => import('./pages/FmpLevelTwoPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PhotosPage = lazy(() => import('./pages/PhotosPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const PageFallback = () => (
  <div className="route-fallback" role="status" aria-live="polite">
    <span>Loading next frame…</span>
  </div>
);

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
          <RouteEffects />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/photos" element={<PhotosPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/write-ups" element={<WriteUpsPage />} />
              <Route path="/privacy" element={<PolicyPage variant="privacy" />} />
              <Route path="/terms" element={<PolicyPage variant="terms" />} />
              <Route path="/the-final-lesson" element={<FinalLessonPage />} />
              <Route path="/final-lesson" element={<Navigate to="/the-final-lesson" replace />} />
              <Route path="/fmp-level-2" element={<FmpLevelTwoPage />} />
              <Route path="/3d-art" element={<UnderDevelopmentPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
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
