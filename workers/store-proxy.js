// Cloudflare Worker: per-store edge proxy
// Deploy one instance per store with STORE and ORIGIN_URL env vars set.

const STORES = {
  grocery: { /* filled from static/mock/stores/5177.json */ },
  electronics: { /* filled from 5178.json */ },
  fashion: { /* filled from 5179.json */ },
};

export default {
  async fetch(request, env) {
    const storeSlug = env.STORE || 'grocery';
    const origin = env.ORIGIN_URL || 'https://sufi-store-front-code.pages.dev';
    const url = new URL(request.url);

    // API requests: serve store-specific data
    if (url.pathname.startsWith('/api/store')) {
      const data = STORES[storeSlug];
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
    if (url.pathname.startsWith('/api/products')) {
      const data = STORES[storeSlug]?.products || [];
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
    if (url.pathname.startsWith('/api/notifications')) {
      const data = STORES[storeSlug]?.notifications || [];
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // All other requests: proxy to main Sufi Pages URL
    const originUrl = new URL(url.pathname + url.search, origin);
    const resp = await fetch(originUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers,
    });
  },
};