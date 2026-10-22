import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) {
  if (browser) localStorage.setItem(key, JSON.stringify(val));
}

function createCart() {
  const { subscribe, set, update } = writable(load('cart', []));
  subscribe(v => save('cart', v));
  return {
    subscribe,
    add: (p) => update(cart => {
      const v = (p.variants && p.variants.length) ? p.variants[0] : { id: p.id + '-default', attr: {}, price: p.price, stock: 99 };
      const ex = cart.find(i => i.id === p.id && i.variantId === v.id);
      if (ex) ex.qty++;
      else cart.push({ id: p.id, name: p.name, price: v.price, img: p.img, qty: 1, variantId: v.id, variant: v.attr, stock: v.stock });
      return [...cart];
    }),
    addVariant: (p, v, qty = 1) => update(cart => {
      const variant = v || { id: p.id + '-default', attr: {}, price: p.price, stock: 99 };
      const ex = cart.find(i => i.id === p.id && i.variantId === variant.id);
      if (ex) ex.qty += qty;
      else cart.push({ id: p.id, name: p.name, price: variant.price, img: p.img, qty, variantId: variant.id, variant: variant.attr, stock: variant.stock });
      return [...cart];
    }),
    inc: (id, variantId) => update(cart => {
      const i = cart.find(x => x.id === id && x.variantId === variantId);
      if (i) i.qty++;
      return [...cart];
    }),
    dec: (id, variantId) => update(cart => {
      const i = cart.find(x => x.id === id && x.variantId === variantId);
      if (i) { i.qty--; if (i.qty <= 0) return cart.filter(x => !(x.id === id && x.variantId === variantId)); }
      return [...cart];
    }),
    remove: (id, variantId) => update(cart => cart.filter(x => !(x.id === id && x.variantId === variantId))),
    clear: () => set([]),
    count: (cart) => cart.reduce((s, i) => s + i.qty, 0),
    total: (cart) => cart.reduce((s, i) => s + i.price * i.qty, 0),
  };
}

export const cart = createCart();