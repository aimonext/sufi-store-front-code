import { json } from '@sveltejs/kit';
import { PRODUCTS } from '#lib/data/products.js';

export function GET() {
  return json(PRODUCTS);
}