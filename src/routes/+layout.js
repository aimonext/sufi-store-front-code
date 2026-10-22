import { getStore } from '#lib/api.js';

export async function load({ fetch }) {
  const store = await getStore(fetch);
  return { store };
}