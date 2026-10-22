<script>
  import { page } from '$app/state';
  import { PRODUCTS, relatedProducts } from '#lib/data/products.js';
  let { data } = $props();
  import { cart } from '#lib/stores/cart.js';
  import { wishlist } from '#lib/stores/wishlist.js';

  let product = $derived(data.products.find(p => p.id === parseInt(data.id)));
  let qty = $state(1);
  let mediaIndex = $state(0);
  let selectedAttrs = $state({});
  let activeTab = $state('reviews');
  let newReview = $state({ rating: 5, comment: '' });
  let newQuestion = $state('');
  let reviews = $state([]);
  let questions = $state([]);

  $effect(() => {
    if (product) {
      const firstV = (product.variants && product.variants.length) ? (product.variants.find(v => (v.stock || 0) > 0) || product.variants[0]) : null;
      selectedAttrs = firstV ? { ...firstV.attr } : {};
      mediaIndex = 0;
      reviews = [...(product.reviewsList || [])];
      questions = [...(product.questionsList || [])];
    }
  });

  let selectedVariant = $derived(() => {
    if (!product || !product.variants) return null;
    return product.variants.find(v => Object.keys(selectedAttrs).every(k => v.attr[k] === selectedAttrs[k])) || product.variants[0];
  });

  let variantKeys = $derived(() => {
    if (!product || !product.variants) return [];
    const keys = new Set();
    product.variants.forEach(v => Object.keys(v.attr || {}).forEach(k => keys.add(k)));
    return [...keys];
  });

  function variantValues(key) {
    if (!product || !product.variants) return [];
    return [...new Set(product.variants.map(v => v.attr[key]).filter(x => x !== undefined))];
  }

  function isOptionAvailable(key, value) {
    if (!product || !product.variants) return true;
    return product.variants.some(v => (v.stock || 0) > 0 && v.attr[key] === value && Object.keys(selectedAttrs).every(k => k === key || v.attr[k] === selectedAttrs[k]));
  }

  function selectAttr(key, value) {
    if (!isOptionAvailable(key, value)) return;
    selectedAttrs = { ...selectedAttrs, [key]: value };
    const v = selectedVariant();
    if (v) selectedAttrs = { ...v.attr };
    const list = mediaList();
    if (v && v.image) {
      const idx = list.findIndex(m => m.src === v.image);
      mediaIndex = idx >= 0 ? idx : 0;
    } else {
      mediaIndex = 0;
    }
  }

  let mediaList = $derived(() => {
    if (!product) return [];
    const list = (product.media && product.media.length) ? [...product.media] : [{ type: 'image', src: product.img }];
    const v = selectedVariant();
    if (v && v.image && !list.some(m => m.src === v.image)) list.push({ type: 'image', src: v.image });
    return list;
  });

  function isWished() { return $wishlist.some(x => x.id === product.id); }
  function toggleWish() { wishlist.toggle(product); }

  function addToCart() {
    const v = selectedVariant() || { id: product.id + '-default', attr: {}, price: product.price, stock: 99 };
    cart.addVariant(product, v, qty);
  }

  function addReview() {
    if (!newReview.comment.trim()) return;
    reviews = [{ user: 'You', rating: parseInt(newReview.rating), comment: newReview.comment, date: new Date().toLocaleDateString() }, ...reviews];
    newReview = { rating: 5, comment: '' };
  }

  function askQuestion() {
    if (!newQuestion.trim()) return;
    questions = [{ q: newQuestion, a: 'Thanks for your question! We\'ll answer soon.' }, ...questions];
    newQuestion = '';
  }

  const related = $derived(() => data && product ? data.products.filter(x => x.category === product.category && x.id !== product.id).slice(0, 4) : []);
</script>

