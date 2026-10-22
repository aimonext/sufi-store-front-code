import { getProducts } from '#lib/api.js';

export async function load({ fetch }) {
  const products = await getProducts(fetch);
  return { products };
}