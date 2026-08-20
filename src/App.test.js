import { render, screen } from '@testing-library/react';
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

afterAll(() => {
  delete global.fetch;
});

test('renders the portfolio home page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: /jack miller media/i })).toBeInTheDocument();
});
