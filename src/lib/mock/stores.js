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
    contact: { email: 'hello@lumen.store', phone: '+1 (555) 012-3456', address: '123 Market St, San Francisco, CA' },
    privacy: `# Privacy Policy

We respect your privacy. This policy explains how we collect, use, and protect your personal information when you shop with us.

## Information we collect

We collect information you provide at checkout (name, email, address) and browsing data to improve your experience.

## How we use it

Your information is used to process orders, provide support, and send updates you opt into. We never sell your data.

## Cookies

We use cookies to remember your cart and preferences. You can disable cookies in your browser settings.

## Contact

Questions? Reach us at privacy@lumen.store.`,
    terms: `# Terms & Conditions

By using this store, you agree to the following terms.

## Orders

All orders are subject to availability. We reserve the right to cancel orders in case of pricing errors.

## Shipping

Shipping times are estimates and may vary. Free shipping applies to orders over $50.

## Returns

Items may be returned within 30 days in original condition. Refunds are issued to the original payment method.

## Liability

We are not liable for indirect or consequential damages arising from use of our products.`,
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
    contact: { email: 'hello@store1.com', phone: '+1 (555) 999-0000', address: '456 Commerce Ave, New York, NY' },
    privacy: `# Privacy Policy\\n\\nWelcome to Store One. We respect your privacy.`,
    terms: `# Terms & Conditions\\n\\nBy using Store One, you agree to our terms.`,
  },
};

export function getStoreByHost(host) {
  const h = (host || '').split(':')[0].toLowerCase();
  return STORES[h] || STORES.localhost;
}