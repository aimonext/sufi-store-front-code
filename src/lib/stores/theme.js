import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
  const initial = browser ? localStorage.getItem('dark') === 'true' : false;
  const { subscribe, set, update } = writable(initial);
  if (browser) {
    subscribe(v => {
      localStorage.setItem('dark', v);
      document.documentElement.classList.toggle('dark', v);
    });
    // apply initial
    document.documentElement.classList.toggle('dark', initial);
  }
  return { subscribe, set, update, toggle: () => update(v => !v) };
}

export const theme = createTheme();