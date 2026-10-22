<script>
  let { data } = $props();
  const PRODUCTS = data.products;
  import { cart } from '#lib/stores/cart.js';
  import { wishlist } from '#lib/stores/wishlist.js';

  let query = $state('');
  let activeCat = $state('all');
  let maxPrice = $state(2000);
  let sort = $state('featured');

  const categoryNames = [...new Set(PRODUCTS.map(p => p.category))];

  let filtered = $derived.by(() => {
    let list = PRODUCTS.filter(p => p.price <= maxPrice);
    if (activeCat !== 'all') list = list.filter(p => p.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    return list;
  });

  function addToCart(p) { cart.add(p); }
  function isWished(id) { return $wishlist.some(x => x.id === id); }
  function toggleWish(p) { wishlist.toggle(p); }
</script>

<section class="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4 py-10">
    <h1 class="font-display text-4xl font-bold text-gray-900 dark:text-white">Shop all</h1>
    <p class="text-gray-500 mt-2">Browse our full collection.</p>
  </div>
</section>

<main class="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-4 gap-8">
  <aside class="lg:col-span-1 space-y-6">
    <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 mb-3 dark:text-white">Categories</h3>
      <div class="space-y-2">
        <button onclick={() => activeCat = 'all'} class={`block w-full text-left text-sm transition ${activeCat === 'all' ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-600'}`}>All</button>
        {#each categoryNames as c}
          <button onclick={() => activeCat = c} class={`block w-full text-left text-sm transition ${activeCat === c ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-600'}`}>{c}</button>
        {/each}
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 mb-3 dark:text-white">Max price: ${maxPrice}</h3>
      <input type="range" min="0" max="2000" step="10" bind:value={maxPrice} class="w-full accent-brand-600" />
    </div>
    <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 mb-3 dark:text-white">Sort by</h3>
      <select bind:value={sort} class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to high</option>
        <option value="price-desc">Price: High to low</option>
        <option value="name">Name A–Z</option>
      </select>
    </div>
  </aside>

  <div class="lg:col-span-3">
    <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
      <span>{filtered.length} products</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
      {#each filtered as p}
        <a href={`/product/${p.id}`} class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition group border border-gray-100 block dark:bg-gray-800 dark:border-gray-700">
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <img src={p.img} alt={p.name} loading="lazy" class="product-img w-full h-full object-cover" />
            {#if p.badge}
              <span class="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">{p.badge}</span>
            {/if}
          </div>
          <div class="p-4">
            <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">{p.category}</div>
            <div class="font-medium mt-1.5 line-clamp-1 text-gray-900 dark:text-white">{p.name}</div>
            <div class="flex items-center gap-1 mt-1 text-xs text-amber-500">
              <span>{'★'.repeat(Math.round(p.rating || 5))}</span>
              {#if p.reviews}<span class="text-gray-400">({p.reviews})</span>{/if}
            </div>
            <div class="mt-2.5 flex items-center justify-between">
              <span class="font-bold text-gray-900 dark:text-white">${p.price}</span>
              <button onclick={(e) => { e.preventDefault(); addToCart(p); }} class="text-xs px-3 py-1.5 bg-gray-900 hover:bg-brand-600 text-white rounded-full transition dark:bg-gray-700">Add</button>
            </div>
          </div>
        </a>
      {/each}
    </div>
    {#if filtered.length === 0}
      <p class="text-center text-gray-500 py-16">No products match your filters.</p>
    {/if}
  </div>
</main>