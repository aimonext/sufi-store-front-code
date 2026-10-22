import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { dev } from '$app/environment';

function loadCached() {
  if (!browser || dev) return null;
  try { return JSON.parse(localStorage.getItem('storeConfig') || 'null'); } catch { return null; }
}

function create() {
  const { subscribe, set } = writable(loadCached());
  if (browser) {
    (async () => {
      try {
        const res = await fetch('/api/store');
        if (!res.ok) return;
        const data = await res.json();
        set(data);
        if (!dev) localStorage.setItem('storeConfig', JSON.stringify(data));
      } catch (e) { console.error(e); }
    })();
  }
  return { subscribe, set };
}

export const storeConfig = create();