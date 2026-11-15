import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import SeasonalTheme, { isBirthdaySeason, isChristmasSeason, isHalloweenSeason } from './components/SeasonalTheme';
import { buildTranslationUrl, TRANSLATION_LANGUAGES } from './content/translationLanguages';

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
  window.sessionStorage.clear();
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

test('only enables the birthday edition on 4 March each year using UK midnight', () => {
  expect(isBirthdaySeason(new Date('2027-03-03T23:59:59Z'))).toBe(false);
  expect(isBirthdaySeason(new Date('2027-03-04T00:00:00Z'))).toBe(true);
  expect(isBirthdaySeason(new Date('2027-03-04T23:59:59Z'))).toBe(true);
  expect(isBirthdaySeason(new Date('2027-03-05T00:00:00Z'))).toBe(false);
  expect(isBirthdaySeason(new Date('2028-03-04T12:00:00Z'))).toBe(true);
  expect(isBirthdaySeason(new Date('2027-03-04T00:00:00+09:00'))).toBe(false);
  expect(isBirthdaySeason(new Date('2026-10-03T12:00:00Z'))).toBe(false);
  expect(isBirthdaySeason(new Date('2026-12-25T12:00:00Z'))).toBe(false);
});

test.each([
  ['2027-03-03T23:59:59Z', false, true],
  ['2027-03-04T23:59:59Z', true, false],
  ['2028-03-03T23:59:59Z', false, true],
])('switches the birthday theme automatically on an open page at %s', (time, before, after) => {
  jest.useFakeTimers('modern');
  try {
    jest.setSystemTime(new Date(time));
    const { unmount } = render(<SeasonalTheme />);
    expect(document.body.classList.contains('season-birthday')).toBe(before);
    expect(document.body).not.toHaveClass('season-halloween');
    expect(document.body).not.toHaveClass('season-christmas');
    jest.advanceTimersByTime(1000);
    expect(document.body.classList.contains('season-birthday')).toBe(after);
    unmount();
    expect(document.body).not.toHaveClass('season-birthday');
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    jest.useRealTimers();
  }
});

test('restores the original theme after a birthday tab wakes on 5 March', () => {
  jest.useFakeTimers('modern');
  try {
    jest.setSystemTime(new Date('2027-03-04T12:00:00Z'));
    const { unmount } = render(<SeasonalTheme />);
    expect(document.body).toHaveClass('season-birthday');
    jest.setSystemTime(new Date('2027-03-05T12:00:00Z'));
    fireEvent(document, new Event('visibilitychange'));
    expect(document.body).not.toHaveClass('season-birthday');
    unmount();
  } finally {
    jest.useRealTimers();
  }
});

test('renders the redesigned portfolio home page', () => {
  renderRoute();

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: /film & photography/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /watch the dark echoes of 1939/i })).toHaveAttribute('href', '/fmp-level-2');
});

test('previews each theme and returns to the automatic calendar without mixing styles', async () => {
  const { container } = renderRoute();
  const trigger = screen.getByRole('button', { name: /choose website theme/i });
  trigger.focus();
  fireEvent.click(trigger);
  await screen.findByRole('dialog', { name: /pick your mood/i });
  expect(container).toHaveAttribute('inert');

  for (const [name, choice] of [
    [/birthday/i, 'birthday'], [/christmas/i, 'christmas'], [/halloween/i, 'halloween'], [/the original/i, 'original'],
  ]) {
    fireEvent.click(screen.getByRole('radio', { name }));
    for (const theme of ['birthday', 'christmas', 'halloween']) {
      expect(document.body.classList.contains(`season-${theme}`)).toBe(theme === choice);
    }
    expect(window.sessionStorage.getItem('jmm-visitor-theme')).toBe(choice);
  }
  fireEvent.click(screen.getByRole('radio', { name: /automatic/i }));
  expect(document.body.classList.contains('season-halloween')).toBe(isHalloweenSeason());
  expect(document.body.classList.contains('season-christmas')).toBe(isChristmasSeason());
  expect(document.body.classList.contains('season-birthday')).toBe(isBirthdaySeason());
  fireEvent.click(screen.getByRole('button', { name: /enjoy this vibe/i }));
  expect(container).not.toHaveAttribute('inert');
  expect(trigger).toHaveFocus();
  expect(document.body).not.toHaveClass('preferences-open');
});

