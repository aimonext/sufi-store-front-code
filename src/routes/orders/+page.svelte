<script>
  import { orders } from '#lib/stores/orders.js';
  let list = $derived($orders);
</script>

<main class="max-w-4xl mx-auto px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-gray-900 mb-6 dark:text-white">Your orders</h1>
  {#if list.length === 0}
    <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="text-5xl mb-4">📦</div>
      <p class="text-gray-600 mb-4 dark:text-gray-300">You haven't placed any orders yet.</p>
      <a href="/" class="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-brand-600 transition">Start shopping</a>
    </div>
  {:else}
    <div class="space-y-6">
      {#each list as o}
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 dark:border-gray-700">
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{o.id}</div>
              <div class="text-sm text-gray-500">{o.date}</div>
            </div>
            <div class="flex items-center gap-3">
              <a href={`/track?code=${o.id}`} class="text-xs text-brand-600 hover:underline">Track</a>
              <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-700">{o.status}</span>
              <span class="font-bold text-gray-900 dark:text-white">${o.total.toFixed(2)}</span>
            </div>
          </div>
          <div class="p-5 space-y-3">
            {#each o.items as item}
              <div class="flex gap-3 items-center">
                <img src={item.img} alt={item.name} class="w-12 h-12 rounded-lg object-cover" />
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium truncate dark:text-white">{item.name}</div>
                  {#if item.variant && Object.keys(item.variant).length}
                    <div class="text-xs text-gray-400 truncate">{Object.entries(item.variant).map(([k,v]) => v).join(' / ')}</div>
                  {/if}
                  <div class="text-xs text-gray-500">×{item.qty}</div>
                </div>
                <div class="text-sm font-bold dark:text-white">${(item.price * item.qty).toFixed(2)}</div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>