import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --ink: #0b0a0f;
    --ink-soft: #1c1924;
    --ink-muted: #34303d;
    --paper: #f5f0e6;
    --paper-soft: #e4dccf;
    --paper-bright: #fffaf0;
    --violet: #4c3bee;
    --violet-dark: #3425c7;
    --poppy: #ff5c35;
    --acid: #d6ff67;
    --stone: #bdb6aa;
    --signal: var(--poppy);
    --line: rgba(11, 10, 15, 0.2);
    --line-light: rgba(245, 240, 230, 0.22);
    --content-max: 1440px;
    --reading-max: 72ch;
    --gutter: clamp(1rem, 3.6vw, 3rem);
    --section-gap: clamp(5rem, 11vw, 10rem);
    --nav-height: 4.5rem;
    --notch: polygon(0 0, calc(100% - 1.15rem) 0, 100% 1.15rem, 100% 100%, 1.15rem 100%, 0 calc(100% - 1.15rem));
    --font-display: 'Syne', 'Arial Black', sans-serif;
    --font-body: 'Instrument Sans', 'Segoe UI', sans-serif;
    --font-serif: 'Fraunces', Georgia, serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    min-width: 320px;
    scroll-padding-top: calc(var(--nav-height) + 1rem);
    scroll-behavior: smooth;
    background: var(--ink);
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  body {
    min-width: 320px;
    overflow-x: clip;
    color: var(--ink);
    background: var(--paper);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.55;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body.menu-open,
  body.dialog-open {
    overflow: hidden;
  }

  body.menu-open [data-site-helper='true'],
  body.dialog-open [data-site-helper='true'] {
    display: none;
  }

  body.has-custom-cursor,
  body.has-custom-cursor * {
    cursor: none !important;
  }

  ::selection {
    color: var(--paper-bright);
    background: var(--violet);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: var(--font-display);
    line-height: 0.92;
    letter-spacing: -0.055em;
    text-wrap: balance;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img,
  video,
  svg,
  iframe {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    border: 0;
    background: none;
  }

  :focus-visible {
    outline: 3px solid var(--violet);
    outline-offset: 4px;
  }

  .App {
    overflow: clip;
  }

  .skip-link {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 10000;
    padding: 0.72rem 1rem;
    clip-path: var(--notch);
    color: var(--paper-bright);
    background: var(--violet);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform: translateY(-180%);
    transition: transform 0.2s ease;
  }

  .skip-link:focus {
    outline: none;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
