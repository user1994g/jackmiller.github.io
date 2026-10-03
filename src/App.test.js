import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import SeasonalTheme, { isChristmasSeason, isHalloweenSeason } from './components/SeasonalTheme';

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

test('only enables the Halloween theme in October 2026 using UK boundaries', () => {
  expect(isHalloweenSeason(new Date('2026-09-30T22:59:59Z'))).toBe(false);
  expect(isHalloweenSeason(new Date('2026-09-30T23:00:00Z'))).toBe(true);
  expect(isHalloweenSeason(new Date('2026-10-31T23:59:59Z'))).toBe(true);
  expect(isHalloweenSeason(new Date('2026-11-01T00:00:00Z'))).toBe(false);
  expect(isHalloweenSeason(new Date('2027-10-03T12:00:00Z'))).toBe(false);
});

test('restores the original theme at the end of October on an open page', () => {
  jest.useFakeTimers('modern');
  try {
    jest.setSystemTime(new Date('2026-10-31T23:59:59Z'));
    const { unmount } = render(<SeasonalTheme />);
    expect(document.body).toHaveClass('season-halloween');
    jest.advanceTimersByTime(1000);
    expect(document.body).not.toHaveClass('season-halloween');
    unmount();
  } finally {
    jest.useRealTimers();
  }
});

test('only enables Christmas from 20 to 31 December every year at UK midnight', () => {
  expect(isChristmasSeason(new Date('2026-12-19T23:59:59Z'))).toBe(false);
  expect(isChristmasSeason(new Date('2026-12-20T00:00:00Z'))).toBe(true);
  expect(isChristmasSeason(new Date('2026-12-31T23:59:59Z'))).toBe(true);
  expect(isChristmasSeason(new Date('2027-01-01T00:00:00Z'))).toBe(false);
  expect(isChristmasSeason(new Date('2027-12-25T12:00:00Z'))).toBe(true);
  expect(isChristmasSeason(new Date('2026-10-03T12:00:00Z'))).toBe(false);
});

test.each([
  ['2026-12-19T23:59:59Z', false, true],
  ['2026-12-31T23:59:59Z', true, false],
  ['2027-12-19T23:59:59Z', false, true],
])('switches Christmas automatically on an open page at %s', (time, before, after) => {
  jest.useFakeTimers('modern');
  try {
    jest.setSystemTime(new Date(time));
    const { unmount } = render(<SeasonalTheme />);
    expect(document.body.classList.contains('season-christmas')).toBe(before);
    expect(document.body).not.toHaveClass('season-halloween');
    jest.advanceTimersByTime(1000);
    expect(document.body.classList.contains('season-christmas')).toBe(after);
    unmount();
    expect(document.body).not.toHaveClass('season-christmas');
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    jest.useRealTimers();
  }
});

test('refreshes the holiday theme when returning to a sleeping tab', () => {
  jest.useFakeTimers('modern');
  try {
    jest.setSystemTime(new Date('2026-12-25T12:00:00Z'));
    const { unmount } = render(<SeasonalTheme />);
    expect(document.body).toHaveClass('season-christmas');
    jest.setSystemTime(new Date('2027-01-01T12:00:00Z'));
    fireEvent(document, new Event('visibilitychange'));
    expect(document.body).not.toHaveClass('season-christmas');
    unmount();
  } finally {
    jest.useRealTimers();
  }
});

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

  expect(screen.getByRole('region', { name: /photo collection selector/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /countryside/i })).toHaveAttribute(
    'href',
    '/photos/countryside',
  );
  expect(screen.getByRole('link', { name: /animals/i })).toHaveAttribute(
    'href',
    '/photos/animals',
  );
});

test('keeps the Movies collection blank without reusing portfolio photographs', async () => {
  const { container } = renderRoute('/photos/movies');

  expect(await screen.findByRole('heading', { level: 1, name: /movies/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /no movie photographs selected/i })).toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(container.querySelector('.photo-print')).not.toBeInTheDocument();
});

test('does not show the old photo collage on FMP Level 2', async () => {
  renderRoute('/fmp-level-2');

  expect(await screen.findByRole('heading', { level: 1, name: /the dark echoes of 1939/i })).toBeInTheDocument();
  expect(screen.queryByLabelText(/film mood stills/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
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

test('moves through every photo in an open gallery', async () => {
  renderRoute('/photos/countryside');

  fireEvent.click(await screen.findByRole('button', { name: /open gate in the green/i }));

  expect(screen.getByRole('dialog', { name: /expanded view/i })).toBeInTheDocument();
  expect(screen.getByText(/01 of 10/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /woodland path bordered/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /next photo/i }));
  expect(screen.getByText(/02 of 10/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /narrow grass trail/i })).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'ArrowLeft' });
  expect(screen.getByText(/01 of 10/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /previous photo/i }));
  expect(screen.getByText(/10 of 10/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /quiet country road bending/i })).toBeInTheDocument();

  const stage = document.querySelector('.image-lightbox__stage');
  fireEvent.touchStart(stage, { touches: [{ clientX: 300, clientY: 180 }] });
  fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100, clientY: 188 }] });
  expect(screen.getByText(/01 of 10/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /woodland path bordered/i })).toBeInTheDocument();
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
