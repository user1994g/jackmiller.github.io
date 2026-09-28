import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import aboutImage from '../assets/Images/pfp-display.jpg';
import canopyWater from '../assets/ArchivePhotos/canopy-water.jpg';
import countryPond from '../assets/ArchivePhotos/country-pond.jpg';
import countryRoad from '../assets/ArchivePhotos/country-road.jpg';
import homeImage from '../assets/ArchivePhotos/swan-reflection.jpg';
import leafyPath from '../assets/ArchivePhotos/leafy-path.jpg';
import lichenBranches from '../assets/ArchivePhotos/lichen-branches.jpg';
import meadowFootbridge from '../assets/ArchivePhotos/meadow-footbridge.jpg';
import meadowTrail from '../assets/ArchivePhotos/fenced-trail.jpg';
import meadowTrees from '../assets/ArchivePhotos/meadow-trees.jpg';
import railwayCurve from '../assets/ArchivePhotos/railway-curve.jpg';
import filmPortrait from '../assets/Images/1-about-refresh.webp';
import filmDetail from '../assets/Images/5.webp';
import filmWindow from '../assets/Images/9.webp';
import routes from '../content/routes.json';

const baseUrl = 'https://jackmillermedia.com';

const imageUrls = {
  logo: `${baseUrl}/logo512.png`,
  home: `${baseUrl}${homeImage}`,
  photos: `${baseUrl}${leafyPath}`,
  animals: `${baseUrl}/photo-collections/animals/swan-arrival.jpg`,
  movieMood: `${baseUrl}${filmPortrait}`,
  about: `${baseUrl}${aboutImage}`,
  darkEchoes:
    'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b1a98a9e-5388-48c8-9f0a-cc41b0629c9a/id-preview-f00ed6c4--1b03e5be-bf52-4353-ac5f-a9644330d088.lovable.app-1783284438803.png',
  finalLesson: `${baseUrl}/new-home/img/44.jpg`,
};

const galleryImages = [
  [leafyPath, 'Woodland path bordered by a timber fence leading to a metal field gate', 1600, 900],
  [meadowTrail, 'Narrow grass trail crossing a bright meadow beneath a tall tree', 900, 1600],
  [railwayCurve, 'Railway tracks curving through green trees beyond a level crossing', 1600, 900],
  [countryPond, 'Country pond edged with reeds and trees beneath a blue spring sky', 1600, 900],
  [homeImage, 'White swan gliding past waterside branches and reflected reeds', 1600, 900],
  [meadowFootbridge, 'Grass footpath beneath mature trees leading towards a wooden footbridge', 1600, 900],
  [canopyWater, 'Pond seen through a dense canopy of green leaves and low branches', 1600, 900],
  [lichenBranches, 'Yellow lichen tracing low branches over still water and green reeds', 1600, 900],
  [meadowTrees, 'Mature spreading trees standing across a vivid green meadow', 1600, 900],
  [countryRoad, 'Quiet country road bending over a stone bridge between leafy trees', 1600, 900],
].map(([url, alt, width, height]) => ({ url: `${baseUrl}${url}`, alt, width, height }));

const animalImages = [
  ['swan-arrival.jpg', 'White swan arriving across calm water beside green reeds'],
  ['swan-through-reeds.jpg', 'White swan moving through reflected reeds on a country pond'],
  ['swan-reflection-close.jpg', 'Close wildlife portrait of a swan and its reflection in the water'],
  ['swan-drift.jpg', 'A swan drifting across dark water at the edge of a reed bed'],
].map(([filename, alt]) => ({
  url: `${baseUrl}/photo-collections/animals/${filename}`,
  alt,
  width: 4032,
  height: 2268,
}));

const movieImages = [
  [filmPortrait, 'Cinematic portrait from a Jack Miller film project', 1920, 2880],
  [filmWindow, 'Moody window-lit frame from a Jack Miller film project', 1280, 1920],
  [filmDetail, 'Cinematic production detail photographed for a Jack Miller film project', 1920, 2880],
].map(([url, alt, width, height]) => ({ url: `${baseUrl}${url}`, alt, width, height }));

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', String(content));
};

const removeMeta = (attribute, key) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
};

const canonicalFor = (route) => `${baseUrl}${route.path === '/' ? '/' : `${route.path}/`}`;

