import { useEffect } from 'react';

const HALLOWEEN_MONTH = 9;

export const isHalloweenSeason = (date = new Date()) => date.getMonth() === HALLOWEEN_MONTH;

const SeasonalTheme = () => {
  useEffect(() => {
    const className = 'season-halloween';
    const enabled = isHalloweenSeason();

    document.body.classList.toggle(className, enabled);

    return () => {
      document.body.classList.remove(className);
    };
  }, []);

  return null;
};

export default SeasonalTheme;
