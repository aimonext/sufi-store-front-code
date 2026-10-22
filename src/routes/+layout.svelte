<script>
  import './layout.css';
  import { theme } from '#lib/stores/theme.js';
  import { storeConfig } from '#lib/stores/storeConfig.js';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';

  let { data, children } = $props();

  // keep client store in sync for theme application
  $effect(() => {
    if (data?.store) storeConfig.set(data.store);
  });
</script>

<svelte:head>
  <title>{data?.store?.storeName || 'Store'} — Shop</title>
</svelte:head>

<Header store={data?.store} />
{@render children()}
<Footer store={data?.store} />