test('remembers a valid theme across page loads in the same tab', () => {
  window.sessionStorage.setItem('jmm-visitor-theme', 'birthday');
  renderRoute('/photos/animals');
  expect(document.body).toHaveClass('season-birthday');
  expect(document.body).not.toHaveClass('season-halloween');
});

test('ignores unrecognised stored themes', () => {
  window.sessionStorage.setItem('jmm-visitor-theme', 'not-a-theme');
  renderRoute();
  expect(document.body.classList.contains('season-birthday')).toBe(isBirthdaySeason());
  expect(document.body.classList.contains('season-christmas')).toBe(isChristmasSeason());
  expect(document.body.classList.contains('season-halloween')).toBe(isHalloweenSeason());
});

test('theme changes still work when session storage cannot be written', async () => {
  const storage = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage disabled'); });
  try {
    renderRoute();
    fireEvent.click(screen.getByRole('button', { name: /choose website theme/i }));
    await screen.findByRole('dialog', { name: /pick your mood/i });
    fireEvent.click(screen.getByRole('radio', { name: /birthday/i }));
    expect(document.body).toHaveClass('season-birthday');
  } finally { storage.mockRestore(); }
});

test('opens translation for the current public page without injecting Google scripts', async () => {
  renderRoute('/photos/animals');
  fireEvent.click(screen.getByRole('button', { name: /translate this page/i }));
  await screen.findByRole('dialog', { name: /a world of words/i });
  fireEvent.change(screen.getByLabelText(/your language/i), { target: { value: 'es' } });
  const link = screen.getByRole('link', { name: /open translated page/i });
  const url = new URL(link.href);
  expect(url.origin).toBe('https://translate.google.com');
  expect(url.searchParams.get('tl')).toBe('es');
  expect(url.searchParams.get('u')).toBe('https://jackmillermedia.com/photos/animals');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(document.querySelector('script[src*="translate.google"]')).toBeNull();
  for (const code of ['ru', 'ar', 'fa', 'bn', 'ur', 'id', 'ms', 'si']) {
    expect(TRANSLATION_LANGUAGES.some((language) => language.code === code)).toBe(false);
  }
});

test('translation links only accept curated languages and the site’s public routes', () => {
  expect(buildTranslationUrl('ru', '/')).toBeNull();
  expect(buildTranslationUrl('invalid', '/')).toBeNull();
  const url = new URL(buildTranslationUrl('fr', '/photos/?email=private@example.test#message'));
  expect(url.searchParams.get('u')).toBe('https://jackmillermedia.com/photos');
  const externalPath = new URL(buildTranslationUrl('de', 'https://evil.example/photos'));
  expect(externalPath.searchParams.get('u')).toBe('https://jackmillermedia.com/');
});

test('switches between preference panels and closes with Escape', async () => {
  const { container } = renderRoute();
  fireEvent.click(screen.getByRole('button', { name: /choose website theme/i }));
  await screen.findByRole('dialog', { name: /pick your mood/i });
  fireEvent.click(screen.getByRole('button', { name: /^language$/i }));
  expect(screen.getByRole('dialog', { name: /a world of words/i })).toBeInTheDocument();
  expect(container).toHaveAttribute('inert');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(container).not.toHaveAttribute('inert');
});

test('opens preferences from the mobile menu without leaving the page locked', async () => {
  renderRoute();
  fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
  fireEvent.click(screen.getByRole('button', { name: /choose website theme/i }));
  await screen.findByRole('dialog', { name: /pick your mood/i });
  expect(screen.queryByRole('dialog', { name: /the cut room/i })).not.toBeInTheDocument();
  expect(document.body).not.toHaveClass('menu-open');
  fireEvent.click(screen.getByRole('button', { name: /close preferences/i }));
  expect(document.body).not.toHaveClass('dialog-open');
  expect(document.body.style.position).not.toBe('fixed');
});

