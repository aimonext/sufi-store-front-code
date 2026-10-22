import { getStore, getProducts } from '#lib/api.js';

export async function load({ fetch }) {
  const [store, products] = await Promise.all([getStore(fetch), getProducts(fetch)]);
  return { store, products };
}