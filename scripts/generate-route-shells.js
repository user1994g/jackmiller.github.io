const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');
const baseUrl = 'https://jackmillermedia.com';
const routeManifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/routes.json'), 'utf8'));
const assetManifest = JSON.parse(fs.readFileSync(path.join(buildDir, 'asset-manifest.json'), 'utf8'));
const sourceHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8')
  .replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');

const assetUrl = (assetKey) => {
  const relativeUrl = assetManifest.files[assetKey];
  if (!relativeUrl) {
    throw new Error(`Missing built asset for SEO shell: ${assetKey}`);
  }
  return `${baseUrl}${relativeUrl}`;
};

const imageUrls = {
  logo: `${baseUrl}/logo512.png`,
  home: assetUrl('static/media/swan-reflection.jpg'),
  photos: assetUrl('static/media/leafy-path.jpg'),
  about: assetUrl('static/media/pfp-display.jpg'),
  darkEchoes: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b1a98a9e-5388-48c8-9f0a-cc41b0629c9a/id-preview-f00ed6c4--1b03e5be-bf52-4353-ac5f-a9644330d088.lovable.app-1783284438803.png',
  finalLesson: `${baseUrl}/new-home/img/44.jpg`,
};

const galleryImages = [
  ['static/media/leafy-path.jpg', 'Woodland path bordered by a timber fence leading to a metal field gate', 1600, 900],
  ['static/media/fenced-trail.jpg', 'Narrow grass trail crossing a bright meadow beneath a tall tree', 900, 1600],
  ['static/media/railway-curve.jpg', 'Railway tracks curving through green trees beyond a level crossing', 1600, 900],
  ['static/media/country-pond.jpg', 'Country pond edged with reeds and trees beneath a blue spring sky', 1600, 900],
  ['static/media/swan-reflection.jpg', 'White swan gliding past waterside branches and reflected reeds', 1600, 900],
  ['static/media/meadow-footbridge.jpg', 'Grass footpath beneath mature trees leading towards a wooden footbridge', 1600, 900],
  ['static/media/canopy-water.jpg', 'Pond seen through a dense canopy of green leaves and low branches', 1600, 900],
  ['static/media/lichen-branches.jpg', 'Yellow lichen tracing low branches over still water and green reeds', 1600, 900],
  ['static/media/meadow-trees.jpg', 'Mature spreading trees standing across a vivid green meadow', 1600, 900],
  ['static/media/country-road.jpg', 'Quiet country road bending over a stone bridge between leafy trees', 1600, 900],
].map(([key, alt, width, height]) => ({
  url: assetUrl(key),
  alt,
  width,
  height,
}));

const primaryNav = [
  ['/', 'Jack Miller Media home'],
  ['/about/', 'About Jack Miller'],
  ['/photos/', 'Jack Miller photography portfolio'],
  ['/fmp-level-2/', 'The Dark Echoes of 1939 — FMP Level 2 film'],
  ['/the-final-lesson/', 'The Final Lesson — 2024 short film'],
  ['/write-ups/', 'Film and photography production notes'],
  ['/contact/', 'Contact Jack Miller Media'],
];

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceMeta = (html, attribute, key, value) => {
  const escaped = escapeHtml(value);
  const matcher = new RegExp(
    `(<meta\\s+[^>]*${escapeRegExp(attribute)}=["']${escapeRegExp(key)}["'][^>]*content=["'])[^"']*(["'][^>]*>)`,
    'i',
  );
  return matcher.test(html) ? html.replace(matcher, `$1${escaped}$2`) : html;
};

const removeMeta = (html, attribute, key) => {
  const matcher = new RegExp(
    `\\s*<meta\\s+[^>]*${escapeRegExp(attribute)}=["']${escapeRegExp(key)}["'][^>]*>`,
    'i',
  );
  return html.replace(matcher, '');
};

const canonicalFor = (route) => {
  const canonicalPath = route.path === '/' ? '/' : `${route.path}/`;
  return `${baseUrl}${canonicalPath}`;
};

const imageFor = (route) => imageUrls[route.imageKey] || imageUrls.logo;

