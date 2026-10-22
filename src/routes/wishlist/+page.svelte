<script>
  import { wishlist } from '#lib/stores/wishlist.js';
  import { cart } from '#lib/stores/cart.js';

  let list = $derived($wishlist);
  function moveToCart(p) { cart.add(p); }
  function remove(id) { wishlist.remove(id); }
</script>

<main class="max-w-7xl mx-auto px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-gray-900 mb-6 dark:text-white">Your wishlist</h1>
  {#if list.length === 0}
    <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="text-5xl mb-4">♡</div>
      <p class="text-gray-600 mb-4 dark:text-gray-300">Your wishlist is empty.</p>
      <a href="/" class="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-brand-600 transition">Discover products</a>
    </div>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {#each list as p}
        <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition group border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <a href={`/product/${p.id}`}><img src={p.img} alt={p.name} loading="lazy" class="product-img w-full h-full object-cover" /></a>
            <button onclick={() => remove(p.id)} class="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition shadow" aria-label="Remove">
              <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-4">
            <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">{p.category}</div>
            <a href={`/product/${p.id}`} class="font-medium mt-1.5 line-clamp-1 text-gray-900 hover:text-brand-600 block dark:text-white">{p.name}</a>
            <div class="mt-2.5 flex items-center justify-between">
              <span class="font-bold text-gray-900 dark:text-white">${p.price}</span>
              <button onclick={() => moveToCart(p)} class="text-xs px-3 py-1.5 bg-gray-900 hover:bg-brand-600 text-white rounded-full transition dark:bg-gray-700">Add to cart</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>