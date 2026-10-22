<script>
  import { cart } from '#lib/stores/cart.js';
  import { storeConfig } from '#lib/stores/storeConfig.js';
  let { store } = $props();
  let year = new Date().getFullYear();
</script>

<footer class="border-t border-gray-200 bg-white py-8 mt-6 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400">We accept:</span>
        <div class="flex gap-2 items-center">
          <span class="px-2 py-1 text-[10px] font-bold rounded bg-blue-600 text-white">VISA</span>
          <span class="px-2 py-1 text-[10px] font-bold rounded bg-red-500 text-white">MC</span>
          <span class="px-2 py-1 text-[10px] font-bold rounded bg-blue-400 text-white">AMEX</span>
          <span class="px-2 py-1 text-[10px] font-bold rounded bg-indigo-500 text-white">PayPal</span>
          <span class="px-2 py-1 text-[10px] font-bold rounded bg-green-600 text-white">COD</span>
        </div>
      </div>
      <div class="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
        <a href="/privacy" class="hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a>
        <a href="/terms" class="hover:text-gray-900 dark:hover:text-white transition">Terms &amp; Conditions</a>
      </div>
    </div>
    <div class="mt-4 text-center text-xs text-gray-400">© {year} {store?.storeName || $storeConfig?.storeName || 'Lumen'} · Powered by Svelte</div>
  </div>
</footer>