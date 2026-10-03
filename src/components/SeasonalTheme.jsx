import { useEffect } from 'react';

const HALLOWEEN_START = Date.parse('2026-10-01T00:00:00+01:00');
const HALLOWEEN_END = Date.parse('2026-11-01T00:00:00Z');

export const isHalloweenSeason = (date = new Date()) => (
  date.getTime() >= HALLOWEEN_START && date.getTime() < HALLOWEEN_END
);

// December is GMT in the UK, so UTC boundaries also match London midnight.
export const isChristmasSeason = (date = new Date()) => (
  date.getUTCMonth() === 11 && date.getUTCDate() >= 20
);

const nextSeasonBoundary = (date) => {
  const year = date.getUTCFullYear();
  return [
    HALLOWEEN_START,
    HALLOWEEN_END,
    Date.UTC(year, 11, 20),
    Date.UTC(year + 1, 0, 1),
    Date.UTC(year + 1, 11, 20),
  ].filter((boundary) => boundary > date.getTime()).sort((a, b) => a - b)[0];
};

const SeasonalTheme = () => {
  useEffect(() => {
    let timer;
    const updateTheme = () => {
      window.clearTimeout(timer);
      const now = new Date();
      document.body.classList.toggle('season-halloween', isHalloweenSeason(now));
      document.body.classList.toggle('season-christmas', isChristmasSeason(now));
      // Recheck even outside a season so a tab left open can enter the next one.
      timer = window.setTimeout(updateTheme, Math.min(86400000, nextSeasonBoundary(now) - now.getTime()));
    };
    updateTheme();
    document.addEventListener('visibilitychange', updateTheme);

    return () => {
      document.body.classList.remove('season-halloween', 'season-christmas');
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateTheme);
    };
  }, []);

  return null;
};

export default SeasonalTheme;
