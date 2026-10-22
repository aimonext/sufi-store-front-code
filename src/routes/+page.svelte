<script>
  import { cart } from '#lib/stores/cart.js';
  import { wishlist } from '#lib/stores/wishlist.js';

  let { data } = $props();

  let heroIndex = $state(0);
  const heroSlides = [
    { eyebrow: data.store.heroEyebrow, title: data.store.heroTitle, subtitle: data.store.heroSubtitle, image: '/img/hero1_600x750.jpg', cta: 'Shop the collection', link: '/shop' },
  ];

  const featured = data.products.slice(0, 8);
  const categories = data.store.categories;

  function addToCart(p) { cart.add(p); }
  function toggleWish(p) { wishlist.toggle(p); }
  function isWished(id) { return $wishlist.some(x => x.id === id); }
</script>

<section class="relative overflow-hidden">
  {#each heroSlides as s, i}
    {#if heroIndex === i}
      <div class="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p class="text-brand-600 text-sm font-semibold tracking-widest uppercase mb-3">{s.eyebrow}</p>
          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">{s.title}</h1>
          <p class="mt-5 text-gray-500 max-w-md text-lg">{s.subtitle}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a href={s.link} class="px-7 py-3 bg-gray-900 hover:bg-brand-600 text-white rounded-full font-medium transition shadow-soft">{s.cta}</a>
            <a href="#story" class="px-7 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-200">Learn more</a>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
            <img src={s.image} alt={s.title} loading={i === 0 ? 'eager' : 'lazy'} class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    {/if}
  {/each}
  {#if heroSlides.length > 1}
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {#each heroSlides as _, i}
        <button onclick={() => heroIndex = i} class={`h-2.5 rounded-full transition-all ${heroIndex === i ? 'bg-gray-900 w-6' : 'bg-gray-300 w-2.5'}`}></button>
      {/each}
    </div>
  {/if}
</section>

<section class="max-w-7xl mx-auto px-4 py-12">
  <div class="flex items-end justify-between mb-6">
    <h2 class="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Shop by category</h2>
    <a href="/shop" class="text-sm text-brand-600 hover:underline">View all</a>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    {#each categories.slice(0,4) as c}
      <a href="/shop" class="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition">
        <img src={c.img} alt={c.name} loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <div class="absolute bottom-4 left-4 text-white font-semibold text-lg">{c.name}</div>
      </a>
    {/each}
  </div>
</section>

<section id="products" class="max-w-7xl mx-auto px-4 py-12">
  <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
    <div>
      <h2 class="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Featured products</h2>
      <p class="text-gray-500 text-sm mt-1">Hand-picked for you</p>
    </div>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {#each featured as p}
      <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition group border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div class="relative aspect-square overflow-hidden bg-gray-100">
          <a href={`/product/${p.id}`}><img src={p.img} alt={p.name} loading="lazy" class="product-img w-full h-full object-cover" /></a>
          {#if p.badge}
            <span class="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">{p.badge}</span>
          {/if}
          <button onclick={() => toggleWish(p)} class="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition shadow" aria-label="Toggle wishlist">
            <svg class="w-4 h-4" class:fill-rose-500={isWished(p.id)} class:text-rose-500={isWished(p.id)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
            <button onclick={() => addToCart(p)} class="w-full bg-white/95 backdrop-blur text-gray-900 text-sm font-semibold py-2.5 rounded-full shadow hover:bg-white transition">Quick add</button>
          </div>
        </div>
        <div class="p-4">
          <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">{p.category}</div>
          <a href={`/product/${p.id}`} class="font-medium mt-1.5 line-clamp-1 text-gray-900 hover:text-brand-600 block dark:text-white">{p.name}</a>
          <div class="mt-2.5 flex items-center justify-between">
            <span class="font-bold text-gray-900 dark:text-white">${p.price}</span>
            <button onclick={() => addToCart(p)} class="text-xs px-3 py-1.5 bg-gray-900 hover:bg-brand-600 text-white rounded-full transition dark:bg-gray-700">Add</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>