const breadcrumbName = (route) => route.heading.replace(/\s+[—|-].*$/, '');

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
  if (route.path === '/photos') {
    pageNode.associatedMedia = galleryImages.map((galleryImage) => ({
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
      description: routeManifest[0].description,
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
          name: breadcrumbName(route),
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
      ...(route.path === '/the-final-lesson' ? {
        contentRating: '18+',
        isFamilyFriendly: false,
        producer: { '@id': personId },
      } : {}),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

const renderFallback = (route, image) => {
  const isLogo = route.imageKey === 'logo';
  const leadImage = isLogo ? '' : [
    '<figure>',
    `  <img src="${escapeHtml(image)}" alt="${escapeHtml(route.imageAlt)}"${route.imageWidth ? ` width="${route.imageWidth}"` : ''}${route.imageHeight ? ` height="${route.imageHeight}"` : ''} />`,
    '</figure>',
  ].join('\n');
  const gallery = route.path === '/photos' ? [
    '<section aria-labelledby="static-gallery-title">',
    '  <h2 id="static-gallery-title">Selected countryside photographs</h2>',
    ...galleryImages.map((galleryImage) => [
      '  <figure>',
      `    <img src="${escapeHtml(galleryImage.url)}" alt="${escapeHtml(galleryImage.alt)}" width="${galleryImage.width}" height="${galleryImage.height}" loading="lazy" />`,
      `    <figcaption>${escapeHtml(galleryImage.alt)}</figcaption>`,
      '  </figure>',
    ].join('\n')),
    '</section>',
  ].join('\n') : '';
  const links = primaryNav
    .map(([href, label]) => `<li><a href="${baseUrl}${href}">${escapeHtml(label)}</a></li>`)
    .join('');

  return [
    '<article class="route-shell-fallback" data-static-route-shell>',
    '  <header>',
    '    <p>Jack Miller Media</p>',
    `    <h1>${escapeHtml(route.heading)}</h1>`,
    `    <p>${escapeHtml(route.summary)}</p>`,
    '  </header>',
    leadImage,
    gallery,
    '  <nav aria-label="Portfolio pages">',
    `    <ul>${links}</ul>`,
    '  </nav>',
    '</article>',
  ].filter(Boolean).join('\n');
};

const renderRoute = (route, { canonical = canonicalFor(route), includeSchema = true } = {}) => {
  const image = imageFor(route);
  let html = sourceHtml
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace('<div id="root"></div>', `<div id="root">${renderFallback(route, image)}</div>`);

  html = replaceMeta(html, 'name', 'description', route.description);
  html = replaceMeta(html, 'name', 'robots', route.robots);
  html = replaceMeta(html, 'name', 'googlebot', route.robots);
  html = replaceMeta(html, 'property', 'og:type', route.video ? 'video.other' : 'website');
  html = replaceMeta(html, 'property', 'og:title', route.title);
  html = replaceMeta(html, 'property', 'og:description', route.description);
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:image', image);
  html = replaceMeta(html, 'property', 'og:image:secure_url', image);
  html = replaceMeta(html, 'property', 'og:image:alt', route.imageAlt);
  html = replaceMeta(html, 'property', 'og:image:type', route.imageType);
  html = route.imageWidth
    ? replaceMeta(html, 'property', 'og:image:width', route.imageWidth)
    : removeMeta(html, 'property', 'og:image:width');
  html = route.imageHeight
    ? replaceMeta(html, 'property', 'og:image:height', route.imageHeight)
    : removeMeta(html, 'property', 'og:image:height');
  const twitterCard = route.twitterCard || (route.imageWidth >= 1000 || route.video ? 'summary_large_image' : 'summary');
  html = replaceMeta(html, 'name', 'twitter:card', twitterCard);
  html = replaceMeta(html, 'name', 'twitter:title', route.title);
  html = replaceMeta(html, 'name', 'twitter:description', route.description);
  html = replaceMeta(html, 'name', 'twitter:url', canonical);
  html = replaceMeta(html, 'name', 'twitter:image', image);
  html = replaceMeta(html, 'name', 'twitter:image:alt', route.imageAlt);

  if (!includeSchema) return html;

  const schemaJson = JSON.stringify(buildSchema(route, canonical, image)).replace(/</g, '\\u003c');
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

const notFoundRoute = {
  ...routeManifest[0],
  path: '/404',
  title: 'Page Not Found | Jack Miller Media',
  description: 'The requested page could not be found. Explore the Jack Miller Media film and photography portfolio.',
  heading: 'Page not found',
  summary: 'That frame is missing. Use the links below to return to the portfolio.',
  robots: 'noindex, follow',
};
fs.writeFileSync(
  path.join(buildDir, '404.html'),
  renderRoute(notFoundRoute, { canonical: `${baseUrl}/404.html`, includeSchema: false }),
);

const indexedRoutes = routeManifest.filter((route) => !route.robots.startsWith('noindex'));
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexedRoutes.map((route) => [
    '  <url>',
    `    <loc>${canonicalFor(route)}</loc>`,
    `    <lastmod>${route.lastmod}</lastmod>`,
    '  </url>',
  ].join('\n')),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);

const assertBuild = (condition, message) => {
  if (!condition) throw new Error(`SEO build validation failed: ${message}`);
};

routeManifest.forEach((route) => {
  const routeFile = route.path === '/'
    ? path.join(buildDir, 'index.html')
    : path.join(buildDir, route.path.slice(1), 'index.html');
  const html = fs.readFileSync(routeFile, 'utf8');
  const canonical = canonicalFor(route);
  const schemaMatches = [...html.matchAll(/<script id="route-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const canonicalCount = (html.match(/<link rel="canonical"/g) || []).length;
  const shouldBeIndexed = !route.robots.startsWith('noindex');

  assertBuild(canonicalCount === 1, `${route.path} must have exactly one canonical link`);
  assertBuild(html.includes(`href="${canonical}"`), `${route.path} canonical URL is incorrect`);
  assertBuild(schemaMatches.length === 1, `${route.path} must have exactly one route schema`);
  assertBuild(html.includes('data-static-route-shell'), `${route.path} is missing crawlable fallback content`);
  assertBuild(html.includes(`<h1>${escapeHtml(route.heading)}</h1>`), `${route.path} is missing its fallback heading`);
  assertBuild(
    sitemap.includes(`<loc>${canonical}</loc>`) === shouldBeIndexed,
    `${route.path} sitemap inclusion does not match its robots directive`,
  );

  const schema = JSON.parse(schemaMatches[0][1]);
  const graphIds = new Set(schema['@graph'].map((entry) => entry['@id']).filter(Boolean));
  const referencedIds = [];
  const collectReferences = (value) => {
    if (Array.isArray(value)) {
      value.forEach(collectReferences);
      return;
    }
    if (!value || typeof value !== 'object') return;
    if (Object.keys(value).length === 1 && value['@id']) referencedIds.push(value['@id']);
    Object.values(value).forEach(collectReferences);
  };
  collectReferences(schema);
  referencedIds
    .filter((id) => id.startsWith(`${baseUrl}/`))
    .forEach((id) => assertBuild(graphIds.has(id), `${route.path} has an unresolved schema reference: ${id}`));
});

const generated404 = fs.readFileSync(path.join(buildDir, '404.html'), 'utf8');
assertBuild(generated404.includes('noindex, follow'), '404 page must be noindex');
assertBuild(!generated404.includes('id="route-schema"'), '404 page must not contain route schema');
assertBuild(fs.existsSync(path.join(buildDir, '_headers')), 'Cloudflare _headers file is missing');
assertBuild(fs.existsSync(path.join(buildDir, '_redirects')), 'Cloudflare _redirects file is missing');

// CRA copies the whole public folder. Keep the one live Final Lesson poster and
// prune only generated copies of legacy concept media from the deploy artifact.
const generatedMediaDir = path.join(buildDir, 'media');
fs.rmSync(generatedMediaDir, { recursive: true, force: true });
fs.rmSync(path.join(buildDir, '.DS_Store'), { force: true });
fs.rmSync(path.join(buildDir, 'static', 'js', 'main.cd6284eb.js'), { force: true });

const legacyStillDir = path.join(buildDir, 'new-home', 'img');
if (fs.existsSync(legacyStillDir)) {
  fs.readdirSync(legacyStillDir).forEach((fileName) => {
    if (fileName !== '44.jpg') {
      fs.rmSync(path.join(legacyStillDir, fileName), { force: true });
    }
  });
}
