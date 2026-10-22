import { getProducts } from '#lib/api.js';

export async function load({ fetch, params }) {
  const products = await getProducts(fetch);
  return { products, id: params.id };
}