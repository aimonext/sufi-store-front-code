import { PRODUCTS } from '#lib/data/products.js';

export const STORES = {
  localhost: {
    slug: 'lumen',
    storeName: 'Lumen',
    domain: 'localhost',
    heroEyebrow: 'Spring 2026',
    heroTitle: 'Objects made to be kept.',
    heroSubtitle: 'Small-batch goods for everyday rituals. Sourced responsibly, built to last.',
    categories: [
      { name: 'Electronics', img: '/img/catelec_400x400.jpg' },
      { name: 'Computers', img: '/img/catcomp_400x400.jpg' },
      { name: 'Clothing', img: '/img/catcloth_400x400.jpg' },
      { name: 'Grocery', img: '/img/catgro_400x400.jpg' },
      { name: 'Home', img: '/img/cathome_400x400.jpg' },
      { name: 'Beauty', img: '/img/catbeau_400x400.jpg' },
      { name: 'Sports', img: '/img/catsport_400x400.jpg' },
    ],
    products: PRODUCTS,
  },
  'store1.com': {
    slug: 'store1',
    storeName: 'Store One',
    domain: 'store1.com',
    heroEyebrow: 'Welcome',
    heroTitle: 'Store One Collection',
    heroSubtitle: 'Quality products for everyone.',
    categories: [
      { name: 'Electronics', img: '/img/catelec_400x400.jpg' },
      { name: 'Home', img: '/img/cathome_400x400.jpg' },
    ],
    products: PRODUCTS.filter(p => p.category === 'Electronics' || p.category === 'Home'),
  },
};

export function getStoreByHost(host) {
  const h = (host || '').split(':')[0].toLowerCase();
  return STORES[h] || STORES.localhost;
}