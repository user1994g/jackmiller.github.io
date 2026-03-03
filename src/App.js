import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ClarityTracker from './components/ClarityTracker';
import DesktopMouseAura from './components/DesktopMouseAura';
import GeoBlockGate from './components/GeoBlockGate';
import SiteHelperChat from './components/SiteHelperChat';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

const HomePage = lazy(() => import('./pages/HomePage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <GeoBlockGate>
          <ClarityTracker />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <SiteHelperChat />
          <DesktopMouseAura />
        </GeoBlockGate>
      </ThemeProvider>
    </>
  );
}

export default App;
