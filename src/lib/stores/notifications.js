import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { dev } from '$app/environment';

function load(key, fallback) {
  if (!browser) return fallback;
  try { return JSON.parse(localStorage.getItem(key + '_' + (browser ? location.host : 'ssr')) || JSON.stringify(fallback)); } catch { return fallback; }
}
function save(key, val) { if (browser) localStorage.setItem(key + '_' + (browser ? location.host : 'ssr'), JSON.stringify(val)); }

function createNotifications() {
  const { subscribe, set, update } = writable([]);
  if (browser) {
    (async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) return;
        const data = await res.json();
        const cached = load('notifications', []);
        // merge: prefer server data, keep read state from cache
        const merged = data.map(n => {
          const c = cached.find(x => x.id === n.id);
          return c ? { ...n, read: c.read } : n;
        });
        set(merged);
        save('notifications', merged);
      } catch (e) { console.error(e); }
    })();
  }
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