test.each([
  ['/photos', /photographs/i],
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

  fireEvent.click(await screen.findByRole('button', { name: /enlarge gate in the green/i }));

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

  expect(await screen.findByRole('heading', { level: 1, name: /film & photography/i })).toBeInTheDocument();
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

test('loads the photography browser lead eagerly and keeps every collection reachable', async () => {
  renderRoute('/photos');

  expect(await screen.findByRole('heading', { level: 1, name: /photographs/i })).toBeInTheDocument();
  const lead = screen.getByRole('img', { name: /woodland path bordered by a timber fence/i });
  expect(lead).toHaveAttribute('loading', 'eager');
  expect(lead).toHaveAttribute('fetchpriority', 'high');
  expect(lead).toHaveAttribute('width', '1600');
  expect(lead).toHaveAttribute('height', '900');
  expect(screen.getAllByRole('button', { name: /^show /i })).toHaveLength(14);
  expect(screen.getByRole('button', { name: /^show gate in the green$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /gallery view/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /grid view/i })).toHaveAttribute('aria-pressed', 'false');

  const index = screen.getByRole('navigation', { name: /^photo collections$/i });
  const destinations = Array.from(index.querySelectorAll('a')).map((link) => link.getAttribute('href'));
  expect(destinations).toEqual([
    '/photos/countryside', '/photos/sports', '/photos/movies', '/photos/animals',
  ]);
});

test('navigates the gallery stage, wraps, selects thumbnails and supports keyboard and swipe', async () => {
  renderRoute('/photos');
  await screen.findByRole('button', { name: /^enlarge gate in the green$/i });

  fireEvent.click(screen.getByRole('button', { name: /^previous photograph$/i }));
  expect(screen.getByRole('button', { name: /^enlarge drift$/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /^next photograph$/i }));
  expect(screen.getByRole('button', { name: /^enlarge gate in the green$/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /^show meadow line$/i }));
  expect(screen.getByRole('button', { name: /^show meadow line$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /^show gate in the green$/i })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByRole('img', { name: /narrow grass trail/i })).toBeInTheDocument();

  fireEvent.keyDown(screen.getByRole('group', { name: /^photograph viewer$/i }), { key: 'ArrowRight' });
  expect(screen.getByRole('button', { name: /^enlarge another train coming$/i })).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('group', { name: /^photograph viewer$/i }), { key: 'ArrowLeft' });
  const stage = screen.getByRole('button', { name: /^enlarge meadow line$/i });
  fireEvent.touchStart(stage, { touches: [{ clientX: 300, clientY: 180 }] });
  fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 100, clientY: 185 }] });
  expect(screen.getByRole('button', { name: /^enlarge another train coming$/i })).toBeInTheDocument();
  expect(screen.queryByRole('dialog', { name: /expanded view/i })).not.toBeInTheDocument();
});

test('opens a selected photograph in the complete fourteen-photo archive and restores focus', async () => {
  const { container } = renderRoute('/photos');
  fireEvent.click(await screen.findByRole('button', { name: /^show another train coming$/i }));
  const opener = screen.getByRole('button', { name: /^enlarge another train coming$/i });
  opener.focus();
  fireEvent.click(opener);

  expect(screen.getByRole('dialog', { name: /expanded view/i })).toBeInTheDocument();
  expect(screen.getByText(/03 of 14/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /railway tracks curving through green trees/i })).toBeInTheDocument();
  await waitFor(() => expect(container).toHaveAttribute('inert'));
  expect(container).toHaveAttribute('aria-hidden', 'true');

  fireEvent.click(screen.getByRole('button', { name: /next photo/i }));
  expect(screen.getByText(/04 of 14/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /country pond edged with reeds/i })).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'End' });
  expect(screen.getByText(/14 of 14/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /a swan drifting across dark water/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next photo/i }));
  expect(screen.getByText(/01 of 14/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /^close/i }));
  await waitFor(() => expect(container).not.toHaveAttribute('inert'));
  expect(container).not.toHaveAttribute('aria-hidden');
  expect(screen.queryByRole('dialog', { name: /expanded view/i })).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
  expect(document.body.style.position).not.toBe('fixed');
});

test('shows all fourteen photographs in grid view and opens the selected photograph', async () => {
  const { container } = renderRoute('/photos');
  fireEvent.click(await screen.findByRole('button', { name: /^grid view$/i }));
  expect(screen.getByRole('button', { name: /^grid view$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /^gallery view$/i })).toHaveAttribute('aria-pressed', 'false');
  expect(container.querySelectorAll('.photo-room__grid-photo')).toHaveLength(14);
  expect(screen.queryByRole('group', { name: /^photograph viewer$/i })).not.toBeInTheDocument();

  const opener = screen.getByRole('button', { name: /^open double take$/i });
  opener.focus();
  fireEvent.click(opener);
  expect(screen.getByText(/13 of 14/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /close wildlife portrait of a swan/i })).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(container).not.toHaveAttribute('inert'));
  expect(opener).toHaveFocus();

  fireEvent.click(screen.getByRole('button', { name: /^gallery view$/i }));
  expect(screen.getByRole('button', { name: /^gallery view$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /^enlarge gate in the green$/i })).toBeInTheDocument();
});

