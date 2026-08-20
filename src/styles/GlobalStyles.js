import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --ink: #08070a;
    --ink-2: #121017;
    --paper: #f3ebdd;
    --paper-soft: #e7dcc8;
    --signal: #ff3d1f;
    --acid: #c6f04d;
    --fog: #b8b0a6;
    --line: rgba(243, 235, 221, 0.16);
    --content-max: 1180px;
    --gutter: clamp(1rem, 4.2vw, 2.25rem);
    --section-gap: clamp(4.5rem, 12vw, 8.5rem);
    --radius: 1.35rem;
    --font-display: 'Syne', 'Trebuchet MS', sans-serif;
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
    scroll-behavior: smooth;
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: var(--font-body);
    overflow-x: hidden;
    line-height: 1.55;
    color: var(--paper);
    background: var(--ink);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body.has-custom-cursor,
  body.has-custom-cursor * {
    cursor: none !important;
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
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  p {
    color: rgba(243, 235, 221, 0.72);
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

  button {
    background: none;
    border: 0;
  }

  .App {
    overflow: hidden;
  }

  .skip-link {
    position: fixed;
    left: 0.75rem;
    top: -3rem;
    z-index: 9999;
    padding: 0.55rem 0.8rem;
    border-radius: 999px;
    background: var(--acid);
    color: var(--ink);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    transition: top 0.2s ease;
  }

  .skip-link:focus {
    top: 0.75rem;
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-timeline: none !important;
    }
  }
`;

export default GlobalStyles;
