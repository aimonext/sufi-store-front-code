import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) { if (browser) localStorage.setItem(key, JSON.stringify(val)); }

function createOrders() {
  let orders = load('orders', []);
  if (orders.length === 0) {
    orders = [{
      id: 'ORD-DEMO123',
      date: new Date().toLocaleDateString(),
      items: [],
      subtotal: 0,
      shipping: 5,
      total: 5,
      status: 'Shipped',
      shippingAddress: '123 Market St, San Francisco, CA 94103',
      paymentMethod: 'Visa ending in 4242',
      trackingNumber: 'TRK987654321',
    }];
    save('orders', orders);
  }
  const { subscribe, set, update } = writable(orders);
  subscribe(v => save('orders', v));
  return {
    subscribe,
    add: (order) => update(list => { list.unshift(order); return [...list]; }),
    find: (list, code) => list.find(o => o.id === code),
  };
}

export const orders = createOrders();