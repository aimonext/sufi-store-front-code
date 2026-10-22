<script>
  import './layout.css';
  import { theme } from '#lib/stores/theme.js';
  import { storeConfig } from '#lib/stores/storeConfig.js';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>{$storeConfig?.storeName || 'Store'} — Shop</title>
</svelte:head>

<Header />
{@render children()}
<Footer />