const buildSchema = (route, canonical, image) => {
  const personId = `${baseUrl}/#person`;
  const organisationId = `${baseUrl}/#organisation`;
  const websiteId = `${baseUrl}/#website`;
  const pageId = `${canonical}#webpage`;
  const pageNode = {
    '@type': route.schemaType,
    '@id': pageId,
    url: canonical,
    name: route.title,
    headline: route.heading,
    description: route.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    author: { '@id': personId },
  };

  if (route.imageKey !== 'logo') {
    pageNode.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: image,
      caption: route.imageAlt,
      ...(route.imageWidth ? { width: route.imageWidth } : {}),
      ...(route.imageHeight ? { height: route.imageHeight } : {}),
    };
  }
  if (route.path === '/about') pageNode.mainEntity = { '@id': personId };
  const associatedImages = route.path === '/photos' || route.path === '/photos/countryside'
    ? galleryImages
    : route.path === '/photos/animals'
      ? animalImages
      : route.path === '/photos/movies'
        ? movieImages
        : null;

  if (associatedImages) {
    pageNode.associatedMedia = associatedImages.map((galleryImage) => ({
      '@type': 'ImageObject',
      contentUrl: galleryImage.url,
      caption: galleryImage.alt,
      width: galleryImage.width,
      height: galleryImage.height,
      creator: { '@id': personId },
    }));
  }
  if (route.video) pageNode.mainEntity = { '@id': `${canonical}#video` };

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Jack Miller',
      url: `${baseUrl}/about/`,
      image: imageUrls.about,
      jobTitle: 'Creative Media Student',
      description: 'Independent filmmaker, photographer, and creative media student.',
      sameAs: ['https://github.com/user1994g'],
    },
    {
      '@type': 'Organization',
      '@id': organisationId,
      name: 'Jack Miller Media',
      url: `${baseUrl}/`,
      logo: `${baseUrl}/logo512.png`,
      founder: { '@id': personId },
      sameAs: ['https://github.com/user1994g'],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Jack Miller Media',
      url: `${baseUrl}/`,
      description: routes[0].description,
      publisher: { '@id': organisationId },
      inLanguage: 'en-GB',
    },
    pageNode,
  ];

  if (route.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Jack Miller Media',
          item: `${baseUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.heading.replace(/\s+[—|-].*$/, ''),
          item: canonical,
        },
      ],
    });
    pageNode.breadcrumb = { '@id': `${canonical}#breadcrumb` };
  }

  if (route.video) {
    graph.push({
      '@type': ['Movie', 'VideoObject'],
      '@id': `${canonical}#video`,
      name: route.video.name,
      description: route.video.description,
      thumbnailUrl: route.video.thumbnailUrl,
      url: canonical,
      creator: { '@id': personId },
      director: { '@id': personId },
      mainEntityOfPage: { '@id': pageId },
      genre: route.path === '/the-final-lesson' ? 'Student short film' : 'Short film',
      inLanguage: 'en-GB',
      ...(route.video.embedUrl ? { embedUrl: route.video.embedUrl } : {}),
      ...(route.video.contentUrl ? { contentUrl: route.video.contentUrl } : {}),
      ...(route.video.uploadDate ? { uploadDate: route.video.uploadDate } : {}),
      ...(route.path === '/the-final-lesson'
        ? { contentRating: '18+', isFamilyFriendly: false, producer: { '@id': personId } }
        : {}),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

const syncRouteSeo = (pathname) => {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const route = routes.find((entry) => entry.path === normalizedPath) || routes[0];
  const canonical = canonicalFor(route);
  const image = imageUrls[route.imageKey] || imageUrls.logo;
  const twitterCard = route.twitterCard || (route.imageWidth >= 1000 || route.video ? 'summary_large_image' : 'summary');

  document.title = route.title;
  upsertMeta('name', 'description', route.description);
  upsertMeta('name', 'robots', route.robots);
  upsertMeta('name', 'googlebot', route.robots);
  upsertMeta('property', 'og:type', route.video ? 'video.other' : 'website');
  upsertMeta('property', 'og:title', route.title);
  upsertMeta('property', 'og:description', route.description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:image:secure_url', image);
  upsertMeta('property', 'og:image:alt', route.imageAlt);
  upsertMeta('property', 'og:image:type', route.imageType);
  upsertMeta('name', 'twitter:card', twitterCard);
  upsertMeta('name', 'twitter:title', route.title);
  upsertMeta('name', 'twitter:description', route.description);
  upsertMeta('name', 'twitter:url', canonical);
  upsertMeta('name', 'twitter:image', image);
  upsertMeta('name', 'twitter:image:alt', route.imageAlt);

  if (route.imageWidth) upsertMeta('property', 'og:image:width', route.imageWidth);
  else removeMeta('property', 'og:image:width');
  if (route.imageHeight) upsertMeta('property', 'og:image:height', route.imageHeight);
  else removeMeta('property', 'og:image:height');

  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonical;

  document.getElementById('route-structured-data')?.remove();
  let schema = document.getElementById('route-schema');
  if (!schema) {
    schema = document.createElement('script');
    schema.id = 'route-schema';
    schema.type = 'application/ld+json';
    document.head.appendChild(schema);
  }
  schema.text = JSON.stringify(buildSchema(route, canonical, image)).replace(/</g, '\\u003c');
};

const RouteEffects = () => {
  const { pathname } = useLocation();
  const wipeRef = useRef(null);
  const firstRoute = useRef(true);

  useLayoutEffect(() => {
    syncRouteSeo(pathname);
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
