import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
  const initial = browser ? localStorage.getItem('dark_' + (browser ? location.host : 'ssr')) === 'true' : false;
  const { subscribe, set, update } = writable(initial);
  if (browser) {
    subscribe(v => {
      localStorage.setItem('dark_' + (browser ? location.host : 'ssr'), v);
      document.documentElement.classList.toggle('dark', v);
    });
    // apply initial
    document.documentElement.classList.toggle('dark', initial);
  }
  return { subscribe, set, update, toggle: () => update(v => !v) };
}

export const theme = createTheme();