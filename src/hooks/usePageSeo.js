import { useEffect } from 'react';

import routes from '../content/routes.json';

const upsertMetaByName = (name, content) => {
  if (typeof document === 'undefined' || !content) return;

  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertMetaByProperty = (property, content) => {
  if (typeof document === 'undefined' || !content) return;

  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const usePageSeo = ({
  title,
  description,
  url,
  robots = 'index, follow, max-image-preview:large',
  image,
  imageAlt,
  type = 'website',
}) => {
  const pathname = (() => {
    try {
      return new URL(url).pathname.replace(/\/+$/, '') || '/';
    } catch (error) {
      return null;
    }
  })();
  const route = routes.find((entry) => entry.path === pathname);
  const resolvedTitle = route?.title || title;
  const resolvedDescription = route?.description || description;
  const resolvedRobots = route?.robots || robots;
  const resolvedUrl = route
    ? `https://jackmillermedia.com${route.path === '/' ? '/' : `${route.path}/`}`
    : url;
  const resolvedType = route?.video ? 'video.other' : type;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (resolvedTitle) {
      document.title = resolvedTitle;
      upsertMetaByProperty('og:title', resolvedTitle);
      upsertMetaByName('twitter:title', resolvedTitle);
    }

    if (resolvedDescription) {
      upsertMetaByName('description', resolvedDescription);
      upsertMetaByProperty('og:description', resolvedDescription);
      upsertMetaByName('twitter:description', resolvedDescription);
    }

    if (resolvedUrl) {
      upsertMetaByProperty('og:url', resolvedUrl);
      upsertMetaByName('twitter:url', resolvedUrl);

      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', resolvedUrl);
    }

    upsertMetaByProperty('og:type', resolvedType);
    if (image) {
      upsertMetaByProperty('og:image', image);
      upsertMetaByProperty('og:image:secure_url', image);
      upsertMetaByName('twitter:image', image);
    }
    if (imageAlt) {
      upsertMetaByProperty('og:image:alt', imageAlt);
      upsertMetaByName('twitter:image:alt', imageAlt);
    }

    upsertMetaByName('robots', resolvedRobots);
    upsertMetaByName('googlebot', resolvedRobots);
  }, [image, imageAlt, resolvedDescription, resolvedRobots, resolvedTitle, resolvedType, resolvedUrl]);
};

export default usePageSeo;
