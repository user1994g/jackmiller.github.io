import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ClarityTracker from './components/ClarityTracker';
import GeoBlockGate from './components/GeoBlockGate';
import SiteHelperChat from './components/SiteHelperChat';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <GeoBlockGate>
          <ClarityTracker />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <SiteHelperChat />
        </GeoBlockGate>
      </ThemeProvider>
    </>
  );
}

export default App;
