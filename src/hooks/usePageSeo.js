import { useEffect } from 'react';

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
  image = 'https://jackmillermedia.com/logo512.png',
  imageAlt = 'Jack Miller Media logo',
  type = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (title) {
      document.title = title;
      upsertMetaByProperty('og:title', title);
      upsertMetaByName('twitter:title', title);
    }

    if (description) {
      upsertMetaByName('description', description);
      upsertMetaByProperty('og:description', description);
      upsertMetaByName('twitter:description', description);
    }

    if (url) {
      upsertMetaByProperty('og:url', url);
      upsertMetaByName('twitter:url', url);

      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    upsertMetaByProperty('og:type', type);
    upsertMetaByProperty('og:image', image);
    upsertMetaByProperty('og:image:alt', imageAlt);
    upsertMetaByName('twitter:image', image);
    upsertMetaByName('twitter:image:alt', imageAlt);

    upsertMetaByName('robots', robots);
    upsertMetaByName('googlebot', robots);

    const schemaId = 'route-structured-data';
    const previousSchema = document.getElementById(schemaId);
    if (previousSchema) previousSchema.remove();
    if (jsonLd) {
      const schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      schema.text = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
      document.head.appendChild(schema);
    }

    return () => {
      document.getElementById(schemaId)?.remove();
    };
  }, [description, image, imageAlt, jsonLd, robots, title, type, url]);
};

export default usePageSeo;
