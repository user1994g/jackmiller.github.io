import { useEffect } from 'react';
import { useVisitorPreferences } from '../context/VisitorPreferences';

const HALLOWEEN_START = Date.parse('2026-10-01T00:00:00+01:00');
const HALLOWEEN_END = Date.parse('2026-11-01T00:00:00Z');

export const isHalloweenSeason = (date = new Date()) => (
  date.getTime() >= HALLOWEEN_START && date.getTime() < HALLOWEEN_END
);

// December and 4 March are GMT in the UK: UTC matches London midnight.
export const isChristmasSeason = (date = new Date()) => (
  date.getUTCMonth() === 11 && date.getUTCDate() >= 20
);

export const isBirthdaySeason = (date = new Date()) => (
  date.getUTCMonth() === 2 && date.getUTCDate() === 4
);

const nextSeasonBoundary = (date) => {
  const year = date.getUTCFullYear();
  return [
    HALLOWEEN_START,
    HALLOWEEN_END,
    Date.UTC(year, 2, 4),
    Date.UTC(year, 2, 5),
    Date.UTC(year + 1, 2, 4),
    Date.UTC(year + 1, 2, 5),
    Date.UTC(year, 11, 20),
    Date.UTC(year + 1, 0, 1),
    Date.UTC(year + 1, 11, 20),
  ].filter((boundary) => boundary > date.getTime()).sort((a, b) => a - b)[0];
};

const SeasonalTheme = () => {
  const { theme } = useVisitorPreferences();
  useEffect(() => {
    let timer;
    const updateTheme = () => {
      window.clearTimeout(timer);
      const now = new Date();
      const automatic = theme === 'auto';
      document.body.classList.toggle('season-halloween', automatic ? isHalloweenSeason(now) : theme === 'halloween');
      document.body.classList.toggle('season-christmas', automatic ? isChristmasSeason(now) : theme === 'christmas');
      document.body.classList.toggle('season-birthday', automatic ? isBirthdaySeason(now) : theme === 'birthday');
      // Recheck even outside a season so a tab left open can enter the next one.
      timer = window.setTimeout(updateTheme, Math.min(86400000, nextSeasonBoundary(now) - now.getTime()));
    };
    updateTheme();
    document.addEventListener('visibilitychange', updateTheme);

    return () => {
      document.body.classList.remove('season-halloween', 'season-christmas', 'season-birthday');
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateTheme);
    };
  }, [theme]);

  return null;
};

export default SeasonalTheme;
