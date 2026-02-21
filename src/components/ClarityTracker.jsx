import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const isLocalHostname = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1';

const ClarityTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.clarity !== 'function') {
      return;
    }

    if (isLocalHostname(window.location.hostname)) {
      return;
    }

    const route = `${location.pathname}${location.search}${location.hash || ''}`;
    const pageType = location.pathname === '/videos' ? 'videos' : 'home';

    window.clarity('set', 'route', route);
    window.clarity('set', 'page_type', pageType);
    window.clarity('event', 'route_change');
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default ClarityTracker;
