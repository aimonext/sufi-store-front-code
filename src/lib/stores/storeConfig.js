import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { dev } from '$app/environment';

function loadCached() {
  if (!browser || dev) return null;
  try { return JSON.parse(localStorage.getItem('storeConfig_' + (browser ? location.host : 'ssr')) || 'null'); } catch { return null; }
}

function create() {
  const cached = loadCached();
  const { subscribe, set } = writable(cached);
  if (browser && cached && cached.theme && cached.theme.brand) {
    const root = document.documentElement;
    Object.entries(cached.theme.brand).forEach(([k, v]) => root.style.setProperty('--brand-' + k, v));
  }
  if (browser) {
    subscribe((data) => {
      if (data && data.theme && data.theme.brand) {
        const root = document.documentElement;
        Object.entries(data.theme.brand).forEach(([k, v]) => {
          root.style.setProperty('--brand-' + k, v);
        });
      }
    });
    (async () => {
      try {
        const res = await fetch('/api/store');
        if (!res.ok) return;
        const data = await res.json();
        set(data);
        if (browser && data.theme && data.theme.brand) {
          const root = document.documentElement;
          Object.entries(data.theme.brand).forEach(([k, v]) => {
            root.style.setProperty('--brand-' + k, v);
          });
        }
        if (!dev) localStorage.setItem('storeConfig_' + (browser ? location.host : 'ssr'), JSON.stringify(data));
      } catch (e) { console.error(e); }
    })();
  }
  return { subscribe, set };
}

export const storeConfig = create();