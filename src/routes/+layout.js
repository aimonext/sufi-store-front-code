import { getStore } from '#lib/api.js';

export const ssr = false;
export const prerender = false;

export async function load({ fetch }) {
  const store = await getStore(fetch);
  return { store };
}