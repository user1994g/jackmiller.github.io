const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const routeManifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/routes.json'), 'utf8'));
const sourceHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8')
  .replace(/<script id="route-schema"[^>]*>[\s\S]*?<\/script>/i, '');
const baseUrl = 'https://jackmillermedia.com';
const socialImage = `${baseUrl}/logo512.png`;

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const replaceMeta = (html, selector, value) => {
  const escaped = escapeHtml(value);
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`(<meta\\s+${escapedSelector}[^>]*content=["'])[^"']*(["'][^>]*>)`, 'i');
  return matcher.test(html) ? html.replace(matcher, `$1${escaped}$2`) : html;
};

const renderRoute = (route) => {
  const canonicalPath = route.path === '/' ? '/' : `${route.path}/`;
  const canonical = `${baseUrl}${canonicalPath}`;
  let html = sourceHtml
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);

  html = replaceMeta(html, 'name="description"', route.description);
  html = replaceMeta(html, 'name="robots"', route.robots);
  html = replaceMeta(html, 'name="googlebot"', route.robots);
  html = replaceMeta(html, 'property="og:title"', route.title);
  html = replaceMeta(html, 'property="og:description"', route.description);
  html = replaceMeta(html, 'property="og:url"', canonical);
  html = replaceMeta(html, 'property="og:image"', socialImage);
  html = replaceMeta(html, 'name="twitter:title"', route.title);
  html = replaceMeta(html, 'name="twitter:description"', route.description);
  html = replaceMeta(html, 'name="twitter:url"', canonical);
  html = replaceMeta(html, 'name="twitter:image"', socialImage);

  const schemaType = {
    '/': 'WebPage',
    '/videos': 'CollectionPage',
    '/photos': 'ImageGallery',
    '/about': 'ProfilePage',
    '/contact': 'ContactPage',
    '/write-ups': 'CollectionPage',
    '/fmp-level-2': 'CreativeWork',
    '/the-final-lesson': 'Movie',
  }[route.path] || 'WebPage';
  const routeSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: route.title,
    description: route.description,
    url: canonical,
    inLanguage: 'en-GB',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Jack Miller Media',
      url: `${baseUrl}/`,
    },
    creator: {
      '@type': 'Person',
      name: 'Jack Miller',
    },
  };
  const schemaJson = JSON.stringify(routeSchema).replace(/</g, '\\u003c');
  return html.replace('</head>', `<script id="route-schema" type="application/ld+json">${schemaJson}</script></head>`);
};

routeManifest.forEach((route) => {
  const html = renderRoute(route);
  if (route.path === '/') {
    fs.writeFileSync(path.join(buildDir, 'index.html'), html);
    return;
  }
  const outputDir = path.join(buildDir, route.path.slice(1));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
});

fs.writeFileSync(path.join(buildDir, '404.html'), renderRoute(routeManifest[0]));

const indexedRoutes = routeManifest.filter((route) => !route.robots.startsWith('noindex'));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexedRoutes.map((route) => {
    const canonicalPath = route.path === '/' ? '/' : `${route.path}/`;
    return [
      '  <url>',
      `    <loc>${baseUrl}${canonicalPath}</loc>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);

// CRA copies the whole public folder. Keep the one live Final Lesson poster and
// prune only generated copies of legacy concept media from the deploy artifact.
const generatedMediaDir = path.join(buildDir, 'media');
fs.rmSync(generatedMediaDir, { recursive: true, force: true });
fs.rmSync(path.join(buildDir, '.DS_Store'), { force: true });

const legacyStillDir = path.join(buildDir, 'new-home', 'img');
if (fs.existsSync(legacyStillDir)) {
  fs.readdirSync(legacyStillDir).forEach((fileName) => {
    if (fileName !== '44.jpg') {
      fs.rmSync(path.join(legacyStillDir, fileName), { force: true });
    }
  });
}
