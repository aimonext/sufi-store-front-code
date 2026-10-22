<script>
  import { cart } from '#lib/stores/cart.js';
  import { goto } from '$app/navigation';

  let c = $derived($cart);
</script>

<main class="max-w-5xl mx-auto px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-gray-900 mb-6 dark:text-white">Your cart</h1>
  {#if c.length === 0}
    <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="text-5xl mb-4">🛒</div>
      <p class="text-gray-600 mb-4 dark:text-gray-300">Your cart is empty.</p>
      <a href="/" class="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-brand-600 transition">Continue shopping</a>
    </div>
  {:else}
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        {#each c as item}
          <div class="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div class="flex gap-3 items-center">
              <img loading="lazy" src={item.img} alt={item.name} class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-900 dark:text-white">{item.name}</div>
                {#if item.variant && Object.keys(item.variant).length}
                  <div class="text-xs text-gray-400 mt-0.5">{Object.entries(item.variant).map(([k,v]) => k + ': ' + v).join(' · ')}</div>
                {/if}
                <div class="text-sm text-gray-500 mt-0.5">${item.price} each</div>
              </div>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <div class="flex items-center gap-2">
                <button onclick={() => cart.dec(item.id, item.variantId)} class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">−</button>
                <span class="w-8 text-center font-medium dark:text-white">{item.qty}</span>
                <button onclick={() => cart.inc(item.id, item.variantId)} class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">+</button>
              </div>
              <div class="font-bold text-gray-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</div>
              <button onclick={() => cart.remove(item.id, item.variantId)} class="text-gray-400 hover:text-red-500 transition" aria-label="Remove">✕</button>
            </div>
          </div>
        {/each}
      </div>
      <aside class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit sticky top-24 dark:bg-gray-800 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 mb-4 dark:text-white">Order summary</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>${$cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2)}</span></div>
          <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Shipping</span><span>Calculated at checkout</span></div>
        </div>
        <div class="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          <span>Total</span><span>${$cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2)}</span>
        </div>
        <a href="/checkout" class="mt-6 block text-center w-full bg-gray-900 hover:bg-brand-600 text-white py-3 rounded-full font-medium transition">Proceed to checkout</a>
        <a href="/" class="mt-3 block text-center text-sm text-brand-600 hover:underline">Continue shopping</a>
      </aside>
    </div>
  {/if}
</main>