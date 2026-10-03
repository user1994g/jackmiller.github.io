import { useEffect } from 'react';

const SEASON_START = Date.parse('2026-10-01T00:00:00+01:00');
const SEASON_END = Date.parse('2026-11-01T00:00:00Z');

export const isHalloweenSeason = (date = new Date()) => (
  date.getTime() >= SEASON_START && date.getTime() < SEASON_END
);

const SeasonalTheme = () => {
  useEffect(() => {
    const className = 'season-halloween';
    let timer;
    const updateTheme = () => {
      window.clearTimeout(timer);
      const enabled = isHalloweenSeason();
      document.body.classList.toggle(className, enabled);
      if (enabled) {
        timer = window.setTimeout(updateTheme, Math.min(86400000, SEASON_END - Date.now()));
      }
    };
    updateTheme();
    document.addEventListener('visibilitychange', updateTheme);

    return () => {
      document.body.classList.remove(className);
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateTheme);
    };
  }, []);

  return null;
};

export default SeasonalTheme;
