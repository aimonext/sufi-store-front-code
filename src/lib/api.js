import { browser } from '$app/environment';
import { dev } from '$app/environment';

const cache = new Map();

export async function apiFetch(path, fetchFn = fetch) {
  const host = browser ? location.host : 'ssr';
  const key = host + '::' + path;
  if (!dev && browser && cache.has(key)) {
    return cache.get(key);
  }
  const res = await fetchFn(path);
  if (!res.ok) throw new Error('API error ' + res.status);
  const data = await res.json();
  if (!dev && browser) cache.set(key, data);
  return data;
}

export async function getStore(fetchFn) {
  return apiFetch('/api/store', fetchFn);
}

export async function getProducts(fetchFn) {
  return apiFetch('/api/products', fetchFn);
}