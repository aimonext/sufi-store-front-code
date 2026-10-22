import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key + '_' + (browser ? location.host : 'ssr')) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) { if (browser) localStorage.setItem(key + '_' + (browser ? location.host : 'ssr'), JSON.stringify(val)); }

const defaults = [
  { id: 1, title: 'Welcome to our store', body: 'Thanks for visiting.', date: 'Today', read: false },
  { id: 2, title: 'Order shipped', body: 'Your recent order is on its way.', date: 'Yesterday', read: false },
  { id: 3, title: 'New arrivals', body: 'Fresh products just dropped.', date: '2 days ago', read: true },
];

function createNotifications() {
  const { subscribe, set, update } = writable(load('notifications', defaults));
  subscribe(v => save('notifications', v));
  return {
    subscribe,
    markAllRead: () => update(list => { list.forEach(n => n.read = true); return [...list]; }),
    remove: (id) => update(list => list.filter(n => n.id !== id)),
    clear: () => set([]),
    unreadCount: (list) => list.filter(n => !n.read).length,
  };
}

export const notifications = createNotifications();