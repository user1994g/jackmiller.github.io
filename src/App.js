import 'locomotive-scroll/dist/locomotive-scroll.css';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { ThemeProvider } from 'styled-components';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import About from './sections/About';
import Footer from './sections/Footer';
import Home from './sections/Home';
import Marquee from './sections/Marquee';
import Shop from './sections/Shop';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';

function App() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            multiplier: 0.9,
            getDirection: true,
            smartphone: {
              smooth: false,
            },
            tablet: {
              smooth: false,
            },
          }}
          watch={[]}
          containerRef={containerRef}
        >
          <AnimatePresence mode="wait">{!loaded && <Loader key="loader" />}</AnimatePresence>

          {loaded && <Navbar />}

          <main className="App" data-scroll-container ref={containerRef}>
            <ScrollTriggerProxy />
            <Home />
            <About />
            <Shop />
            <Marquee />
            <Footer />
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
