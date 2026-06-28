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
  }, [description, title, url]);
};

export default usePageSeo;