test('opens a wildlife photograph in the four-photo animal collection only', async () => {
  const { container } = renderRoute('/photos/animals');
  fireEvent.click(await screen.findByRole('button', { name: /^show double take$/i }));
  const opener = screen.getByRole('button', { name: /^enlarge double take$/i });
  opener.focus();
  fireEvent.click(opener);

  expect(screen.getByText(/03 of 04/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /close wildlife portrait of a swan/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next photo/i }));
  expect(screen.getByText(/04 of 04/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /a swan drifting across dark water/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next photo/i }));
  expect(screen.getByText(/01 of 04/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /white swan arriving across calm water/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /previous photo/i }));
  expect(screen.getByText(/04 of 04/i)).toBeInTheDocument();

  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(container).not.toHaveAttribute('inert'));
  expect(container).not.toHaveAttribute('aria-hidden');
  expect(opener).toHaveFocus();
});

test('collection navigation resets the selected photograph and view mode', async () => {
  const { container } = renderRoute('/photos/countryside');
  fireEvent.click(await screen.findByRole('button', { name: /^show meadow line$/i }));
  expect(screen.getByRole('button', { name: /^enlarge meadow line$/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /^grid view$/i }));
  expect(container.querySelectorAll('.photo-room__grid-photo')).toHaveLength(10);

  const collections = screen.getByRole('navigation', { name: /^photo collections$/i });
  const animalsLink = Array.from(collections.querySelectorAll('a')).find((link) => link.getAttribute('href') === '/photos/animals');
  fireEvent.click(animalsLink);
  expect(await screen.findByRole('heading', { level: 1, name: /^animals\b/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^gallery view$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /^enlarge arrival$/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /^show /i })).toHaveLength(4);
  expect(screen.getByRole('button', { name: /^show arrival$/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.queryByRole('button', { name: /^show meadow line$/i })).not.toBeInTheDocument();
});

test('keeps the Sports photography collection image-free until photos are added', async () => {
  const { container } = renderRoute('/photos/sports');
  expect(await screen.findByRole('heading', { level: 1, name: /^sports\b/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /no sports photographs added yet/i })).toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /^gallery view$/i })).not.toBeInTheDocument();
  expect(container.querySelectorAll('.photo-room__grid-photo')).toHaveLength(0);
});

test('suppresses the synthetic click after a gallery swipe while allowing a later tap', async () => {
  renderRoute('/photos');
  const firstStage = await screen.findByRole('button', { name: /^enlarge gate in the green$/i });

  fireEvent.touchStart(firstStage, { touches: [{ clientX: 170, clientY: 100 }] });
  fireEvent.touchEnd(firstStage, { changedTouches: [{ clientX: 175, clientY: 300 }] });
  expect(screen.getByRole('button', { name: /^enlarge gate in the green$/i })).toBeInTheDocument();

  fireEvent.touchStart(firstStage, { touches: [{ clientX: 300, clientY: 180 }] });
  fireEvent.touchEnd(firstStage, { changedTouches: [{ clientX: 100, clientY: 185 }] });
  const secondStage = screen.getByRole('button', { name: /^enlarge meadow line$/i });
  fireEvent.click(secondStage, { detail: 1 });
  expect(screen.queryByRole('dialog', { name: /expanded view/i })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^enlarge meadow line$/i })).toBeInTheDocument();

  fireEvent.touchStart(secondStage, { touches: [{ clientX: 150, clientY: 180 }] });
  fireEvent.touchEnd(secondStage, { changedTouches: [{ clientX: 152, clientY: 182 }] });
  fireEvent.click(secondStage, { detail: 1 });
  expect(screen.getByRole('dialog', { name: /expanded view/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /narrow grass trail/i })).toBeInTheDocument();
  expect(screen.getByText(/02 of 14/i)).toBeInTheDocument();
});
