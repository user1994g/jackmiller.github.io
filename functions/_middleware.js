const PRIMARY_HOST = "jackmillermedia.com";
const REDIRECT_HOSTS = new Set([
  "jackmillermedia.pages.dev",
  "www.jackmillermedia.com",
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.protocol = "https:";
    url.hostname = PRIMARY_HOST;
    url.port = "";

    return Response.redirect(url.toString(), 308);
  }

  return context.next();
}
