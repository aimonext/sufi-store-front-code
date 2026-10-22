import { json } from '@sveltejs/kit';
import { getStoreByHost } from '#lib/mock/stores.js';

export function GET({ request, url }) {
  const host = request.headers.get('host') || 'localhost';
  const store = getStoreByHost(host);
  return json(store);
}