import routes from './routes.json';

// Curated language choices, not a list of countries. Shared languages do not
// change the regional availability policy enforced by Cloudflare.
export const TRANSLATION_LANGUAGES = [
  { code: 'fr', label: 'Français', english: 'French' },
  { code: 'es', label: 'Español', english: 'Spanish' },
  { code: 'de', label: 'Deutsch', english: 'German' },
  { code: 'it', label: 'Italiano', english: 'Italian' },
  { code: 'pt', label: 'Português', english: 'Portuguese' },
  { code: 'nl', label: 'Nederlands', english: 'Dutch' },
  { code: 'pl', label: 'Polski', english: 'Polish' },
  { code: 'uk', label: 'Українська', english: 'Ukrainian' },
  { code: 'cs', label: 'Čeština', english: 'Czech' },
  { code: 'el', label: 'Ελληνικά', english: 'Greek' },
  { code: 'sv', label: 'Svenska', english: 'Swedish' },
  { code: 'no', label: 'Norsk', english: 'Norwegian' },
  { code: 'da', label: 'Dansk', english: 'Danish' },
  { code: 'fi', label: 'Suomi', english: 'Finnish' },
  { code: 'cy', label: 'Cymraeg', english: 'Welsh' },
  { code: 'ja', label: '日本語', english: 'Japanese' },
  { code: 'ko', label: '한국어', english: 'Korean' },
  { code: 'zh-CN', label: '简体中文', english: 'Chinese (simplified)' },
];

export const buildTranslationUrl = (language, pathname) => {
  if (!TRANSLATION_LANGUAGES.some(({ code }) => code === language)) return null;
  const path = String(pathname || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const safePath = routes.some((route) => route.path === path) ? path : '/';
  const url = new URL('https://translate.google.com/translate');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', language);
  url.searchParams.set('u', `https://jackmillermedia.com${safePath}`);
  return url.toString();
};
