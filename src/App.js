import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

const HomePage = lazy(() => import('./pages/HomePage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
