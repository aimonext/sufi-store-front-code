<script>
  import './layout.css';
  import { onMount } from 'svelte';
  import { theme } from '#lib/stores/theme.js';
  import { storeConfig } from '#lib/stores/storeConfig.js';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';

  let { data, children } = $props();
  let ready = $state(false);

  $effect(() => {
    if (data?.store) storeConfig.set(data.store);
  });

  onMount(() => {
    // apply theme vars client-side too
    if (data?.store?.theme?.brand) {
      const root = document.documentElement;
      Object.entries(data.store.theme.brand).forEach(([k, v]) => root.style.setProperty('--brand-' + k, v));
    }
    ready = true;
  });
</script>

<svelte:head>
  <title>{data?.store?.storeName || 'Store'} — Shop</title>
  <meta name="description" content={data?.store?.heroSubtitle || 'Online store'} />
  <meta property="og:title" content={data?.store?.storeName || 'Store'} />
  <meta property="og:description" content={data?.store?.heroSubtitle || 'Online store'} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="index, follow" />
  <script type="application/ld+json">
    {JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: data?.store?.storeName || 'Store' })}
  </script>
  {#if data?.store?.theme?.brand}
    <style>
      :root {
        {#each Object.entries(data.store.theme.brand) as [k, v]}
        --brand-{k}: {v};
        {/each}
      }
    </style>
  {/if}
</svelte:head>

{#if !ready}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <div class="font-display text-3xl font-bold text-gray-900 dark:text-white">{data?.store?.storeName || 'Loading...'}</div>
      <div class="mt-2 text-gray-500 text-sm">Loading...</div>
    </div>
  </div>
{/if}

<Header store={data?.store} />
{@render children()}
<Footer store={data?.store} />