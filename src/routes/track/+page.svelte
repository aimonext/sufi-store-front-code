<script>
  import { page } from '$app/state';
  import { orders } from '#lib/stores/orders.js';

  let code = $state('');
  let error = $state('');
  let order = $state(null);
  const statuses = ['Processing', 'Shipped', 'Delivered'];

  $effect(() => {
    const c = page.url.searchParams.get('code');
    if (c) { code = c; track(); }
  });

  function track() {
    error = '';
    order = null;
    const found = $orders.find(o => o.id === code.trim());
    if (!found) { error = 'Order not found. Check the code and try again.'; return; }
    order = found;
  }

  function stepIndex() { if (!order) return 0; const i = statuses.indexOf(order.status); return i >= 0 ? i : 0; }
</script>

<main class="max-w-3xl mx-auto px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-gray-900 mb-6 dark:text-white">Track your order</h1>
  <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
    <form onsubmit={(e) => { e.preventDefault(); track(); }} class="flex gap-3">
      <input type="text" placeholder="Enter order code (e.g. ORD-XXXX)" bind:value={code} class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      <button type="submit" class="px-6 py-2.5 bg-gray-900 hover:bg-brand-600 text-white rounded-lg font-medium transition dark:bg-gray-700">Track</button>
    </form>
    {#if error}<p class="text-sm text-red-500 mt-3">{error}</p>{/if}
  </div>

  {#if order}
    <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div class="font-semibold text-gray-900 dark:text-white">{order.id}</div>
          <div class="text-sm text-gray-500">Placed on {order.date}</div>
        </div>
        <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-700">{order.status}</span>
      </div>

      <div>
        <div class="flex items-center justify-between">
          {#each statuses as s, i}
            <div class="flex-1 flex flex-col items-center">
              <div class={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${stepIndex() >= i ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
              <div class={`text-[10px] mt-1 ${stepIndex() >= i ? 'text-brand-600 font-medium' : 'text-gray-400'}`}>{s}</div>
            </div>
          {/each}
        </div>
        <div class="relative mt-2 h-1 bg-gray-200 rounded-full">
          <div class="absolute left-0 top-0 h-1 bg-brand-600 rounded-full transition-all" style={`width:${(stepIndex() / (statuses.length - 1)) * 100}%`}></div>
        </div>
      </div>

      <div class="space-y-3">
        {#each order.items as item}
          <div class="flex gap-3 items-center">
            <img loading="lazy" src={item.img} alt={item.name} class="w-12 h-12 rounded-lg object-cover" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium truncate dark:text-white">{item.name}</div>
              <div class="text-xs text-gray-500">×{item.qty}</div>
            </div>
            <div class="text-sm font-bold dark:text-white">${(item.price * item.qty).toFixed(2)}</div>
          </div>
        {/each}
      </div>

      <div class="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
        <div class="flex justify-between"><span>Shipping</span><span>{order.shippingAddress || '—'}</span></div>
        <div class="flex justify-between"><span>Payment</span><span>{order.paymentMethod || '—'}</span></div>
        <div class="flex justify-between"><span>Tracking #</span><span>{order.trackingNumber || '—'}</span></div>
      </div>
      <div class="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 dark:border-gray-700 dark:text-white">
        <span>Total</span><span>${order.total.toFixed(2)}</span>
      </div>
    </div>
  {/if}
</main>