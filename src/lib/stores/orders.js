import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key + '_' + (browser ? location.host : 'ssr')) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) { if (browser) localStorage.setItem(key + '_' + (browser ? location.host : 'ssr'), JSON.stringify(val)); }

function createOrders() {
  const orders = load('orders', []);
  const { subscribe, set, update } = writable(orders);
  subscribe(v => save('orders', v));
  return {
    subscribe,
    add: (order) => update(list => { list.unshift(order); return [...list]; }),
    find: (list, code) => list.find(o => o.id === code),
  };
}

export const orders = createOrders();