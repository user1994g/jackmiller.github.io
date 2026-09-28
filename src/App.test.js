import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    context: jest.fn((fn) => {
      if (typeof fn === 'function') fn();
      return { revert: jest.fn() };
    }),
    from: jest.fn(),
    to: jest.fn(),
    set: jest.fn(),
    timeline: jest.fn(),
    registerPlugin: jest.fn(),
    utils: { toArray: jest.fn(() => []) },
  },
}));

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  default: {
    refresh: jest.fn(),
  },
}));

jest.mock('animejs/lib/anime.es.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeAll(() => {
  global.fetch = () => Promise.resolve({ ok: false });
});

beforeEach(() => {
  const gsap = require('gsap').default;
  gsap.context.mockImplementation((fn) => {
    if (typeof fn === 'function') fn();
    return { revert: jest.fn() };
  });
  gsap.utils.toArray.mockImplementation(() => []);
  gsap.timeline.mockImplementation(() => {
    const timeline = {
      set: jest.fn(() => timeline),
      fromTo: jest.fn(() => timeline),
      to: jest.fn(() => timeline),
      kill: jest.fn(),
    };
    return timeline;
  });
});

afterAll(() => {
  delete global.fetch;
});

const renderRoute = (path = '/') => render(
  <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </MemoryRouter>,
);

test('renders the redesigned portfolio home page', () => {
  renderRoute();

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: /stories that stick to the frame/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /watch the dark echoes of 1939/i })).toHaveAttribute('href', '/fmp-level-2');
});

test.each([
  ['/photos', /choose your frame/i],
  ['/photos/countryside', /countryside/i],
  ['/photos/sports', /sports/i],
  ['/photos/movies', /movies/i],
  ['/photos/animals', /animals/i],
  ['/about', /made with intent/i],
  ['/contact', /get in touch/i],
  ['/write-ups', /write ups/i],
  ['/fmp-level-2', /the dark echoes of 1939/i],
  ['/3d-art', /page under development/i],
  ['/the-final-lesson', /the final lesson/i],
  ['/privacy', /privacy policy/i],
  ['/terms', /terms and editorial standards/i],
])('renders the clean route %s', async (path, heading) => {
  renderRoute(path);

  expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');

  const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('opens the creative Photos collection dropdown from the main navigation', async () => {
  renderRoute();

  fireEvent.click(screen.getByRole('button', { name: /^photos/i }));

  expect(screen.getByRole('menu', { name: /choose a photo collection/i })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /countryside/i })).toHaveAttribute(
    'href',
    '/photos/countryside',
  );
  expect(screen.getByRole('menuitem', { name: /animals/i })).toHaveAttribute(
    'href',
    '/photos/animals',
  );
});

test('keeps the page behind the image lightbox out of the accessibility tree', async () => {
  const { container } = renderRoute();

  fireEvent.click(screen.getByRole('button', { name: /open portrait of jack miller/i }));

  expect(screen.getByRole('dialog', { name: /expanded view/i })).toBeInTheDocument();
  await waitFor(() => expect(container).toHaveAttribute('inert'));
  expect(container).toHaveAttribute('aria-hidden', 'true');

  fireEvent.click(screen.getByRole('button', { name: /close/i }));

  await waitFor(() => expect(container).not.toHaveAttribute('inert'));
  expect(container).not.toHaveAttribute('aria-hidden');
});

test('redirects the legacy Final Lesson path to the canonical route', async () => {
  render(
    <MemoryRouter initialEntries={['/final-lesson']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>,
  );

  expect(await screen.findByRole('heading', { level: 1, name: /the final lesson/i })).toBeInTheDocument();
});

test('redirects the removed Videos path to home', async () => {
  renderRoute('/videos');

  expect(await screen.findByRole('heading', { level: 1, name: /stories that stick to the frame/i })).toBeInTheDocument();
});

test('publishes indexable video metadata for The Final Lesson', async () => {
  renderRoute('/the-final-lesson');

  await screen.findByRole('heading', { level: 1, name: /the final lesson/i });
  await waitFor(() => expect(document.title).toBe('The Final Lesson (2024 Short Film) | Jack Miller'));

  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://jackmillermedia.com/the-final-lesson/',
  );
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow, max-image-preview:large, max-video-preview:-1',
  );

  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  expect(schemas).toHaveLength(1);
  const graph = JSON.parse(schemas[0].textContent)['@graph'];
  expect(graph.some((entry) => Array.isArray(entry['@type']) && entry['@type'].includes('VideoObject'))).toBe(true);
});

test('keeps the unfinished 3D placeholder out of search results', async () => {
  renderRoute('/3d-art');

  await screen.findByRole('heading', { level: 1, name: /page under development/i });
  await waitFor(() => {
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  });
});
