import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key + '_' + (browser ? location.host : 'ssr')) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) { if (browser) localStorage.setItem(key + '_' + (browser ? location.host : 'ssr'), JSON.stringify(val)); }

function createWishlist() {
  const { subscribe, set, update } = writable(load('wishlist', []));
  subscribe(v => save('wishlist', v));
  return {
    subscribe,
    toggle: (p) => update(list => {
      const i = list.findIndex(x => x.id === p.id);
      if (i > -1) list.splice(i, 1);
      else list.push({ id: p.id, name: p.name, price: p.price, img: p.img, category: p.category });
      return [...list];
    }),
    remove: (id) => update(list => list.filter(x => x.id !== id)),
    has: (list, id) => list.some(x => x.id === id),
    count: (list) => list.length,
  };
}

export const wishlist = createWishlist();