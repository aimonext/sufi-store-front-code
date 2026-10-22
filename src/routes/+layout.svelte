<script>
  import './layout.css';
  import { theme } from '#lib/stores/theme.js';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>Lumen — Shop</title>
</svelte:head>

<Header />
{@render children()}
<Footer />