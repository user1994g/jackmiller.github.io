import { useEffect, useState } from 'react';
import styled from 'styled-components';

const BLOCKED_COUNTRY_CODES = new Set(['RU', 'UA', 'AE']);
const BLOCKED_CITY_NAMES = new Set(['dubai']);
const GEO_BLOCK_CACHE_KEY = 'geo-block-cache-v1';
const GEO_BLOCK_CACHE_TTL_MS = 1000 * 60 * 60 * 24;

const BlockedMain = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: radial-gradient(circle at 20% 20%, #141923 0%, #090b10 45%, #040507 100%);
  color: #ffffff;
  text-align: center;
`;

const BlockedCard = styled.section`
  width: min(32rem, 100%);
  padding: clamp(1.3rem, 4vw, 2rem);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(8, 10, 14, 0.9);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.36);

  h1 {
    margin: 0 0 0.6rem;
    font-size: clamp(1.25rem, 4vw, 1.6rem);
    letter-spacing: 0.02em;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.86);
    line-height: 1.5;
    font-size: 0.96rem;
  }
`;

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const readCachedDecision = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(GEO_BLOCK_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.blocked !== 'boolean' || typeof parsed.expiresAt !== 'number') {
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(GEO_BLOCK_CACHE_KEY);
      return null;
    }

    return parsed.blocked;
  } catch {
    return null;
  }
};

const cacheDecision = (blocked) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const payload = {
      blocked,
      expiresAt: Date.now() + GEO_BLOCK_CACHE_TTL_MS,
    };
    window.localStorage.setItem(GEO_BLOCK_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures and continue with the current session state.
  }
};

const isBlockedLocation = (payload) => {
  if (!payload || payload.success === false) {
    return false;
  }

  const countryCode = normalize(payload.country_code).toUpperCase();
  const city = normalize(payload.city);

  return BLOCKED_COUNTRY_CODES.has(countryCode) || BLOCKED_CITY_NAMES.has(city);
};

const GeoBlockGate = ({ children }) => {
  const [blocked, setBlocked] = useState(() => readCachedDecision() ?? false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const cached = readCachedDecision();
    if (cached !== null) {
      setBlocked(cached);
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 1500);

    fetch('https://ipwho.is/?fields=success,country_code,city', {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        const shouldBlock = isBlockedLocation(payload);
        setBlocked(shouldBlock);
        cacheDecision(shouldBlock);
      })
      .catch(() => {
        cacheDecision(false);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  if (blocked) {
    return (
      <BlockedMain>
        <BlockedCard aria-live="polite">
          <h1>Content Not Available</h1>
          <p>This website is currently unavailable in your location.</p>
        </BlockedCard>
      </BlockedMain>
    );
  }

  return children;
};

export default GeoBlockGate;
