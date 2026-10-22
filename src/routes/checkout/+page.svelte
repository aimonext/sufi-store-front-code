<script>
  import { cart } from '#lib/stores/cart.js';
  import { orders } from '#lib/stores/orders.js';
  import { goto } from '$app/navigation';

  let placing = $state(false);
  let success = $state(false);
  let form = $state({ email:'', firstName:'', lastName:'', address:'', city:'', zip:'', card:'', expiry:'', cvc:'' });

  let c = $derived($cart);
  let total = $derived(c.reduce((s,i) => s + i.price * i.qty, 0));

  async function placeOrder() {
    if (c.length === 0) return;
    placing = true;
    await new Promise(r => setTimeout(r, 1200));
    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: c.map(i => ({ id: i.id, name: i.name, price: i.price, img: i.img, qty: i.qty, variant: i.variant })),
      subtotal: total,
      shipping: 5,
      total: total + 5,
      status: 'Processing',
      shippingAddress: `${form.address}, ${form.city} ${form.zip}`,
      paymentMethod: 'Card ending in ' + form.card.slice(-4),
      trackingNumber: 'TRK' + Math.floor(Math.random() * 1e9),
    };
    orders.add(order);
    cart.clear();
    placing = false;
    success = true;
  }
</script>

<main class="max-w-5xl mx-auto px-4 py-10">
  <h1 class="font-display text-3xl font-bold text-gray-900 mb-6 dark:text-white">Checkout</h1>

  {#if success}
    <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="text-5xl mb-4">✅</div>
      <h2 class="font-display text-2xl font-bold text-gray-900 mb-2 dark:text-white">Order placed!</h2>
      <p class="text-gray-600 mb-6 dark:text-gray-300">Thank you for your purchase. A confirmation has been sent.</p>
      <a href="/" class="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-brand-600 transition">Back to shop</a>
    </div>
  {:else}
    <div class="grid lg:grid-cols-3 gap-8">
      <form onsubmit={(e) => { e.preventDefault(); placeOrder(); }} class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 class="font-semibold text-gray-900 mb-4 dark:text-white">Contact</h2>
          <input type="email" required placeholder="Email address" bind:value={form.email} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 class="font-semibold text-gray-900 mb-4 dark:text-white">Shipping address</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <input type="text" required placeholder="First name" bind:value={form.firstName} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            <input type="text" required placeholder="Last name" bind:value={form.lastName} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            <input type="text" required placeholder="Address" bind:value={form.address} class="sm:col-span-2 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            <input type="text" required placeholder="City" bind:value={form.city} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            <input type="text" required placeholder="ZIP code" bind:value={form.zip} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 class="font-semibold text-gray-900 mb-4 dark:text-white">Payment</h2>
          <div class="space-y-3">
            <input type="text" required placeholder="Card number" bind:value={form.card} class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            <div class="grid grid-cols-2 gap-3">
              <input type="text" required placeholder="MM/YY" bind:value={form.expiry} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              <input type="text" required placeholder="CVC" bind:value={form.cvc} class="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={c.length === 0 || placing} class="w-full bg-gray-900 hover:bg-brand-600 text-white py-3.5 rounded-full font-medium transition shadow disabled:opacity-50 dark:bg-gray-700">
          {placing ? 'Placing order…' : 'Place order'}
        </button>
      </form>

      <aside class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit sticky top-24 dark:bg-gray-800 dark:border-gray-700">
        <h2 class="font-semibold text-gray-900 mb-4 dark:text-white">Order summary</h2>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          {#each c as item}
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
        <div class="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm dark:border-gray-700">
          <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Shipping</span><span>$5.00</span></div>
        </div>
        <div class="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          <span>Total</span><span>${(total + 5).toFixed(2)}</span>
        </div>
        <a href="/cart" class="mt-4 block text-center text-sm text-brand-600 hover:underline">Edit cart</a>
      </aside>
    </div>
  {/if}
</main>