{#if !product}
  <main class="max-w-7xl mx-auto px-4 py-20 text-center">
    <p class="text-gray-500">Product not found. <a href="/shop" class="text-brand-600">Back to shop</a></p>
  </main>
{:else}
  <main class="max-w-7xl mx-auto px-4 py-10">
    <nav class="text-sm text-gray-500 mb-6">
      <a href="/" class="hover:text-brand-600">Home</a> <span class="mx-2">/</span>
      <a href="/shop" class="hover:text-brand-600">Products</a> <span class="mx-2">/</span>
      <span class="text-gray-900 dark:text-white">{product.name}</span>
    </nav>

    <div class="grid md:grid-cols-2 gap-10 items-start">
      <div>
        <div class="aspect-square rounded-3xl overflow-hidden shadow-soft bg-gray-100 relative">
          {#each mediaList() as m, i}
            {#if mediaIndex === i}
              <div class="absolute inset-0">
                {#if m.type === 'video'}
                  <video src={m.src} controls class="w-full h-full object-cover"></video>
                {:else}
                  <img src={m.src} alt={product.name} class="w-full h-full object-cover" />
                {/if}
              </div>
            {/if}
          {/each}
          {#if mediaList().length > 1}
            <button onclick={() => mediaIndex = (mediaIndex - 1 + mediaList().length) % mediaList().length} class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center hover:bg-white transition z-10">‹</button>
            <button onclick={() => mediaIndex = (mediaIndex + 1) % mediaList().length} class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center hover:bg-white transition z-10">›</button>
          {/if}
        </div>
        {#if mediaList().length > 1}
          <div class="grid grid-cols-4 gap-2 mt-3">
            {#each mediaList() as m, i}
              <button onclick={() => mediaIndex = i} class={`aspect-square rounded-lg overflow-hidden bg-gray-100 transition ${mediaIndex === i ? 'ring-2 ring-gray-900' : 'opacity-70 hover:opacity-100'}`}>
                {#if m.type === 'video'}
                  <div class="w-full h-full flex items-center justify-center text-gray-500 text-xs">▶ Video</div>
                {:else}
                  <img src={m.src} alt={product.name} class="w-full h-full object-cover" />
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div>
        <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">{product.category}</div>
        <h1 class="font-display text-3xl sm:text-4xl font-bold text-gray-900 mt-2 dark:text-white">{product.name}</h1>
        <div class="flex items-center gap-2 mt-3 text-sm">
          <span class="text-amber-500">{'★'.repeat(Math.round(product.rating || 5))}</span>
          {#if product.reviews}<span class="text-gray-400">({product.reviews} reviews)</span>{/if}
        </div>
        <div class="mt-4 flex items-center gap-3">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">${selectedVariant() ? selectedVariant().price : product.price}</span>
          {#if product.oldPrice}<span class="text-gray-400 line-through text-lg">${product.oldPrice}</span>{/if}
          {#if product.badge}<span class="bg-brand-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{product.badge}</span>{/if}
        </div>
        <p class="mt-5 text-gray-500 leading-relaxed">A beautifully crafted piece designed for everyday use.</p>

        {#if product.variants && product.variants.length > 1}
          <div class="mt-6 space-y-4">
            {#each variantKeys() as key}
              <div>
                <div class="text-sm font-medium text-gray-700 mb-2">{key}</div>
                <div class="flex flex-wrap gap-2">
                  {#each variantValues(key) as val}
                    <button onclick={() => isOptionAvailable(key, val) && selectAttr(key, val)} disabled={!isOptionAvailable(key, val)} class={`px-4 py-2 rounded-lg border text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed ${selectedAttrs[key] === val ? 'bg-gray-900 text-white border-gray-900' : (isOptionAvailable(key, val) ? 'bg-white text-gray-700 border-gray-200 hover:border-gray-400' : 'bg-gray-100 text-gray-400 border-gray-200 line-through')}`}>{val}</button>
                  {/each}
                </div>
              </div>
            {/each}
            {#if selectedVariant()}
              <div class="text-sm text-gray-500">Stock: {selectedVariant().stock}</div>
            {/if}
          </div>
        {/if}

        <div class="mt-6 flex items-center gap-4">
          <div class="flex items-center border border-gray-200 rounded-full dark:border-gray-600">
            <button onclick={() => qty > 1 && qty--} class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700">−</button>
            <span class="w-10 text-center font-medium dark:text-white">{qty}</span>
            <button onclick={() => qty++} class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700">+</button>
          </div>
          <button onclick={addToCart} class="flex-1 px-6 py-3 bg-gray-900 hover:bg-brand-600 text-white rounded-full font-medium transition shadow-soft dark:bg-gray-700">Add to cart</button>
          <button onclick={toggleWish} class="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition dark:border-gray-600" aria-label="Toggle wishlist">
            <svg class="w-5 h-5" class:fill-rose-500={isWished()} class:text-rose-500={isWished()} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>

        <div class="mt-8 border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-600 dark:border-gray-700">
          <div class="flex justify-between"><span>Category</span><span class="text-gray-900 dark:text-white">{product.category}</span></div>
          <div class="flex justify-between"><span>Availability</span><span class="text-green-600 font-medium">In stock</span></div>
          <div class="flex justify-between"><span>Shipping</span><span>Free over $50</span></div>
        </div>

        {#if product.specs}
          <div class="mt-6 border-t border-gray-100 pt-6 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 mb-3 dark:text-white">Specifications</h3>
            <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {#each Object.entries(product.specs) as [k, v]}
                <div>
                  <dt class="text-gray-500">{k}</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{v}</dd>
                </div>
              {/each}
            </dl>
          </div>
        {/if}
      </div>
    </div>
  </main>

  <!-- Reviews / Questions / FAQ full-width section -->
  <section class="mt-12 w-full bg-gray-100 py-10 px-4 sm:px-8 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto">
      <div class="flex gap-2 border-b border-gray-200 mb-4 dark:border-gray-700">
        <button onclick={() => activeTab = 'reviews'} class={`px-4 py-2 text-sm transition ${activeTab === 'reviews' ? 'border-b-2 border-gray-900 text-gray-900 font-medium dark:text-white dark:border-white' : 'text-gray-500'}`}>Reviews ({reviews.length})</button>
        <button onclick={() => activeTab = 'questions'} class={`px-4 py-2 text-sm transition ${activeTab === 'questions' ? 'border-b-2 border-gray-900 text-gray-900 font-medium dark:text-white dark:border-white' : 'text-gray-500'}`}>Questions ({questions.length})</button>
        <button onclick={() => activeTab = 'faq'} class={`px-4 py-2 text-sm transition ${activeTab === 'faq' ? 'border-b-2 border-gray-900 text-gray-900 font-medium dark:text-white dark:border-white' : 'text-gray-500'}`}>FAQ</button>
      </div>

      {#if activeTab === 'reviews'}
        <div class="space-y-4 mb-6">
          {#each reviews as r}
            <div class="bg-white rounded-xl p-4 dark:bg-gray-900">
              <div class="flex items-center justify-between">
                <div class="font-medium text-gray-900 text-sm dark:text-white">{r.user}</div>
                <div class="text-xs text-gray-400">{r.date}</div>
              </div>
              <div class="text-amber-500 text-xs mt-1">{'★'.repeat(r.rating)}</div>
              <p class="text-sm text-gray-600 mt-2 dark:text-gray-300">{r.comment}</p>
            </div>
          {/each}
          {#if reviews.length === 0}
            <p class="text-sm text-gray-500">No reviews yet. Be the first!</p>
          {/if}
        </div>
        <form onsubmit={(e) => { e.preventDefault(); addReview(); }} class="space-y-3 bg-white border border-gray-100 rounded-xl p-4 dark:bg-gray-900 dark:border-gray-700">
          <div class="text-sm font-medium text-gray-700 dark:text-gray-200">Write a review</div>
          <select bind:value={newReview.rating} class="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
          <textarea bind:value={newReview.comment} required rows="3" placeholder="Share your thoughts…" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
          <button type="submit" class="px-5 py-2 bg-gray-900 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition dark:bg-gray-700">Submit review</button>
        </form>
      {/if}

      {#if activeTab === 'questions'}
        <div class="space-y-4 mb-6">
          {#each questions as q}
            <div class="bg-white rounded-xl p-4 dark:bg-gray-900">
              <div class="font-medium text-gray-900 text-sm dark:text-white">Q: {q.q}</div>
              <p class="text-sm text-gray-600 mt-2 dark:text-gray-300">A: {q.a}</p>
            </div>
          {/each}
          {#if questions.length === 0}
            <p class="text-sm text-gray-500">No questions yet. Ask one!</p>
          {/if}
        </div>
        <form onsubmit={(e) => { e.preventDefault(); askQuestion(); }} class="space-y-3 bg-white border border-gray-100 rounded-xl p-4 dark:bg-gray-900 dark:border-gray-700">
          <div class="text-sm font-medium text-gray-700 dark:text-gray-200">Ask a question</div>
          <textarea bind:value={newQuestion} required rows="2" placeholder="Type your question…" class="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
          <button type="submit" class="px-5 py-2 bg-gray-900 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition dark:bg-gray-700">Ask</button>
        </form>
      {/if}

      {#if activeTab === 'faq'}
        <div class="space-y-3">
          {#each (product.faq || []) as f}
            <div class="bg-white rounded-xl p-4 dark:bg-gray-900">
              <div class="font-medium text-gray-900 text-sm dark:text-white">{f.q}</div>
              <p class="text-sm text-gray-600 mt-2 dark:text-gray-300">{f.a}</p>
            </div>
          {/each}
          {#if !(product.faq && product.faq.length)}
            <p class="text-sm text-gray-500">No FAQs available.</p>
          {/if}
        </div>
      {/if}
    </div>
  </section>

  <!-- Related -->
  <section class="mt-12 max-w-7xl mx-auto px-4">
    <h2 class="font-display text-2xl font-bold text-gray-900 mb-6 dark:text-white">You may also like</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      {#each related() as p}
        <a href={`/product/${p.id}`} class="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition group border border-gray-100 block dark:bg-gray-800 dark:border-gray-700">
          <div class="aspect-square overflow-hidden bg-gray-100">
            <img src={p.img} alt={p.name} loading="lazy" class="product-img w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <div class="text-xs text-gray-400 uppercase tracking-wider font-medium">{p.category}</div>
            <div class="font-medium mt-1.5 line-clamp-1 text-gray-900 dark:text-white">{p.name}</div>
            <div class="mt-2 font-bold text-gray-900 dark:text-white">${p.price}</div>
          </div>
        </a>
      {/each}
    </div>
  </section>
{/if}
