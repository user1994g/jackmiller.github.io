const PRIMARY_HOST = "jackmillermedia.com";
const REDIRECT_HOSTS = new Set([
  "jackmillermedia.pages.dev",
  "www.jackmillermedia.com",
]);

// Regional availability policy, reviewed 30 September 2026.
// The base list follows Human Dignity Trust's current list of jurisdictions
// that criminalise private, consensual same-sex sexual activity. Russia is
// included separately at the site owner's request.
// Source: https://www.humandignitytrust.org/lgbt-the-law/map-of-criminalisation/
export const BLOCKED_COUNTRY_CODES = new Set([
  // Asia and the Middle East
  "AF", "BD", "BN", "ID", "IR", "IQ", "KW", "LB", "MY", "MV", "MM",
  "OM", "PK", "PS", "QA", "SA", "LK", "SY", "TM", "AE", "UZ", "YE",
  // Africa
  "DZ", "BF", "BI", "CM", "TD", "KM", "EG", "ER", "SZ", "ET", "GH",
  "GN", "KE", "LR", "LY", "MW", "ML", "MR", "MA", "NE", "NG", "SN",
  "SL", "SO", "SS", "SD", "TZ", "GM", "TG", "TN", "UG", "ZM", "ZW",
  // Caribbean and the Americas
  "GD", "GY", "JM", "VC", "TT",
  // Pacific
  "KI", "PG", "WS", "SB", "TO", "TV",
  // Additional owner-requested restriction
  "RU",
]);

const BLOCKED_RESPONSE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Content unavailable</title>
    <style>
      :root { color-scheme: dark; font-family: Arial, Helvetica, sans-serif; }
      * { box-sizing: border-box; }
      body { min-height: 100vh; min-height: 100dvh; display: grid; place-items: center; margin: 0; padding: 24px; background: #0b0a0f; color: #f5f0e6; }
      main { width: min(520px, 100%); padding: clamp(24px, 6vw, 48px); border: 2px solid currentColor; text-align: center; box-shadow: 10px 10px 0 #4b31ff; }
      p { margin: 12px 0 0; color: #c9c4bc; line-height: 1.6; }
    </style>
  </head>
  <body>
    <main>
      <h1>Content unavailable</h1>
      <p>This website is not available in your region.</p>
    </main>
  </body>
</html>`;

export const isBlockedCountry = (countryCode) => (
  BLOCKED_COUNTRY_CODES.has(String(countryCode || "").trim().toUpperCase())
);

const blockedResponse = () => new Response(BLOCKED_RESPONSE, {
  status: 451,
  headers: {
    "Cache-Control": "private, no-store, max-age=0",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    "Content-Type": "text/html; charset=UTF-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
  },
});

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (isBlockedCountry(context.request.cf?.country)) {
    return blockedResponse();
  }

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = "https:";
    url.hostname = PRIMARY_HOST;
    url.port = "";

    return Response.redirect(url.toString(), 308);
  }

  return context.next();
}
