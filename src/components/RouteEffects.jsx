import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import routes from '../content/routes.json';

const schemaTypes = {
  '/videos': 'CollectionPage',
  '/photos': 'ImageGallery',
  '/about': 'ProfilePage',
  '/contact': 'ContactPage',
  '/write-ups': 'CollectionPage',
  '/fmp-level-2': 'CreativeWork',
  '/the-final-lesson': 'Movie',
};

const syncRouteSchema = (pathname) => {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const route = routes.find((entry) => entry.path === normalizedPath) || routes[0];
  const canonicalPath = route.path === '/' ? '/' : `${route.path}/`;
  const canonical = `https://jackmillermedia.com${canonicalPath}`;
  let schema = document.getElementById('route-schema');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'route-schema';
    schema.type = 'application/ld+json';
    document.head.appendChild(schema);
  }
  schema.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': schemaTypes[route.path] || 'WebPage',
    name: route.title,
    description: route.description,
    url: canonical,
    inLanguage: 'en-GB',
    isPartOf: { '@type': 'WebSite', name: 'Jack Miller Media', url: 'https://jackmillermedia.com/' },
    creator: { '@type': 'Person', name: 'Jack Miller' },
  }).replace(/</g, '\\u003c');
};

const RouteEffects = () => {
  const { pathname } = useLocation();
  const wipeRef = useRef(null);
  const firstRoute = useRef(true);

  useLayoutEffect(() => {
    syncRouteSchema(pathname);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    if (firstRoute.current) {
      firstRoute.current = false;
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const stripes = wipeRef.current?.children;
    if (!stripes?.length) return undefined;

    if (typeof gsap.timeline !== 'function') return undefined;
    const timeline = gsap.timeline();
    timeline
      .set(wipeRef.current, { visibility: 'visible' })
      .fromTo(stripes, { scaleY: 0, transformOrigin: 'bottom' }, {
        scaleY: 1,
        duration: 0.18,
        stagger: 0.035,
        ease: 'power3.in',
      })
      .to(stripes, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.22,
        stagger: 0.035,
        ease: 'power3.out',
      })
      .set(wipeRef.current, { visibility: 'hidden' });

    return () => timeline.kill();
  }, [pathname]);

  return (
    <div className="route-wipe" ref={wipeRef} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
};

export default RouteEffects;
