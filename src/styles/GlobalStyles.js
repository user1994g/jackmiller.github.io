import '@fontsource/sirin-stencil';
import '@fontsource/kaushan-script';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --content-max: 1240px;
    --gutter: clamp(1rem, 2vw, 2rem);
    --section-gap: clamp(4rem, 8vw, 8rem);
    --bg-dark: #101113;
    --bg-soft: #1b1c20;
    --text-main: #f4f4f4;
    --text-muted: #bfc3ca;
    --accent: #f0d8ad;
  }

  html.has-scroll-smooth {
    overflow: hidden;
    position: fixed;
    inset: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: 'Sirin Stencil', 'Trebuchet MS', sans-serif;
    overflow-x: hidden;
    line-height: 1.5;
    color: var(--text-main);
    background:
      radial-gradient(1400px circle at 18% -5%, #2a2b31 0%, transparent 42%),
      radial-gradient(1000px circle at 82% -10%, #181a1f 0%, transparent 45%),
      linear-gradient(180deg, #0c0d10 0%, #111319 45%, #0d0f14 100%);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    line-height: 1.1;
  }

  p {
    color: var(--text-muted);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  textarea {
    font: inherit;
    color: inherit;
  }

  .App {
    overflow: hidden;
  }
`;

export default GlobalStyles;
